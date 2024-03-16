import { JobService } from './../job/job.service';
import { BigNumber } from 'bignumber.js';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BidEntity, JobEntity, UserEntity } from "src/database/entities";
import { Repository } from "typeorm";
import { sendBidDto } from "./bid.dto";

@Injectable()
export class BidService {
    constructor(
        @InjectRepository(JobEntity)
        private readonly jobRepo: Repository<JobEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(BidEntity)
        private readonly bidRepo: Repository<BidEntity>,

        private readonly jobService: JobService
    ) { }

    async sendBid(userId: number, param: sendBidDto) {
        const job = await this.jobRepo.findOneBy({ id: param.jobId, status: 'listing' })
        if (!job) {
            throw new HttpException('Job not found.', HttpStatus.NOT_FOUND);
        }

        const user = await this.userRepo.findOneBy({ id: userId })
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        await this.bidRepo.delete({ job: job, user: user })

        await this.bidRepo.save({
            proposal: param.proposal,
            status: 'sent',
            job: job,
            user: user
        })

        return await this.jobService.jobDetail(job.id)
    }

    async deleteBid(userId: number, bidId: number) {
        const user = await this.userRepo.findOneBy({ id: userId })
        if (!user) {
            throw new HttpException('Record not found.', HttpStatus.NOT_FOUND);
        }

        return await this.bidRepo.delete({ id: bidId, user: user })
    }

    async acceptBid(userId: number, bidId: number) {
        const acceptBid = await this.bidRepo.findOne({
            where: { id: bidId },
            relations: ['job', 'job.owner', 'job.bids']
        })
        if (!acceptBid) {
            throw new HttpException('Bid not found.', HttpStatus.NOT_FOUND);
        }

        if (acceptBid.job.owner.id !== userId) {
            throw new HttpException('You are not owner of the job.', HttpStatus.FORBIDDEN);
        }

        acceptBid.status = 'accepted'
        await this.bidRepo.save(acceptBid)

        acceptBid.job.status = 'processing'
        await this.jobRepo.save(acceptBid.job)

        for (let bid of acceptBid.job.bids) {
            if (bid.id === acceptBid.id) continue
            bid.status = 'rejected'
            await this.bidRepo.save(bid)
        }

        return await this.jobService.jobDetail(acceptBid.job.id)
    }
}