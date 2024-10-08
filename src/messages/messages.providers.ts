import { Connection } from "mongoose";
import { RoomSchema } from "src/database/schemas/room.schema";

export const roomProviders = [
    {
        provide: 'ROOM_MODEL',
        useFactory: (connection: Connection) => connection.model('room', RoomSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];