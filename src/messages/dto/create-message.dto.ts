export class CreateMessageDto {
    newMessage: {
        text: string;
        author: string;
        idAuthor: string;
        createAt: Date;
    };
    id: string;
}
