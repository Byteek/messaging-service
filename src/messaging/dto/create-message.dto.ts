// src/messaging/dto/create-message.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hello, world!', description: 'The text of the message' })
  text: string;

  @ApiProperty({ example: 'user1', description: 'The sender of the message' })
  sender: string;
}
