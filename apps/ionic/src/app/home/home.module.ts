import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { HomePage } from './home.page'

import { HomePageRoutingModule } from './home-routing.module'
import { TranslateModule } from '@ngx-translate/core'
import { SharedModule } from '@szakszolg-nx/shared-module'

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, TranslateModule, SharedModule],
    declarations: [HomePage],
})
export class HomePageModule {}
