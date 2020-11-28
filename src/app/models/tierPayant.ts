import { EtablissementAssurance } from './etablissement-assurance';
import { Fournisseur } from './fournisseur';

export class TierPayant {
  id: number;
  nom: string;
  prenom: string;
  tel: string;
  numCarteAssurance: string;
  dateExpirationAssurance: Date;
  detailReduction: string;
  etablissementAssurance?: EtablissementAssurance;
}
