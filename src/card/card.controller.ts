import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req, // Import Req
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { AuthGuard } from '../guard/auth.guard';
import { Request } from 'express'; // Import Request from express

// Extend Request to include userId property
interface AuthenticatedRequest extends Request {
  userId: number;
}

@ApiTags('cards')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiBody({ type: CreateCardDto })
  create(@Body() createCardDto: CreateCardDto, @Req() req: AuthenticatedRequest) {
    return this.cardService.create(createCardDto, req.userId);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.cardService.findAll(req.userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    return this.cardService.findOne(id, req.userId);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateCardDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.cardService.update(id, updateCardDto, req.userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthenticatedRequest) {
    return this.cardService.remove(id, req.userId);
  }
}
