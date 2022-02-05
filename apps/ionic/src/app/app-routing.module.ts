import { NgModule } from '@angular/core'
import { PreloadAllModules, Route, RouterModule, Routes } from '@angular/router'
import { IPageRecord } from '@szakszolg-nx/ng-interfaces'
import { NG_ICON } from '../shared/utils/prime-icons.class'

export const pages = {
    home: {
        title: 'Home',
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
        icon: NG_ICON.home,
        visible: true,
        order: 1,
        guards: [],
    } as IPageRecord & Route,
    login: {
        title: 'Login',
        path: 'login',
        loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
        icon: NG_ICON.lock,
        visible: true,
        order: 2,
        guards: [],
    } as IPageRecord & Route,
}

export function pagesInOrder(): IPageRecord[] & Route[] {
    return Object.values(pages).sort((a, b) => a.order - b.order)
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    ...pagesInOrder(),
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
