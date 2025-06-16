import { Contact } from "../entities/contact.entity";

export interface IContactRepository {
  create(dto: Contact): Promise<Contact>;

  findAll(
    limit?: number,
    page?: number,
  ): Promise<{ data: Contact[]; total: number }>;

  update(entity: Contact): Promise<Contact>;

  delete(entity: Contact): Promise<Contact>;

  findById(id: string): Promise<Contact | null>;
}