import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { IContactService } from './interfaces/contact.service.interface';
import { Auth } from '../../common/decorator/auth.decorator';
import { ApiQuery } from '@nestjs/swagger';

@Controller('contact')
export class ContactController {
  constructor(
    @Inject('IContactService') private readonly contactService: IContactService,
  ) {}

  @Auth()
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get()
  findAll(@Query('limit') limit?: number, @Query('page') page?: number) {
    return this.contactService.findAll({ limit, page });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOneById(id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.delete(id);
  }
}
