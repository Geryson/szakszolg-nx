export interface IPageRecord {
    title: string
    icon: string
    visible: boolean
    order: number // Note: JS objects are hashmap-like, so order is not guaranteed
    guards: any[]
}
