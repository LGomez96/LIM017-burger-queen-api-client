import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-employees-modal',
  templateUrl: './employees-modal.component.html',
  styleUrls: ['./employees-modal.component.css']
})
export class EmployeesModalComponent implements OnInit {
  disableSelect = new FormControl(false);
  form!: FormGroup;
  actionBtn: string = 'Guardar';
  constructor(
    private dialogRef: MatDialogRef<EmployeesModalComponent>,
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    //private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      roles: ["", Validators.required],
    });
    console.log(this.editData)
    if (this.editData) {
      this.actionBtn = 'Editar';
      this.form.controls['email'].setValue(this.editData.email);
      this.form.controls['password'].setValue(this.editData.password);
      this.form.controls['roles'].setValue(this.editData.roles);
    }
  }

  
  addUsers() {
    if (!this.editData) {
      console.log(this.form.value)
      if (this.form.valid) {
        this.menuService.addProducts('http://localhost:8080/users', this.form.value)
          .subscribe(
            {
            next: (res: any) => {
              alert("Empleado agregado exitosamente")
              this.form.reset();
              this.dialogRef.close('save');
            },
            error: (error: any) => {
              alert("Error mientras se agregaba")
            }
          })
      }
    } else {
      this.updateEmployees()
    }
  } 
  updateEmployees(){
    this.menuService.updateEmployees(this.form.value, this.editData.id)
    .subscribe(
      {
        next: (res) => {
          console.log('info de update',res)
          alert('Edición exitosa');
          this.form.reset();
          this.dialogRef.close('Editar');
        },
        error: (error) => {
          alert(`${error}' Error en la actualización de datos`);
        }
      }
    )
  }
}
