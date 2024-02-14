import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEncuestaComponent } from './report-encuesta.component';

describe('ReportEncuestaComponent', () => {
  let component: ReportEncuestaComponent;
  let fixture: ComponentFixture<ReportEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEncuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
