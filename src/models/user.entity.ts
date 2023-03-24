import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CompanyUser } from "./company-users.entity";
import { SupplierUser } from "./supplier-user.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
  
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

  @OneToMany(() => SupplierUser, (supplierUser) => supplierUser.user)
  supplierUser: SupplierUser[];
}