import { Investment } from '../entities/investment.entity';

export interface IInvestmentRepository {
  create(dto: Investment): Promise<Investment>;
  findAll(): Promise<Array<Investment>>;
  update(entity: Investment): Promise<Investment>;
  delete(entity: Investment): Promise<Investment>;
  findById(id: string): Promise<Investment | null>;
  findByTitle(title: string): Promise<Investment | null>;
}
