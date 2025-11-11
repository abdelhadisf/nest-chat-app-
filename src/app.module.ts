import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';



@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [], 
  providers: [AppGateway],
})
export class AppModule {}
