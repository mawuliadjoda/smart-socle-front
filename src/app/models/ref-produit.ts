
export class RefProduit {
  id: number;
  nom: string;
  reference: string;
  categorie: string;
  qrcode: string;
  barcode: string;
  description: string;
  prixUnitaire: number;
  constructor(attrs: any = null) {
      if (attrs) {
          this.build(attrs);
      }
  }

  build(attrs: any): void {
    this.id = attrs.id;
    this.nom = attrs.nom;
    this.reference = attrs.reference;
    this.categorie =  attrs.categorie;
    this.description =  attrs.description;
    this.prixUnitaire = attrs.prixUnitaire;
  }


  // Return a JSON object representation of the object
  toJson(): any {
    return {
        nom: this.nom,
        reference : this.reference,
        categorie :  this.categorie,
        description :  this.description
    };
  }
}



