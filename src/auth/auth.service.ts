import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.finPerEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = (await bcrypt.compare(pass, user.password)) as boolean;
    if (!isMatch) {
      return null;
    }
    const { password, ...rest } = user;
    return rest;
  }

  async login(user: any): Promise<any> {
    const payload = { id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
