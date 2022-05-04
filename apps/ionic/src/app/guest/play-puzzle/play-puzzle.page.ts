/* eslint-disable */
import {Component, OnInit, ViewChild} from '@angular/core';
import * as Hammer from 'hammerjs';
import {IPuzzle} from "@szakszolg-nx/api-interfaces";
import {CropperComponent} from "angular-cropperjs";
import {AlertController, LoadingController, NavController, Platform, ViewDidEnter} from "@ionic/angular";
import {PuzzleService} from "../../../shared/services/puzzle.service";

import * as $ from "jquery";
import {NavigationExtras} from "@angular/router";

export let jigsawInstance: any;
export let hammerPieces: any;

export let canvasWidth: any;
export let canvasHeight: any;

export let puzzleShuffleRightBorder: any;

export let canvasLeftBorder: any;
export let canvasRightBorder: any;
export let canvasTopBorder: any;
export let canvasBottomBorder: any;

export let puzzleScreenOrientation: any;

export let remotePuzzle: IPuzzle;
export let remotePuzzleColumns: number;

@Component({
  selector: 'nx12-play-puzzle',
  templateUrl: './play-puzzle.page.html',
  styleUrls: ['./play-puzzle.page.scss'],
})
export class PlayPuzzlePage implements OnInit, ViewDidEnter {
    startDisabled: boolean = false;
    resetDisabled: boolean = false;
    giveUpDisabled: boolean = false;
    finishedDisabled: boolean = false;
    imgSource: string = '';

    puzzleEntity: IPuzzle | undefined;

    puzzleTime: string | undefined;

    imgWidth: string | undefined;
    imgHeight: string | undefined;

    @ViewChild('puzzleCropper')
    public puzzleCropper: CropperComponent = new CropperComponent;
    @ViewChild('croppedCanvas') public croppedCanvas: HTMLCanvasElement | undefined;

    currentCanvasWidth: number | undefined;
    currentCanvasHeight: number | undefined;

    cropperFace: HTMLElement | undefined;

    cropperInitialY: number | undefined;

    croppedSource: string | undefined;

    loadingDialog: any;

    constructor(private loadingController: LoadingController, public navController: NavController,
                private service: PuzzleService, private platform: Platform, private alertController: AlertController) {

    }

    ngOnInit() {
        this.showLoadingDialog();
    }

    ionViewDidEnter(): void {
        jigsawInstance = new JqJigsawPuzzle(this.navigateToResult, this.navController);
        hammerPieces = null;

        this.startDisabled = false;
        this.resetDisabled = true;
        this.giveUpDisabled = true;
        this.finishedDisabled = true;

        this.puzzleTime = jigsawInstance.puzzleTime;

        this.imgSource = this.service.activePuzzle?.url !== undefined && this.service.activePuzzle?.url !== ''
            ? this.service.activePuzzle?.url : 'https://justnop.xyz/api/puzzle/670871--72105.jpg';

        this.imgWidth = '250px';
        this.imgHeight = '375px';

        this.puzzleCropper.cropperOptions.viewMode = 0;
        this.puzzleCropper.cropperOptions.guides = false;
        this.puzzleCropper.cropperOptions.background = false;
        this.puzzleCropper.cropperOptions.center = false;
        this.puzzleCropper.cropperOptions.dragMode = "move";
        this.puzzleCropper.cropperOptions.zoomable = false;
        this.puzzleCropper.cropperOptions.crossOrigin = false;

        this.puzzleCropper.ready.subscribe(() => {
            if (this.puzzleCropper.cropper.getCanvasData().height > Math.floor(this.platform.height() * 0.9)){
                this.puzzleCropper.cropper.setCanvasData({height: Math.floor(this.platform.height() * 0.9), left: 0, top: 0})
            }
            const currentCanvasData = this.puzzleCropper.cropper.getCanvasData();
            this.currentCanvasHeight = currentCanvasData.height;
            console.log(this.currentCanvasHeight);
            this.currentCanvasWidth = currentCanvasData.width;
            console.log(this.currentCanvasWidth);
            this.puzzleCropper.cropper.setCropBoxData({height: currentCanvasData.height, width: currentCanvasData.width, top: 0, left: 0});

            // Androidon a Cropper beállítható legmagasabb y-pozíciójához (0-nak kéne lennie) hozzáadódhat az értesítési sáv magassága.
            // A későbbi helyes mentés érdekében ezt a "rossz" értéket előre feljegyezzük.
            const cropperInitalData = this.puzzleCropper.cropper.getData(true);
            this.cropperInitialY = cropperInitalData.y;

            this.cropperFace = <HTMLElement>document.getElementsByClassName('cropper-face').item(0);

            const cropperModal = <HTMLElement>document.getElementsByClassName('cropper-modal').item(0);
            cropperModal.style.background = '#ededed';

            this.cropperFace.style.backgroundClip = 'content-box';

            //TODO: KISZEDNI! CSAK TESZTHEZ!
            const puzzleQueryRef = this.service.read("622874f72951483fd7a691e0");
            puzzleQueryRef.valueChanges.subscribe((queriedPuzzle) => {

                this.puzzleCropper.cropper.setCropBoxData({height: queriedPuzzle.data.puzzle.cropHeight, width: queriedPuzzle.data.puzzle.cropWidth, top: queriedPuzzle.data.puzzle.cropTop, left: queriedPuzzle.data.puzzle.cropLeft});
                // @ts-ignore
                remotePuzzleColumns = queriedPuzzle.data.puzzle.columns;

                this.croppedCanvas = this.puzzleCropper.cropper.getCroppedCanvas({maxHeight: Math.floor(this.platform.height() * 0.9)});
                const cropContainer = $('#crop-container');
                cropContainer.html(this.croppedCanvas);
                cropContainer.children()[0].id = 'my_puzzle';

                const invisibleCropper = document.getElementById('invisible-cropper');
                if (invisibleCropper !== undefined && invisibleCropper !== null) {
                    invisibleCropper.style.display = 'none';
                }

                this.loadingDialog.dismiss();
            })
        });
    }

