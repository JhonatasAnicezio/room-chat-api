import { Inject, Injectable } from '@nestjs/common';
import { Message } from './interfaces/message.interface';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Room } from 'src/database/schemas/room.schema';

@Injectable()
export class MessagesService {
  constructor(
    @Inject('ROOM_MODEL')
    private roomModel: Model<Room>
  ) { }

  async getAllMessages({ id }: { id: string }): Promise<Message[]> {
    const room = await this.roomModel.findById(id).exec();

    return room.messages;
  }

  async sendMessage({ newMessage, id }: CreateMessageDto): Promise<Message[]> {
    const room = await this.roomModel.findById(id).exec();

    // Adicione a nova mensagem ao array de mensagens do Room
    room.messages.unshift(newMessage as any);

    // Salve a atualização no banco de dados
    await room.save();

    return room.messages;
  }
}
