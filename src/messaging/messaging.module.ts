import {Module} from '@nestjs/common';
import {MessagingController} from "./messaging.controller";
import {MessagingService} from "./messaging.service";
import {MessagingGateway} from "./messaging.gateway";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Message} from "./message.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  controllers:[MessagingController],
  providers:[MessagingService, MessagingGateway ],
})
export class MessagingModule {}
