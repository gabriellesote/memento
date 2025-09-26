import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Tipo do banco de dados
      database: 'database.sqlite', // Nome do arquivo do banco
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Onde encontrar as entidades
      synchronize: true, // Apenas para desenvolvimento! Cria as tabelas automaticamente
    }),
    NotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
