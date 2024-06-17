import { PrismaService } from 'src/database/prisma.service';
import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';

@Module({
  providers: [PrismaService, BadgesService],
  controllers: [BadgesController],
})
export class BadgesModule {}
