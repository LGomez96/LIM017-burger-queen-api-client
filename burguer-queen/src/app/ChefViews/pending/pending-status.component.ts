//import { Direction } from '@angular/cdk/bidi';
import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-pending-status',
  templateUrl: './pending-status.component.html',
  styleUrls: ['./pending-status.component.css']
})
export class PendingStatusComponent implements OnInit {
  menuPending: any[] = [];
  //direction: Direction = "ltr";
 
  constructor(private menuService: MenuService  ) { }

  ngOnInit(): void {
    this.getOrdersPending();
  }

  getOrdersPending(){
    this.menuService.getOrder()
    .subscribe({
      next: (res) => {
       const pendingArray = res.filter((e: any) => e.status === 'pending');
       this.menuPending = pendingArray
       console.info('your pending array here =>', pendingArray)
      }
    })
  }

  updateStatus(id: number){
    const data = {
      status: 'delivered'
    }
    this.menuService.updateOrder(data, id)
    .subscribe({
      next:(res)=>{
        alert(`${res} Actualizacion de estado exitosa`)
      }, 
      error:(error) => {
        alert(`${error} Error en la actualización de estado`)
      }
    })
  }

  
}
