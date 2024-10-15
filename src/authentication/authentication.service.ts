import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { signInDto } from './dto/sign-in-dto';
import { ImportJsonService } from 'src/common/import-json.service';
import * as admin from 'firebase-admin';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly importJsonService: ImportJsonService,
        private readonly firebaseService: FirebaseService,
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
        return await createUserWithEmailAndPassword(this.firebaseService.auth, email, password)
            .then((userCredential: UserCredential) => {
                sendEmailVerification(this.firebaseService.auth.currentUser);
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            })
    }

    async signIn({ email, password }: signInDto) {
        return await signInWithEmailAndPassword(this.firebaseService.auth, email, password)
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
            .then(async (decodedToken) => {
                const userRecord = await admin.auth().getUser(decodedToken.uid);

                return {
                    uid: userRecord.uid,
                    email: userRecord.email,
                    name: userRecord.displayName,
                    photoURL: userRecord.photoURL,
                    email_verified: userRecord.emailVerified,
                };
            })
            .catch((error: AuthError) => {
                throw new BadRequestException(error.message);
            });
    }

    async registerProfile({ name, photoURL, token }: { name: string, photoURL: string, token: string }) {
        const user = await admin.auth().verifyIdToken(token)

        return await admin.auth().updateUser(user.uid, {
            displayName: name, photoURL: photoURL,
        })
            .catch((error: AuthError) => {
                console.log(error);
                throw new UnauthorizedException(error.message);
            })
    }
}
