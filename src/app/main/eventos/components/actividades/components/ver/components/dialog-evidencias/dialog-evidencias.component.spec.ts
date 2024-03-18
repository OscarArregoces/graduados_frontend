import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvidenciasComponent } from './dialog-evidencias.component';

describe('DialogEvidenciasComponent', () => {
  let component: DialogEvidenciasComponent;
  let fixture: ComponentFixture<DialogEvidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEvidenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEvidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
