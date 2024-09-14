import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    MessagesModule,
    ConfigModule.forRoot({
      isGlobal: true, // Faz com que as variáveis estejam disponíveis globalmente
    }),
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
