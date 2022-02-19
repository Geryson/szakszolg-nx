import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterTokenPageRoutingModule } from './enter-token-routing.module';

import { EnterTokenPage } from './enter-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterTokenPageRoutingModule
  ],
  declarations: [EnterTokenPage]
})
export class EnterTokenPageModule {}
