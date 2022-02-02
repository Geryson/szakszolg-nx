import { Injectable } from '@angular/core'

import { Storage } from '@ionic/storage-angular'
import { IStorageService } from '@szakszolg-nx/ng-interfaces'

@Injectable({
    providedIn: 'root',
})
export class StorageService implements IStorageService {
    _storage: Storage | null = null

    constructor(public storage: Storage) {
        this.init().then()
    }

    _ready = false

    get ready(): boolean {
        return this._ready
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        const storage = await this.storage.create()
        console.log('Storage created')
        this._storage = storage
        this._ready = true
    }

    async set(key: string, value: any) {
        await this.waitForStorage()
        await this._storage?.set(key, value)
    }

    async get<T = any>(key: string): Promise<T | null> {
        await this.waitForStorage()
        return (await this._storage?.get(key)) ?? null
    }

    async remove<T = any>(key: string): Promise<T | null> {
        await this.waitForStorage()
        return this._storage?.remove(key)
    }

    async waitForStorage() {
        while (!this.ready) await new Promise((resolve) => setTimeout(resolve, 250))
        return this._storage
    }
}
