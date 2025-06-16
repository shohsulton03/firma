import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
  @ApiProperty({ example: 'Toshkent, Uzbekistan', description: 'Manzil' })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'https://t.me/yourchannel',
    description: 'Telegram havolasi',
  })
  @IsOptional()
  @IsString()
  telegramLink: string;

  @ApiProperty({
    example: 'https://instagram.com/yourpage',
    description: 'Instagram havolasi',
  })
  @IsOptional()
  @IsString()
  instagramLink: string;

  @ApiProperty({
    example: 'https://facebook.com/yourpage',
    description: 'Facebook havolasi',
  })
  @IsOptional()
  @IsString()
  facebookLink: string;

  @ApiProperty({
    example: 'https://twitter.com/yourpage',
    description: 'Twitter havolasi',
  })
  @IsOptional()
  @IsString()
  twitterLink: string;

  @ApiProperty({
    example: 'https://linkedin.com/in/yourprofile',
    description: 'LinkedIn havolasi',
  })
  @IsOptional()
  @IsString()
  linkedinLink: string;

  @ApiProperty({
    example: '+81 90 1234 5678',
    description: 'Yaponiyadagi telefon raqam',
  })
  @IsOptional()
  @IsString()
  phoneInJpn: string;

  @ApiProperty({
    example: '+998 90 123 45 67',
    description: 'O‘zbekistondagi telefon raqam',
  })
  @IsOptional()
  @IsString()
  phoneInUzb: string;

  @ApiProperty({ example: 'example@mail.com', description: 'Email manzil' })
  @IsOptional()
  @IsEmail()
  email: string;
}
