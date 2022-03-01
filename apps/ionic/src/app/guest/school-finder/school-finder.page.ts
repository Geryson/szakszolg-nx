import { Component, OnInit } from '@angular/core'
import {CrudPageClass} from "../../../shared/utils/crud-page.class"
import {ISchool, RESOURCES} from "@szakszolg-nx/api-interfaces"
import {SchoolService} from "../../../shared/services/school.service"
import {pages} from "../../../shared/utils/pages.const"

@Component({
  selector: 'nx12-school-finder',
  templateUrl: './school-finder.page.html',
  styleUrls: ['./school-finder.page.scss'],
})
export class SchoolFinderPage extends CrudPageClass<ISchool, { schools: Partial<ISchool>[] }> implements OnInit {

    protected editPage = pages.guest.schoolFinder
    protected resourceName = RESOURCES.SCHOOLS

  constructor(protected readonly resourceService: SchoolService) {
      super()
  }



}