    async showLoadingDialog() {
        this.loadingDialog = await this.loadingController.create({
            message: /*await this.getTranslate('MESSAGE.LOADING')*/ 'loading'
        });
        await this.loadingDialog.present();
    }

    navigateToResult() {
        const piecesContainer = $('#' + jigsawInstance.puzzleId);

        const timerLastState = $('.time_counter').html();
        const splitTimer = timerLastState.split(':');

        // Points for the hours (36000 for each, will happen rarely)
        let pointsForSeconds = +splitTimer[0] * 60 * 60 * 10;

        // For one minute (60 seconds) the multiplier is getting bigger in each minute
        for (let i = 1; i < +splitTimer[1]; i++) {
            pointsForSeconds = pointsForSeconds + (60 * i);
        }

        // Adding the remaining "displayed" seconds
        pointsForSeconds = pointsForSeconds + (+splitTimer[2]);

        // The bigger number means less points after game over
        pointsForSeconds = pointsForSeconds * 60;

        const totalMovements = parseInt(jQuery('.movement_counter').html(), 10);

        const numberOfPieces = parseInt(piecesContainer.data('pieces-number'), 10);

        // Max is always the square of the puzzle pieces scaled up
        const maxResult = Math.pow(numberOfPieces, 2) * 100;

        // In case of too much time / steps (but completed) the score will be this value
        const minResult = 100;

        // We do not count movement for placed pieces; this result is also scaled up
        const pointsForMovements = (totalMovements - numberOfPieces) * 25;

        const calculatedResult = maxResult - pointsForSeconds - pointsForMovements;

        // We will display the minimum result, if the calculation is equal or less
        const navigationExtras: NavigationExtras = {
            queryParams: {
                result: calculatedResult > minResult ? calculatedResult : minResult,
                resultMax: maxResult
            }
        };
        this.navController.navigateForward(['result'], navigationExtras);
        jigsawInstance.refreshTimerBeforeQuit();

        console.log('Puzzle kész!')
    }

    start() {
        this.saveCanvasSize();

        // jigsawInstance.createPuzzleFromImage('#my_puzzle', null, '.custom-puzzle');
        if (this.croppedCanvas) {

            jigsawInstance.createPuzzleFromURL('#my_puzzle', this.croppedCanvas.toDataURL(), null, '.custom-puzzle');

            this.startDisabled = true;
            this.resetDisabled = false;
            this.giveUpDisabled = false;
            this.finishedDisabled = false;
        } else {
            console.log('nincs croppedCanvas');
        }
    }

    private saveCanvasSize() {
        canvasWidth = this.platform.width();
        canvasHeight = this.platform.height();

        puzzleShuffleRightBorder = Math.round(canvasWidth * 0.75);
    }

    resetPieces() {
        for (const entry of hammerPieces) {
            for (const subEntry of entry) {
                subEntry.pieceEnabled = true;
            }
        }
        jigsawInstance.restartPuzzle(null);
    }

