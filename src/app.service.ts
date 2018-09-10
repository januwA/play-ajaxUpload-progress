import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Cat } from './interfaces/cat.interface'

@Injectable()
export class AppService {
  constructor(
    @InjectModel('cats') private readonly catModel: Model<Cat>
  ){}

  findAll(): Promise<any>{
    return this.catModel.find().exec()
  }
}
