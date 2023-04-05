import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(userName: string): Promise<User> {
    return await this.userRepository.findOne({ where: { name: userName } });
  }

  async createOne({ name, password, email = '' }: User): Promise<User> {
    const user = { name, password, email };
    const newUser = this.userRepository.create(user);

    return await this.userRepository.save(newUser);
  }
}
