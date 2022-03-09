import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { UserService } from './services/user.service'
import { HangmanWordService } from './services/hangman-word.service'
import { TokenService } from './services/token.service'
import { MirrorWordService } from './services/mirror-word.service'
import { SchoolService } from './services/school.service'
import { AlertService } from './services/alert.service'
import { AuthService } from './services/auth.service'
import { GroupingItemService } from './services/grouping-item.service'
import { RedirectService } from './services/redirect.service'
import { StaticService } from './services/static.service'
import { SurveyService } from './services/survey.service'
import { JoinPipe } from './pipes/join.pipe'
import {AnswerChooseComponent} from "../app/student/fill-survey/answer-choose/answer-choose.component";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";
import {AnswerFreeAnswerComponent} from "../app/student/fill-survey/answer-free-answer/answer-free-answer.component";
import {AnswerCustomComponent} from "../app/student/fill-survey/answer-custom/answer-custom.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";

@NgModule({
    declarations: [HeaderComponent, JoinPipe, AnswerChooseComponent, AnswerFreeAnswerComponent, AnswerCustomComponent],
    imports: [CommonModule, IonicModule, TranslateModule, RadioButtonModule, FormsModule, InputTextareaModule, ButtonModule],
    providers: [
        AlertService,
        AuthService,
        GroupingItemService,
        HangmanWordService,
        MirrorWordService,
        RedirectService,
        SchoolService,
        StaticService,
        SurveyService,
        UserService,
    ],
    exports: [HeaderComponent, JoinPipe, AnswerChooseComponent, AnswerFreeAnswerComponent, AnswerCustomComponent],
})
export class NxSharedModule {}
