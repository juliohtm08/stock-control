import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

// compartilha os dados dos produtos entre diferentes partes da aplicação

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  // emissor dos dados
  public productsDataEmitter$ = new BehaviorSubject<
    GetAllProductsResponse[] | null
  >(null);

  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsDatas(products: Array<GetAllProductsResponse>): void {
    if (products) {
      this.productsDataEmitter$.next(products); // emite os produtos
      this.getProductsDatas(); // filtra e armazena no array interno
    }
  }
  getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1), // pega só o valor atual
        map((data) => data?.filter((product) => product.amount > 0) ?? []) // filtra produtos com quantidade > 0
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response; // salva localmente
          }
        },
      });
    return this.productsDatas;
  }
}
