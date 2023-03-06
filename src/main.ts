import { NestFactory } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    MulterModule.register({
      dest: './upload',
    }),
  ),
    await app.listen(3000);
}
bootstrap();
