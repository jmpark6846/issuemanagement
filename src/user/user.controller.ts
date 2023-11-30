import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
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
    const user = await this.userService.getUser(createUserDto.email);

    if (user) {
      throw new BadRequestException('account with email exists');
    }

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
