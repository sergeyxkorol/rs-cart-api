import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../../shared/enums/status';
import { CartItems } from './cartItem.entity';
import { User } from './user.entity';

@Entity({ name: 'carts' })
export class Carts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => User,
    user => user.id,
  )
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  userId: string;

  @Column({ type: 'date', nullable: false })
  createdAt: string;

  @Column({ type: 'date', nullable: false })
  updatedAt: string;

  @Column({ type: 'enum', nullable: false, enum: Status })
  status: Status;

  @OneToMany(
    () => CartItems,
    cartItem => cartItem.cartId,
  )
  items: CartItems[];
}
