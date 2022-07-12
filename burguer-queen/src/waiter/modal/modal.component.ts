import { Component, Inject, OnInit } from '@angular/core';
import { FormControl,  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  disableSelect = new FormControl(false);
  card: any = [];
  form!: FormGroup;
  actionBtn: string = 'Pending'
  selection!: string;
  constructor(
        public menuService: MenuService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
   
  ) { }

  ngOnInit(): void {
   this.getOrderChef();
    this.form = this.formBuilder.group({
      status: ['', Validators.required]
    });
    console.log(this.editData)
    if (this.editData) {
      this.actionBtn = 'Delivered';
      this.form.controls['status'].setValue(this.editData.status)
    }
  }
  getOrderChef(){
    this.menuService.getOrder().subscribe(
      (res) => (this.card = res, console.log(res)));
  }
  updateOrder(id:number) {
    const data = {
      status: 'delivered'
    }
    this.menuService.updateOrder(data, this.editData.id)
      .subscribe(
        {
          next: (res) => {
            console.log(res)
            alert('Actualización exitosa');
            this.form.reset();
          },
          error: (error) => {
            alert(`${error} Error en la actualización de estado`)
          }
        })
  }
  onClick(res: any): void {
  
    console.log('id', res);
    this.selection = res;
  }
}
