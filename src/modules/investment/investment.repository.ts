import { InjectRepository } from "@nestjs/typeorm";
import { Investment } from "./entities/investment.entity";
import { Repository } from "typeorm";
import { IInvestmentRepository } from "./interfaces/investment.repository";

export class InvestmentRepository implements IInvestmentRepository {
  constructor(
    @InjectRepository(Investment)
    private investmentRepository: Repository<Investment>,
  ) {}

  async create(dto: Investment): Promise<Investment> {
    const data = await this.investmentRepository.save(dto);
    return data;
  }

  async findAll(
    title?: string,
    limit?: number,
    page?: number,
  ): Promise<{ data: Investment[]; total: number }> {
    const query = this.investmentRepository
      .createQueryBuilder('investment')

    if (title) {
      query.andWhere('investment.title ILIKE :title', { title: `%${title}%` });
    }

    query.orderBy('investment.createdAt', 'DESC');

    if (limit) {
      query.take(limit);
    }

    if (page && limit) {
      query.skip((page - 1) * limit);
    }

    const [data, total] = await query.getManyAndCount();
    return { data, total };
  }

  async findById(id: string): Promise<Investment | null> {
    return await this.investmentRepository.findOneBy({ id });
  }

  async findByTitle(title: string): Promise<Investment | null> {
    return await this.investmentRepository.findOneBy({ title });
  }

  async update(entity: Investment): Promise<Investment> {
    return await this.investmentRepository.save(entity);
  }

  async delete(entity: Investment): Promise<Investment> {
    return await this.investmentRepository.remove(entity);
  }
}