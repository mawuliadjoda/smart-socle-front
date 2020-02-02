import { Produit } from '../../models/produit';


export class LoadProducts {
    static readonly type = '[Product] LoadProducts';
    constructor() {}
}

export class AddProductToCart {
    static readonly type = '[Product] AddProductToCart';
    constructor(public product: Produit) {}
}
