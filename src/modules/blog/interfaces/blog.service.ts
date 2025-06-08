import { ResData } from '../../../common/lib/resData';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { UpdateBlogDto } from '../dto/update-blog.dto';
import { Blog } from '../entities/blog.entity';

export interface IBlogService {
  create(dto: CreateBlogDto, file: Express.Multer.File): Promise<ResData<Blog>>;

  findAll(query: { title?: string; limit?: number; page?: number }): Promise<
    ResData<{
      items: Blog[];
      meta: {
        totalItems: number;
        currentPage: number;
        totalPages: number;
        perPage: number;
      };
    }>
  >;

  findOneById(id: string): Promise<ResData<Blog>>;

  update(
    id: string,
    dto: UpdateBlogDto,
    file: Express.Multer.File,
  ): Promise<ResData<Blog>>;

  delete(id: string): Promise<ResData<Blog>>;
}
