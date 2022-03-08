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
import { PuzzleService } from './services/puzzle.service'

@NgModule({
    declarations: [HeaderComponent, JoinPipe],
    imports: [CommonModule, IonicModule, TranslateModule],
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
        TokenService,
        UserService,
        PuzzleService,
    ],
    exports: [HeaderComponent, JoinPipe],
})
export class NxSharedModule {}
