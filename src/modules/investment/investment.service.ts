import { Inject, Injectable } from '@nestjs/common';
import { CreateInvestmentDto } from './dto/create-investment.dto';
import { UpdateInvestmentDto } from './dto/update-investment.dto';
import { IInvestmentService } from './interfaces/investment.service';
import { FileService } from '../file/file.service';
import { IInvestmentRepository } from './interfaces/investment.repository';
import { ICategoryRepository } from '../category/interfaces/category.repository';
import { ResData } from '../../common/lib/resData';
import { Investment } from './entities/investment.entity';
import * as path from 'node:path';
import {
  FileIsMissinExeption,
  InvestmentAlreadyExistsExeption,
  InvestmentNotFoundExeption,
} from './exeptions/investment.exeption';
import { CategoryNotFoundException } from '../category/exeptions/category.exeption';

@Injectable()
export class InvestmentService implements IInvestmentService {
  constructor(
    @Inject('IInvestmentRepository')
    private readonly investmentRepository: IInvestmentRepository,
    private readonly fileService: FileService,
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async create(
    dto: CreateInvestmentDto,
    files: Express.Multer.File[],
  ): Promise<ResData<Investment>> {
    if (!files || files.length === 0) {
      throw new FileIsMissinExeption();
    }
    const foundData = await this.investmentRepository.findByTitle(dto.title);
    if (foundData) {
      throw new InvestmentAlreadyExistsExeption();
    }
    const category = await this.categoryRepository.findById(dto.categoryId);
    if (!category) {
      throw new CategoryNotFoundException();
    }
    const images = await Promise.all(
      files.map(async (file) => {
        const fileName = await this.fileService.saveFile(file);
        return `${process.env.BASE_URL}files/${fileName}`;
      }),
    );

    const newInvestment = new Investment();
    Object.assign(newInvestment, dto);
    newInvestment.images = images;
    newInvestment.category = category;
    const data = await this.investmentRepository.create(newInvestment);
    return new ResData<Investment>(
      'Investment created successfully',
      201,
      data,
    );
  }

  async findAll(): Promise<ResData<Array<Investment>>> {
    const data = await this.investmentRepository.findAll();
    return new ResData<Array<Investment>>('ok', 200, data);
  }

  async findOneById(id: string): Promise<ResData<Investment>> {
    const foundData = await this.investmentRepository.findById(id);
    if (!foundData) {
      throw new InvestmentNotFoundExeption();
    }
    return new ResData<Investment>('ok', 200, foundData);
  }

  async update(id: string, dto: UpdateInvestmentDto, files: Express.Multer.File[]): Promise<ResData<Investment>> {
    const foundData = await this.investmentRepository.findById(id);
    if (!foundData) {
      throw new InvestmentNotFoundExeption();
    }
    if (dto.categoryId) {
      const checkCategory = await this.categoryRepository.findById(dto.categoryId)
      if (!checkCategory) {
        throw new CategoryNotFoundException();
      }
      foundData.category = checkCategory
    }
    if (files) {
      foundData.images.forEach(async (image) => {
        const fileName = path.basename(image)
        this.fileService.deleteFile(fileName)
      })
      const images = await Promise.all(
        files.map(async (file) => {
          const filename = await this.fileService.saveFile(file)
          return `${process.env.BASE_URL}files/${filename}`;
        })
      )
      foundData.images = images
    }
    Object.assign(foundData, dto)
    const data = await this.investmentRepository.update(foundData)
    return new ResData<Investment>('Investment updated successfully', 200, data);
  }

  async delete(id: string): Promise<ResData<Investment>> {
    const foundData = await this.investmentRepository.findById(id);
    if (!foundData) {
      throw new InvestmentNotFoundExeption();
    }
    foundData.images.forEach(async (image) => {
      const fileName = path.basename(image)
      await this.fileService.deleteFile(fileName)
    })
    await this.investmentRepository.delete(foundData)
    return new ResData<Investment>('Investment deleted successfully', 200, foundData);
  }
}
