import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEventosComponent } from './tipo-eventos.component';

describe('TipoEventosComponent', () => {
  let component: TipoEventosComponent;
  let fixture: ComponentFixture<TipoEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
