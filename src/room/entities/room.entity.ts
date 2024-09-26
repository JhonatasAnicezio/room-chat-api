import { Document } from "mongoose";
import { Message } from "src/messages/interfaces/message.interface";

export class Room extends Document {
    _id: string;
    name: string;
    imgUrl: string;
    subject: string[];
    messages: Message[];
}
