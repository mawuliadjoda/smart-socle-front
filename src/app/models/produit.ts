import { RefProduit } from './ref-produit';

export class Produit {
  id: number;
  nom: string;
  reference: string;
  categorie: string;
  qrcode: any;
  barcode: any;
  qte: number;
  prixUnitaire: number;
  description: string;
  cis: string;
  dci: string;
  // refProduit: RefProduit;
  emplacement?: string;
  formeDosage?: string;
  dateExpiration?: Date;
  constructor(attrs: any = null) {
    if (attrs) {
      this.build(attrs);
    }
  }

  build(attrs: any): void {
    this.nom = attrs.nom;
    this.reference = attrs.reference;
    this.categorie = attrs.categorie;

    this.qte = attrs.qte;
    this.prixUnitaire = attrs.prixUnitaire;
    this.description = attrs.description;
    // this.refProduit = new RefProduit();
  }
  setRefProduit(refProduit: RefProduit) {
    this.nom = refProduit.nom;
    this.reference = refProduit.reference;
    this.categorie = refProduit.categorie;
    this.description = refProduit.description;
    this.prixUnitaire = refProduit.prixUnitaire;
  }
  /**
   * Return a JSON object representation of the object
   *
   */
  toJson(): any {
    return {
      nom: this.nom,
      reference: this.reference,
      categorie: this.categorie,
      qte: this.qte,
      prixUnitaire: this.prixUnitaire,
      description: this.description
    };
  }
}
