import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { IInvestmentService } from './interfaces/investment.service';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from '../../common/decorator/auth.decorator';

@Controller('investment')
export class InvestmentController {
  constructor(
    @Inject('IInvestmentService')
    private readonly investmentService: IInvestmentService,
  ) {}

  @Auth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  @Post()
  create(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.investmentService.create(createInvestmentDto, files);
  }

  @ApiQuery({ name: 'title', required: false, description: 'Search by title' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Search by categoryId' })
  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.investmentService.findAll({ title, limit, page, categoryId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investmentService.findOneById(id);
  }

  @Auth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.investmentService.update(id, updateInvestmentDto, files);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentService.delete(id);
  }
}
