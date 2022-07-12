import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Product } from 'src/waiter/waiter.service';

export interface Orders {
  cliente: string;
  dataEntry: any;
  id: number;
  products: Product;
  status: string;
  userId: number;
}

@Component({
  selector: 'app-delivered-status',
  templateUrl: './delivered-status.component.html',
  styleUrls: ['./delivered-status.component.css']
})
export class DeliveredStatusComponent implements OnInit {
 menuDelivered: any[] = [];
  constructor( private menuService: MenuService) { }

  ngOnInit(): void {
    this.getOrdersDelivered();
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
}
