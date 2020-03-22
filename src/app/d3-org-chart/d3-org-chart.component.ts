import { Component, OnInit } from '@angular/core';



declare function maFoncion(): any;
declare function update(data: any): any;


const data = {
  "fname": "Rachel",
  "lname": "Rogers",
  "title": "CEO",
  "photo": "http://lorempixel.com/60/60/cats/1",
  "children": [{
        "fname": "Bob",
        "lname": "Smith",
        "title": "President",
        "photo": "http://lorempixel.com/60/60/cats/2",
        "children": [{
              "fname": "Mary",
              "lname": "Jane",
              "title": "Vice President",
              "photo": "http://lorempixel.com/60/60/cats/3",
              "children": [{
                "fname": "Bill",
                "lname": "August",
                "title": "Dock Worker",
                "photo": "http://lorempixel.com/60/60/cats/4"
              }, {
                "fname": "Reginald",
                "lname": "Yoyo",
                "title": "Line Assembly",
                "photo": "http://lorempixel.com/60/60/cats/5"
              }]
            }, {
              "fname": "Nathan",
              "lname": "Ringwald",
              "title": "Comptroller",
              "photo": "http://lorempixel.com/60/60/cats/6"
            }]
  }]
}


@Component({
  selector: 'app-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  styleUrls: ['./d3-org-chart.component.css']
})
export class D3OrgChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    update(data);
  }

}
