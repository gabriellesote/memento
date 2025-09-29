import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  // Simplesmente retorna o que o repositório criar. O id já será uma string (uuid).
  create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(newNote);
  }

  // Simplesmente retorna o que o repositório encontrar. O id já será uma string.
  findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  // Recebe id como string e busca. O id já será uma string.
  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }
  
  // Recebe id como string e atualiza. O id já será uma string.
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.notesRepository.preload({
      id: id,
      ...updateNoteDto,
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return this.notesRepository.save(note);
  }

  // Recebe id como string e deleta.
  async remove(id: string): Promise<void> {
    const result = await this.notesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }
}