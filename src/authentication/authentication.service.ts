import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { auth } from 'src/firebase/firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

@Injectable()
export class AuthenticationService {
    async register({ email, password }: RegisterDto) {
        return await createUserWithEmailAndPassword(auth, email, password)
            .then(() => sendEmailVerification(auth.currentUser))
    }

    async signIn({ email, password }: { email: string, password: string }) {
        return await signInWithEmailAndPassword(auth, email, password)
            .then(({ user }: UserCredential) => console.log(user.emailVerified));
    }
}
