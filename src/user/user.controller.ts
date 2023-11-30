import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get('/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Delete()
  async deleteUser(@Body() body) {
    return await this.userService.deleteUser(body.email);
  }

  @Put('/:email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.getUser(email);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.userService.updateUser(email, updateUserDto);
  }
}
