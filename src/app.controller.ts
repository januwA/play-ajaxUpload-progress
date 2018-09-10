import {
  Get,
  Controller,
  UseInterceptors,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Post,
  FilesInterceptor,
  UploadedFiles,
  Body,
  Render,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import {
  AppService
} from './app.service';
import {
  CatEntity
} from './class/catEntity.class'
import {
  Exclude,
  plainToClass
} from 'class-transformer';
import {
  createWriteStream,
  createReadStream,
  readFile
} from 'fs'
import {
  join
} from 'path'

const l = console.log
@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @UseInterceptors(ClassSerializerIntrceptor)
  @Get()
  findAll() {
    let cats = this.appService.findAll()
    return cats
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadfile(@UploadedFiles() files, @Body() body) {

    if (!files || files.length === 0) {
      throw new HttpException('参数错误', HttpStatus.FORBIDDEN)
    }

    let imagesSrc = []
    for (const file of files) {
      l(file.originalname)
      const imgName = `${Date.now()}-${file.originalname}`
      const writeImage = createWriteStream(join(__dirname, '..', 'upload', imgName))
      writeImage.write(file.buffer)
      imagesSrc.push( `http://localhost:5000/images/${imgName}` )
    }
    return {
      imgsSrc: imagesSrc
    }
  }

  @Get('upload-page')
  @Render('upload_page')
  uploadPage() { }

  @Get('get-page')
  @Render('get_page')
  getPage() { }
}