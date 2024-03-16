import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../../config/orm.config';
import { DatabaseService } from './database.service';

@Global()
@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions)],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
