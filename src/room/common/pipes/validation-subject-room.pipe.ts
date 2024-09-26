import { Injectable, PipeTransform, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ValidationSubjectRoomPipe implements PipeTransform {
    transform(subject: string[]) {
        const subjects = subject.find((e) => e.length < 3 || e.length > 8);

        if(subject.length === 0) throw new UnauthorizedException('Falta um thema para sala');

        if(subjects) throw new UnauthorizedException(`Tamanho invalido de assunto`);

        return subject;
    }
}