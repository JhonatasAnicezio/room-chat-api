import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Message extends Document {
    @Prop({ type: String, default: uuidv4 })
    id: String;

    @Prop({ required: true })
    text: String;

    @Prop({ default: Date.now() })
    createAt: Date;

    @Prop({ required: true })
    author: String;
}
export const MessageSchema = SchemaFactory.createForClass(Message);