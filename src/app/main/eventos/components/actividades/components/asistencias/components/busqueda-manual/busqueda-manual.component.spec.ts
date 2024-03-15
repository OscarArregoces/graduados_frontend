import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaManualComponent } from './busqueda-manual.component';

describe('BusquedaManualComponent', () => {
  let component: BusquedaManualComponent;
  let fixture: ComponentFixture<BusquedaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
