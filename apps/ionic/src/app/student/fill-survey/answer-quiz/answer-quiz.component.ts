import {Component, Input, OnInit} from '@angular/core';
import {IQuizAnswer, IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
  selector: 'nx12-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrls: ['./answer-quiz.component.scss'],
})
export class AnswerQuizComponent implements OnInit {
    @Input() values:IQuizAnswer[] = []
    @Input() question!: IQuizQuestion
    @Input() index = 0
  constructor() { }

  ngOnInit() {}

}
