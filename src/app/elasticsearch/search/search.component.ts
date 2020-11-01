import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ElasticsearchService } from 'src/app/services/elasticsearch/elasticsearch.service';
import { Produit } from 'src/app/models/produit';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fieldValue: string;
  produits: [];

  selecton = new FormControl();
  @Output() selectonEmitter = new EventEmitter<string>();

  selectedProduit: Produit;
  interval;
  constructor(private elasticsearchService: ElasticsearchService,
              private router: Router,
              private snackBar: MatSnackBar,
              private store: Store) { }

  ngOnInit() {
  }

  // search_($event) {
  //   this.fieldValue = $event.target.value;
  //   if (this.fieldValue.length > 2) {
  //     this.elasticsearchService.searchProduit('nom', this.fieldValue).subscribe(
  //       data => {
  //         this.produits = data;
  //         if (data && data.length === 1 ) {
  //           this.selecton.setValue(data[0]);
  //         }
  //       }
  //     );
  //   }
  // }
  // add(produits: Produit[]) {
  //   if (this.selecton.value) {
  //     let data = null;
  //     // Un array est attendu à la réception
  //     if (this.selecton.value instanceof Array) {
  //       data = this.selecton.value;
  //     } else {
  //       data = [this.selecton.value];
  //     }
  //     this.selectonEmitter.emit(data);
  //     this.fieldValue = '';
  //     this.selecton = new FormControl();
  //     this.produits = [];
  //     console.log(this.selecton);
  //   }
  // }



  // /////////////////
  addToSelection() {
    if (this.selectedProduit) {
      this.doAddToSelection();
    } else {
      this.snackBar.open('Aucun produit selectionné', 'Erreur', {
        duration: environment.durationOfSnackBar,
      });
    }
  }

  doAddToSelection() {
    if (this.selectedProduit) {
      let data = null;
      // Un array est attendu à la réception
      if (this.selectedProduit instanceof Array) {
        data = this.selectedProduit;
      } else {
        data = [this.selectedProduit];
      }
      this.selectonEmitter.emit(data);
      this.fieldValue = '';
      this.selectedProduit = null;
      // this.selecton = new FormControl();
      this.produits = [];
      // console.log(this.selecton);
    }
  }


  search($event) {
    console.log('------call-------');
    this.fieldValue = $event.target ? $event.target.value : undefined;


    this.interval = setTimeout(() => {
      console.log('------call 2-------')
      console.log($event.target.value);

      this.doSearch($event);

    }, 1000);
  }

  doSearch($event) {
    this.fieldValue = $event.target.value;

    if (this.fieldValue.length > 2) {
      this.elasticsearchService.searchProduit('nom', this.fieldValue).subscribe(
        data => {
          this.produits = data;
          if (data && data.length === 1 ) {
              // this.selecton.setValue(data[0]);
              this.selectedProduit = data[0];
          }
        }
      );
    } else {
      this.produits = [];
    }
  }
  displayFn(produit) {
    return produit ? (produit.dci + '__' + produit.nom + '__' + produit.formeDosage).toLowerCase() : undefined;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.selectedProduit = event.option.value;
  }
}
