import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import { Investment } from "../../investment/entities/investment.entity";

@Entity('category')
export class Category extends BaseEntity {
  @Column({ type: 'varchar', name: 'title', unique: true })
  title: string;

  @OneToMany(() => Investment, (investment) => investment.category)
  investments: Investment[];
}
