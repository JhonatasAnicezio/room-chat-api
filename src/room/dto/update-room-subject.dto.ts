import { ArrayMaxSize, ArrayNotEmpty, IsArray } from "class-validator";


export class UpdateRoomSubjectDto {
    @IsArray()
    @ArrayNotEmpty() // Garante que o array não esteja vazio
    @ArrayMaxSize(3) // Limita o array a no máximo 3 itens
    subject: string[];
}