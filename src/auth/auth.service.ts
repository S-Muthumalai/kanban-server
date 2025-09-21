import { Injectable, UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject(REQUEST) private request: any,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: createAuthDto.email,
        firstName: createAuthDto.firstName,
        lastName: createAuthDto.lastName,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;
    return result;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: { email: string; password: string }) {
    this.logger.debug(`🔐 AuthService: Login attempt for email: ${loginDto.email}`);

    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      this.logger.warn(`🔐 AuthService: Login failed - invalid credentials for ${loginDto.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.debug(`🔐 AuthService: User validated successfully - userId: ${user.id}`);

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    this.logger.debug(`🔐 AuthService: JWT token generated for userId: ${user.id}`);

    return {
      access_token,
      user,
    };
  }

  async findById() {
    this.logger.debug('👤 AuthService: findById called');

    const userId = this.request.userId;
    this.logger.debug(`👤 AuthService: Getting userId from request context: ${userId}`);

    if (!userId) {
      this.logger.error('👤 AuthService: No userId found in request context');
      throw new UnauthorizedException('No user ID in context');
    }

    this.logger.debug(`👤 AuthService: Fetching user from database with id: ${userId}`);

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      this.logger.warn(`👤 AuthService: User not found in database for id: ${userId}`);
      throw new UnauthorizedException('User not found');
    }

    this.logger.debug(`👤 AuthService: User found successfully - email: ${user.email}`);

    const { password: _, ...result } = user;
    return result;
  }
}