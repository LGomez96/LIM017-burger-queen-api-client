import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface Product {
  dateEntry?: string;
  id: number;
  image: string;
  name: string;
  price: number;
  type: string;
  quantity: number;
  total?: number
}
export interface ProductCart {
  dateEntry?: string;
  id: number;
  image: string;
  name: string;
  price: number;
  type: string;
  quantity: number;
  total: number
}
@Injectable({
  providedIn: 'root'
})
export class WaiterService {

  isShowComponent: boolean = true;
  isShowOrders: boolean = true;
  arrayProducts: any = [];
  public productList = new BehaviorSubject<any>([]);
  constructor() { }

  getProducts(): Observable<any> {
    const emittedProductList = this.productList.asObservable();
    return emittedProductList;
  }


  removeCartItem(product: any) {
    this.arrayProducts.map((e: any, index: any) => {
      if (product.id === e.id) {
        this.arrayProducts.splice(index, 1);
      }
    console.log('removeCartItem', product.id)
    this.productList.next(this.arrayProducts);
    })
 
  }
  removeAllCart() {
    this.arrayProducts = [];
    this.productList.next(this.arrayProducts);
  }


  addtoCart(product: any) {
    if (this.arrayProducts.length === 0) {
      this.arrayProducts.push(product);
    } else {
      if (this.arrayProducts.filter((e: ProductCart) => e.id === product.id).length > 0) {
        console.info('estas añadiendo este producto nuevamente')
        } else {
        this.arrayProducts.push(product);
      }
    }
    this.productList.next(this.arrayProducts);
    console.log("array con productos del cliente", this.arrayProducts)
  }
 
 
}
