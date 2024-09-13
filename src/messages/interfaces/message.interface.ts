import { Document } from "mongoose";

export interface Message extends Document {
    _id: string;
    text: string;
    createAt: Date;
    author: string;
}