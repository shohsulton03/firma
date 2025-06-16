import { InjectRepository } from '@nestjs/typeorm';
import { IContactRepository } from './interfaces/contact.repositorty.interface';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';

export class ContactRepository implements IContactRepository {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async create(dto: Contact): Promise<Contact> {
      const newContact = this.contactRepository.create(dto);
      return await this.contactRepository.save(newContact);
  }

  async findAll(limit?: number, page?: number): Promise<{ data: Contact[]; total: number; }> {
      const query = this.contactRepository.createQueryBuilder('contact')

      if (limit) {
        query.take(limit)
      }

      if (page && limit) {
        query.skip((page - 1) * limit)
      }

      const [data, total] = await query.getManyAndCount();
      return { data, total };
  }

  async findById(id: string): Promise<Contact | null> {
      return await this.contactRepository.findOne({where: {id}})
  }

  async update(entity: Contact): Promise<Contact> {
      return await this.contactRepository.save(entity)
  }

  async delete(entity: Contact): Promise<Contact> {
      return await this.contactRepository.remove(entity)
  }
}
