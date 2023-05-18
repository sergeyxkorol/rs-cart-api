import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';

import { Order } from '../database/entities/order.entity';
import { OrderService } from './services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
