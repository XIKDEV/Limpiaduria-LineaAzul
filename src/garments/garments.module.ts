import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GarmentsService } from './garments.service';
import { GarmentsController } from './garments.controller';
import { Garment } from './entities/garment.entity';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [GarmentsController],
  providers: [GarmentsService],
  imports: [TypeOrmModule.forFeature([Garment]), CommonModule]
})
export class GarmentsModule {}
