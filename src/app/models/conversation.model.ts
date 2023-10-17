import { MessageModel } from './message.model';

export interface ConversationModel {
    id: string,
    name: string,
    last_updated: string,
    messages: Array<MessageModel>,
}
