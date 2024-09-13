import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { messagesProviders } from './messages.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    MessagesGateway,
    MessagesService,
  ...messagesProviders
  ],
})
export class MessagesModule {}
