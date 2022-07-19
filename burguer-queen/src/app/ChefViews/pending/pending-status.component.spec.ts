
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PendingStatusComponent } from './pending-status.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PendingStatusComponent', () => {
  let component: PendingStatusComponent;
  let fixture: ComponentFixture<PendingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
      RouterTestingModule],
      declarations: [ PendingStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
