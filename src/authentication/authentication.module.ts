import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ImportJsonService } from 'src/common/import-json.service';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    ImportJsonService,
  ],
})
export class AuthenticationModule {}
