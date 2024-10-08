import { Document } from "mongoose";

export interface Message extends Document {
    _id: string;
    idAuthor: string;
    text: string;
    createAt: Date;
    author: string;
}