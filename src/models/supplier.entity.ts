import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity } from "typeorm";

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
  cpf: string;

  @Column({
    type: "varchar",
    default: null
  })
  cnpj: string;

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

}