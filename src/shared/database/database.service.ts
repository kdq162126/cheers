import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  transaction(proc: (manager: EntityManager) => Promise<void>) {
    return this.dataSource.transaction(proc);
  }

  getRepo(entity: any) {
    return this.dataSource.getRepository(entity);
  }
}
