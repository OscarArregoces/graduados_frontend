import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLoginGraduadoComponent } from './auto-login-graduado.component';

describe('AutoLoginGraduadoComponent', () => {
  let component: AutoLoginGraduadoComponent;
  let fixture: ComponentFixture<AutoLoginGraduadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoLoginGraduadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoLoginGraduadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
