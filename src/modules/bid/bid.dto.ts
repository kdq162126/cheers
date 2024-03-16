import { IsNumber, IsOptional, IsString } from 'class-validator';

export class sendBidDto {
    @IsNumber()
    jobId: number;

    @IsOptional()
    @IsString()
    proposal?: string;
}
