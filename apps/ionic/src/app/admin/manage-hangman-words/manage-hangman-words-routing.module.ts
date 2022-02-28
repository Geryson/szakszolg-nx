import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ManageHangmanWordsPage } from './manage-hangman-words.page'

const routes: Routes = [
    {
        path: '',
        component: ManageHangmanWordsPage,
    },
    {
        path: ':id',
        loadChildren: () =>
            import('./manage-single-hangman-word/manage-single-hangman-word.module').then(
                (m) => m.ManageSingleHangmanWordPageModule,
            ),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageHangmanWordsPageRoutingModule {}
