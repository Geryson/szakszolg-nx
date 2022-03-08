import {Component, Input, OnInit} from '@angular/core';
import {IQuizAnswer, IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
  selector: 'nx12-answer-true-false',
  templateUrl: './answer-true-false.component.html',
  styleUrls: ['./answer-true-false.component.scss'],
})
export class AnswerTrueFalseComponent implements OnInit {
    @Input() values:IQuizAnswer[] = []
    @Input() question!: IQuizQuestion
    @Input() index = 0

  constructor() { }

  ngOnInit() {}

}
