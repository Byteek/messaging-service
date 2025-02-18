import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(message: { text: string; sender: string }) {
    const newMessage = this.messageRepository.create(message);
    return this.messageRepository.save(newMessage);
  }

  async getMessages() {
    return this.messageRepository.find();
  }
}
