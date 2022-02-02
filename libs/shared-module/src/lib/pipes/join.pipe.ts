import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'join',
})
export class JoinPipe implements PipeTransform {
    transform(input: any[], separator: string): any {
        return input.join(separator)
    }
}
