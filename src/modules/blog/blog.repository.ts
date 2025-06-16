import { InjectRepository } from "@nestjs/typeorm";
import { IBlogRepository } from "./interfaces/blog.repository";
import { Blog } from "./entities/blog.entity";
import { Repository } from "typeorm";

export class BlogRepository implements IBlogRepository {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async create(dto: Blog): Promise<Blog> {
    const newBlog = this.blogRepository.create(dto);
    return await this.blogRepository.save(newBlog);
  }

  async findAll(
    title?: string,
    limit?: number,
    page?: number,
  ): Promise<{ data: Blog[]; total: number }> {
    const query = this.blogRepository.createQueryBuilder('blog');

    if (title) {
      query.where('blog.title ILIKE :title', { title: `%${title}%` });
    }

    query.orderBy('blog.createdAt', 'DESC');

    if (limit) {
      query.take(limit);
    }

    if (page && limit) {
      query.skip((page - 1) * limit);
    }

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async findById(id: string): Promise<Blog | null> {
    return await this.blogRepository.findOne({ where: { id } });
  }

  async update(entity: Blog): Promise<Blog> {
    return await this.blogRepository.save(entity);
  }

  async delete(entity: Blog): Promise<Blog> {
    return await this.blogRepository.remove(entity);
  }
}