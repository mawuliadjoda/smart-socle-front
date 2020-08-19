import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PropertyService } from 'src/app/services/util/property.service';
import { AuthenticationService } from 'src/app/services/jwt-auth/authentication.service';



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

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
                private propertyService: PropertyService,
                private loginService: AuthenticationService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this.mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this.mobileQueryListener);
    }


  // fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);
  isLogged: boolean;

  message: Observable<boolean>;
  subscription: Subscription;

  shouldRun = true;
  adminRoutes = [

    {
      icon: 'assignment',
      route: 'smart/produits',
      title: 'Liste des produits',
      isActive: true
    },
    // {
    //   icon: 'assignment',
    //   route: 'smart/ref-produit',
    //   title: 'Ref. Produits',
    //   isActive: true
    // },

    {
      icon: 'assignment',
      route: 'smart/am-chart',
      title: 'Statistique de vente',
      isActive: true
    },
    {
      icon: 'assignment',
      route: 'smart/compare-stat',
      title: 'Audit statistique',
      isActive: true
    },

    {
      icon:  'dashboard',
      route: 'smart/commandes-entrant',
      title: 'Aprovisionnement',
      isActive: true
    },
    {
      icon:  'dashboard',
      route: 'smart/commandes-attente',
      title: 'Commandes en attente',
      isActive: true
    },
    {
      icon:  'dashboard',
      route: 'smart/commandes-entrant-reception',
      title: 'Reception commandes',
      isActive: true
    },
    {
      icon:  'dashboard',
      route: 'smart/notification',
      title: 'Notification',
      isActive: true
    },
    {
      icon:  'dashboard',
      route: 'smart/produitsAcmder',
      title: 'Produits à commander',
      isActive: true
    },
    {
      icon: '',
      route: 'smart/gestion-categorie',
      title: 'Gestion catégorie',
      isActive: true
    },
    {
      icon: '',
      route: 'smart/gestion-fournisseur',
      title: 'Gestion fournisseur',
      isActive: true
    },
    {
      icon: '',
      route: 'smart/generate-qr-code',
      title: 'imprimer code QR',
      isActive: true
    }
  ];


    myWorkRoutes = [

    // {
    //   icon: '',
    //   route: 'smart/commandes-sortant',
    //   title: 'Nouvelle vente',
    //   isActive: false
    // },
    {
      icon: '',
      route: 'smart/search',
      title: 'Rechercher un produit',
      isActive: true
    },
    {
      icon: '',
      route: 'smart/list-commande-sortant',
      title: 'Liste des ventes',
      isActive: true
    },
    {
      icon: '',
      route: 'smart/declaration-vente',
      title: 'Déclaration de ventes',
      isActive: true
    }
  ];


  paramRoutes = [

    {
      icon: 'assignment',
      route: 'smart/reglage',
      title: 'Réglages',
      isActive: true
    },
    {
      icon: 'assignment',
      route: 'smart/personalisation',
      title: 'Personalisation',
      isActive: true
    },
    {
      icon: '',
      route: 'smart/test-things',
      title: 'Test Things',
      isActive: true
    }
  ];
    mobileQuery: MediaQueryList;

    fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

    fillerContent = Array.from({length: 50}, () =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

    private mobileQueryListener: () => void;

  //  isExpanded = true;
      showSubmenu = false;
      showSubmenuAdmin = false;
      showSubmenuParam = false;

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this.mobileQueryListener);
    }

    // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

   ngOnInit() {

      this.message = this.propertyService.getProperty();
      this.message.subscribe(
        data => {
          this.isLogged = data && this.loginService.isUserLoggedIn();
          console.log('-------isLogged---------:' + this.isLogged);
        }
      );
   }
  //  isShowing = false;
  //  showSubSubMenu: boolean = false;
}
