import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description: 'Blog sarlavhasi',
    example: 'Halol investitsiya nima?',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Blog mazmuni yoki qisqacha tavsifi',
    example:
      'Bu maqolada halol investitsiyaning asosiy tamoyillari haqida gap boradi.',
  })
  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Rasm fayli (png, jpg, webp)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  file?: Express.Multer.File;
}
