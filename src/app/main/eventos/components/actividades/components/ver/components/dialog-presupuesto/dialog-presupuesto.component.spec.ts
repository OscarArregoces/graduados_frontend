import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPresupuestoComponent } from './dialog-presupuesto.component';

describe('DialogPresupuestoComponent', () => {
  let component: DialogPresupuestoComponent;
  let fixture: ComponentFixture<DialogPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPresupuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
