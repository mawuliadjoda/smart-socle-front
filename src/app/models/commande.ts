import { LigneCommande } from './ligne-commande';
import { Client } from './client';

export class Commande {
  ligneCommandes: [LigneCommande];
  client: Client;
  typeCommande?: string;
}
