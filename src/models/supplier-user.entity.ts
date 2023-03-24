import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Supplier } from "./supplier.entity";
import { User } from "./user.entity";


@Entity()
export class SupplierUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: true
  })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn() 
  updatedAt: Date;

  @DeleteDateColumn() 
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.supplierUser)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Supplier, (supplier) => supplier.supplierUser)
  @JoinColumn()
  supplier: Supplier;
}