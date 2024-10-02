import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomSubjectDto } from './dto/update-room-subject.dto';
import { UpdateRoomNameDto } from './dto/update-name-room.dto';
import { ValidationSubjectRoomPipe } from './common/pipes/validation-subject-room.pipe';
import { RoomGuard } from './room.guard';
import { Request } from 'express';

@UsePipes(ValidationPipe)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Post()
  @UseGuards(RoomGuard)
  create(
    @Body() createRoomDto: CreateRoomDto,
    @Body('subjects', ValidationSubjectRoomPipe) subjects: string[],
    @Req() req: Request,
  ) {
    const userId: string = req['userId'];

    return this.roomService.create({
      ...createRoomDto,
      idAuthor: userId,
      subjects
    });
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @UseGuards(RoomGuard)
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoomGuard)
  updateSubject(
    @Param('id') id: string,
    @Body() updateRoomSubjectDto: UpdateRoomSubjectDto,
    @Body('subjects', ValidationSubjectRoomPipe) subjects: string[],
    @Req() req: Request,
  ) {
    const userId: string = req['userId'];

    return this.roomService.updateSubject(id, { subjects, idAuthor: userId });
  }

  @Patch(':id')
  @UseGuards(RoomGuard)
  updateName(
    @Param('id') id: string, @Body() { name }: UpdateRoomNameDto,
    @Req() req: Request,
  ) {
    const userId: string = req['userId'];

    return this.roomService.updateName(id, { name, idAuthor: userId });
  }

  @Delete(':id')
  @UseGuards(RoomGuard)
  remove(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const userId: string = req['userId'];

    return this.roomService.remove(id, userId);
  }
}
