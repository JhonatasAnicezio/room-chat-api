import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { Message } from './interfaces/message.interface';

@WebSocketGateway({
  cors: {
    origin: '*', // Permitir todas as origens
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Conectou ao socket ${client.id}`);
  }

  constructor(private readonly messagesService: MessagesService) { }

  @SubscribeMessage('start-chat')
  async startChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string
  ) {
    client.join(room); // Cliente entra na sala 'sala'

    const messages = await this.messagesService.getAllMessages({ id: room });

    this.server.to(room).emit('message', messages);
  }

  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    await this.messagesService.sendMessage(createMessageDto);

    const messages = await this.messagesService.getAllMessages({ id: createMessageDto.id });

    this.server.to(createMessageDto.id).emit('message', messages);
  }
}
