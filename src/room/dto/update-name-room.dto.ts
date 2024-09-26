import { IsString } from "class-validator";


export class UpdateRoomNameDto {
    @IsString()
    name: string;
}
