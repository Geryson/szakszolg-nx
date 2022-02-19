import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { lastPartOf, pages } from '../../shared/utils/pages.const'

const routes: Routes = [
    {
        path: '',
        redirectTo: pages.guest.guestRoom,
    },
    {
        path: lastPartOf(pages.guest.guestRoom),
        loadChildren: () => import('./guest-room/guest-room.module').then((m) => m.GuestRoomPageModule),
    },
    {
        path: lastPartOf(pages.guest.groupingItems),
        loadChildren: () => import('./play-groups/play-groups.module').then((m) => m.PlayGroupsPageModule),
    },
    {
        path: lastPartOf(pages.guest.hangman),
        loadChildren: () => import('./play-hangman/play-hangman.module').then((m) => m.PlayHangmanPageModule),
    },
    {
        path: lastPartOf(pages.guest.mirrorWords),
        loadChildren: () =>
            import('./play-mirror-words/play-mirror-words.module').then((m) => m.PlayMirrorWordsPageModule),
    },
    {
        path: lastPartOf(pages.guest.puzzle),
        loadChildren: () => import('./play-puzzle/play-puzzle.module').then((m) => m.PlayPuzzlePageModule),
    },
    {
        path: lastPartOf(pages.guest.schoolFinder),
        loadChildren: () => import('./school-finder/school-finder.module').then((m) => m.SchoolFinderPageModule),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GuestPageRoutingModule {}
