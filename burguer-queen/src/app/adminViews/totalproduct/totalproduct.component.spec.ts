import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TotalproductComponent } from './totalproduct.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

describe('TotalproductComponent', () => {
  let component: TotalproductComponent;
  let fixture: ComponentFixture<TotalproductComponent>;

  beforeEach(async () => {
    let matDialogService: jasmine.SpyObj<MatDialog>;
    matDialogService = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: matDialogService,
        }
      ],
      declarations: [ TotalproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
