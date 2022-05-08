import {Component, OnDestroy, OnInit} from '@angular/core';
import {PuzzleService} from "../../../shared/services/puzzle.service";
import {AlertController, LoadingController, NavController} from "@ionic/angular";
import {StaticService} from "../../../shared/services/static.service";
import {IPuzzle} from "@szakszolg-nx/api-interfaces";
import {QueryRef} from "apollo-angular";
import {Subscription} from "rxjs";
import {deepCopy} from "../../../shared/utils/object.tools";
import {RedirectService} from "../../../shared/services/redirect.service";
import {pages} from "../../../shared/utils/pages.const";
import { getImageUrl } from '../../../shared/utils/uri.tools';

@Component({
    selector: 'nx12-puzzle-picker',
    templateUrl: './puzzle-picker.page.html',
    styleUrls: ['./puzzle-picker.page.scss'],
})
export class PuzzlePickerPage implements OnInit, OnDestroy {
    getImageUrl = getImageUrl;
    private queryRef?: QueryRef<{ puzzles: Partial<IPuzzle>[] }>;
    private sub?: Subscription;

    puzzles: Partial<IPuzzle>[] = [];
    storedNames = [];

    loadingDialog: any;

    constructor(private puzzleService: PuzzleService, private navCtrl: NavController, private loadingController: LoadingController,
                private alertController: AlertController, private readonly redirect: RedirectService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    ionViewDidEnter() {
        this.puzzles = [];
        this.storedNames = [];
        this.downloadMissingImages();
    }

    async showLoadingDialog() {
        this.loadingDialog = await this.loadingController.create({
            message: StaticService.translatePipe.transform('MESSAGE.IMG_LOAD')
        });
        await this.loadingDialog.present();

        setTimeout(() => {
            this.loadingDialog.dismiss();
        }, 1000);
    }

    async showNoInternetDialog() {
        const alert = await this.alertController.create({
            message: StaticService.translatePipe.transform('MESSAGE.NO_INTERNET'),
            buttons: [
                {
                    text: StaticService.translatePipe.transform('BUTTONS.OKE')
                }]
        });
        await alert.present();
    }

    downloadMissingImages() {
        this.queryRef = this.puzzleService.browse();
        this.sub = this.queryRef.valueChanges.subscribe((res) => {
            this.puzzles = deepCopy(res.data.puzzles);
            this.showLoadingDialog();
        });
    }

    ionViewWillDisappear() {
    }

    puzzleSelected(puzzle: Partial<IPuzzle>) {
        this.puzzleService.activePuzzle = deepCopy(puzzle as IPuzzle);
        this.redirect.to(`${pages.guest.puzzle}`);
    }
}
