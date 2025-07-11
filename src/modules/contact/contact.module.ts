import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactRepository } from './contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [
    { provide: 'IContactRepository', useClass: ContactRepository },
    { provide: 'IContactService', useClass: ContactService },
  ],
})
export class ContactModule {}
