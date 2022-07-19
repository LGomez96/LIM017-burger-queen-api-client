import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-ready-orders',
  templateUrl: './ready-orders.component.html',
  styleUrls: ['./ready-orders.component.css']
})
export class ReadyOrdersComponent implements OnInit {
  isShownDelivered: boolean = false ; //
  isShownReadyOrders: boolean = false;
  menuDelivered: any[] = [];
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this. getOrdersDelivered();
    this.getOrdersReady();

  }

   getOrdersDelivered () {
    this.menuService.getOrder()
    .subscribe({
      next:(res) => {
        //guardar en variable el filtro
        const saveOrdersDelivered = res.filter((e: any)=> e.status === 'delivered');
        this.menuDelivered = saveOrdersDelivered;
        console.info('your delivered array here =>', saveOrdersDelivered)
      },
      error:(error) => {
        alert(`${error} Error en la carga de datos`)
      }

    })
  }

  getOrdersReady(){
    this.menuService.getOrder()
    .subscribe({
      next:(res) => {
        //guardar en variable el filtro
        const saveOrdersDelivered = res.filter((e: any)=> e.status === 'up ready to server');
        this.menuDelivered = saveOrdersDelivered;
        console.info('your up ready to server array here =>', saveOrdersDelivered)
      },
      error:(error) => {
        alert(`${error} Error en la carga de datos`)
      }
    })
  }

  updateStatus(id: number){
    const data = {
      status: 'up ready to server'
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

  toggleShowDelivered() {

    this.isShownDelivered = ! this.isShownDelivered;
    this.isShownReadyOrders = false;
    this.getOrdersDelivered();
    
    }
    toggleShowReadyOrders() {

      this.isShownReadyOrders = ! this.isShownReadyOrders;
      this.isShownDelivered = false;
      this.getOrdersReady();
      
      }
    
}
