import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IFile } from '@szakszolg-nx/api-interfaces'
import { environment } from '../../../environments/environment'
import { first } from 'rxjs'
import { ConfirmationService, SelectItem } from 'primeng/api'
import { TranslatePipe } from '@ngx-translate/core'
import { NG_ICON } from '../../../shared/utils/prime-icons.class'
import { pages } from '../../../shared/utils/pages.const'

@Component({
    selector: 'nx12-manage-puzzles',
    templateUrl: './manage-puzzles.page.html',
    styleUrls: ['./manage-puzzles.page.scss'],
})
export class ManagePuzzlesPage implements OnInit {
    NG_ICON = NG_ICON

    files: IFile[] = []
    sortOptions: SelectItem[] = []
    sortOrder = 0
    sortField = 'path'
    pages = pages

    constructor(
        private readonly http: HttpClient,
        private readonly translate: TranslatePipe,
        private readonly confirm: ConfirmationService,
    ) {
        setTimeout(() => {
            ;[
                { label: this.translate.transform('PUZZLE_MANAGEMENT.CREATED_AT'), value: '!createdAt' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.CREATED_AT_DESC'), value: 'createdAt' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.NAME'), value: '!path' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.NAME_DESC'), value: 'path' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.SIZE'), value: '!size' },
                { label: this.translate.transform('PUZZLE_MANAGEMENT.SIZE_DESC'), value: 'size' },
            ].forEach((o) => this.sortOptions.push(o))
        }, 1000)
    }

    private static get api() {
        return `http${environment.API_SSL ? 's' : ''}://${environment.API_HOST}:${environment.API_PORT}/api/file`
    }

    private static getImageID(file: IFile) {
        return file.path.replace(/uploads/g, '').replace(/\/\//g, '/')
    }

    getImageUrl(file: IFile) {
        return `${ManagePuzzlesPage.api}/${ManagePuzzlesPage.getImageID(file)}?size=thumbnail`
    }

    getImageName(file: IFile) {
        return file.path
            .replace(/uploads/g, '')
            .replace(/\/\//g, '/')
            .replace(/--.+\./g, '.')
            .substring(2)
    }

    ngOnInit() {
        this.init()
    }

    onSortChange(event: any) {
        const value = event.value

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1
            this.sortField = value.substring(1, value.length)
        } else {
            this.sortOrder = 1
            this.sortField = value
        }
    }

    destroy(item: IFile) {
        this.http
            .delete(this.getImageUrl(item))
            .pipe(first())
            .subscribe(() => this.init())
    }

    addPicture() {}

    private init() {
        this.http
            .get<IFile[]>(ManagePuzzlesPage.api)
            .pipe(first())
            .subscribe((files) => (this.files = files))
    }
}
