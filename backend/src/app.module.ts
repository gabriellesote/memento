// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 1. Importar
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import databaseConfig from './config/database.config'; // 2. Importar nossa config

@Module({
  imports: [
    // 3. Carregar o módulo de configuração
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente
      load: [databaseConfig], // Carrega nosso arquivo de configuração
    }),

    // 4. Usar a configuração do TypeORM de forma assíncrona
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importar o ConfigModule para o provider
      inject: [ConfigService], // Injetar o ConfigService
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('database'),// Usar a factory para pegar a config pelo namespace 'database'
    }),

    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}