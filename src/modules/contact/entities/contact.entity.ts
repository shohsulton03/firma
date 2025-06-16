import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column({ type: 'text', name: 'address', nullable: true })
  address: string;

  @Column({ type: 'varchar', name: 'telegram_link', nullable: true })
  telegramLink: string;

  @Column({ type: 'varchar', name: 'instagram_link', nullable: true })
  instagramLink: string;

  @Column({ type: 'varchar', name: 'facebook_link', nullable: true })
  facebookLink: string;

  @Column({ type: 'varchar', name: 'twitter_link', nullable: true })
  twitterLink: string;

  @Column({ type: 'varchar', name: 'linkedin_link', nullable: true })
  linkedinLink: string;

  @Column({ type: 'varchar', name: 'phone_in_jpn', nullable: true })
  phoneInJpn: string;

  @Column({ type: 'varchar', name: 'phone_in_uzb', nullable: true })
  phoneInUzb: string;

  @Column({ type: 'text', name: 'email', nullable: true })
  email: string;
}
