import { Category } from "../entities/category.entity";

export interface ICategoryRepository {
  create(dto: Category): Promise<Category>;
  findAll(
      title?: string,
      limit?: number,
      page?: number,
    ): Promise<{ data: Category[]; total: number }>;
  update(entity: Category): Promise<Category>;
  delete(entity: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  findByTitle(title: string): Promise<Category | null>;
}
