import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public mapDisplayNavigation: Map<string, any> =  new Map();

  constructor() {
    this.mapDisplayNavigation.set('home', {parent: 'Acueil', child: ''});
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

  }

}
