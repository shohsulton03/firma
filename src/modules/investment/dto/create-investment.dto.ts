import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator";

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
    description: 'Category unique id (UUID)',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'png, ppt, wbep formatdagi fayl',
    type: 'string',
    format: 'binary',
    isArray: true,
    required: true,
  })
  @IsOptional()
  files?: Express.Multer.File[];
}
