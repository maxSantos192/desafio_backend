import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BadgesModule } from './badges/badges.module';

@Module({
  imports: [AuthModule, BadgesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
