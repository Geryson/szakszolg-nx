import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../../shared/services/token.service";

@Component({
  selector: 'nx12-answer-free-answer',
  templateUrl: './answer-free-answer.component.html',
  styleUrls: ['./answer-free-answer.component.scss'],
})
export class AnswerFreeAnswerComponent implements OnInit {
  constructor(public readonly service: TokenService) { }

  ngOnInit() {}

}
