import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BadgesService } from './badges.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('badges')
export class BadgesController {
  constructor(private badgesService: BadgesService) {}

  @Get()
  getAllBadges() {
    return this.badgesService.getAllBadges();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/:userId')
  getUserBadges(@Param('userId', ParseIntPipe) userId: number) {
    return this.badgesService.getUserBadges(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('redeem/:userId')
  redeemBadges(@Param('userId', ParseIntPipe) userId: number) {
    return this.badgesService.redeemBadges(userId);
  }
}
