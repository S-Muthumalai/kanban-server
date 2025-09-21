import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [PrismaModule, AuthModule, CardModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
