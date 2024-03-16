import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AbstractDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(data: { id: number; createdAt: Date; updatedAt: Date }) {
    Object.assign(this, data);
  }
}
