/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit, ViewChild } from '@angular/core'
import { CropperComponent } from 'angular-cropperjs'
import { AlertController, NavController, Platform } from '@ionic/angular'
import { TranslatePipe } from '@ngx-translate/core'
import { PuzzleService } from '../../../../shared/services/puzzle.service'

@Component({
    selector: 'nx12-puzzle-scaler',
    templateUrl: './puzzle-scaler.page.html',
    styleUrls: ['./puzzle-scaler.page.scss'],
})
export class PuzzleScalerPage implements OnInit {
    imageUrl = '../../assets/images/alaska-cliffs.jpg'
    puzzleId = ''

    editOperations?: HTMLElement
    previewOperations?: HTMLElement

    previewDisabled?: boolean
    backDisabled?: boolean
    saveDisabled?: boolean

    rangerMin = 50
    rangerMax = 100
    rangerValue = this.rangerMin

    cropperFace?: HTMLElement

    cropperInitialY?: number

    currentCanvasWidth?: number
    currentCanvasHeight?: number

    previousCropBoxPosition?: object

    currentXRemainder?: number
    currentYRemainder?: number
    currentFullColumns?: number

    @ViewChild('puzzleCropper') public puzzleCropper?: CropperComponent

    constructor(
        private navController: NavController,
        private service: PuzzleService,
        private platform: Platform,
        private screenOrientation: ScreenOrientation,
        public translatePipe: TranslatePipe,
        private alertController: AlertController,
    ) {
        platform.ready().then(() => screenOrientation.lock('landscape'))
    }

    ngOnInit() {
        this.rangerValue = this.rangerMin

        this.editOperations = <HTMLElement>document.getElementsByClassName('operations-edit').item(0)
        this.previewOperations = <HTMLElement>document.getElementsByClassName('operations-preview').item(0)

        this.imageUrl =
            this.service.activePuzzle?.url ??
            'https://avante.biz/wp-content/uploads/Android-Beach-Wallpapers/Android-Beach-Wallpapers-007.jpg'

        if (this.puzzleCropper) {
            this.puzzleCropper.cropperOptions.viewMode = 0
            this.puzzleCropper.cropperOptions.guides = false
            this.puzzleCropper.cropperOptions.background = false
            this.puzzleCropper.cropperOptions.center = false
            this.puzzleCropper.cropperOptions.dragMode = 'move'
            this.puzzleCropper.cropperOptions.zoomable = false
        }

        this.puzzleCropper?.ready.subscribe(() => {
            if (this.puzzleCropper?.cropper.getCanvasData().height ?? 0 > Math.floor(this.platform.height() * 0.9)) {
                this.puzzleCropper?.cropper.setCanvasData({
                    height: Math.floor(this.platform.height() * 0.9),
                    left: 0,
                    top: 0,
                })

                this.rangerMin = Math.floor(this.rangerMin * 0.9)
                this.rangerMax = Math.floor(this.rangerMax * 0.9)
                this.rangerValue = Math.floor(this.rangerValue * 0.9)
            }
            const currentCanvasData = this.puzzleCropper?.cropper.getCanvasData()
            this.currentCanvasHeight = currentCanvasData?.height
            console.log(this.currentCanvasHeight)
            this.currentCanvasWidth = currentCanvasData?.width
            console.log(this.currentCanvasWidth)
            this.puzzleCropper?.cropper.setCropBoxData({
                height: currentCanvasData?.height,
                width: currentCanvasData?.width,
                top: 0,
                left: 0,
            })

            // Androidon a Cropper beállítható legmagasabb y-pozíciójához (0-nak kéne lennie) hozzáadódhat az értesítési sáv magassága.
            // A későbbi helyes mentés érdekében ezt a "rossz" értéket előre feljegyezzük.
            const cropperInitalData = this.puzzleCropper?.cropper.getData(true)
            this.cropperInitialY = cropperInitalData?.y

            this.cropperFace = <HTMLElement>document.getElementsByClassName('cropper-face').item(0)

            const cropperModal = <HTMLElement>document.getElementsByClassName('cropper-modal').item(0)
            cropperModal.style.background = '#ededed'

            this.cropperFace.style.backgroundClip = 'content-box'
            this.cropperFace.style.background = 'url("../../assets/images/black-square.png")'
            this.cropperFace.style.opacity = '1'
            this.cropperFace.style.backgroundSize = this.rangerValue + 'px'

            this.service.read(this.service.activePuzzle?._id).valueChanges.subscribe(({ data }) => {
                const requestedPuzzle = data.puzzle
                if (requestedPuzzle.columns != null && requestedPuzzle.columns > 0) {
                    this.puzzleCropper?.cropper.setCropBoxData({
                        width: requestedPuzzle.cropWidth,
                        height: requestedPuzzle.cropHeight,
                        top: requestedPuzzle.cropTop,
                        left: requestedPuzzle.cropLeft,
                    })
                    this.rangerValue = requestedPuzzle.pieceSize ?? this.rangerMin
                    if (this.cropperFace) this.cropperFace.style.backgroundSize = this.rangerValue + 'px'
                }
            })
        })

        // this.cropperElement.style.display = "none";

        this.puzzleCropper!.cropperOptions.cropstart = () => {
            this.previousCropBoxPosition = this.puzzleCropper?.cropper.getCropBoxData()
        }

        this.puzzleCropper!.cropperOptions.cropend = () => {
            const currentCropBoxPosition = this.puzzleCropper?.cropper.getCropBoxData()

            if (!currentCropBoxPosition) throw 'No cropbox data'
            if (!this.currentCanvasHeight) throw 'No canvas height'
            if (!this.currentCanvasWidth) throw 'No canvas width'

            const currentRightEdge = currentCropBoxPosition.left + currentCropBoxPosition.width
            const currentBottomEdge = currentCropBoxPosition.top + currentCropBoxPosition.height

            const isCropBoxOutOnRight = currentRightEdge > this.currentCanvasWidth
            const isCropBoxOutOnBottom = currentBottomEdge > this.currentCanvasHeight

            const newCropBoxWidth = isCropBoxOutOnRight
                ? this.currentCanvasWidth - currentCropBoxPosition.left
                : currentCropBoxPosition.width
            const newCropBoxHeight = isCropBoxOutOnBottom
                ? this.currentCanvasHeight - currentCropBoxPosition.top
                : currentCropBoxPosition.height

            if (isCropBoxOutOnRight || isCropBoxOutOnBottom) {
                this.puzzleCropper?.cropper.setCropBoxData({
                    top: currentCropBoxPosition.top,
                    left: currentCropBoxPosition.left,
                    height: newCropBoxHeight,
                    width: newCropBoxWidth,
                })
            }
        }
    }

