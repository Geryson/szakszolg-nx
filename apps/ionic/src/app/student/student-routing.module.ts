import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { lastPartOf, pages } from '../../shared/utils/pages.const'

const routes: Routes = [
    {
        path: '',
        redirectTo: lastPartOf(pages.student.enterToken),
    },
    {
        path: lastPartOf(pages.student.enterToken),
        loadChildren: () => import('./enter-token/enter-token.module').then((m) => m.EnterTokenPageModule),
    },
    {
        path: lastPartOf(pages.student.fillSurvey),
        loadChildren: () => import('./fill-survey/fill-survey.module').then((m) => m.FillSurveyPageModule),
    },
  {
    path: 'survey-details',
    loadChildren: () => import('./survey-details/survey-details.module').then( m => m.SurveyDetailsPageModule)
  },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentPageRoutingModule {}
