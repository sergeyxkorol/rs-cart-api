import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Order as OrderEntity } from '../../database/entities/order.entity';
import { Order } from '../models';
import { Status } from 'src/shared/enums/status';

@Injectable()
export class OrderService {
  private orders: Record<string, Order> = {};

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async findById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items'],
    });

    return {
      ...order,
      payment: {
        type: '',
        address: '',
        creditCard: '',
      },
      delivery: {
        type: '',
        address: '',
      },
      items: [],
    };
  }

  async create(data: any) {
    const id = v4(v4());
    const order = {
      ...data,
      id,
      status: Status.IN_PROGRESS,
    } as OrderEntity;

    await this.orderRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        await entityManager.insert(OrderEntity, order);
      },
    );

    return order;
  }

  async update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    await this.orderRepository.update({ id: orderId }, data);
  }
}
