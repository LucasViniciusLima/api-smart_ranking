import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/categoria.schema';
import { JogadorModule } from 'src/jogador/jogador.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    JogadorModule
  ],
  exports: [CategoriaService],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule { }
