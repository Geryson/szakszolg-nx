import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'
import { UserService } from './services/user.service'
import { HangmanWordService } from './services/hangman-word.service'
import { SchoolService } from './services/schoolService'
import { TokenService } from './services/token.service'

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, IonicModule, TranslateModule],
    providers: [UserService, HangmanWordService, SchoolService, TokenService],
    exports: [HeaderComponent],
})
export class NxSharedModule {}
