import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  join
} from 'path'
import {
  renderFile
} from 'ejs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * * 上传图片之后的静态目录
   */
   app.useStaticAssets(join(__dirname, '..', 'upload'), {
    prefix: '/images/'
  })

  app.setBaseViewsDir(join(__dirname, '..', 'views')) // 放视图的文件
  app.engine('html', renderFile);
  app.set('view engine', 'html');
  await app.listen(5000);
}
bootstrap();
