import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { auth } from 'src/firebase/firebase-config';
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { signInDto } from './dto/sign-in-dto';

@Injectable()
export class AuthenticationService {
    async register({ email, password, name, photoURL }: RegisterDto) {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential: UserCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoURL,
                });

                sendEmailVerification(auth.currentUser);
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            })
    }

    async signIn({ email, password }: signInDto) {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(({ user }: UserCredential) => {
                if (!user.emailVerified) {
                    // Lança uma exceção se o e-mail não estiver verificado
                    throw new UnauthorizedException(AuthErrorCodes.UNVERIFIED_EMAIL);
                }

                console.log(user);

                return {
                    token: user.refreshToken,
                    user: user.providerData,
                };
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            });
    }
}
