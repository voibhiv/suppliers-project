import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyUser } from './company-users.entity';
import { Supplier } from './supplier.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column()
  email: string;

  @Column()
  cpf?: string;

  @Column()
  cnpj?: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CompanyUser, (companyUser) => companyUser.user)
  companyUser: CompanyUser[];

  @OneToMany(() => Supplier, (supplier) => supplier.user)
  supplier: Supplier[];
}
