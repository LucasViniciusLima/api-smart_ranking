import { Module } from '@nestjs/common';
import { DesafioService } from './desafio.service';
import { DesafioController } from './desafio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { JogadorModule } from 'src/jogador/jogador.module';
import { CategoriaModule } from 'src/categoria/categoria.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema }]),
    JogadorModule,
    CategoriaModule
  ],
  providers: [DesafioService],
  controllers: [DesafioController]
})
export class DesafioModule { }
