// src/notes/dto/create-note.dto.ts

import { IsNotEmpty, IsString, MaxLength, Matches , MinLength} from 'class-validator';

export class CreateNoteDto {
  @IsString({ message: 'O título deve ser um texto.' })
  @IsNotEmpty({ message: 'O título não pode ser vazio.' })
  @MaxLength(20, { message: 'O título não pode ter mais de 30 caracteres.' })
  @Matches(/.*[\p{L}\p{N}].*/u, { // <-- MUDANÇA AQUI
    message: 'O título deve conter pelo menos uma letra ou um número.', // <-- E AQUI
  })
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
  title: string;

  @IsString({ message: 'O conteúdo deve ser um texto.' })
  @IsNotEmpty({ message: 'O conteúdo não pode ser vazio.' })
  @MaxLength(999, { message: 'O conteúdo não pode ter mais de 999 caracteres.' })
  @Matches(/.*[\p{L}\p{N}].*/u, { // <-- MUDANÇA AQUI
    message: 'O conteúdo deve conter pelo menos uma letra ou um número.', // <-- E AQUI
  })
  content: string;
}