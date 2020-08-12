
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET, NavigationStart, NavigationError, Event } from '@angular/router';
import { filter, distinctUntilChanged, map, subscribeOn } from 'rxjs/operators';
import { UtilService } from 'src/app/services/util/util.service';
const NON_DEFINI = 'Non défini';
@Component({
  selector: 'app-smart-breadcrumb',
  templateUrl: './smart-breadcrumb.component.html',
  styleUrls: ['./smart-breadcrumb.component.scss']
})
export class SmartBreadcrumbComponent implements OnInit {

  public breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private utilService: UtilService) { }

  ngOnInit() {

    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {


    //    this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];

    // });


    this.router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
          this.breadcrumbs = [];

          const url =  event.url.substring(event.url.lastIndexOf('/') + 1 , event.url.length);

          const breadcrumbParent: Breadcrumb = {
            label:  this.utilService.mapDisplayNavigation.has(url) ? this.utilService.mapDisplayNavigation.get(url).parent : NON_DEFINI,
            url: event.url
          };

          const breadcrumbChild: Breadcrumb = {
            label: this.utilService.mapDisplayNavigation.has(url) ? this.utilService.mapDisplayNavigation.get(url).child : NON_DEFINI,
            url: event.url
          };

          this.breadcrumbs = [breadcrumbParent, breadcrumbChild];

      }

      if (event instanceof NavigationEnd) {
        console.log(event);
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });
  }





}

export interface Breadcrumb{
  label: string;
  url: string;
}

