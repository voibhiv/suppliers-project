import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';

@Entity()
export class CompanyUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Company, (company) => company.companyUser)
  @JoinColumn()
  company: Company;

  @ManyToOne(() => User, (user) => user.companyUser)
  @JoinColumn()
  user: User;
}
