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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentPageRoutingModule {}
