import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGraficoComponent } from './dialog-grafico.component';

describe('DialogGraficoComponent', () => {
  let component: DialogGraficoComponent;
  let fixture: ComponentFixture<DialogGraficoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGraficoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
