import { MutationResult, QueryRef } from 'apollo-angular'
import { Observable } from 'rxjs'

export interface IResourceService<T, TBrowse, TOther> {
    browse(): QueryRef<TBrowse>

    read?(id: string): QueryRef<TOther>
    random?(): QueryRef<TOther>

    edit(id: string, data: Partial<Omit<T, '_id'>>): Observable<MutationResult<TOther>>

    destroy(id: string): Observable<MutationResult<TOther>>
}
