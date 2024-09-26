import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomSubjectDto } from './dto/update-room-subject.dto';
import { UpdateRoomNameDto } from './dto/update-name-room.dto';
import { ValidationSubjectRoomPipe } from './common/pipes/validation-subject-room.pipe';

@UsePipes(ValidationPipe)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  create(
    @Body() createRoomDto: CreateRoomDto,
    @Body('subject', ValidationSubjectRoomPipe) subject: string[],
  ) {
    return this.roomService.create({ ...createRoomDto, subject });
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  updateSubject(
    @Param('id') id: string,
    @Body() updateRoomSubjectDto: UpdateRoomSubjectDto,
    @Body('subject', ValidationSubjectRoomPipe) subject: string[],
  ) {
    return this.roomService.updateSubject(id, { subject });
  }

  @Patch(':id')
  updateName(@Param('id') id: string, @Body() updateRoomNameDto: UpdateRoomNameDto) {
    return this.roomService.updateName(id, updateRoomNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
