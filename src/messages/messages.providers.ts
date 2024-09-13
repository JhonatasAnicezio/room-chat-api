import { Connection } from "mongoose";
import { MessageSchema } from "src/database/schemas/message.schema";

export const messagesProviders = [
    {
        provide: 'MESSAGE_MODEL',
        useFactory: (connection: Connection) => connection.model('messages', MessageSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];