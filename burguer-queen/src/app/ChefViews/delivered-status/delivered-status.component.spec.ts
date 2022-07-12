import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredStatusComponent } from './delivered-status.component';

describe('DeliveredStatusComponent', () => {
  let component: DeliveredStatusComponent;
  let fixture: ComponentFixture<DeliveredStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveredStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveredStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
