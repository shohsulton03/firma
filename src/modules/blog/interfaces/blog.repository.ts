import { Blog } from '../entities/blog.entity';

export interface IBlogRepository {
  create(dto: Blog): Promise<Blog>;

  findAll(
    title?: string,
    limit?: number,
    page?: number,
  ): Promise<{ data: Blog[]; total: number }>;

  update(entity: Blog): Promise<Blog>;

  delete(entity: Blog): Promise<Blog>;

  findById(id: string): Promise<Blog | null>;
}
