import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RedirectService } from './services/redirect.service'
import { MapPipe } from './pipes/map.pipe'
import { JoinPipe } from './pipes/join.pipe'

@NgModule({
    imports: [CommonModule],
    providers: [RedirectService],
    declarations: [MapPipe, JoinPipe],
    exports: [MapPipe, JoinPipe],
})
export class SharedModule {}
