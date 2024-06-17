import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        ...user,
        password: undefined,
      };
    }
    return null;
  }

  async login(user) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 8);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        email: data.email,
        password: hashedPassword,
      },
    });
    return {
      ...user,
      password: undefined,
    };
  }
}
