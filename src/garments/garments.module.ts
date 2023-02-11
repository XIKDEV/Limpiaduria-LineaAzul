import { Module } from '@nestjs/common/decorators';

import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

import { GarmentsService } from './garments.service';
import { GarmentsController } from './garments.controller';
import { Garment } from './entities';
import { CommonModule } from '../common';

@Module({
  controllers: [GarmentsController],
  providers: [GarmentsService],
  imports: [TypeOrmModule.forFeature([Garment]), CommonModule],
})
export class GarmentsModule {}
