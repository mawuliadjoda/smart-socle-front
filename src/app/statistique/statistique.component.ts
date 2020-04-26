import { Component, OnInit } from '@angular/core';
import { LigneCommandeService } from '../services/ligne-commande.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  // statUtils: Array<StatUtil> = [];
  constructor(private ligneCommandeService: LigneCommandeService,
              private spinner: NgxSpinnerService) { }
  xAxeAttribute = 'date_';
  yAxeAttribute = 'total';
  intervalVisualisation: string;
  padding: any = { left: 5, top: 5, right: 30, bottom: 5 };
  titlePadding: any = { left: 30, top: 5, right: 0, bottom: 10 };

  valueAxis: any =
  {
      title: { text: 'Montant en  [FCFA]<br><br>' },
      labels: { horizontalAlignment: 'right' }
  };

  dataAdapter: any;

  xAxis: any =
  {
      dataField: this.xAxeAttribute,
      minValue: new Date(2015, 0, 1),
      maxValue: new Date(2022, 11, 31),
      type: 'date',
      baseUnit: 'day',
      labels:
      {
          formatFunction: (value: any): any => {
              return value.getDate() + '-' + this.months[value.getMonth()] + '\'' + value.getFullYear().toString().substring(2);
          }
      },
      rangeSelector: {
          size: 80,
          padding: { /*left: 0, right: 0,*/top: 0, bottom: 0 },
          minValue: new Date(2015, 5, 1),
          backgroundColor: 'white',
          dataField: this.xAxeAttribute,
          baseUnit: 'month',
          gridLines: { visible: false },
          serieType: 'area',
          labels: {
              formatFunction: (value: any): any => {
                  return this.months[value.getMonth()] + '\'' + value.getFullYear().toString().substring(2);
              }
          }
      }
  };


  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];





  toolTipCustomFormatFn: any = (value: any, itemIndex: any, serie: any, group: any, categoryValue: any, categoryAxis: any): any => {
      const statUtil = this.dataAdapter.records[itemIndex];
      return '<div style="text-align:left; width: 100%!important; height: 100%!important">' +
         // categoryValue.getDate() + '-' + this.months[categoryValue.getMonth()] + '-' + categoryValue.getFullYear() +
          // '</b><br />Date: ' + dataItem.date_ +
         '<br /> Date:&nbsp;' + statUtil.date_ + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' +
         '</b><br />Total: ' + statUtil.total + '&nbsp;Fcfa' +
         '</b><br /> &nbsp;' +
          '</div>';
  }
  seriesGroups =
  [
      {
          type: 'line',
          toolTipFormatFunction: this.toolTipCustomFormatFn,
          series: [
              { dataField: this.yAxeAttribute, displayText: 'Total vente', lineWidth: 1, lineWidthSelected: 1 }
          ]
      }
  ];

  chartChange(event: any) {
      const args = event.args;
      args.instance.description = args.minValue.getFullYear() + '-' + args.maxValue.getFullYear();
  }

  getWidth(): any {
    // if (document.body.offsetWidth < 850) {
    //   return '90%';
    // }

    // return 850;
    return '95%';
  }


  ngOnInit() {
     this.getData();
     this.intervalVisualisation = '(June 2010 - March 2018)';
  }

  public getData() {
    this.spinner.show();
    this.ligneCommandeService.getAllStat().subscribe(data => {
     // this.statUtils = data;
     const source = {
         datatype: 'json',
         datafields: [
             { name: this.xAxeAttribute },
             { name: this.yAxeAttribute }
         ],
        localdata: data
     };

     this.dataAdapter = new jqx.dataAdapter(
        source,
        { async: false,
          autoBind: true,
          loadError: (xhr: any, status: any, error: any) => { alert('Error loading "' + source + '" : ' + error); }
        }
      );
     this.spinner.hide();

    },
    (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
    });
  }
}
