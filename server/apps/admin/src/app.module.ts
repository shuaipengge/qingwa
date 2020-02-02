import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { ossconfig } from './app.keys'

const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    MulterModule.register({
      storage: MAO({
        config: ossconfig
      })
      // dest: 'uploads' 
    }), // 文件上传
    DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
