import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { lastPartOf, pages } from '../../shared/utils/pages.const'

const routes: Routes = [
    {
        path: lastPartOf(pages.admin.login),
        loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
    },
    {
        path: lastPartOf(pages.admin.dashboard),
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
    },
    {
        path: lastPartOf(pages.admin.mirrorWords),
        loadChildren: () =>
            import('./manage-mirror-words/manage-mirror-words.module').then((m) => m.ManageMirrorWordsPageModule),
    },
    {
        path: lastPartOf(pages.admin.profile),
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfilePageModule),
    },
    {
        path: lastPartOf(pages.admin.surveysManagement),
        loadChildren: () => import('./manage-surveys/manage-surveys.module').then((m) => m.ManageSurveysPageModule),
    },
    {
        path: lastPartOf(pages.admin.users),
        loadChildren: () => import('./manage-users/manage-users.module').then((m) => m.ManageUsersPageModule),
    },
    {
        path: lastPartOf(pages.admin.hangmanWords),
        loadChildren: () =>
            import('./manage-hangman-words/manage-hangman-words.module').then((m) => m.ManageHangmanWordsPageModule),
    },
    {
        path: lastPartOf(pages.admin.puzzleImages),
        loadChildren: () => import('./manage-puzzles/manage-puzzles.module').then((m) => m.ManagePuzzlesPageModule),
    },
    {
        path: lastPartOf(pages.admin.groupingItems),
        loadChildren: () => import('./manage-groups/manage-groups.module').then((m) => m.ManageGroupsPageModule),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminPageRoutingModule {}
