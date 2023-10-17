import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConversationModel } from '../models/conversation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private readonly commentsUrl: string = '/blink-conversation//assets/comments.json';
    private conversations: WritableSignal<Array<ConversationModel>> = signal([]);

    constructor(
        private httpClient: HttpClient
    ) {

    }

    fetchConversations(): Observable<Array<ConversationModel>> {
        return this.httpClient.get(this.commentsUrl).pipe(
            map((conversation) => {
                return conversation as Array<ConversationModel>;
            })
        );
    }

    getConversations(): Signal<Array<ConversationModel>> {
        return this.conversations.asReadonly();
    }

    setConversations(comments: Array<ConversationModel>): void {
        this.conversations.update(() => comments);
    }
}
