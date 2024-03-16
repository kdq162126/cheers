import { IsOptional, IsString, IsUrl } from 'class-validator';

export class createJobDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;
}
