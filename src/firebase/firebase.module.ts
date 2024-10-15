import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [ConfigModule], // Importa o ConfigModule
  providers: [FirebaseService],
  exports: [FirebaseService], // Exporta o FirebaseService para ser usado em outros módulos
})
export class FirebaseModule {}
