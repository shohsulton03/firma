import { InjectRepository } from "@nestjs/typeorm";
import { Investment } from "./entities/investment.entity";
import { Repository } from "typeorm";
import { IInvestmentRepository } from "./interfaces/investment.repository";

export class InvestmentRepository implements IInvestmentRepository {
    constructor(
        @InjectRepository(Investment) private investmentRepository: Repository<Investment>,
    ){}

    async create(dto: Investment): Promise<Investment> {
        const data = await this.investmentRepository.save(dto);
        return data;
    }

    async findAll(): Promise<Array<Investment>> {
        return await this.investmentRepository.find()
    }

    async findById(id: string): Promise<Investment | null> {
        return await this.investmentRepository.findOneBy({id})
    }

    async findByTitle(title: string): Promise<Investment | null> {
        return await this.investmentRepository.findOneBy({title})
    }

    async update(entity: Investment): Promise<Investment> {
        return await this.investmentRepository.save(entity)
    }

    async delete(entity: Investment): Promise<Investment> {
        return await this.investmentRepository.remove(entity)
    }
}