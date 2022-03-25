import { Component, OnInit } from '@angular/core'
import { AlertService } from '../../shared/services/alert.service'
import { link, pages } from '../../shared/utils/pages.const'
import { RedirectService } from '../../shared/services/redirect.service'
import {StorageService} from "../../shared/services/storage.service";
import {STORAGE_KEY} from "../../shared/utils/constants";
import {TokenService} from "../../shared/services/token.service";

@Component({
    selector: 'nx12-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    readonly eduIdMaxLength = 11
    readonly eduIdMinLength = this.eduIdMaxLength // This might change in the future

    eduId = ''
    prevEduId=''
    pages = pages
    link = link
    differentEduId=false
    constructor(private readonly alert: AlertService, private readonly redirect: RedirectService,
                private readonly storage: StorageService, public readonly service: TokenService) {}

    ngOnInit() {
        console.log(this.service.answers)
    }
    ionViewDidEnter(){
        this.eduId=''
    }
    async eduIdIsDifferent(){
        await this.storage.get(STORAGE_KEY.EDU_ID).then(om => {
            if(om)
                this.prevEduId=om
        })
        console.log(this.prevEduId)
        if(this.prevEduId === '' || this.prevEduId===this.eduId){
            this.saveEduId()
        }
        else {
            this.differentEduId=true
            return
        }
    }
    eduIdIsValid() {
            return (
                this.eduId.length >= this.eduIdMinLength && this.eduId.length <= this.eduIdMaxLength && this.eduId[0] == '7'
            )

    }


    saveEduId() {
        if (this.eduIdIsValid()) {
            this.storage.set(STORAGE_KEY.EDU_ID, this.eduId).then()
            this.redirect.to(pages.student.enterToken)

        } else {
            this.alert.show('ERROR_OM', ['AGAIN']).then()
        }
    }

     deleteEduId() {
         this.storage.set(STORAGE_KEY.EDU_ID, this.eduId).then()
         this.service.clearStorage()
         this.prevEduId=''
         this.differentEduId=false
         this.redirect.to(pages.student.enterToken)
    }

    async savePrevAnswers() {
        await this.storage.get(STORAGE_KEY.SURVEY_ANSWER).then(ans=>{
            if(ans){
                this.service.save=true
                this.service.answers=ans
            }
        })
        await this.service.cancel()
        this.deleteEduId()
    }
}
