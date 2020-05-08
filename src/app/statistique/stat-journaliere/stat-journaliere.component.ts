import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from 'src/app/services/ligne-commande.service';

@Component({
  selector: 'app-stat-journaliere',
  templateUrl: './stat-journaliere.component.html',
  styleUrls: ['./stat-journaliere.component.css']
})
export class StatJournaliereComponent implements OnInit {

  unites = [];
  constructor(private ligneCommandeService: LigneCommandeService) { }

  ngOnInit() {
    this.initUnites();
  }

  initUnites() {
    this.unites = [
      {valeur: 10000},
      {valeur: 10000},
      {valeur: 10000},
      {valeur: 10000},
      {valeur: 10000}
    ];
  }
}
