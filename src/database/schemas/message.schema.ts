import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Message extends Document {
    @Prop({ required: true })
    text: String;

    @Prop({ default: Date.now() })
    createAt: Date;

    @Prop({ required: true })
    author: String;

    @Prop({ required: true })
    idAuthor: String;
}
export const MessageSchema = SchemaFactory.createForClass(Message);