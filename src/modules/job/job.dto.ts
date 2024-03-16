import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class createJobDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    price: number;
}
