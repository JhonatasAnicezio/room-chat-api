import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { auth } from 'src/firebase/firebase-config';
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { signInDto } from './dto/sign-in-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}

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

                const payload = { email, password };

                const token = await this.jwtService.signAsync(payload);

                return {
                    token,
                    user: user.providerData,
                };
            })
            .catch((error: AuthError) => {
                throw new UnauthorizedException(error.message);
            });
    }

    async signInWithToken({ token }: { token: string }) {
        const { email, password }: signInDto = await this.jwtService.decode(token);

        return await this.signIn({ email, password });
    }
}
