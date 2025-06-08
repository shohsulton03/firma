import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { FileModule } from '../file/file.module';
import { BlogRepository } from './blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), FileModule],
  controllers: [BlogController],
  providers: [
    { provide: 'IBlogRepository', useClass: BlogRepository },
    { provide: 'IBlogService', useClass: BlogService },
  ],
})
export class BlogModule {}
