import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { HomePage } from './home.page'

import { HomePageRoutingModule } from './home-routing.module'
import { TranslateModule } from '@ngx-translate/core'
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, TranslateModule, DialogModule, ButtonModule],
    declarations: [HomePage],
})
export class HomePageModule {}
