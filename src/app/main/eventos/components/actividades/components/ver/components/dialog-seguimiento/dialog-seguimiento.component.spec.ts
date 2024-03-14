import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeguimientoComponent } from './dialog-seguimiento.component';

describe('DialogSeguimientoComponent', () => {
  let component: DialogSeguimientoComponent;
  let fixture: ComponentFixture<DialogSeguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSeguimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
