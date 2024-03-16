import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  UserEntity,
} from 'src/database/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignatureEntity } from 'src/database/entities/user_signature.entity';
import {
  generateDefaultAvatar,
} from 'src/utils';
import { UserProfileDto } from './dto/profile.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserSignatureEntity)
    private readonly userSignatureRepo: Repository<UserSignatureEntity>,
    private readonly configService: ConfigService,
  ) { }

  findOneByAddress(walletAddress: string): Promise<UserEntity | undefined> {
    return this.userRepo.findOne({
      where: { walletAddress },
    });
  }

  async checkNonceExistAndCreate(
    nonce: string,
    userId: number,
    message: string,
    signature: string,
    expirationTime: Date,
  ): Promise<boolean> {
    const existingEntity = await this.userSignatureRepo.findOneBy({ nonce });

    if (existingEntity) {
      return true;
    }

    const newEntity = this.userSignatureRepo.create({
      userId,
      nonce,
      message,
      signature,
      expirationTime,
    });
    await this.userSignatureRepo.save(newEntity);
    return false;
  }

  async createUser(walletAddress: string): Promise<UserEntity> {
    const newUser = this.userRepo.create({
      walletAddress,
      avatar: generateDefaultAvatar(walletAddress)
    });
    const user = await this.userRepo.save(newUser);
    return user;
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { jobs: true, bids: true }
    })
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async editUser(
    userId: number,
    profile?: UserProfileDto,
    avatar?: Express.Multer.File,
  ) {
    const user = await this.userRepo.findOneBy({ id: userId })
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    user.name = profile.name ?? user.name
    user.email = profile.email ?? user.email
    user.role = profile.role ?? user.role

    return await this.userRepo.save(user);
  }
}
