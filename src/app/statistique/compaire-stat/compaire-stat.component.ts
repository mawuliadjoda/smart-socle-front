import { Component, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { LigneCommandeService } from 'src/app/services/ligne-commande.service';
import { DeclarationVenteService } from 'src/app/services/declaration-vente.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-compaire-stat',
  templateUrl: './compaire-stat.component.html',
  styleUrls: ['./compaire-stat.component.css']
})
export class CompaireStatComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart: any;
  constructor(private ligneCommandeService: LigneCommandeService,
              private declarationVenteService: DeclarationVenteService,
              private spinner: NgxSpinnerService,
              private zone: NgZone) { }


  ngOnInit() {

  }

  ngAfterViewInit() {
    // this.getData();
    this.getDataForMutipleChart();
    // this.createMultipleChart();
  }

  // Create series
 createAxisAndSeries(field, name, opposite) {
  let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
  if (this.chart.yAxes.indexOf(valueAxis) !== 0) {
    valueAxis.syncWithAxis = this.chart.yAxes.getIndex(0);
  }

  let series = this.chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "date";
  series.strokeWidth = 2;
  series.yAxis = valueAxis;
  series.name = name;
  series.tooltipText = "{name}: [bold]{valueY}[/]";
  series.tensionX = 0.8;
  series.showOnInit = true;

  let interfaceColors = new am4core.InterfaceColorSet();

  let bullet = series.bullets.push(new am4charts.Bullet());
  bullet.width = 10;
  bullet.height = 10;
  bullet.horizontalCenter = "middle";
  bullet.verticalCenter = "middle";

  let rectangle = bullet.createChild(am4core.Rectangle);
  rectangle.stroke = interfaceColors.getFor("background");
  rectangle.strokeWidth = 2;
  rectangle.width = 10;
  rectangle.height = 10;

  valueAxis.renderer.line.strokeOpacity = 1;
  valueAxis.renderer.line.strokeWidth = 2;
  valueAxis.renderer.line.stroke = series.stroke;
  valueAxis.renderer.labels.template.fill = series.stroke;
  valueAxis.renderer.opposite = opposite;
}



getDataForMutipleChart() {
  this.spinner.show();
  let mapDeclaration = new Map();
  let mapReel = new Map();

  let statDeclaration = this.declarationVenteService.findForStat('2020');
  let statReel = this.ligneCommandeService.getAllStat();


  forkJoin([statDeclaration, statReel]).subscribe(results => {
    results[0].forEach(element => {
      mapDeclaration.set(element[0], element[1]);
    });

    results[1].forEach(element => {
      mapReel.set(element.date_, element.total);
    });

    let data = [];
    for (let [key, value] of mapReel) {
      let valueDeclare = mapDeclaration.get(key);
      if (valueDeclare) {
        console.log(valueDeclare);
      }
      const dateString = key.split('/');
      const dateReformatString = dateString[1] + '/' + dateString[0] + '/' + dateString[2];
      const dateReel = new Date(dateReformatString);


      // let row = {date: dateReel, value1: value, value2: 100, previousDate: dateReel};
      let row = {
        date: dateReel,
        systeme: value,
        declaration: valueDeclare ? valueDeclare : 0
      };

      data.push(row);

    }
    this.buildChartMultiple(data);
    console.log(results);
    this.spinner.hide();
  });
}

buildChartMultiple(data) {
  am4core.useTheme(am4themes_animated);
  // Themes end

  // Create chart instance
  this.chart = am4core.create("chartdivCompare", am4charts.XYChart);

  //

  // Increase contrast by taking evey second color
  this.chart.colors.step = 2;

  // Add data
  this.chart.data =  data;

  // Create axes
  let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 50;


  this.createAxisAndSeries("systeme", "Systeme", false);
  this.createAxisAndSeries("declaration", "Declaration", true);

  // Add legend
  this.chart.legend = new am4charts.Legend();

  // Add cursor
  this.chart.cursor = new am4charts.XYCursor();
}

ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
