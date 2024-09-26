import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Message } from "src/messages/interfaces/message.interface";

@Schema()
export class Room extends Document {
    @Prop({ required: true })
    name: String;

    @Prop({ required: true })
    subject: String[];

    @Prop()
    imgUrl: String;

    @Prop({ default: Date.now() })
    createAt: Date;

    @Prop({ required: true })
    idAuthor: String;

    @Prop()
    messages: Message[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);