import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ImportJsonService } from 'src/common/import-json.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [AuthenticationController],
  providers: [
    FirebaseService,
    AuthenticationService,
    ImportJsonService,
  ],
})
export class AuthenticationModule {}
