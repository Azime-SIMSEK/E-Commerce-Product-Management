import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createAdminUser(): Promise<string> {
    const adminEmail = 'admin@example.com';
    const adminExists = await this.userRepository.findOne({ where: { email: adminEmail } });
    if (adminExists) return 'Admin already exists';

    const adminUser = this.userRepository.create({
      email: adminEmail,
      password: 'admin123',  // Bu şifre hash'lenir (users.entity.ts içinde @BeforeInsert sayesinde)
      role: 'admin',
    });

    await this.userRepository.save(adminUser);
    return 'Admin created!';
  }

 async createTestUser(): Promise<string> {
  const email = 'test@123.com';
  const userExists = await this.userRepository.findOne({ where: { email } });
  if (userExists) return 'User already exists';

  const user = this.userRepository.create({
    email,
    password: '456789', 
    role: 'user',
  });
 
  await this.userRepository.save(user);
  return 'Test user created!';
}

}
