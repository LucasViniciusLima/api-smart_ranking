import { Module } from '@nestjs/common';
import { DesafioService } from './desafio.service';
import { DesafioController } from './desafio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafio.schema';
import { JogadorModule } from 'src/jogador/jogador.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { PartidaSchema } from './interfaces/partida.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Desafio', schema: DesafioSchema },
      { name: 'Partida', schema: PartidaSchema}
    ]),
    JogadorModule,
    CategoriaModule
  ],
  providers: [DesafioService],
  controllers: [DesafioController]
})
export class DesafioModule { }
