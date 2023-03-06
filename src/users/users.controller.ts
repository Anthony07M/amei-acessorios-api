import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() data): Promise<any> {
    const user = await this.usersService.create(data);
    return user;
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    const result = await this.usersService.delte(id);
    console.log('result ', result);
    return;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
