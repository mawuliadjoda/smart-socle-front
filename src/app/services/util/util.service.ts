import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LigneCommande } from 'src/app/models/ligne-commande';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public mapDisplayNavigation: Map<string, any> =  new Map();

  constructor( private snackBar: MatSnackBar) {
    this.mapDisplayNavigation.set('home', {parent: 'Acueil', child: 'Tableau de bord'});
    this.mapDisplayNavigation.set('Activite', {parent: 'Activités', child: ''});
    this.mapDisplayNavigation.set('administration', {parent: 'Administration', child: ''});
    this.mapDisplayNavigation.set('parametrage', {parent: 'Paramétrage', child: ''});

    this.mapDisplayNavigation.set('search', {parent: 'Activités', child: 'Recherche'} );
    this.mapDisplayNavigation.set('declaration-vente', {parent: 'Activités', child: 'Déclaration vente'} );
    this.mapDisplayNavigation.set('list-commande-sortant', {parent: 'Administration', child: 'Ventes effectuées'});
    this.mapDisplayNavigation.set('produits', {parent: 'Administration', child: 'Liste des produits'});
    this.mapDisplayNavigation.set('am-chart', {parent: 'Administration', child: 'Statistique de ventes'});
    this.mapDisplayNavigation.set('compare-stat', {parent: 'Administration', child: 'Audit des ventes'});
    this.mapDisplayNavigation.set('commandes-entrant', {parent: 'Administration', child: 'Approvisionnement'});

    this.mapDisplayNavigation.set('commandes-attente', {parent: 'Administration', child: 'Commandes en attente de réception'});
    this.mapDisplayNavigation.set('commandes-entrant-reception', {parent: 'Administration', child: 'Reception de commande'});
    this.mapDisplayNavigation.set('produitsAcmder', {parent: 'Administration', child: 'Produit à cours de stock'});
    this.mapDisplayNavigation.set('gestion-categorie', {parent: 'Administration', child: 'Liste des catégories médicament'});
    this.mapDisplayNavigation.set('gestion-fournisseur', {parent: 'Administration', child: 'Liste Fournisseurs'});
    this.mapDisplayNavigation.set('generate-qr-code', {parent: 'Administration', child: 'Impression QR Code'});

    this.mapDisplayNavigation.set('pannier', {parent: 'Activités', child: 'Détail du panier'});

    this.mapDisplayNavigation.set('handle-search', {parent: 'Activités', child: 'Gérer les séléctionns'});
    this.mapDisplayNavigation.set('gestion-tier-payant', {parent: 'Activités', child: 'Gérer les tiers-payants'});
    this.mapDisplayNavigation.set('etablissement-assurance', {parent: 'Activités', child: 'Gérer les établissements d\'assurance'});

    this.mapDisplayNavigation.set('recouvrement-assurance', {parent: 'Administration', child: 'Recouvrement Assurance'});



  }


  reduceArray(ligneCommandes: Array<LigneCommande> ) {

    const result = [...ligneCommandes.reduce((r, o) => {
      const key = o.id;

      const item = r.get(key) || Object.assign({}, o, {
        qte: 0,
        // permettre la modification de la qte du panier
        isDisableUpdate: true
      });

      item.qte += o.qte;

      return r.set(key, item);
    }, new Map()).values()];

    console.log('===============================reduce:' + result);
    result.forEach(element => {
      console.log(element.id, element.produit.nom, element.qte, element.isDisableUpdate);
    });
    return result;
  }

  calculPrixCommande(ligneCommandes: Array<LigneCommande> ) {
    let total = 0;
    ligneCommandes.forEach(element => {
      total += element.produit.prixUnitaire * element.qte;
    });
    return total;
  }

  displayMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: environment.durationOfSnackBar,
    });
  }

}
