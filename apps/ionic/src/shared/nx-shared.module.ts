import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { JoinPipe } from './pipes/join.pipe'
import { AnswerChooseComponent } from '../app/student/fill-survey/answer-choose/answer-choose.component'
import { RadioButtonModule } from 'primeng/radiobutton'
import { FormsModule } from '@angular/forms'
import { AnswerFreeAnswerComponent } from '../app/student/fill-survey/answer-free-answer/answer-free-answer.component'
import { AnswerCustomComponent } from '../app/student/fill-survey/answer-custom/answer-custom.component'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ButtonModule } from 'primeng/button'

@NgModule({
    declarations: [HeaderComponent, JoinPipe, AnswerChooseComponent, AnswerFreeAnswerComponent, AnswerCustomComponent],
    imports: [
        CommonModule,
        IonicModule,
        TranslateModule,
        RadioButtonModule,
        FormsModule,
        InputTextareaModule,
        ButtonModule,
    ],
    providers: [],
    exports: [HeaderComponent, JoinPipe, AnswerChooseComponent, AnswerFreeAnswerComponent, AnswerCustomComponent],
})
export class NxSharedModule {}
