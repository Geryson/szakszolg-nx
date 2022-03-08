import {Component, Input, OnInit} from '@angular/core';
import {IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
  selector: 'nx12-answer-rating',
  templateUrl: './answer-rating.component.html',
  styleUrls: ['./answer-rating.component.scss'],
})
export class AnswerRatingComponent implements OnInit {
    @Input() values:number[] = []
    @Input() questions: IQuizQuestion[] | undefined
  constructor() { }

  ngOnInit() {}

}
