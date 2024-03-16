import { Module } from '@nestjs/common';
import {
    JobEntity, UserEntity,
} from 'src/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './job.service';
import { JobController } from './job.controller';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            JobEntity,
            UserEntity
        ]),
    ],
    controllers: [JobController],
    providers: [JobService],
})
export class JobModule { }
