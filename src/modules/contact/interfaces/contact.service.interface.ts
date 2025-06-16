import { ResData } from '../../../common/lib/resData';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { Contact } from '../entities/contact.entity';

export interface IContactService {
  create(dto: CreateContactDto): Promise<ResData<Contact>>;

  findAll(query: { limit?: number; page?: number }): Promise<
    ResData<{
      items: Contact[];
      meta: {
        totalItems: number;
        currentPage: number;
        totalPages: number;
        perPage: number;
      };
    }>
  >;

  findOneById(id: string): Promise<ResData<Contact>>;

  update(
    id: string,
    dto: UpdateContactDto
  ): Promise<ResData<Contact>>;

  delete(id: string): Promise<ResData<Contact>>;
}
