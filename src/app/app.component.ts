import { Component } from '@angular/core';
import * as jsonData from './_files/myJson.json';
import { Store } from '@ngxs/store';
import { LoadProducts } from './ngxs/action/index.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular8-socle-project';

  path: any = (jsonData as any).default[0];

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new LoadProducts());
    console.log('----path----:' + this.path.client);
  }
}
