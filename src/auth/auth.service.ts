import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    }

    
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role, 
    };

   return {
  access_token: this.jwtService.sign(payload),
  user: {
    id: user.id,
    email: user.email,
    role: user.role,
  },
};

  }
}
