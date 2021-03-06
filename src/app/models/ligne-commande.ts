import { Produit } from './produit';

export class LigneCommande {
  id: number;
  produit: Produit;
  qte: number;
  typeCommande?: string;
  fournisseur?: any;
  isReceive: boolean;
  receiveDate?: any;

  // is just used on front
  isDisableUpdate?: boolean;
  isActif: boolean;
}
