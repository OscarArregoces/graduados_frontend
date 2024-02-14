import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInfoCardComponent } from './custom-info-card.component';

describe('CustomInfoCardComponent', () => {
  let component: CustomInfoCardComponent;
  let fixture: ComponentFixture<CustomInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
