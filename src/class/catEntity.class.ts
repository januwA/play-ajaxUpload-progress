import { Exclude, plainToClass } from 'class-transformer';

export class CatEntity {
  @Exclude()
  _id: string;
  name: string;
}