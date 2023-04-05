import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4, validate } from 'uuid';
import { Carts as CartEntity } from '../../database/entities/cart.entity';
import { CartItems as CartItemEntity } from '../../database/entities/cartItem.entity';
import { Status } from '../../shared/enums/status';
import { getCurrentDate } from '../../utils/date';
import { Cart, CartItem } from '../models';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });

    if (!cart) {
      return null;
    }

    const cartItems: CartItem[] = cart?.items?.map((item, idx) => {
      const cartItem: CartItem = {
        product: {
          id: item.productId,
          title: `test item ${idx}`,
          description: `test item's description ${idx}`,
          price: 10 + idx,
        },
        count: item.count,
      };

      return cartItem;
    });

    return {
      id: cart?.id,
      items: cartItems || [],
    };
  }

  async createByUserId(userId: string): Promise<Cart> {
    const currentDate = getCurrentDate();

    const userCart = await this.cartRepository.insert({
      userId,
      status: Status.OPEN,
      createdAt: currentDate,
      updatedAt: currentDate,
    });

    return { id: userCart.raw[0].id, items: [] };
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    const cartId = validate(id) ? id : v4();
    const updatedItems = items.map((item: CartItem) => ({
      cartId,
      productId: item.product.id,
      count: item.count,
    }));
    const cartItems = this.cartItemRepository.create(updatedItems);

    await this.cartItemRepository.save(cartItems);

    return { ...updatedCart };
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.update(
      { id: userId },
      { status: Status.ORDERED },
    );
  }
}
