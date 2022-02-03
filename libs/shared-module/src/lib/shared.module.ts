import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RedirectService } from './services/redirect.service'
import { MapPipe } from './pipes/map.pipe'
import { JoinPipe } from './pipes/join.pipe'
import { NumberOnlyDirective } from './directives/number-only.directive'

@NgModule({
    imports: [CommonModule],
    providers: [RedirectService],
    declarations: [MapPipe, JoinPipe, NumberOnlyDirective],
    exports: [MapPipe, JoinPipe, NumberOnlyDirective],
})
export class SharedModule {}
