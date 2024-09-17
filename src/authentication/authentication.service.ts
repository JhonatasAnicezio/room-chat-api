import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { auth } from 'src/firebase/firebase-config';
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

@Injectable()
export class AuthenticationService {
    async register({ email, password }: RegisterDto) {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                sendEmailVerification(auth.currentUser);
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            })
    }

    async signIn({ email, password }: { email: string, password: string }) {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(({ user }: UserCredential) => {
                if (!user.emailVerified) {
                    // Lança uma exceção se o e-mail não estiver verificado
                    throw new UnauthorizedException(AuthErrorCodes.UNVERIFIED_EMAIL);
                }

                return user;
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            });
    }
}
