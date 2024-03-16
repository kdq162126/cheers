import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { DataSourceOptions } from 'typeorm';
import * as env from 'dotenv';
import * as path from 'path';
import { SnakeNamingStrategy } from '../database/snake-naming.strategy';
env.config();

export type OrmConnectionConfig = DataSourceOptions & TypeOrmModuleOptions;

export const connectionOptions: OrmConnectionConfig = {
  type: (process.env.DB_DIALECT as any) || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number.parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'dev',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_DATABASE || 'data',
  migrationsRun: (process.env.ENABLE_AUTO_MIGRATION || 'true') === 'true',
  logging: (process.env.ENABLE_ORM_LOGS || 'true') === 'true',
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [path.join(__dirname, '/../**/**/entities/index.{ts,js}')],
};
