import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { auth } from 'src/firebase/firebase-config';
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { signInDto } from './dto/sign-in-dto';
import { ImportJsonService } from 'src/common/import-json.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly importJsonService: ImportJsonService,
    ) { 
        this.initializeFirebase();
    }

    private async initializeFirebase() {
        if (!admin.apps.length) {
            const data = await this.importJsonService.importLocalJsonFile();

            admin.initializeApp({
                credential: admin.credential.cert(data),
            });
        }
    }

    async register({ email, password }: RegisterDto) {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                sendEmailVerification(auth.currentUser);
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            })
    }

    async signIn({ email, password }: signInDto) {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }: UserCredential) => {
                if (!user.emailVerified) {
                    // Lança uma exceção se o e-mail não estiver verificado
                    throw new UnauthorizedException(AuthErrorCodes.UNVERIFIED_EMAIL);
                }

                const token = await user.getIdToken();

                return token;
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            });
    }

    async signInWithToken({ token }: { token: string }) {
        return await admin.auth().verifyIdToken(token)
            .catch((error: AuthError) => {
                throw new BadRequestException(error.message);
            });
    }

    async registerName({ name }: { name: string }) {
        return await updateProfile(auth.currentUser, {
            displayName: name
        })
        .catch((error: AuthError) => {
            throw new UnauthorizedException(error.message);
        })
    }
}
