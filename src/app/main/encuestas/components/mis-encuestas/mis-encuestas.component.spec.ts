import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisEncuestasComponent } from './mis-encuestas.component';

describe('MisEncuestasComponent', () => {
  let component: MisEncuestasComponent;
  let fixture: ComponentFixture<MisEncuestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisEncuestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
