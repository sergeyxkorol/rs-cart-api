import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Carts } from './cart.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @OneToMany(
    () => Order,
    order => order.userId,
  )
  orders: Order[];

  @OneToMany(
    () => Carts,
    cart => cart.userId,
  )
  carts: Carts[];
}
