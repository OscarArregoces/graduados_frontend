import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGraduadosComponent } from './report-graduados.component';

describe('ReportGraduadosComponent', () => {
  let component: ReportGraduadosComponent;
  let fixture: ComponentFixture<ReportGraduadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGraduadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGraduadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
