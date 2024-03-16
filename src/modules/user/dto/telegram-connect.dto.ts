import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TelegramConnectDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  photo_url?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsNumber()
  @IsNotEmpty()
  auth_date: number;

  @IsString()
  @IsNotEmpty()
  hash: string;
}
