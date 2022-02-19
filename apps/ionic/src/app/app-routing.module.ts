import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { pages } from '../shared/utils/pages.const'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: pages.home,
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: pages.admin._path,
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminPageModule),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
