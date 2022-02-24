import { Module } from '@nestjs/common';
import { DesafioService } from './desafio.service';
import { DesafioController } from './desafio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema }])],
  providers: [DesafioService],
  controllers: [DesafioController]
})
export class DesafioModule { }
