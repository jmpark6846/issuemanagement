import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.username = createUserDto.username;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userInfo } = await this.userRepository.save(user);
    return userInfo;
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUser(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(
      { email },
      {
        ...updateUserDto,
        password: bcrypt.hashSync(updateUserDto.password, 10),
      },
    );
  }

  async deleteUser(email: string) {
    await this.userRepository.delete({ email });
  }
}
