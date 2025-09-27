
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: process.env.DB_NAME, // Lendo o nome do banco do .env
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Onde encontrar as entidades
    synchronize: true, // Apenas para desenvolvimento!
  }),
);