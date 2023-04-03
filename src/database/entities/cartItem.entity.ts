import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Carts } from './cart.entity';

@Entity()
export class CartItems {
  @PrimaryColumn({ type: 'uuid', nullable: false })
  productId: string;

  @ManyToOne(
    () => Carts,
    cart => cart.id,
  )
  @Column({ type: 'uuid', nullable: false })
  cartId: Carts;

  @Column({ type: 'int', nullable: false })
  count: number;
}
