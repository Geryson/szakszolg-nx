import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ManageUsersPage } from './manage-users.page'

const routes: Routes = [
    {
        path: '',
        component: ManageUsersPage,
    },
    {
        path: ':id',
        loadChildren: () => import('./single-user/single-user.module').then((m) => m.SingleUserPageModule),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageUsersPageRoutingModule {}
