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

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('start-chat')
  async startChat(@ConnectedSocket() client: Socket) {
    client.emit('message',  this.listMessage);

    const messages = await this.messagesService.getAllMessages();

    this.server.to('sala').emit('message', messages);
  }

  @SubscribeMessage('send-message')
  async sendMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    await this.messagesService.sendMessage(createMessageDto);

    const messages = await this.messagesService.getAllMessages();

    this.server.to('sala').emit('message', messages);
  }
}
