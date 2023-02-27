import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { CommonModule } from '../common';
import { Client } from './entities';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
  imports: [TypeOrmModule.forFeature([Client]), CommonModule],
})
export class ClientsModule {}
