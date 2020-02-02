import { State, Action, StateContext } from '@ngxs/store';

import { LoadProducts, AddProductToCart } from '../action';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';

export interface ProductStateModel {
    cart: Produit[];
    products: Produit[];
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    cart: [],
    products: []
  }
})
export class ProductState {
  constructor(
    private productService: ProduitService
  ) {}

  @Action(LoadProducts)
  all(ctx: StateContext<ProductStateModel>) {
    const state = ctx.getState();
    this.productService.getAll()
      .subscribe(
        (data) => {
          ctx.setState({
            ...state,
            products: data.map(p => new Produit(p)),
          });
        },
        (error) => {}
      ).add(() => {});
  }

  @Action(AddProductToCart)
  addProductToCart(ctx: StateContext<ProductStateModel>, action: AddProductToCart){
    const state = ctx.getState();
    ctx.setState({
      ...state,
      cart: [
        ...state.cart,
        action.product
      ]
    });
  }
}
