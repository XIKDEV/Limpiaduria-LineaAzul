import { Module } from '@nestjs/common';
import { SocketNotesService } from './socket-notes.service';
import { SocketNotesGateway } from './socket-notes.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../notes/entities';

@Module({
  providers: [SocketNotesGateway, SocketNotesService],
  imports: [TypeOrmModule.forFeature([Note])],
})
export class SocketNotesModule {}
