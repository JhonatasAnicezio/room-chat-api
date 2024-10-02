import { Injectable, PipeTransform, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ValidationSubjectRoomPipe implements PipeTransform {
    transform(subjects: string[]) {
        const subject = subjects.find((e) => e.length < 3 || e.length > 20);

        if(subjects.length === 0) throw new UnauthorizedException('Falta um thema para sala');

        if(subject) throw new UnauthorizedException(`Tamanho invalido de assunto`);

        return subjects;
    }
}