import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { BaseEntity } from "../../../common/entities/base.entity";

@Entity('investments')
export class Investment extends BaseEntity {
  @Column({ type: 'varchar', name: 'title', unique: true })
  title: string;

  @Column({ type: 'varchar', name: 'description' })
  description: string;

  @Column({ type: 'varchar', array: true, name: 'images' })
  images: string[];

  @ManyToOne(() => Category, (category) => category.investments)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({type:"decimal", name: "annual_ncome"})
  annualIncome:number

  @Column({type:"decimal", name: "investment_duration"})
  investmentDuration:number

  @Column({type:"decimal", name: "min_amount"})
  minAmount:number
}
