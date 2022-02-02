import { Storage } from '@ionic/storage-angular'

export interface IStorageService {
    _storage: Storage | null
    storage: Storage
    _ready: boolean
    readonly ready: boolean

    init(): Promise<void>

    set(key: string, value: any): Promise<void>

    get<T = any>(key: string): Promise<T | null>

    remove<T = any>(key: string): Promise<T | null>

    waitForStorage(): Promise<any>
}
