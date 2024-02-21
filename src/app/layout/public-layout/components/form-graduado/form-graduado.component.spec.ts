import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGraduadoComponent } from './form-graduado.component';

describe('FormGraduadoComponent', () => {
  let component: FormGraduadoComponent;
  let fixture: ComponentFixture<FormGraduadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGraduadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGraduadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
