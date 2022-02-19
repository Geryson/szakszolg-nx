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
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminPageRoutingModule {}
