import { Column, Entity, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

type Status = 'OPEN' | 'ORDERED';

@Entity()
export class CartItem {
  @Column({ type: 'uuid', nullable: false })
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
