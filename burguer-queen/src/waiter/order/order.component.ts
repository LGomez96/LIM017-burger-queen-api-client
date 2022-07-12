import { Component, OnInit, Input, Output } from '@angular/core';
import { MenuService } from '../../app/services/menu.service';
import { Order } from '../../app/app.module';
import { Product, ProductCart, WaiterService } from '../waiter.service';
import { Direction } from '@angular/cdk/bidi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  public products: any = [];
  title = 'Ecuafood';
  totalOrder: number = 0;
  direction: Direction = "ltr";
  form!: FormGroup;

  constructor(private menuService: MenuService,
    public waiterService: WaiterService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.comeToService();
    this.form = this.formBuilder.group({
      client: ["", Validators.required],
      userId: ["", Validators.required],
      dateEntry: ["", Validators.required]
    });
  }
  comeToService(){
    this.waiterService.getProducts()
    .subscribe(res=> {
      this.products = res;
      // console.log("array que acumula las ordenes que vienen del servicio",this.products)
      this.totalOrder = this.orderOfClient(this.products);
    })
  }
  orderOfClient(products:ProductCart[]){
   console.log("orden del cliente",products)
    let grandTotal = 0;
    products.map((e:any) => {
      grandTotal += e.total;
    })
    return grandTotal;
  }

  addOrder(){
   let user = this.form.value;
    const objOrder: any = {
      "client": user.client,
      "userId": user.userId,
      "dataEntry": user.dataEntry,
      "products": this.products,
      "status": "pending"
    }

    if(this.form.valid){
      this.menuService.addProducts('http://localhost:8080/orders', objOrder)
      .subscribe({
        next: (res) => {
          console.log(res)
          alert("Orden creada exitosamente")
          this.form.reset();
        },
        error:(error) => {
          alert("Error mientras se agregaba la orden")

        }
      })
    }
  }

  removeItem(product: any){
    this.waiterService.removeCartItem(product)
    console.log('remover item', product)
   
  }
  emptyCart(){
    this.waiterService.removeAllCart()
  }

}
