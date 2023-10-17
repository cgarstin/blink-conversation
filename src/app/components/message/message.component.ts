import { ChangeDetectionStrategy, Component, Input, LOCALE_ID, } from '@angular/core';
import { MessageModel } from '../../models/message.model';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
    @Input() message!: MessageModel;
    protected readonly LOCALE_ID = LOCALE_ID;
}
