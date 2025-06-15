import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { IBlogService } from './interfaces/blog.service';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from '../../common/decorator/auth.decorator';

@Controller('blog')
export class BlogController {
  constructor(
    @Inject('IBlogService') private readonly blogService: IBlogService,
  ) {}

  @Auth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 1 * 1024 * 1024 } }),
  )
  @Post()
  create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogService.create(createBlogDto, file);
  }

  @ApiQuery({ name: 'title', required: false, description: 'Search by title' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    return this.blogService.findAll({ title, limit, page });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOneById(id);
  }

  @Auth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 1 * 1024 * 1024 } }),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogService.update(id, updateBlogDto, file);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
