import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as nacl from 'tweetnacl';
import * as bs58 from 'bs58';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  _getValue(message: string, title: string) {
    const regex = new RegExp(`${title}: ([^\\n]+)`);
    const valueMatch = message.match(regex);
    return valueMatch ? valueMatch[1] : null;
  }

  async login(loginDto: LoginDto) {
    const isValidSig = nacl.sign.detached.verify(
      new TextEncoder().encode(loginDto.message),
      bs58.decode(loginDto.signature),
      bs58.decode(loginDto.address)
    );

    if (!isValidSig) {
      throw new UnauthorizedException('Invalid signature');
    }
    const currentTime = new Date();
    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
    const expirationTimestamp = currentTime.getTime() + tenDaysInMilliseconds;
    const expirationTime = new Date(expirationTimestamp);

    let user = await this.userService.findOneByAddress(loginDto.address);

    if (!user) {
      user = await this.userService.createUser(loginDto.address);
    }

    const payload = {
      uid: user.id,
      exp: expirationTime.getTime(),
    };
    return {
      token: await this.jwtService.signAsync(payload),
      user: await this.userService.getUser(user.id)
    };
  }
}
