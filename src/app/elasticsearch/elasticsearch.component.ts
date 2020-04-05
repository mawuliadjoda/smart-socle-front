import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../services/elasticsearch/elasticsearch.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-elasticsearch',
  templateUrl: './elasticsearch.component.html',
  styleUrls: ['./elasticsearch.component.css']
})
export class ElasticsearchComponent implements OnInit {

  fieldValue: string;
  hits: [];

  selecton = new FormControl();
  constructor(private elasticsearchService: ElasticsearchService) { }

  ngOnInit() {
  }

  search($event) {
    this.fieldValue = $event.target.value;
    if (this.fieldValue.length > 2) {
      this.elasticsearchService.search('nom', this.fieldValue).subscribe(
        data => {
          this.hits = data;
          // console.log(this.hits);
        }
      );
    }
  }

  ajoutPanier() {
    this.fieldValue = '';
    this.selecton = new FormControl();
    console.log(this.selecton);
  }

}
