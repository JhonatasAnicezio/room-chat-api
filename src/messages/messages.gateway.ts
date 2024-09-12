import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Socket } from 'net';

@WebSocketGateway({
  cors: {
    origin: '*', // Permitir todas as origens
  },
})
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('messages', { message: 'mensagem de teste vinda de create Message' })
    return this.messagesService.create(createMessageDto);
  }
}
