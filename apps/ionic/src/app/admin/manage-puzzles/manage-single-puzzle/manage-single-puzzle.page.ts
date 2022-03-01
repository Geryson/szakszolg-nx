import { Component, OnInit } from '@angular/core'
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper'
import { NG_ICON } from '../../../../shared/utils/prime-icons.class'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { NavController } from '@ionic/angular'
import { Log } from '@szakszolg-nx/shared-module'

@Component({
    selector: 'nx12-manage-single-puzzle',
    templateUrl: './manage-single-puzzle.page.html',
    styleUrls: ['./manage-single-puzzle.page.scss'],
})
export class ManageSinglePuzzlePage implements OnInit {
    imageChangedEvent: any = ''
    croppedImage: any = ''
    fileName = ''
    NG_ICON = NG_ICON

    constructor(private readonly http: HttpClient, private readonly redirect: NavController) {}

    ngOnInit() {}

    onFileSelected(event: any, input: HTMLInputElement): void {
        this.imageChangedEvent = event
        this.fileName = input.value.replace(/.*([/\\])/, '')
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64
    }
    imageLoaded(image: LoadedImage) {
        Log.debug('ManageSinglePuzzlePage::imageLoaded', 'imageLoaded', image)
    }

    cropperReady() {}
    loadImageFailed() {
        // TODO: Error handling
    }

    save() {
        this.http
            .post(
                `${environment.API_SSL ? 'https' : 'http'}://${environment.API_HOST}:${
                    environment.API_PORT
                }/api/file/base64`,
                {
                    name: this.fileName,
                    image: this.croppedImage,
                },
            )
            .subscribe(() => this.redirect.back())
    }

    onUploadButtonClicked(input: HTMLInputElement) {
        input.click()
    }
}
