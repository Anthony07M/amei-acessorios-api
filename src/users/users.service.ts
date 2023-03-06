import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService, S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private readonly s3: S3,
    private readonly configService: ConfigService,
  ) {}

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

  async uploadImage(
    createImageDto: any,
    file: Express.Multer.File,
  ): Promise<string> {
    const { bucket, acl, contentType } = createImageDto;
    const extension = extname(file.originalname);
    const filename = `${uuidv4()}${extension}`;
    const key = `${bucket}/${filename}`;
    const params = {
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ACL: acl,
      ContentType: contentType,
    };
    const result = await this.s3.upload(params).promise();
    return result.Location;
  }
}
