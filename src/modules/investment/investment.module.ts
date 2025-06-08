import { Module } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentController } from './investment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from './entities/investment.entity';
import { FileModule } from '../file/file.module';
import { CategoryModule } from '../category/category.module';
import { InvestmentRepository } from './investment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Investment]), FileModule, CategoryModule],
  controllers: [InvestmentController],
  providers: [
    { provide: 'IInvestmentService', useClass: InvestmentService },
    { provide: 'IInvestmentRepository', useClass: InvestmentRepository },
  ],
  exports: [
    { provide: 'IInvestmentService', useClass: InvestmentService },
    { provide: 'IInvestmentRepository', useClass: InvestmentRepository },
  ],
})
export class InvestmentModule {}