    async presentAlertConfirm() {
        //TODO: KISZEDNI A BEÉGETETT SZÖVEGEKET
        const alert = await this.alertController.create({
            header: 'header',
            message: '<strong>'+'leave?'+'</strong>',
            buttons: [
                {
                    text: 'no',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'yes',
                    handler: () => {
                        const piecesContainer = jQuery('#' + jigsawInstance.puzzleId);
                        const numberOfPieces = parseInt(piecesContainer.data('pieces-number'), 10);
                        // No points if the player gives up
                        const navigationExtras: NavigationExtras = {
                            queryParams: {
                                result: 0,
                                resultMax: Math.pow(numberOfPieces, 2) * 100
                            }
                        };
                        puzzleScreenOrientation.unlock();
                        puzzleScreenOrientation.lock('portrait');
                        puzzleScreenOrientation = null;
                        this.navController.navigateForward(['result'], navigationExtras);
                        jigsawInstance.refreshTimerBeforeQuit();
                    }
                }
            ]
        });
        await alert.present();
        console.log('alert');
    }
}

class SwitchableHammerPiece {
    hammerPiece: any;
    pieceEnabled = false;
}

class JqJigsawPuzzle {
    /*
   * «Copyright 2012 JFMDev»
   *
   *  This file is part of jqJigsawPuzzle.
   *
   * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
   */

    public jigsawInstance: object;
    public puzzleTime: string;
    public puzzleId: string;
    public endMethod: any;
    public navController: any;

    constructor(endMethod: any, navController: any) {
        this.jigsawInstance = this;
        this.puzzleTime = '00:00:00';
        this.puzzleId = '';
        this.endMethod = endMethod;
        this.navController = navController;
    }

    /**
     * The array 'pieceSizes' defines the logical and the real sizes of the three sizes of pieces (small, normal and big).
     */
    private pieceSizes = {
        small : {
            logical: 25,
            real: 43
        },
        normal : {
            logical: 50,
            real: 86
        },
        big : {
            logical: 100,
            real: 170
        }
    };

