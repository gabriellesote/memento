// src/notes/dto/create-note.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsString() // Garante que o valor é uma string
  @IsNotEmpty() // Garante que o valor não é uma string vazia
  @MinLength(3) // Garante que o título tem no mínimo 3 caracteres
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}