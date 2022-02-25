import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './components/header/header.component'
import { IonicModule } from '@ionic/angular'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, IonicModule, TranslateModule],
    exports: [HeaderComponent],
})
export class NxSharedModule {}
