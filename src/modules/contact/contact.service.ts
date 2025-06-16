import { Inject, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { IContactService } from './interfaces/contact.service.interface';
import { IContactRepository } from './interfaces/contact.repositorty.interface';
import { ResData } from '../../common/lib/resData';
import { Contact } from './entities/contact.entity';
import { ContactNotFoundExeption } from './exeptions/contact.exption';

@Injectable()
export class ContactService implements IContactService {
  constructor(
    @Inject('IContactRepository')
    private readonly contactRepository: IContactRepository,
  ) {}

  async create(dto: CreateContactDto): Promise<ResData<Contact>> {
    const newContact = new Contact();
    Object.assign(newContact, dto);
    const data = await this.contactRepository.create(newContact);
    return new ResData<Contact>('Contact created successfully', 201, data);
  }

  async findAll(query: {
    limit?: number;
    page?: number;
  }): Promise<
    ResData<{
      items: Contact[];
      meta: {
        totalItems: number;
        currentPage: number;
        totalPages: number;
        perPage: number;
      };
    }>
  > {
    const { limit, page } = query;

    const take = limit ? Number(limit) : undefined;
    const skipPage = page ? Number(page) : 1;

    const { data, total } = await this.contactRepository.findAll(
      take,
      skipPage,
    );

    const totalPage = take ? Math.ceil(total / take) : 1;

    return new ResData<any>('ok', 200, {
      items: data,
      meta: {
        totalItems: total,
        currentPage: skipPage,
        totalPages: totalPage,
        perPage: take ?? total,
      },
    });
  }

  async findOneById(id: string): Promise<ResData<Contact>> {
    const foundData = await this.contactRepository.findById(id);
    if (!foundData) {
      throw new ContactNotFoundExeption();
    }

    return new ResData<Contact>('ok', 200, foundData);
  }

  async update(id: string, dto: UpdateContactDto): Promise<ResData<Contact>> {
    const foundData = await this.contactRepository.findById(id);
    if (!foundData) {
      throw new ContactNotFoundExeption();
    }
    Object.assign(foundData, dto);
    const data = await this.contactRepository.update(foundData);
    return new ResData<Contact>('Contact updated successfully', 200, data);
  }

  async delete(id: string): Promise<ResData<Contact>> {
    const foundData = await this.contactRepository.findById(id);
    if (!foundData) {
      throw new ContactNotFoundExeption();
    }
    await this.contactRepository.delete(foundData);
    return new ResData<Contact>('Contact deleted successfully', 200, foundData);
  }
}
