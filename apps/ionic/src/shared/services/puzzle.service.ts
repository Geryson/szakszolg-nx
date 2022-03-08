import { Inject, Injectable } from '@angular/core'
import { APOLLO_CLIENT } from '../injector.tokens'
import { Apollo } from 'apollo-angular'
import { IPuzzle } from '@szakszolg-nx/api-interfaces'
import { PUZZLES } from '../graphql/puzzles.graphql'
import { first, firstValueFrom } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { api } from '../utils/uri.tools'

@Injectable({
    providedIn: 'root',
})
export class PuzzleService {
    activePuzzle?: IPuzzle
    constructor(@Inject(APOLLO_CLIENT) private readonly apolloClient: Apollo, private readonly http: HttpClient) {}

    browse() {
        return this.apolloClient.watchQuery<{ puzzles: Partial<IPuzzle>[] }>({
            query: PUZZLES.BROWSE,
        })
    }

    destroy(id: string) {
        return this.apolloClient.mutate<{ puzzle: Partial<IPuzzle> }>({
            mutation: PUZZLES.DESTROY,
            variables: { id },
        })
    }

    read(id: string) {
        return this.apolloClient.watchQuery<{ puzzle: Partial<IPuzzle> }>({
            query: PUZZLES.READ,
            variables: { id },
        })
    }

    add(om: string, name: string, address: string, county: string, types: [string]) {
        return this.apolloClient.mutate<{ puzzle: Partial<IPuzzle> }>({
            mutation: PUZZLES.ADD,
            variables: { om, name, address, county, types },
        })
    }

    setPieceConfiguration(
        currentCropBoxData: Cropper.CropBoxData,
        pieceSize: number,
        currentFullColumns: number | undefined,
    ) {
        return this.apolloClient
            .mutate<{ puzzle: Partial<IPuzzle> }>({
                mutation: PUZZLES.ADD,
                variables: {
                    url: this.activePuzzle?.url,
                    columns: currentFullColumns,
                    cropLeft: currentCropBoxData.left,
                    cropTop: currentCropBoxData.top,
                    cropHeight: currentCropBoxData.height,
                    cropWidth: currentCropBoxData.width,
                    pieceSize: pieceSize,
                },
            })
            .pipe(first())
    }

    async upload(uploadedFiles: File[]) {
        const formData = new FormData()
        uploadedFiles.forEach((file) => formData.append('image', file))
        return firstValueFrom(
            this.http.post<
                {
                    originalName: string
                    filename: string
                }[]
            >(api('api/file'), formData),
        )
    }
}
