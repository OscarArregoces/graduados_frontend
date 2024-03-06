import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExternoComponent } from './form-externo.component';

describe('FormExternoComponent', () => {
  let component: FormExternoComponent;
  let fixture: ComponentFixture<FormExternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormExternoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
