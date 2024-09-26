import { IsString, ArrayMaxSize, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { Message } from 'src/messages/interfaces/message.interface';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsArray()
  @ArrayNotEmpty() // Garante que o array não esteja vazio
  @ArrayMaxSize(3) // Limita o array a no máximo 3 itens
  subject: string[];

  @IsString()
  imgUrl: string;

  @IsString()
  idAuthor: String;

  @IsArray()
  message: Message[];
}
