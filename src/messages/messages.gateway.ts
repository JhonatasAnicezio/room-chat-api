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

  private listMessage: Message[] = [];

  handleConnection(client: Socket) {
    console.log(`Conectou ao socket ${client.id}`);
    client.join('sala'); // Cliente entra na sala 'sala'
  }

  // constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('start-chat')
  startChat(@ConnectedSocket() client: Socket) {
    client.emit('message',  this.listMessage);
  }

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    this.listMessage.unshift(createMessageDto);

    this.server.to('sala').emit('message', this.listMessage);
  }
}