    /***
     * Előnézeti mód - eltávolítja a méretező csúszkát, betölti a helyére az előnézeti műveletek gombjait,
     * letiltja a kijelölő mozgatását és piros színnel kiemeli a nem egész darabokat
     */
    preview() {
        this.editOperations!.style.display = 'none'
        this.previewOperations!.style.display = 'block'

        this.puzzleCropper?.cropper.disable()

        if (!this.cropperFace) throw 'Cropper face not found'

        const pieceSize = parseInt(this.cropperFace.style.backgroundSize.slice(0, -2))
        const selectionWidth = this.cropperFace.offsetWidth
        const selectionHeight = this.cropperFace.offsetHeight

        this.currentFullColumns = Math.floor(selectionWidth / pieceSize)

        this.currentXRemainder = selectionWidth % pieceSize
        this.currentYRemainder = selectionHeight % pieceSize

        this.cropperFace.style.boxShadow =
            'inset -' + this.currentXRemainder + 'px -' + this.currentYRemainder + 'px 0 0 rgb(255 0 0 / 0.7)'
    }

    /***
     * Visszatérés szerkesztő módba - eltávolítja az előnézeti műveleteket, betölti a helyére a méretező csúszkát,
     * engedélyezi a kijelölő mozgatását és eltünteti a nem egész darabok kijelölését
     */
    back() {
        if (!this.editOperations) throw 'Edit operations not found'
        if (!this.previewOperations) throw 'Preview operations not found'
        if (!this.cropperFace) throw 'Cropper face not found'

        this.editOperations.style.display = 'block'
        this.previewOperations.style.display = 'none'

        this.cropperFace.style.boxShadow = 'none'

        this.puzzleCropper?.cropper.enable()
    }

    /***
     * Mentés - Adott képhez elmenti a beállított értékeket és visszatér a puzzle-képfeltöltő oldalra
     */
    save() {
        const currentCropBoxData = this.puzzleCropper?.cropper.getCropBoxData()
        if (!currentCropBoxData) throw 'No cropbox data'
        if (!this.currentXRemainder) throw 'No currentXRemainder'
        if (!this.currentYRemainder) throw 'No currentYRemainder'

        currentCropBoxData.width = currentCropBoxData.width - this.currentXRemainder
        currentCropBoxData.height = currentCropBoxData.height - this.currentYRemainder

        this.service
            .setPieceConfiguration(this.puzzleId, currentCropBoxData, this.rangerValue, this.currentFullColumns)
            .subscribe(async () => {
                this.navController.navigateForward(['add-puzzle']).then()
                const alert = await this.alertController.create({
                    message: await this.translatePipe.transform('MESSAGE.SUCCESS_UPLOAD'),
                    buttons: [
                        {
                            text: await this.translatePipe.transform('BUTTONS.OKE'),
                        },
                    ],
                })
                await alert.present()
                this.screenOrientation.unlock()
                this.screenOrientation.lock('portrait').then()
            })
    }

    ionViewDidEnter() {
        this.platform.backButton.subscribeWithPriority(0, () => this.presentAlertConfirm())
    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            header: await this.translatePipe.transform('HEADER.ALERT'),
            message: '<strong>' + (await this.translatePipe.transform('PUZZLE_SCALER.EDIT_ABORT')) + '</strong>',
            buttons: [
                {
                    text: await this.translatePipe.transform('BUTTONS.NO'),
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {},
                },
                {
                    text: await this.translatePipe.transform('BUTTONS.YES'),
                    handler: () => {
                        this.screenOrientation.unlock()
                        this.screenOrientation.lock('portrait')

                        this.navController.navigateForward(['add-puzzle'])
                    },
                },
            ],
        })
        await alert.present()
    }

    onRangeInput(value: string) {
        this.rangerValue = parseInt(value)
        if (!this.cropperFace) throw 'No cropper face'
        this.cropperFace.style.backgroundSize = value + 'px'
    }
}
