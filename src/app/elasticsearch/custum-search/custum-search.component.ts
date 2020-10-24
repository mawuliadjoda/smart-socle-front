import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ElasticsearchService } from 'src/app/services/elasticsearch/elasticsearch.service';

@Component({
  selector: 'app-custum-search',
  templateUrl: './custum-search.component.html',
  styleUrls: ['./custum-search.component.css']
})
export class CustumSearchComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Doliprane', 'Venlafaxine', 'Paracetamol'];
  fieldValue: string;
  produits: [];
  selecton = new FormControl();
  constructor(private elasticsearchService: ElasticsearchService) { }

  ngOnInit() {
  }


  search($event) {
    this.fieldValue = $event.target.value;

    if (this.fieldValue.length > 2) {
      this.elasticsearchService.searchProduit('nom', this.fieldValue).subscribe(
        data => {
          this.produits = data;
          // if (data && data.length === 1 ) {
          //     this.selecton.setValue(data[0]);
          // }
        }
      );
    } else {
      this.produits = [];
    }
  }

  displayFn(produit) {

  return produit ? (produit.dci + '__' + produit.nom + '__' + produit.formeDosage).toLowerCase() : undefined;
     // return produit ? produit.nom : undefined;
  }

}
