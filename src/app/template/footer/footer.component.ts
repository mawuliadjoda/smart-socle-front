import { Component, OnInit } from '@angular/core';
import { EnvService } from '../../services/config/env.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  version: any;
  constructor(private env: EnvService) { }

  ngOnInit() {
    this.version = this.env.versionFront;
  }

}
