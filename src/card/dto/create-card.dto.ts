import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CardStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  QA = 'QA',
  DONE = 'DONE',
}

export class CreateCardDto {
  @ApiProperty({ example: 'Implement user authentication' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Add JWT authentication to the API', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/image.png', required: false })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiProperty({ enum: CardStatus, example: CardStatus.TODO, required: false })
  @IsOptional()
  @IsEnum(CardStatus)
  status?: CardStatus;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @IsString()
  assigneeName?: string;

  @ApiProperty({ example: 5, required: false })
  @IsOptional()
  @IsNumber()
  storyPoints?: number;
}