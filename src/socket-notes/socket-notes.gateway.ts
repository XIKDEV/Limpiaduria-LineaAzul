import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketNotesService } from './socket-notes.service';

@WebSocketGateway()
export class SocketNotesGateway {
  @WebSocketServer() wss: Server;
  constructor(private readonly socketNotesService: SocketNotesService) {}

  @SubscribeMessage('folio-to-client')
  async findOne() {
    const data = await this.socketNotesService.findOne();
    return this.wss.emit('newFolio', { message: data });
  }
}
