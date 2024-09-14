import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { auth } from 'src/firebase/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

@Injectable()
export class AuthenticationService {
    async register({ email, password }: RegisterDto) {
        return await createUserWithEmailAndPassword(auth, email, password);
    }
}
