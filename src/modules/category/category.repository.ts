import { InjectRepository } from '@nestjs/typeorm';
import { ICategoryRepository } from './interfaces/category.repository';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: Category): Promise<Category> {
      return await this.categoryRepository.save(dto)
  }

  async findAll(
      title?: string,
      limit?: number,
      page?: number,
    ): Promise<{ data: Category[]; total: number }> {
      const query = this.categoryRepository.createQueryBuilder('category');
  
      if (title) {
        query.where('category.title ILIKE :title', { title: `%${title}%` });
      }
  
      if (limit) {
        query.take(limit);
      }
  
      if (page && limit) {
        query.skip((page - 1) * limit);
      }
  
      const [data, total] = await query.getManyAndCount();
      return { data, total };
    }

  async findById(id: string): Promise<Category | null> {
      return await this.categoryRepository.findOneBy({id})
  }

  async findByTitle(title: string): Promise<Category | null> {
    return await this.categoryRepository.findOneBy({title})
  }

  async update(entity: Category): Promise<Category> {
    return await this.categoryRepository.save(entity)
  }

  async delete(entity: Category): Promise<Category> {
      return await this.categoryRepository.remove(entity)
  }
}
