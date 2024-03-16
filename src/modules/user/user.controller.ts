import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';
import { UserProfileDto } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const userId = req.user.uid;
    return this.userService.getUser(userId);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async editProfile(
    @Request() req,
    @UploadedFile() avatar?: Express.Multer.File,
    @Body() profile?: UserProfileDto,
  ) {
    const userId = req.user.uid;
    return this.userService.editUser(userId, profile, avatar);
  }
}
