import {Component, Input, OnInit} from '@angular/core';
import {IQuizAnswer, IQuizQuestion} from "@szakszolg-nx/api-interfaces";

@Component({
  selector: 'nx12-answer-skill',
  templateUrl: './answer-skill.component.html',
  styleUrls: ['./answer-skill.component.scss'],
})
export class AnswerSkillComponent implements OnInit {
    @Input() values:IQuizAnswer[] = []
    @Input() question!: IQuizQuestion
    @Input() index = 0
  constructor() { }

  ngOnInit() {}

}
