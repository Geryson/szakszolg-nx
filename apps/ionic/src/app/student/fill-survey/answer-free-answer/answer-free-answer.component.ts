import {Component, Input, OnInit} from '@angular/core';
import {IQuizAnswer, IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
  selector: 'nx12-answer-free-answer',
  templateUrl: './answer-free-answer.component.html',
  styleUrls: ['./answer-free-answer.component.scss'],
})
export class AnswerFreeAnswerComponent implements OnInit {
    @Input() values:IQuizAnswer[] = []
    @Input() question!: IQuizQuestion
    @Input() index = 0
  constructor() { }

  ngOnInit() {}

}
