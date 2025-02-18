// src/messaging/messaging.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { MessagingService } from './messaging.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('messages') // Группировка эндпоинтов в Swagger UI
@Controller('messages')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message' }) // Описание операции
  @ApiBody({ type: CreateMessageDto }) // Описание тела запроса
  @ApiResponse({ status: 201, description: 'Message created successfully' })
  async createMessage(@Body() message: CreateMessageDto) {
    return this.messagingService.createMessage(message);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({ status: 200, description: 'List of messages', type: [CreateMessageDto] })
  async getMessages() {
    return this.messagingService.getMessages();
  }
}
