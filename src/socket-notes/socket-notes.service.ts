import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../notes/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SocketNotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>
  ) {}

  async findOne() {
    const data = await this.noteRepository.find({
      order: {
        id: 'ASC',
      },
      select: { id: true },
    });
    const newFolio = !data.length ? 1 : data.pop().id + 1;
    return newFolio;
  }
}
