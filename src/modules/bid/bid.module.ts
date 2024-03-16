import { Module } from '@nestjs/common';
import {
    BidEntity,
    JobEntity, UserEntity,
} from 'src/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';
import { JobService } from '../job/job.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            JobEntity,
            UserEntity,
            BidEntity
        ]),
    ],
    controllers: [BidController],
    providers: [BidService, JobService],
})
export class BidModule { }
