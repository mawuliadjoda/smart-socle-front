import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';


import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { LigneCommandeService } from '../services/ligne-commande.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-am-chart',
  templateUrl: './am-chart.component.html',
  styleUrls: ['./am-chart.component.css']
})
export class AmChartComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart: am4charts.XYChart;
  data = [];

  constructor(private zone: NgZone,
              private ligneCommandeService: LigneCommandeService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    // this.ligneCommandeService.getAllStat().subscribe( data =>{
    //   this.data = data;
    // })
  }

  ngAfterViewInit() {
    // this.spinner.show();
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      // Create chart instance

      chart.paddingRight = 20;
      this.ligneCommandeService.getAllStat().subscribe( data => {


        data.forEach(element => {
          const dateString = element.date_.split('/');
          const dateReformatString = dateString[1] + '/' + dateString[0] + '/' + dateString[2];
          const val = new Date(dateReformatString);

          const montantEuro = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(element.total);
          const montantFCFA = montantEuro.replace('€', environment.devisePays);

          const MY_DATA =   { date: val,
                              name: 'name' + element.total,
                              value: element.total,
                              customValue: montantFCFA ,
                              customDate: element.date_
                            };
          this.data.push(MY_DATA);
       });

        console.log('data=' + JSON.stringify(this.data));
        chart.data = this.data;

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;

        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'value';

        series.tooltipText = '{valueY.value}';
        series.tooltipHTML =
       `<center><strong> Vente</strong></center>
        <hr />
        <table>
            <tr>
              <th align="left">Date</th>
              <td>{customDate}</td>
            </tr>
            <tr>
              <th align="left">Montant</th>
              <td>{customValue} </td>
            </tr>
        </table>
        <hr />`;
        chart.cursor = new am4charts.XYCursor();

        const scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

      // Enable export
        chart.exporting.menu = new am4core.ExportMenu();

        this.chart = chart;

      // this.spinner.hide();
      });


    });
  }

 /* ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }
*/
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
