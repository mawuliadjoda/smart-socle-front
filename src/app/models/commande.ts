import { LigneCommande } from './ligne-commande';
import { Client } from '../model/client';

export class Commande {
  ligneCommandes: [LigneCommande];
  client: Client;
  typeCommande?: string;
}
