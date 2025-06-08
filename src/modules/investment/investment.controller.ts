import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { IInvestmentService } from './interfaces/investment.service';
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('investment')
export class InvestmentController {
  constructor(
    @Inject('IInvestmentService')
    private readonly investmentService: IInvestmentService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  @Post()
  create(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.investmentService.create(createInvestmentDto, files);
  }

  @Get()
  findAll() {
    return this.investmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investmentService.findOneById(id);
  }

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentService.delete(id);
  }
}
