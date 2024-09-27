import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";


export class UpdateRoomNameDto {
    @IsString()
    @MinLength(4)
    @MaxLength(15)
    name: string;

    @IsOptional()
    @IsString()
    idAuthor: String;
}
