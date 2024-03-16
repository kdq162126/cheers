import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { JobService } from "./job.service";
import { createJobDto } from "./job.dto";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('job')
export class JobController {
    constructor(
        private readonly jobService: JobService,
    ) { }

    @Get('')
    listJobs(@Request() req) {
        return this.jobService.listJobs()
    }

    @Get(':id')
    jobDetail(@Request() req, @Param('id', ParseIntPipe) id: number) {
        return this.jobService.jobDetail(id)
    }

    // @UseGuards(AuthGuard)
    @Post('')
    createJob(@Request() req, @Body() jobParam?: createJobDto) {
        const userId = req.user ? req.user.uid : null;
        return this.jobService.createJob(jobParam, userId)
    }

    // @UseGuards(AuthGuard)
    @Put(':id')
    editJob(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() jobParam?: createJobDto) {
        const userId = req.user ? req.user.uid : null;
        return this.jobService.editJob(id, jobParam, userId)
    }

    // @UseGuards(AuthGuard)
    @Delete(':id')
    deleteJob(@Request() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user ? req.user.uid : null;
        return this.jobService.deleteJob(id)
    }

}