    /**
     * Creates an array which defines the type of each piece of the puzzle
     * (the type of a piece defines which shape is going to have).
     *
     * The type of the pieces are defined by binary numbers of four digits: 'dcba'
     * where 'a' defines the left side, 'b' the bottom side, 'c' the right side and
     * 'd' the upped side.
     *
     * @param rows The number of rows of the puzzle.
     * @param columns The number of columns of the puzzle.
     * @return An array with the type of each piece.
     */
    randomPieceTypes(rows: any, columns: any): object {
        const res: any[] = [];

        let i = 0;
        let j = 0;

        // Format used for represent a piece type as a binary number of four digits (dcba)
        // ----- d -----
        // c --------- a
        // ----- b -----

        // Define diagonal pieces.
        for (i = 0; i < rows; i++) {
            res[i] = [];
            for (j = 0; j < columns; j++) {
                if ( (i + j) % 2 === 0) {
                    // Generate a random number between 0 and 15 (0000 and 1111).
                    let rand = Math.floor(Math.random() * 16);

                    // Verify if the piece is in a border.
                    if (i === 0) { rand = rand | 8; }            // Is in the first row, set 'd' to 1.
                    if (i === rows - 1) { rand = rand | 2; }       // Is in the last row, set 'b' to 1.
                    if (j === 0) { rand = rand | 4; }            // Is in the first column, set 'c' to 1.
                    if (j === columns - 1) { rand = rand | 1; }    // Is in the last column, set 'a' to 1.

                    // Save value.
                    res[i][j] = rand;
                }
            }
        }

        // Define the other pieces.
        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                if ( (i + j) % 2 === 1) {
                    let det = 0;

                    if (i !== 0) { det = det | (res[i - 1][j] & 2) << 2; }           // d = !b from the piece up.
                    if (i !== rows - 1) { det = det | (res[i + 1][j] & 8) >> 2; }      // b = !d from the piece down.
                    if (j !== 0) { det = det | (res[i][j - 1] & 1) << 2; }           // c = !a from the piece left.
                    if (j !== columns - 1) { det = det | (res[i][j + 1] & 4) >> 2; }   // a = !c from the piece right.

                    res[i][j] = 15 - det;
                }
            }
        }

        // Convert binary number into strings.
        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                let value = '';
                value += ((res[i][j] & 8) !== 0) ? '1' : '0';
                value += ((res[i][j] & 4) !== 0) ? '1' : '0';
                value += ((res[i][j] & 2) !== 0) ? '1' : '0';
                value += ((res[i][j] & 1) !== 0) ? '1' : '0';
                res[i][j] = value;
            }
        }

        return res;
    }

    /**
     * Shuffle the pieces of a puzzle.
     *
     * The parameter 'options' allows to extend the area, beyong the area of the
     * puzzle container, in which the pieces can be put when shuffling.
     *
     * @param containerSelector The jQuery selector of the puzzle's container.
     * @param options An associative array with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit'.
     */
    shufflePieces(containerSelector: any, options: any): void {
        // Process parameters.
        const divPuzzle = $(containerSelector).find('div.puzzle');
        // @ts-ignore
        const rightLimit = (options != null && !isNaN(options.rightLimit)) ? options.rightLimit : puzzleShuffleRightBorder - divPuzzle.width();
        const leftLimit = (options != null && !isNaN(options.leftLimit)) ? options.leftLimit : 0;
        const topLimit = (options != null && !isNaN(options.topLimit)) ? options.topLimit : 10;
        // @ts-ignore
        const bottomLimit = (options != null && !isNaN(options.bottomLimit)) ? options.bottomLimit : canvasHeight - divPuzzle.height();
        const puzzleWidth = divPuzzle.width() + leftLimit + rightLimit;
        const puzzleHeight = divPuzzle.height() + topLimit + bottomLimit;

        // Move the pieces.
        $(containerSelector).find('div.piece').each((index: any, piece: any) => {
            const pieceWidth = parseInt(piece.style.width.replace('px', ''));
            const pieceHeight = parseInt(piece.style.height.replace('px', ''));

            // @ts-ignore
            const newLeftNumber = Math.floor(Math.random() * (puzzleWidth - pieceWidth)) - leftLimit;
            const newTopNumber = Math.floor(Math.random() * (puzzleHeight - pieceHeight)) - topLimit;
            piece.style.left = newLeftNumber + 'px';
            // @ts-ignore
            piece.style.top = newTopNumber + 'px';
        });
    }

    /**
     * Loads an image and creates a puzzle with it.
     *
     * @param containerSelector The jQuery selector of the element in which to put the image.
     * @param imageUrl The image's URL.
     * @param options An associative array with the values 'piecesSize', 'borderWidth' and 'shuffle' (which is an associative array with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit').
     * @param appendLocation The jQuery selector of the element the puzzle should be appended to. By default, it is added to the 'body' element of the page.
     */
    public createPuzzleFromURL(containerSelector: any, imageUrl: any, options: any, appendLocation: any): void {
        // Add image to the container.
        const imgId = 'img_' + new Date().getTime();
        $(containerSelector).attr('src', imageUrl);
        // jQuery(containerSelector).append('<img src="' + imageUrl + '" id="' + imgId + '" alt=""/>');
        // Create puzzle from the image.
        jigsawInstance.createPuzzleFromImage('#my_puzzle', options, appendLocation);
    }

    /**
     * Creates a puzzle from an image already defined in the page.
     *
     * @param imageSelector The jQuery selector of the image used for the puzzle.
     * @param options An associative array with the values 'piecesSize', 'borderWidth' and 'shuffle' (which is an associative arrary with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit').
     * @param appendLocation The jQuery selector of the element the puzzle should be appended to. By default, it is added to the 'body' element of the page.
     */
    public createPuzzleFromImage(imageSelector: any, options: any, appendLocation: any): void {
        // Verify if the image exists.
        if ($(imageSelector).length > 0) {
            // Verify if the image has been fully loaded.
            // @ts-ignore
            if ($(imageSelector).width() > 0 && $(imageSelector).height() > 0) {
                // Transform image to puzzle.
                jigsawInstance.imageToPuzzle(imageSelector, options, appendLocation);
            } else {
                // Declare variable for check if the puzzle has been created.
                let puzzleCreated = false;

                // Add event for when the puzzle is created.
                $(imageSelector).on('load', () => {
                    if (!puzzleCreated) {
                        puzzleCreated = true;
                        jigsawInstance.imageToPuzzle(imageSelector, options, appendLocation);
                    }
                });

                // Check, just in case, if the image has been loaded.
                // @ts-ignore
                if ($(imageSelector).width() > 0 && $(imageSelector).height() > 0) {
                    puzzleCreated = true;
                    jigsawInstance.imageToPuzzle(imageSelector, options, appendLocation);
                }
            }
        }
    }

    /**
     * Calculates the value which the image width can be equally divided with,
     * so every puzzle piece to draw will be as close to its full size as possible.
     *
     * This calculation also guarantees that a given puzzle picture
     * contains the same amount of pieces for every user, on any device.
     *
     * @param naturalWidth Natural/physical (not currently drawn) width of a given puzzle image
     * @param naturalHeight Natural/physical (not currently drawn) height of a given puzzle image
     *
     * @return The value used for the division of the current puzzle width
     */
    calculatePuzzlePieceSize(naturalWidth: any, naturalHeight: any): number {
        let lastDividerWithNoRemainder = 0;
        let lastDividerWithBiggestRemainder = 0;
        let biggestPortionPercentage = 0;

        // Some calculations are based on the natural image orientation (is it wider than higher or not, equal is whatever)
        const isWidthBigger = naturalWidth >= naturalHeight;

        const minimum = isWidthBigger ? 4 : 2;
        const maximum = isWidthBigger ? 8 : 5;

        for (let i = minimum; i < maximum + 1; i++) {
            const calculatedPieceSize = isWidthBigger ? naturalWidth / i : naturalHeight / i;
            const remainder = isWidthBigger ? naturalHeight % calculatedPieceSize : naturalWidth % calculatedPieceSize;

            // We get the area of one puzzle piece by percentage, from the last line of the given axis
            const visiblePortionForLastLine = remainder / calculatedPieceSize;

            // The best solution is zero remainder...
            if (visiblePortionForLastLine === 0) {
                lastDividerWithNoRemainder = i;
            }

            // ...however if we would always have some remainder, we should pick the one with the biggest visible area
            if (visiblePortionForLastLine > biggestPortionPercentage) {
                biggestPortionPercentage = visiblePortionForLastLine;
                lastDividerWithBiggestRemainder = i;
            }
        }

        return lastDividerWithNoRemainder > lastDividerWithBiggestRemainder ? lastDividerWithNoRemainder : lastDividerWithBiggestRemainder;
    }

    /**
     * Creates a puzzle from an image already loaded (fully rendered) in the page.
     *
     * @param imageSelector The jQuery selector of the image used for the puzzle.
     * @param options An associative array with the values 'piecesSize', 'borderWidth' and 'shuffle' (which is an associative arrary with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit').
     * @param appendLocation The jQuery selector of the element the puzzle should be appended to. By default, it is added to the 'body' element of the page.
     */
    imageToPuzzle(imageSelector: any, options: any, appendLocation: any): void {
        // Process parameters.
        let img = $(imageSelector);
        if (img.length > 1) { img = img.find(':first'); }
        let piecesSize = /*(options != null && options.piecesSize != null)? options.piecesSize : */'big';
        if (piecesSize !== 'normal' && piecesSize !== 'small' && piecesSize !== 'big') { piecesSize = 'big'; }
        const borderWidth = (options != null && !isNaN(options.borderWidth)) ? parseInt(options.borderWidth, 10) : 10;
        this.puzzleId = 'puzzle_' + new Date().getTime();

        // Draw the puzzle frame over the image.
        const imgWidth = img.width();
        const imgHeight = img.height();
        const imgPosX = img.position().left;
        const imgPosY = img.position().top;
        const imgSrc = img.attr('src');

        if (!appendLocation || appendLocation.length <= 0) { appendLocation = 'body'; }
        let html = '<div class="jigsaw" id="' + this.puzzleId + '" style="left:0px; top: 0px; min-width:' + (imgWidth) + 'px; min-height:' + (imgHeight) + 'px; border-width:' + borderWidth + 'px; margin-left: 10vh; margin-right: 10vh;">' +
            '<div class="puzzle" style="width:' + imgWidth + 'px; height:' + imgHeight + 'px; background:darkred"></div>' +
            '<div class="menu" style="width:' + (imgWidth) + 'px;">' +
            '</div>' +
            '</div>';
        $(appendLocation).append(html);
        const piecesContainer = $('#' + this.puzzleId);

        // Get the size of the pieces.
        const ratio = 0.588235294117647;
        const columnOptimalNumber = remotePuzzleColumns;
        // @ts-ignore
        let logicalSize = Math.round(imgWidth / columnOptimalNumber);
        // If there would be pixel(s) missing, we manually increase the value
        // to prevent really thin, untouchable side pieces
        // @ts-ignore
        if (logicalSize * columnOptimalNumber < imgWidth) {
            logicalSize++;
        }
        const realSize = Math.round(logicalSize / ratio);
        const offset = (realSize - logicalSize) / 2;

        // Half of the actual puzzle size outside the screen is tolerated (plus counting with the image border)...
        canvasLeftBorder = Math.round(-(realSize / 2) - 10);
        canvasRightBorder = Math.round(canvasWidth - 10 - (realSize / 2));
        canvasTopBorder = Math.round(-(realSize / 2) - 10);
        canvasBottomBorder = Math.round(canvasHeight - 10 - (realSize / 2));

        // Calculate the number of pieces.
        // @ts-ignore
        let columns = parseInt((imgWidth / logicalSize).toString(), 10);
        // @ts-ignore
        if (imgWidth % logicalSize !== 0) { columns++; }
        // @ts-ignore
        let rows = parseInt((imgHeight / logicalSize).toString(), 10);
        // @ts-ignore
        if (imgHeight % logicalSize !== 0) { rows++; }

        // Save the number of pieces and set the counter which checks how many pieces has been put in the right location.
        piecesContainer.data('pieces-number', columns * rows);
        piecesContainer.data('pieces-located', 0);

        // Calculate piece types.
        const pieceTypes = jigsawInstance.randomPieceTypes(rows, columns);

        // Bind z-index value to container and set the z-index of the menu.
        piecesContainer.data('last-z-index', rows * columns);
        piecesContainer.find('div.menu').css('z-index', rows * columns);

        // Create pieces.
        hammerPieces = [];
        for (let r = 0; r < rows; r++) {
            hammerPieces[r] = [];
            for (let c = 0; c < columns; c++) {
                // Calculate parameter.
                const posX = -offset + c * logicalSize;
                const posY = -offset + r * logicalSize;
                const backgroundPosX = offset - c * logicalSize;
                const backgroundPosY = offset - r * logicalSize;
                const id = this.puzzleId + '_piece_' + r + 'x' + c;
                const clase = 'piece_' + pieceTypes[r][c];

                // Add html element.
                // noinspection CssUnknownTarget
                html = '<div id="' + id + '" ' +
                    'class="piece ' + piecesSize + ' ' + clase + '" ' +
                    'data-posX="' + posX + '" ' +
                    'data-posY="' + posY + '" ' +
                    'orig-posX="' + posX + '" ' +
                    'orig-posY="' + posY + '" ' +
                    'style="background-image: url(\'' + imgSrc + '\');' +
                    'background-size: ' + imgWidth + 'px;' +
                    'background-position: ' + backgroundPosX + 'px ' + backgroundPosY + 'px;' +
                    'left: ' + posX + 'px; ' +
                    'top: ' + posY + 'px; ' +
                    'width: ' + realSize + 'px; ' +
                    'height: ' + realSize + 'px;">' +
                    '</div>';
                piecesContainer.append(html);

                const puzzlePiece = $('#' + id);

                // Set initial z-index.
                puzzlePiece.css('z-index', rows * columns - 1);

                const pieceIdSliced = puzzlePiece[0].id.split('_');
                const piecePosition = pieceIdSliced[pieceIdSliced.length - 1].split('x');

                const dragOptions = { passive: false };
                puzzlePiece[0].addEventListener(
                    'touchmove',
                // @ts-ignore
                    null,
                    dragOptions
                );
                const hammerPiece = new Hammer(puzzlePiece[0] as HTMLElement);
                hammerPiece.get('pan').set({direction: Hammer.DIRECTION_ALL, threshold: 0});
                hammerPiece.on('panmove', (ev: { target: HTMLElement; deltaX: number; deltaY: number; }) => {
                    if (hammerPieces[piecePosition[0]][piecePosition[1]].pieceEnabled) {
                        const elem = ev.target;
                        // @ts-ignore
                        const lastDeltaX = elem.getAttribute('orig-posX') !== undefined ? parseInt(elem.getAttribute('orig-posX').substring(0, elem.getAttribute('orig-posX').length - 2), 10) : 0;
                        // @ts-ignore
                        const lastDeltaY = elem.getAttribute('orig-posY') !== undefined ? parseInt(elem.getAttribute('orig-posY').substring(0, elem.getAttribute('orig-posY').length - 2), 10) : 0;
                        const tempX = ev.deltaX + lastDeltaX;
                        const tempY = ev.deltaY + lastDeltaY;
                        elem.style.left = tempX.toString() + 'px';
                        elem.style.top = tempY.toString() + 'px';
                    }
                });
                hammerPiece.on('panend', (ev: { target: HTMLElement, deltaX: number, deltaY: number }) => {
                    if (hammerPieces[piecePosition[0]][piecePosition[1]].pieceEnabled) {
                        // Increase counter.
                        jigsawInstance.increaseMovementCounter(piecesContainer);

                        // Verify if the piece has been droped close to his correct position.
                        // @ts-ignore
                        const expectedPosX = parseInt(ev.target.getAttribute('data-posX'), 10);
                        // @ts-ignore
                        const expectedPosY = parseInt(ev.target.getAttribute('data-posY'), 10);
                        const difX = ev.deltaX;
                        const difY = ev.deltaY;
                        // @ts-ignore
                        const currOrigPosX = parseInt(ev.target.getAttribute('orig-posX'), 10);
                        // @ts-ignore
                        const currOrigPosY = parseInt(ev.target.getAttribute('orig-posY'), 10);
                        // @ts-ignore
                        if (Math.abs((parseInt(ev.target.getAttribute('orig-posX'), 10) + difX) - expectedPosX) < Math.round(realSize / 8) && Math.abs((parseInt(ev.target.getAttribute('orig-posY'), 10) + difY) - expectedPosY) < Math.round(realSize / 8)) {
                            // Put it in this position and remove the draggable behavior
                            ev.target.style.left = expectedPosX + 'px';
                            ev.target.style.top = expectedPosY + 'px';
                            $('#' + ev.target.id).css('z-index', rows * columns - 2);

                            hammerPieces[piecePosition[0]][piecePosition[1]].pieceEnabled = false;

                            // Reproduce sound.
                            if (jigsawInstance.pieceSound != null) {
                                jigsawInstance.pieceSound.play();
                            }

                            // Change the color of the border for a quarter of a second.
                            piecesContainer.addClass('highlight');
                            setTimeout(() => {
                                piecesContainer.removeClass('highlight');
                            }, 750);

                            // Increase the number of pieces located.
                            const piecesLocated = parseInt(piecesContainer.data('pieces-located'), 10);
                            piecesContainer.data('pieces-located', piecesLocated + 1);

                            // Verify if the puzzle has been solved.
                            if (piecesLocated + 1 >= parseInt(piecesContainer.data('pieces-number'), 10)) {
                                piecesContainer.addClass('resolved');
                                jigsawInstance.stopTimerCounter(piecesContainer);
                                if (jigsawInstance.finishSound != null) {
                                    jigsawInstance.finishSound.play();
                                }
                                puzzleScreenOrientation.unlock();
                                puzzleScreenOrientation.lock('portrait');
                                puzzleScreenOrientation = null;
                                this.endMethod();
                            }
                        } else if ((currOrigPosX + difX) < canvasLeftBorder || (currOrigPosX + difX) > canvasRightBorder ||
                            (currOrigPosY + difY) < canvasTopBorder || (currOrigPosY + difY) > canvasBottomBorder) {
                            ev.target.style.left = currOrigPosX + 'px';
                            ev.target.style.top = currOrigPosY + 'px';
                        }
                    }
                });
                hammerPiece.on('panstart', (ev: { target: HTMLElement }) => {
                    if (hammerPieces[piecePosition[0]][piecePosition[1]].pieceEnabled) {
                        ev.target.setAttribute('orig-posX', ev.target.style.left !== undefined ? ev.target.style.left : '0');
                        ev.target.setAttribute('orig-posY', ev.target.style.top !== undefined ? ev.target.style.top : '0');

                        // Verify if the piece is not already positioned.
                        const currentPosX = $(this).attr('data-posX');
                        const currentPosY = $(this).attr('data-posY');
                        if (currentPosX === ev.target.style.left && currentPosY === ev.target.style.top) {
                            return false;
                        }

                        // Start timer counter.
                        jigsawInstance.startTimerCounter(piecesContainer);

                        // Verify if the cursor is inside the 'logical' area, besides being insided the 'real' area.
                        // var relativeCursorPosX = event.pageX - ui.position.left - piecesContainer.position().left;
                        // var relativeCursorPosY = event.pageY - ui.position.top - piecesContainer.position().top;
                        // if( relativeCursorPosY>(logicalSize+offset) || relativeCursorPosY<offset ||
                        //    relativeCursorPosX>(logicalSize+offset) || relativeCursorPosX<offset)
                        //    { return false; }

                        // Change z-index in order to put it on top of all the other pieces.
                        const zIndex = parseInt(piecesContainer.data('last-z-index'), 10);
                        $('#' + ev.target.id).css('z-index', zIndex);
                        piecesContainer.data('last-z-index', zIndex + 1);
                    }
                    return null;
                });

                const switchablePiece = new SwitchableHammerPiece();
                switchablePiece.hammerPiece = hammerPiece;
                switchablePiece.pieceEnabled = true;
                hammerPieces[r][c] = switchablePiece;
            }
        }

        // Shuffle pieces and initialize time and movement counters.
        jigsawInstance.shufflePieces(piecesContainer, options != null ? options.shuffle : null);
        // Apply the new puzzle size to every piece
        $('div.jigsaw div.big').css('-webkit-mask-size', realSize + 'px');
        jigsawInstance.resetCounters(piecesContainer);
        function initShuffleButton() {
            piecesContainer.data('pieces-located', 0);
            piecesContainer.removeClass('highlight');
            piecesContainer.removeClass('resolved');
            jigsawInstance.shufflePieces(piecesContainer, options != null ? options.shuffle : null);
            jigsawInstance.resetCounters(piecesContainer);
        }
    }

    /**
     * Resets the whole puzzle.
     *
     * @param options An associative array with the values 'rightLimit', 'leftLimit', 'topLimit' and 'bottomLimit'.
     */
    public restartPuzzle(options: any) {
        const currentContainer = $('#' + this.puzzleId);
        currentContainer.data('pieces-located', 0);
        currentContainer.removeClass('highlight');
        currentContainer.removeClass('resolved');
        jigsawInstance.shufflePieces(currentContainer, options != null ? options.shuffle : null);
        jigsawInstance.resetCounters(currentContainer);
    }

    /**
     * Resets the movement counter and the timer.
     *
     * @param piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */
    public resetCounters(piecesContainer: any): void {
        // Resets timer counter.
        jigsawInstance.stopTimerCounter(piecesContainer);
        jigsawInstance.setTimerCounter(piecesContainer, 0);

        // Resets movement counter.
        $('.movement_counter').html('0');
    }

    /**
     * Increase in one the movement counter.
     *
     * @param piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */
    increaseMovementCounter(piecesContainer: any): void {
        const counterSelector = $('.movement_counter');
        const count = parseInt(counterSelector.html(), 10);
        counterSelector.html((count + 1) + '');
    }

    /**
     * Starts the timer counter.
     *
     * @param piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */
    startTimerCounter(piecesContainer: any): void {
        // Verify if the timer has not already been started.
        if ($(piecesContainer).data('timer-status') !== 'running') {
            // Change status and set initial time.
            $(piecesContainer).data('timer-status', 'running');
            $(piecesContainer).data('timer-value', new Date().getTime());

            // Refresh timer each second.
            const interval = setInterval(() => {
                jigsawInstance.refreshTimerCounter(piecesContainer);
            }, 1000);
            $(piecesContainer).data('timer-interval', interval);
        }
    }

    /**
     * Stops the timer counter.
     *
     * @param piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */
    stopTimerCounter(piecesContainer: any): void {
        // Verify if the timer has not already been stoped.
        if ($(piecesContainer).data('timer-status') !== 'stopped') {
            $(piecesContainer).data('timer-status', 'stopped');
            clearInterval($(piecesContainer).data('timer-interval'));
        }
    }

    /**
     * Refresh the timer counter.
     *
     * @param piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     */
    refreshTimerCounter(piecesContainer: any): void {
        const currentTime = new Date().getTime();
        jigsawInstance.setTimerCounter(piecesContainer, currentTime - $(piecesContainer).data('timer-value'));
    }

    public refreshTimerBeforeQuit(): void {
        const currentContainer = $('#' + this.puzzleId);
        this.resetCounters(currentContainer);
    }

    /**
     * Sets the visible value of the timer counter.
     *
     * @param piecesContainer A jQuery selector, which can be an string or a jQuery object, of the element which contains the puzzle.
     * @param time The time passed in milliseconds
     */
    setTimerCounter(piecesContainer: any, time: any): void {
        time = (time > 0) ? time / 1000 : 0;
        const seconds = parseInt((time % 60).toString(), 10);
        const minutes = parseInt(((time / 60) % 60).toString(), 10);
        const hours = parseInt((time / 3600).toString(), 10);

        const secondsResult = ('0' + seconds).slice(-2);
        const minutesResult = ('0' + minutes).slice(-2);
        const hoursResult = ('0' + hours).slice(-2);

        $('.time_counter').html(hoursResult + ':' + minutesResult + ':' + secondsResult);
    }
}


