import { IsString, ArrayMaxSize, IsArray, ArrayNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(3)
  subjects: string[];

  @IsOptional() // Permite que o campo seja opcional
  @IsString()
  imgUrl: string | null;

  @IsOptional()
  @IsString()
  idAuthor: String;
}
