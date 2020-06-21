import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ElasticsearchService } from 'src/app/services/elasticsearch/elasticsearch.service';
import { Produit } from 'src/app/models/produit';


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

  constructor(private elasticsearchService: ElasticsearchService,
              private router: Router,
              private snackBar: MatSnackBar,
              private store: Store) { }

  ngOnInit() {
    // this.loadCartTotal();
  }

  search($event) {
    this.fieldValue = $event.target.value;
    if (this.fieldValue.length > 2) {
      this.elasticsearchService.searchProduit('nom', this.fieldValue).subscribe(
        data => {
          this.produits = data;
          if (data && data.length === 1 ) {
            this.selecton.setValue(data[0]);
          }
        }
      );
    }
  }
  add(produits: Produit[]) {
    if (this.selecton.value) {
      let data = null;
      // Un array est attendu à la réception
      if (this.selecton.value instanceof Array) {
        data = this.selecton.value;
      } else {
        data = [this.selecton.value];
      }
      this.selectonEmitter.emit(data);
      this.fieldValue = '';
      this.selecton = new FormControl();
      this.produits = [];
      console.log(this.selecton);
    }
  }

  // username: string = "";
  // @Output() public  usernameEmitter = new EventEmitter<string>();

  // sendName() {
  //   this.usernameEmitter.emit(this.username);
  // }
}
