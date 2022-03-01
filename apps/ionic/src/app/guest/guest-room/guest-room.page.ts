import { Component, OnInit } from '@angular/core'
import { link, pages } from '../../../shared/utils/pages.const'

@Component({
    selector: 'nx12-guest-room',
    templateUrl: './guest-room.page.html',
    styleUrls: ['./guest-room.page.scss'],
})
export class GuestRoomPage implements OnInit {
    link = link
    pages = pages

    constructor() {}

    ngOnInit() {}
}
