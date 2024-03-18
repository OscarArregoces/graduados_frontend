import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsistenciasComponent } from './dialog-asistencias.component';

describe('DialogAsistenciasComponent', () => {
  let component: DialogAsistenciasComponent;
  let fixture: ComponentFixture<DialogAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAsistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
