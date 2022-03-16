import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../../shared/services/token.service";

@Component({
  selector: 'nx12-answer-rating',
  templateUrl: './answer-rating.component.html',
  styleUrls: ['./answer-rating.component.scss'],
})
export class AnswerRatingComponent implements OnInit {
    constructor(public readonly service: TokenService) { }

    ngOnInit() {
    }

}
