import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagingService } from './messaging.service';

@WebSocketGateway({ cors: true })
export class MessagingGateway {
  constructor(private readonly messagingService: MessagingService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() message: { text: string; sender: string }) {
    const savedMessage = await this.messagingService.createMessage(message);
    this.server.emit('newMessage', savedMessage);
  }

  @SubscribeMessage('getHistory')
  async handleGetHistory() {
    const messages = await this.messagingService.getMessages();
    this.server.emit('history', messages);
  }
}
