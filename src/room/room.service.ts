import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomSubjectDto } from './dto/update-room-subject.dto';
import { Model } from 'mongoose';
import { Room } from 'src/database/schemas/room.schema';
import { UpdateRoomNameDto } from './dto/update-name-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @Inject('ROOM_MODEL')
    private roomModel: Model<Room>
  ) {}
  
  async create(createRoomDto: CreateRoomDto) {
    const { name, idAuthor } = createRoomDto;
    const rooms = await this.roomModel.find().exec();
    
    const findName = rooms.find((room) => room.name === name);
    const authorRoom = rooms.filter((room) => room.idAuthor === idAuthor);
    
    if(findName) throw new UnauthorizedException('Nome ja criado');

    if(authorRoom.length === 2) throw new UnauthorizedException('Você não pode criar mais que duas salas');

    return await this.roomModel.create(createRoomDto);
  }
  
  async findAll() {
    return await this.roomModel.find().exec();
  }
  
  async findOne(id: string) {
    return await this.roomModel.findById(id);
  }
  
  async updateSubject(id: string, { subject }: UpdateRoomSubjectDto) {
    const isRoom = await this.roomModel.findById(id);

    if(!isRoom) {
      return 'Sala não encontrada'
    }
    return await this.roomModel.updateOne(
      { _id: id },
      { $set: { subject }
    });
  }

  async updateName(id: string, { name }: UpdateRoomNameDto) {
    return await this.roomModel.updateOne(
      { _id: id },
      { $set: { name } }
    )
  }
  
  async remove(id: string) {
    return await this.roomModel.deleteOne({ _id: id });
  }
}
