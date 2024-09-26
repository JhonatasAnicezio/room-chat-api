import { Injectable, PipeTransform, UnauthorizedException } from "@nestjs/common";
import { CreateRoomDto } from "src/room/dto/create-room.dto";

@Injectable()
export class ValidationFieldsCreateRoomPipe implements PipeTransform {
    transform(createRoomDto: CreateRoomDto) {
        const { idAuthor, name, subject } = createRoomDto;
        const subjects = subject.find((e) => e.length < 3 || e.length > 8);

        if (!idAuthor || !name) throw new UnauthorizedException('Falta informações');

        if(subject.length === 0) throw new UnauthorizedException('Falta um thema para sala');

        if(subjects) throw new UnauthorizedException(`Tamanho invalido de assunto`);

        return createRoomDto;
    }
}