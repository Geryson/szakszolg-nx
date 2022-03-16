import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../../shared/services/token.service";

@Component({
  selector: 'nx12-answer-true-false',
  templateUrl: './answer-true-false.component.html',
  styleUrls: ['./answer-true-false.component.scss'],
})
export class AnswerTrueFalseComponent implements OnInit {
  constructor(public readonly service: TokenService) { }

    ngOnInit() {}

    next(bool: string) {
        this.service.answers[this.service.index].answer = bool
        this.service.index++
    }

}
