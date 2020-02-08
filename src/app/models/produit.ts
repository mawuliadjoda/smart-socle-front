export class Produit {
  id: number;
  nom: string;
  reference: string;
  categorie: string;
  qrcode: string;
  barcode: string;
  qte: number;
  prixUnitaire: number;
  description: string;
  constructor(attrs: any = null) {
      if (attrs) {
          this.build(attrs);
      }
  }

  build(attrs: any): void {
    this.nom= attrs.nom;
    this.reference = attrs.reference;
    this.categorie =  attrs.categorie;

    this.qte =  attrs.qte;
    this.prixUnitaire =  attrs.prixUnitaire;
    this.description =  attrs.description;
  }

  /**
  * Return a JSON object representation of the object
  * @return {Object}
  */
  toJson(): Object {
    return {
        nom: this.nom,
        reference : this.reference,
        categorie :  this.categorie,
        qte :  this.qte,
        prixUnitaire :  this.prixUnitaire,
        description :  this.description
    };
  }
}


