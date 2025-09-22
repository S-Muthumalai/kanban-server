import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto, userId: number) {
    return this.prisma.cardDetail.create({
      data: { ...createCardDto, userId },
    });
  }

  async findAll(userId: number) {
    return this.prisma.cardDetail.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const card = await this.prisma.cardDetail.findUnique({
      where: { id, userId },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found for this user`);
    }

    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto, userId: number) {
    await this.findOne(id, userId); // Ensure card belongs to user

    return this.prisma.cardDetail.update({
      where: { id, userId },
      data: updateCardDto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId); // Ensure card belongs to user

    return this.prisma.cardDetail.delete({
      where: { id, userId },
    });
  }
}