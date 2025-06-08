import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IBlogRepository } from './interfaces/blog.repository';
import { FileService } from '../file/file.service';
import { IBlogService } from './interfaces/blog.service';
import { ResData } from '../../common/lib/resData';
import { Blog } from './entities/blog.entity';
import { BlogNotFoundExeption, FileIsMissinExeption } from './exeptions/blog.exeption';
import * as path from 'node:path';

@Injectable()
export class BlogService implements IBlogService {
  constructor(
    @Inject('IBlogRepository')
    private readonly blogRepository: IBlogRepository,
    private readonly fileService: FileService,
  ) {}

  async create(
    dto: CreateBlogDto,
    file: Express.Multer.File,
  ): Promise<ResData<Blog>> {
    if (file) {
      const fileName = await this.fileService.saveFile(file);
      dto.image = `${process.env.BASE_URL}files/${fileName}`;
    } else {
      throw new FileIsMissinExeption();
    }
    const fileName = await this.fileService.saveFile(file);
    dto.image = `${process.env.BASE_URL}files/${fileName}`;
    const newBlog = new Blog();
    Object.assign(newBlog, dto);
    const data = await this.blogRepository.create(newBlog);

    return new ResData<Blog>('Blog created successfully', 201, data);
  }

  async findAll(query: {
    title?: string;
    limit?: number;
    page?: number;
  }): Promise<ResData<any>> {
    const { title, limit, page } = query;

    const take = limit ? Number(limit) : undefined;
    const skipPage = page ? Number(page) : 1;

    const { data, total } = await this.blogRepository.findAll(
      title,
      take,
      skipPage,
    );

    const totalPages = take ? Math.ceil(total / take) : 1;

    return new ResData<any>('ok', 200, {
      items: data,
      meta: {
        totalItems: total,
        currentPage: skipPage,
        totalPages,
        perPage: take ?? total,
      },
    });
  }

  async findOneById(id: string): Promise<ResData<Blog>> {
    const foundData = await this.blogRepository.findById(id);
    if (!foundData) {
      throw new BlogNotFoundExeption();
    }

    return new ResData<Blog>('ok', 200, foundData);
  }

  async update(
    id: string,
    dto: UpdateBlogDto,
    file: Express.Multer.File,
  ): Promise<ResData<Blog>> {
    const foundData = await this.blogRepository.findById(id);
    if (!foundData) {
      throw new BlogNotFoundExeption();
    }
    if (file) {
      const fileName = path.basename(foundData.image);
      await this.fileService.deleteFile(fileName);
      const newFileName = await this.fileService.saveFile(file);
      dto.image = `${process.env.BASE_URL}files/${newFileName}`;
    }
    Object.assign(foundData, dto);
    const data = await this.blogRepository.update(foundData);

    return new ResData<Blog>('ok', 200, data);
  }

  async delete(id: string): Promise<ResData<Blog>> {
    const foundData = await this.blogRepository.findById(id);
    if (!foundData) {
      throw new BlogNotFoundExeption();
    }

    const fileName = path.basename(foundData.image);
    await this.fileService.deleteFile(fileName);
    await this.blogRepository.delete(foundData);
    return new ResData<Blog>('Blog deleted successfully', 200, foundData);
  }
}
