import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BadgesService {
  constructor(private prisma: PrismaService) {}

  async getAllBadges() {
    return await this.prisma.badge.findMany();
  }

  async getUserBadges(userId: number) {
    return await this.prisma.userBadge.findMany({
      where: { id: userId },
      include: { badge: true },
    });
  }

  async redeemBadges(userId: number) {
    const userBadges = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { UserBadge: true },
    });

    const userBadgesIds = userBadges.UserBadge.map(
      (userBadge) => userBadge.badgeId,
    );

    const badges = await this.prisma.badge.findMany({
      where: {
        id: {
          notIn: userBadgesIds,
        },
      },
    });

    if (badges.length === 0) {
      throw new Error('NO BADGES AVAILABLE FOR REDEMPTION.');
    }

    const randomBadge = badges[Math.floor(Math.random() * badges.length)];

    await this.prisma.userBadge.create({
      data: {
        userId,
        badgeId: randomBadge.id,
      },
    });

    return randomBadge;
  }
}
