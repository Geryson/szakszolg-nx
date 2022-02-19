import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSurveysPageRoutingModule } from './manage-surveys-routing.module';

import { ManageSurveysPage } from './manage-surveys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSurveysPageRoutingModule
  ],
  declarations: [ManageSurveysPage]
})
export class ManageSurveysPageModule {}
