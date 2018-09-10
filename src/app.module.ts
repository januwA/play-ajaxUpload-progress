import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store'

import { MongooseModule } from '@nestjs/mongoose'
import { CatSchema } from './schemas/cat.schema'

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
     MongooseModule.forRoot('mongodb://localhost/ajanuw', { useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: 'cats', schema: CatSchema }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
