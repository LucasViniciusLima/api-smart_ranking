import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorModule } from './jogador/jogador.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://1uc45:rk7DOLnzbtb8i8FW@cluster0.d8tqs.mongodb.net/smartranking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }),
    JogadorModule,
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
