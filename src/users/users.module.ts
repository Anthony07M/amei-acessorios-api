import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService, S3 } from 'aws-sdk';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [
    {
      provide: S3,
      useFactory: (configService: ConfigService) => {
        const s3 = new S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION,
        });
        return s3;
      },
      inject: [ConfigService],
    },
    UsersService,
  ],
  exports: [UsersService, S3],
})
export class UsersModule {}
