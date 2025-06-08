import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategoryService } from './interfaces/category.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../common/decorator/auth.decorator';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}

  @Auth()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
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
    return this.categoryService.findAll({ title, limit, page });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOneById(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
