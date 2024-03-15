import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaQrComponent } from './busqueda-qr.component';

describe('BusquedaQrComponent', () => {
  let component: BusquedaQrComponent;
  let fixture: ComponentFixture<BusquedaQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
