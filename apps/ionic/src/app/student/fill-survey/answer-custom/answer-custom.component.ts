import {Component, Input, OnInit} from '@angular/core';
import {IQuizAnswer, IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
  selector: 'nx12-answer-custom',
  templateUrl: './answer-custom.component.html',
  styleUrls: ['./answer-custom.component.scss'],
})
export class AnswerCustomComponent implements OnInit {
    @Input() values:IQuizAnswer[] = []
    @Input() question!: IQuizQuestion
    @Input() index = 0
  constructor() { }

  ngOnInit() {}

}
