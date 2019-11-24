import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { LoggerService } from '../util/services/logger/logger.service';
import { Observable, Subscription } from 'rxjs';
import { PropertyService } from '../services/util/property.service';



interface SideNavRoute {
  icon?: string;
  route?: string;
  title?: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  implements OnInit,  OnDestroy {


  // fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);
  isLogged: boolean;

  message: Observable<boolean>;
  subscription: Subscription;

  shouldRun = true;
  myWorkRoutes = [

    {
      icon: 'assignment',
      route: 'sales/activities',
      title: 'ACTIVITIES'
    },
    {
      icon:  'dashboard',
      route: 'sales/dashboards',
     title: 'DASHBOARDS'
    } ];


    customerRoutes = [

    {
      icon: 'contacts',
      route: 'accounts',
      title: 'ACCOUNTS'
    },
    {
      icon: 'people',
      route: 'sales/contacts',
      title: 'CONTACTS'
    },
    {
      icon: 'settings_phone',
      route: 'leads',
      title: 'LEADS'
    },
    {
      icon: 'account_box',
      route: 'opportunities',
      title: 'OPPORTUNITIES'
    }];
    mobileQuery: MediaQueryList;

    fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

    fillerContent = Array.from({length: 50}, () =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

    private _mobileQueryListener: () => void;

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
                private propertyService: PropertyService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

   ngOnInit() {
     this.message = this.propertyService.getProperty();
     this.message.subscribe(
       data => {
         this.isLogged = data;
         console.log('-------isLogged---------:' + this.isLogged);
       }
     );
   }
}
