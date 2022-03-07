import { IPageRecord } from '@szakszolg-nx/ng-interfaces'
import { Route } from '@angular/router'

export const removeItem = (array: any[], item: any) => {
    const index = array.indexOf(item)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}

export function newArray<T>(old: T[]): T[] {
    const newArray: T[] = []
    old.forEach((item) => newArray.push(item))
    return newArray
}

export function flattenPages(pages: object) {
    let run = true
    const flat: any[] = Object.values(pages)
    while (run) {
        run = false
        const tempFlat = newArray(flat)
        for (const page of tempFlat) {
            if (page.route) {
                removeItem(flat, page)
                flat.push(page.route)
                run = true
            }
        }
    }
    return flat
}

export function pagesInOrder(pages: object): IPageRecord[] & Route[] {
    return flattenPages(pages).sort((a, b) => a.order - b.order)
}

export const distinct = (array: any[]) => array.filter((value, index, self) => self.indexOf(value) === index)
