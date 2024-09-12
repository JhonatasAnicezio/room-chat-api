import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  create(createMessageDto: CreateMessageDto) {
    console.log('create socket');
    return 'This action adds a new message';
  }
}
