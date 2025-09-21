import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [CardService, PrismaService],
  controllers: [CardController]
})
export class CardModule {}
