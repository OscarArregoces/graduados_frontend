import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVinculacionComponent } from './form-vinculacion.component';

describe('FormVinculacionComponent', () => {
  let component: FormVinculacionComponent;
  let fixture: ComponentFixture<FormVinculacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVinculacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
