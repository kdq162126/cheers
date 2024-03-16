import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SocialConnectDto {
  @IsNumber()
  @IsNotEmpty()
  socialType: number;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
