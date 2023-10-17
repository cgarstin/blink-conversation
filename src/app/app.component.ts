import { ChangeDetectionStrategy, Component, ElementRef, OnInit, QueryList, signal, Signal, ViewChildren, WritableSignal } from '@angular/core';
import { CommentsService } from './services/comments.service';
import { ConversationModel } from './models/conversation.model';
import { FormControl, FormGroup } from '@angular/forms';
import { generateRandomId } from './components/utils/utils';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    @ViewChildren("message") message: QueryList<ElementRef> | null = null;
    conversations: Signal<Array<ConversationModel>> = signal([]);
    protected failedToLoadConversations: WritableSignal<boolean | null> = signal(null);
    selectedConversation: WritableSignal<ConversationModel | null> = signal(null);
    commentForm: FormGroup = new FormGroup<any>({
        newComment: new FormControl('')
    })

    constructor(
        private commentService: CommentsService,
        private orderByDate: OrderByDatePipe,
    ) {
        this.conversations = commentService.getConversations();
    }

    ngOnInit(): void {
        this.fetchConversations();
    }

    fetchConversations(): void {
        this.commentService.fetchConversations().subscribe({
            next: (conversations) => {
                this.failedToLoadConversations.update(() => false);
                this.commentService.setConversations(conversations);
                this.selectedConversation.update(() => {
                    return (this.orderByDate.transform(conversations) as Array<ConversationModel>)[0];
                });
            },
            error: (error) => {
                this.failedToLoadConversations.update(() => true);
                console.error(error);
            }
        });
    }

    selectConversation(conversation: ConversationModel): void {
        this.selectedConversation.update(() => conversation);
    }

    submitComment(): void {
        this.selectedConversation.mutate((conversation) => {
            conversation?.messages.push({
                id: generateRandomId(),
                text: this.commentForm.get('newComment')?.value,
                last_updated: new Date().toISOString(),
            });
        });
        setTimeout(() => {
            this.message?.last.nativeElement.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });
        });

    }
}
