import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ItemsEdited, Order } from '../../app.module';
import { MenuService } from '../../services/menu.service';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 

  constructor(private menuService: MenuService,
    public formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
 
}
}