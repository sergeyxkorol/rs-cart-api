import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';

type Status = 'OPEN' | 'ORDERED';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  productId: string;

  @ManyToOne(
    () => Cart,
    cart => cart.id,
  )
  @Column({ type: 'uuid', nullable: false })
  cartId: Cart;

  @Column({ type: 'int', nullable: false })
  count: number;
}
