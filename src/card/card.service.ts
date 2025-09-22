import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto) {
    return this.prisma.cardDetail.create({
      data: createCardDto,
    });
  }

  async findAll() {
    return this.prisma.cardDetail.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const card = await this.prisma.cardDetail.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    await this.findOne(id);

    return this.prisma.cardDetail.update({
      where: { id },
      data: updateCardDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.cardDetail.delete({
      where: { id },
    });
  }
}
