import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  name: string;

  @Column({
    type: "varchar",
    default: null
  })
  cpf?: string;

  @Column({
    type: "varchar",
    default: null
  })
  cnpj?: string;

  @Column()
  contact: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn() 
  updatedAt: Date;

  @DeleteDateColumn() 
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.companyUser)
  @JoinColumn()
  user: User;

}