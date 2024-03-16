import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserEntity,
  UserSignatureEntity,
} from 'src/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthGuard } from 'src/guards/auth.guard';
import { S3Service } from 'src/common/s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserSignatureEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthGuard, ConfigService],
  exports: [UserService],
})
export class UserModule {}
