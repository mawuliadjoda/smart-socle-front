import { Produit } from '../../models/produit';
import { LigneCommande } from 'src/app/models/ligne-commande';


export class LoadLigneCommande {
    static readonly type = '[LigneCommande] LoadLigneCommandes';
    constructor() {}
}

export class AddLigneCommandeToCart {
    static readonly type = '[LigneCommande] AddLigneCommandeToCart';
    constructor(public ligneCommande: LigneCommande) {}
}
// @see https://www.daptontechnologies.com/angular-ngxs-crud
export class DeleteLigneCommandeToCart {
  static readonly type = '[LigneCommande] DeleteLigneCommandeToCart';
  constructor(public id: number) {
  }
}
// @see https://www.daptontechnologies.com/angular-ngxs-crud
export class UpdateLigneCommandeToCart {
  static readonly type = '[LigneCommande] UpdateLigneCommandeToCart';
  constructor(public payload: LigneCommande, public id: number) {
  }
}
