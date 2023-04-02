import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type Status = 'OPEN' | 'ORDERED';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  createdAt: string;

  @Column({ type: 'date', nullable: false })
  updatedAt: string;

  @Column({ type: 'enum', nullable: false, enum: ['OPEN', 'ORDERED'] })
  status: Status;
}
