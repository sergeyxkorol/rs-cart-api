import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Carts } from './entities/cart.entity';
import { CartItems } from './entities/cartItem.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: ['dist/database/entities/*.entity{.ts,.js}'],
        /**
         * Flag to show all generated sql queries on each interaction with DB.
         * Should be omitted for production production.
         */
        logging: true,
        synchronize: true,
        /**
         * This naming strategy will map field_name from database to fieldName inside application.
         */
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),
    TypeOrmModule.forFeature([Carts, CartItems]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
