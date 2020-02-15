import { Produit } from '../../models/produit';


export class LoadProducts {
    static readonly type = '[Product] LoadProducts';
    constructor() {}
}

export class AddProductToCart {
    static readonly type = '[Product] AddProductToCart';
    constructor(public product: Produit, public qte: number) {}
}
// @see https://www.daptontechnologies.com/angular-ngxs-crud
export class DeleteProductToCart {
  static readonly type = '[Product] DeleteProductToCart';
  constructor(public id: number) {
  }
}
export class DeleteAllProductToCart {
  static readonly type = '[Product] DeleteAllProductToCart';
  constructor() {
  }
}

// @see https://www.daptontechnologies.com/angular-ngxs-crud
export class UpdateProductToCart {
  static readonly type = '[Produit] UpdateProductToCart';
  constructor(public payload: Produit, public id: number, public qte: number) {
  }
}
