import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { DatabaseModule } from 'src/database/database.module';
import { roomProviders } from './room.provider';
import { ImportJsonService } from 'src/common/import-json.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoomController],
  providers: [
    RoomService,
    ImportJsonService,
    ...roomProviders,
  ],
})
export class RoomModule {}
