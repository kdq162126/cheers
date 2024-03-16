import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobEntity, UserEntity } from "src/database/entities";
import { Repository } from "typeorm";
import { createJobDto } from "./job.dto";

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobEntity)
        private readonly jobRepo: Repository<JobEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) { }

    async listJobs() {
        const jobs = await this.jobRepo.find({
            relations: { owner: true }
        })
        return jobs
    }

    async jobDetail(id: number) {
        const job = await this.jobRepo.findOne(
            {
                where: { id: id },
                relations: { owner: true, bids: true }
            },
        )
        if (!job) {
            throw new HttpException('Record not found.', HttpStatus.NOT_FOUND);
        }
        return job
    }

    async createJob(jobParam: createJobDto, ownerId?: number,) {
        const owner = await this.userRepo.findOneBy({ id: ownerId })
        // if (!owner) {
        //     throw new HttpException('Record not found.', HttpStatus.NOT_FOUND);
        // }

        const job = this.jobRepo.create({
            name: jobParam.name,
            description: jobParam.description,
            price: jobParam.price,
            owner: owner,
            status: 'listing'
        })
        const jobCreated = await this.jobRepo.save(job)

        return await this.jobDetail(jobCreated.id)
    }

    async editJob(jobId: number, jobParam: createJobDto, ownerId?: number,) {
        const owner = await this.userRepo.findOneBy({ id: ownerId })
        // if (!owner) {
        //     throw new HttpException('Record not found.', HttpStatus.NOT_FOUND);
        // }

        const job = await this.jobDetail(jobId)
        // TODO: check owner access before edit

        job.name = jobParam.name ?? job.name
        job.description = jobParam.description ?? job.description
        job.price = jobParam.price ?? job.price
        await this.jobRepo.save(job)

        return job
    }

    async deleteJob(jobId: number) {
        const job = await this.jobDetail(jobId)
        return await this.jobRepo.delete(job.id)
    }
}