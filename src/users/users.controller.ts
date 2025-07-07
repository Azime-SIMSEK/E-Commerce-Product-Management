import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('create-admin')
  async createAdmin() {
    return this.usersService.createAdminUser();
  }

  @Get('create-test-user')  
  async createTestUser() {
    return this.usersService.createTestUser();
  }
}
