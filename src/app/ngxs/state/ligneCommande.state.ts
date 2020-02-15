import { State, Action, StateContext } from '@ngxs/store';

import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { LoadLigneCommande, AddLigneCommandeToCart, DeleteLigneCommandeToCart, UpdateLigneCommandeToCart, DeleteAllLigneCommandeToCart } from '../action/commande.action';
import { LigneCommande } from 'src/app/models/ligne-commande';

export interface LigneCommandeStateModel {
    cart: LigneCommande[];
    ligneCommandes: LigneCommande[];
}

@State<LigneCommandeStateModel>({
  name: 'LigneCommande',
  defaults: {
    cart: [],
    ligneCommandes: []
  }
})
export class LigneCommandeState {
  constructor(
    private LigneCommandeService: ProduitService
  ) {}

  @Action(LoadLigneCommande)
  all(ctx: StateContext<LigneCommandeStateModel>) {
    const state = ctx.getState();
    this.LigneCommandeService.getAll()
      .subscribe(
        (data) => {
          ctx.setState({
            ...state,
            ligneCommandes: data.map(p => new Produit(p)),
          });
        },
        (error) => {}
      ).add(() => {});
  }

  @Action(AddLigneCommandeToCart)
  addLigneCommandeToCart(ctx: StateContext<LigneCommandeStateModel>, action: AddLigneCommandeToCart){
    const state = ctx.getState();
    ctx.setState({
      ...state,
      cart: [
        ...state.cart,
        action.ligneCommande
      ]
    });
  }

  // @see https://www.daptontechnologies.com/angular-ngxs-crud
  @Action(DeleteLigneCommandeToCart)
  deleteTodo(ctx: StateContext<LigneCommandeStateModel>, {id}: DeleteLigneCommandeToCart) {
    const state = ctx.getState();
    const filteredArray = state.cart.filter(item => item.id !== id);
    ctx.setState({
        ...state,
        cart: filteredArray,
    });
  }

  @Action(DeleteAllLigneCommandeToCart)
  deleteAllTodo(ctx: StateContext<LigneCommandeStateModel>, {}: DeleteAllLigneCommandeToCart) {
    const state = ctx.getState();
    const filteredArray = [];
    ctx.setState({
        ...state,
        cart: filteredArray,
    });
  }

  // @see https://www.daptontechnologies.com/angular-ngxs-crud
  @Action(UpdateLigneCommandeToCart)
  updateTodo({getState, setState}: StateContext<LigneCommandeStateModel>, {payload, id}: UpdateLigneCommandeToCart) {
    const state = getState();
    const todoList = [...state.cart];
    const todoIndex = todoList.findIndex(item => item.id === id);
    todoList[todoIndex] = payload;
    setState({
        ...state,
        cart: todoList,
    });
  }


}
