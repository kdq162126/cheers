import { Global, Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { JwtSharedModule } from './jwt/jwt.module';

@Global()
@Module({
  imports: [DatabaseModule, JwtSharedModule],
  exports: [DatabaseModule, JwtSharedModule],
})
export class SharedModule {}
