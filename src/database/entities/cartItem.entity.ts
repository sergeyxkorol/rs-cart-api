import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Carts } from './cart.entity';

@Entity()
export class CartItems {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  productId: string;

  @ManyToOne(
    () => Carts,
    cart => cart.items,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cartId: Carts;

  @Column({ type: 'int', nullable: false })
  count: number;
}
