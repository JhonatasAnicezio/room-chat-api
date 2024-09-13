import { Inject, Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @Inject('MESSAGE_MODEL')
    private messageModel: Model<Message>
  ) {}

  async getAllMessages(): Promise<Message[]> {
    return await this.messageModel.find().sort({ _id: -1 }).exec();
  }

  async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    return await this.messageModel.create(createMessageDto);
  }
}
