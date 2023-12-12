import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
