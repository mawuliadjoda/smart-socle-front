import { Component } from '@angular/core';
import * as jsonData from './_files/myJson.json';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular8-socle-project';

  path: any = (jsonData as any).default[0];
  constructor() {
    console.log('----path----:' + this.path.client);
  }
}
