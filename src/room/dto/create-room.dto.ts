import { IsString, ArrayMaxSize, IsArray, ArrayNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { Message } from 'src/messages/interfaces/message.interface';

export class CreateRoomDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  subject: string[];

  @IsOptional() // Permite que o campo seja opcional
  @IsString()
  imgUrl: string | null;

  @IsString()
  idAuthor: String;

  @IsArray()
  message: Message[];
}
