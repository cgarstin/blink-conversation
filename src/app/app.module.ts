import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { OrderByDatePipe } from './pipes/order-by-date.pipe';
import { ButtonComponent } from './components/button/button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        OrderByDatePipe,
        ButtonComponent,
        TextInputComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        OrderByDatePipe,
        {
            provide: LOCALE_ID, useValue: 'en-GB'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
