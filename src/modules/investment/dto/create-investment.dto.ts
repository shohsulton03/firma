import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInvestmentDto {
  @ApiProperty({
    description: 'Investment title',
    example: 'Tashkent Supermarket',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Investment description',
    example: 'Monthly return guaranteed from this commercial property.',
  })
  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  images: string[];

  @ApiProperty({
    description: 'Category name',
    example: 'market',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'png, ppt, wbep formatdagi fayl',
    type: 'string',
    format: 'binary',
    isArray: true,
    required: true,
  })
  @IsOptional()
  files?: Express.Multer.File[];

  @ApiProperty({
    description: 'Yillik daromad foizda',
    example: '8',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  annualIncome: number;

  @ApiProperty({
    description: 'Invistitsiya mudati yilda',
    example: '5',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  investmentDuration: number;

  @ApiProperty({
    description: 'Minimal summa',
    example: '35000',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  minAmount: number;

  @ApiProperty({
    description:
      'Joyning geografik boylami (Longitude), -180 dan 180 gacha qiymat.',
    example: 69.2401,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  longitut: number;

  @ApiProperty({
    description:
      'Joyning geografik enlami (Latitude), -90 dan 90 gacha qiymat.',
    example: 41.2995,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  latitude: number;
}
