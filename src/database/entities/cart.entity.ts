import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../../shared/enums/status';
import { CartItem } from './cartItem.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'date', nullable: false })
  createdAt: string;

  @Column({ type: 'date', nullable: false })
  updatedAt: string;

  @Column({ type: 'enum', nullable: false, enum: Status })
  status: Status;

  @OneToMany(
    () => CartItem,
    cartItem => cartItem.cartId,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'cartId' })
  items: CartItem[];
}
