import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";

@Entity('investments')
export class Investment extends BaseEntity {
  @Column({ type: 'varchar', name: 'title', unique: true })
  title: string;

  @Column({ type: 'varchar', name: 'description' })
  description: string;

  @Column({ type: 'varchar', array: true, name: 'images' })
  images: string[];

  @Column({type: "varchar", name: "category", nullable:true})
  category: string;

  @Column({type:"decimal", name: "annual_ncome"})
  annualIncome:number

  @Column({type:"decimal", name: "investment_duration"})
  investmentDuration:number

  @Column({type:"decimal", name: "min_amount"})
  minAmount:number

  @Column({type:"decimal", name: "longitut", nullable:true})
  longitut:number

  @Column({type:"decimal", name: "latitude", nullable:true})
  latitude:number
}
