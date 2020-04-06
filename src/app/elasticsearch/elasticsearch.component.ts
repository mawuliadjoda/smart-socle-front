import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../services/elasticsearch/elasticsearch.service';
import { FormControl } from '@angular/forms';
import { Produit } from '../models/produit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.css']
})
export class ElasticsearchComponent implements OnInit {

  fieldValue: string;
  produits: [];

  selecton = new FormControl();

  produitsPanier: Array<Produit> = [];
  constructor(private elasticsearchService: ElasticsearchService,
             private router: Router) { }

  ngOnInit() {
  }

  search($event) {
    this.fieldValue = $event.target.value;
    if (this.fieldValue.length > 2) {
      this.elasticsearchService.searchProduit('nom', this.fieldValue).subscribe(
        data => {
          this.produits = data;
          console.log(this.produits);
        }
      );
    }
  }

  ajoutPanier() {
    console.log(this.selecton);



    this.fieldValue = '';
    this.selecton = new FormControl();
  }

  viewShoppingCart(){
    this.router.navigateByUrl('smart/pannier');
  }

}
