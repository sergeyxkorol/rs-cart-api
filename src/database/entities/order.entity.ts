import { Status } from '../../shared/enums/status';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carts } from './cart.entity';
import { User } from './user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: string;

  @ManyToOne(
    () => Carts,
    cart => cart.id,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cartId: string;

  @Column({ type: 'json', nullable: false })
  payment: string;

  @Column({ type: 'json', nullable: false })
  delivery: string;

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'enum', nullable: false, enum: Status })
  status: Status;

  @Column({ type: 'int', nullable: false })
  total: number;
}
