import { State, Action, StateContext } from '@ngxs/store';

import { LoadProducts, AddProductToCart, DeleteProductToCart , UpdateProductToCart, DeleteAllProductToCart} from '../action';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { LigneCommande } from 'src/app/models/ligne-commande';

export interface ProductStateModel {
    cart: LigneCommande[];
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
    // const state = ctx.getState();

    /*let ligneCommande = null;
    let newCarts = [];
    if(state.cart){
      let initialList = state.cart;
      const foundLineCommand = initialList.find(element => element.id === action.product.id);
      if (foundLineCommand) {
        foundLineCommand.qte = foundLineCommand.qte = action.qte;
        const index = initialList.findIndex(element => element.id === action.product.id);
        initialList.splice(index, 1, foundLineCommand);
        newCarts = initialList;
      } else {
        ligneCommande = {
          id: action.product.id,
          produit: action.product,
          qte: action.qte
        };
        newCarts = [ ...state.cart, ligneCommande]
      }
    }*/

    const state = ctx.getState();
    let ligneCommande = {
      id: action.product.id,
      produit: action.product,
      qte: action.qte
    };

    ctx.setState({
      ...state,
      // cart: [ ...state.cart, action.product]
      cart: [ ...state.cart, ligneCommande]
    });

  }

  // @see https://www.daptontechnologies.com/angular-ngxs-crud
  @Action(DeleteProductToCart)
  deleteTodo(ctx: StateContext<ProductStateModel>, {id}: DeleteProductToCart) {
    const state = ctx.getState();
    const filteredArray = state.cart.filter(item => item.id !== id);
    ctx.setState({
        ...state,
        cart: filteredArray,
    });
  }

  // DeleteAllProductToCart
  @Action(DeleteAllProductToCart)
  deleteAllTodo(ctx: StateContext<ProductStateModel>, {}: DeleteAllProductToCart) {
    const state = ctx.getState();
    //const filteredArray = state.cart.filter(item => item.id !== id);
    //state.cart.length = 0;
    ctx.setState({
        ...state,
        cart: [],
    });
  }

  // @see https://www.daptontechnologies.com/angular-ngxs-crud
  @Action(UpdateProductToCart)
  updateTodo({getState, setState}: StateContext<ProductStateModel>, {payload, id, qte}: UpdateProductToCart) {
    const state = getState();
    const todoList = [...state.cart];
    const todoIndex = todoList.findIndex(item => item.id === id);

    let ligneCommande = {
      id: payload.id,
      produit: payload,
      qte: qte
    };

    // todoList[todoIndex] = payload;
    todoList[todoIndex] = ligneCommande;
    setState({
        ...state,
        cart: todoList,
    });
  }


}
