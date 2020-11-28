import { Produit } from './produit';
import { TierPayant } from './tierPayant';

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
  tierPayant?: TierPayant;
}
