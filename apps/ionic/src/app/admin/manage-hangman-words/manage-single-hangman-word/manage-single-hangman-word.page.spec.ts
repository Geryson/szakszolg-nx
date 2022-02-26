import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageSingleHangmanWordPage } from './manage-single-hangman-word.page';

describe('ManageSingleHangmanWordPage', () => {
  let component: ManageSingleHangmanWordPage;
  let fixture: ComponentFixture<ManageSingleHangmanWordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSingleHangmanWordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSingleHangmanWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
