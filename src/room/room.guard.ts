import * as admin from 'firebase-admin';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ImportJsonService } from 'src/common/import-json.service';

@Injectable()
export class RoomGuard implements CanActivate {
    constructor(
        private readonly importJsonService: ImportJsonService,
    ) {
        this.initializeFirebase();
    }

    private async initializeFirebase() {
        // Verifica se o Firebase já foi inicializado
        if (!admin.apps.length) {
            const data = await this.importJsonService.importLocalJsonFile();

            admin.initializeApp({
                credential: admin.credential.cert(data), // Usando applicationDefault() corretamente
                // Ou se precisar usar credenciais específicas, você pode usar:
                // credential: admin.credential.cert(data),
            });
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenHeader(request);


        if (!token) {
            throw new UnauthorizedException('Not authentication');
        }

        try {
            const decodedToken = await admin.auth().verifyIdToken(token);

            request['userId'] = decodedToken.uid;

            return true;
        } catch (error) {
            throw new UnauthorizedException('token invalido');
        }

    }

    private extractTokenHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
