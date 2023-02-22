import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<any> {
    return await this.prismaService.user.findMany();
  }

  async finPerEmail(email: string): Promise<any> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async create(data: any) {
    const password = await bcrypt.hash(data.password, 10);
    const user = await this.prismaService.user.create({
      data: { ...data, password },
    });
    return user;
  }

  async delte(id): Promise<any> {
    const result = await this.prismaService.user.delete({ where: { id } });
    return result;
  }
}
