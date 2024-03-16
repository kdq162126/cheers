import { DataSource } from 'typeorm';
import { connectionOptions } from '../config/orm.config';
import * as path from 'path';

export default new DataSource({
  ...connectionOptions,
  migrations: [path.join(__dirname, '/../**/**/migrations/*.{ts,js}')],
});
