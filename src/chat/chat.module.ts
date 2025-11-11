import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from 'src/prisma.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
   imports: [SocketModule], // added
  controllers: [ChatController],
  providers: [ChatService,PrismaService],
})
export class ChatModule {}
