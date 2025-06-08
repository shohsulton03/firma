import { ResData } from "../../../common/lib/resData";
import { CreateInvestmentDto } from "../dto/create-investment.dto";
import { UpdateInvestmentDto } from "../dto/update-investment.dto";
import { Investment } from "../entities/investment.entity";

export interface IInvestmentService {
  create(
    dto: CreateInvestmentDto,
    files: Express.Multer.File[],
  ): Promise<ResData<Investment>>;
  findAll(): Promise<ResData<Array<Investment>>>;
  findOneById(id: string): Promise<ResData<Investment>>;
  update(
    id: string,
    dto: UpdateInvestmentDto,
    files: Express.Multer.File[],
  ): Promise<ResData<Investment>>;
  delete(id: string): Promise<ResData<Investment>>;
}