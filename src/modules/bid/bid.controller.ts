import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { BidService } from "./bid.service";
import { AuthGuard } from "src/guards/auth.guard";
import { sendBidDto } from "./bid.dto";

@Controller('bid')
export class BidController {
    constructor(
        private readonly bidService: BidService,
    ) { }

    @UseGuards(AuthGuard)
    @Post('')
    sendBid(@Request() req, @Body() body: sendBidDto) {
        const userId = req.user.uid
        return this.bidService.sendBid(userId, body)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteBid(@Request() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.uid
        return this.bidService.deleteBid(userId, id)
    }

    @UseGuards(AuthGuard)
    @Post(':id/accept')
    acceptBid(@Request() req, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user.uid
        return this.bidService.acceptBid(userId, id)
    }
}