import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../app.module';
import { MenuService } from '../../services/menu.service';
import {EmployeesModalComponent} from '../../adminViews/employees-modal/employees-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table'
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
 users: any[] = [];
 form!: FormGroup;
 productsView = true;
 displayedColumns: string[] = ['email', 'password', 'roles', 'action'];
 dataSource!: MatTableDataSource<any>;

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;

 @Output() productDeleteEvent = new EventEmitter<string>();
 @Input() selection!: User;
 @Output() updateEvent = new EventEmitter<User>();
 @Output() newItemEvent = new EventEmitter<string>();
 @Input() className = 'btn-primary';

  constructor(private menuService: MenuService,
    public formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
      this.getAllUser();
        this.form = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
          roles: ['', Validators.required],
  
        })
  }

  getAllUser(){
    this.menuService.getAllUsers()
    .subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  onUserDelete( id: string){
    if(confirm('¿Estás seguro?')){
      this.menuService.deleteUser(id)
      .subscribe(
        res => { console.log('borrando empleado', res)
          const productArray = this.users.filter( employees => employees.id !== id );
          this.users = [...productArray];
        }
      )
    }
  }

  editEmployees(row: any){
    this.dialog.open(EmployeesModalComponent, {
      width: '50%',
      data: row

    });

  }
  openDialog() {
    this.dialog.open(EmployeesModalComponent, {
      width: '50%'

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logOut(){
    localStorage.clear();
  }
}
