import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material-module';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { CommandeComponent } from './administration/commande/commande.component';
import { PannierComponent } from './administration/commande/pannier/pannier.component';
import { NgxsModule } from '@ngxs/store';
import { ProductState } from './util/ngxs/state';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { FactureComponent } from './administration/commande/facture/facture.component';
import { CommandListComponent } from './administration/commandList/commandList.component';
import { MatPaginatorIntl } from '@angular/material';
import { getDutchPaginatorIntl } from './smart-paginator-override';
import { FooterComponent } from './template/footer/footer.component';
import { BasicAuthHtppInterceptorService } from './services/jwt-auth/basic-auth-interceptor.service';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';

import { BnNgIdleService } from 'bn-ng-idle';
import { UserIdleComponent } from './authentication/user-idle/user-idle.component';
import { ShoppingCardComponent } from './template/shopping-card/shopping-card.component';
import { CommandeEntrantComponent } from './administration/commande-entrant/commande-entrant.component';
import { CommandeEntrantReceptionComponent } from './administration/commande-entrant-reception/commande-entrant-reception.component';
import { CommandeEntrantAttenteComponent } from './administration/commande-entrant-attente/commande-entrant-attente.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeleteCommandeEntrantAttenteComponent
       } from './administration/commande-entrant-attente/delete-commande-entrant-attente/delete-commande-entrant-attente.component';
import { ProduitACoursStockComponent } from './administration/produit-a-cours-stock/produit-a-cours-stock.component';
import { DashboardComponent } from './administration/dashboard/dashboard.component';
import { StatJournaliereComponent } from './statistique/stat-journaliere/stat-journaliere.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PipeModule } from './pipe.module';

import { MdePopoverModule } from '@material-extended/mde';
import { DeclarationVenteJournaliereComponent } from './statistique/declarationVenteJournaliere/declarationVenteJournaliere.component';
import { DeleteDeclarationComponent } from './statistique/declarationVenteJournaliere/delete-declaration/delete-declaration.component';
import { CompaireStatComponent } from './statistique/compaire-stat/compaire-stat.component';
import { EnvServiceProvider } from './services/config/env.service.provider';
import { CategorieComponent } from './administration/categorie/categorie.component';
import { DeleteCategorieComponent } from './administration/categorie/delete-categorie/delete-categorie.component';
import { AddCategorieComponent } from './administration/categorie/add-categorie/add-categorie.component';
import { FournisseurComponent } from './administration/fournisseur/fournisseur.component';
import { DeleteFournisseurComponent } from './administration/fournisseur/delete-fournisseur/delete-fournisseur.component';
import { AddFournisseurComponent } from './administration/fournisseur/add-fournisseur/add-fournisseur.component';
import { NavigationBarComponent } from './template/navigation-bar/navigation-bar.component';
import { NavComponent } from './template/nav/nav.component';
import { FileDownloadComponent } from './util/util-component/file-download/file-download.component';
import { FileUploadComponent } from './util/util-component/file-upload/file-upload.component';
import { TestThingsComponent } from './util/util-component/test-things/test-things.component';
import { ProduitComponent } from './administration/produit/produit.component';
import { AddProduitComponent } from './administration/produit/add-produit/add-produit.component';
import { EditProduitComponent } from './administration/produit/edit-produit/edit-produit.component';
import { DeleteProduitComponent } from './administration/produit/delete-produit/delete-produit.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { NotificationComponent } from './util/notification/notification.component';
import { AmChartComponent } from './statistique/am-chart/am-chart.component';
import { RefProduitComponent } from './administration/ref-produit/ref-produit.component';
import { ApprovisionnementComponent } from './administration/produit/approvisionnement/approvisionnement.component';
import { AddRefProduitComponent } from './administration/ref-produit/add-ref-produit/add-ref-produit.component';
import { EditRefProduitComponent } from './administration/ref-produit/edit-ref-produit/edit-ref-produit.component';
import { DeleteRefProduitComponent } from './administration/ref-produit/delete-ref-produit/delete-ref-produit.component';
import { RefMedicamentANSMComponent } from './administration/refMedicamentANSM/refMedicamentANSM.component';
import { SearchComponent } from './elasticsearch/search/search.component';
import { PageNotFoundComponent } from './util/page-not-found/page-not-found.component';
import { GenerateQrCodeComponent } from './administration/generate-qr-code/generate-qr-code.component';
import { PrimeNgModule } from './prime-ng.module';
import { QrcodeDisplayComponent } from './util/qrcode-display/qrcode-display.component';
// import { ViewFactureComponent } from './administration/commande/facture/view-facture/view-facture.component';
// import {NgxPrintModule} from 'ngx-print';
import {NgxPrintModule} from 'ngx-print';
// import { ThermalPrintModule } from 'ng-thermal-print';
import { ThermalPrintModule } from 'ng-thermal-print';
// import { PrintPageComponent } from './administration/commande/facture/view-facture/print-page/print-page.component';
// import { MainPageComponent } from './administration/commande/facture/view-facture/main-page/main-page.component';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrCodeScannerComponent } from './util/qr-code-scanner/qr-code-scanner.component';
import { SimplePrintComponent } from './util/simple-print/simple-print.component';
import { PrintPageComponent } from './util/simple-print/print-page/print-page.component';
import { NgxPrintFactureComponent } from './administration/commande/ngx-print-facture/ngx-print-facture.component';
import { SmartBreadcrumbComponent } from './util/smart-breadcrumb/smart-breadcrumb.component';

@NgModule({
   declarations: [
      AppComponent,
      NavigationBarComponent,
      NavComponent,
      LoginComponent,
      PageNotFoundComponent,
      HomeComponent,
      ProduitComponent,
      AddProduitComponent,
      EditProduitComponent,
      DeleteProduitComponent,
      CommandeComponent,
      PannierComponent,
      FactureComponent,
      CommandListComponent,
      StatistiqueComponent,
      NotificationComponent,
      AmChartComponent,
      RefProduitComponent,
      ApprovisionnementComponent,

      AddRefProduitComponent,
      EditRefProduitComponent,
      DeleteRefProduitComponent,

      RefMedicamentANSMComponent,
      FileUploadComponent,
      FileDownloadComponent,

      FooterComponent,
      ElasticsearchComponent,

      UserIdleComponent,
      ShoppingCardComponent,
      CommandeEntrantComponent,
      SearchComponent,
      CommandeEntrantReceptionComponent,
      CommandeEntrantAttenteComponent,
      DeleteCommandeEntrantAttenteComponent,
      ProduitACoursStockComponent,
      DashboardComponent,
      StatJournaliereComponent,
      DeclarationVenteJournaliereComponent,
      DeleteDeclarationComponent,
      CompaireStatComponent,
      CategorieComponent,
      DeleteCategorieComponent,
      AddCategorieComponent,
      FournisseurComponent,
      AddFournisseurComponent,
      DeleteFournisseurComponent,
      GenerateQrCodeComponent,
      QrcodeDisplayComponent,
      // ViewFactureComponent,
      // PrintPageComponent,
      // MainPageComponent,
      QrCodeScannerComponent,
      SimplePrintComponent,
      PrintPageComponent,
      NgxPrintFactureComponent,
      SmartBreadcrumbComponent,
      TestThingsComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      AngularMaterialModule,
      NgxsModule.forRoot([
        ProductState
      ], { developmentMode: true }),
      PdfJsViewerModule,
      jqxChartModule,
      // https://www.npmjs.com/package/ngx-spinner
      NgxSpinnerModule,
      // https://www.npmjs.com/package/mat-table-exporter
      MatTableExporterModule,
      PipeModule.forRoot(),
      MdePopoverModule,
      PrimeNgModule,
      // BarecodeScannerLivestreamModule,
      ZXingScannerModule,
      ThermalPrintModule,
      NgxPrintModule,
      // ThermalPrintModule
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   entryComponents: [
      AddProduitComponent,
      EditProduitComponent,
      DeleteProduitComponent,
      ApprovisionnementComponent,
      AddRefProduitComponent,
      EditRefProduitComponent,
      DeleteRefProduitComponent,
      UserIdleComponent,
      DeleteCommandeEntrantAttenteComponent,
      StatJournaliereComponent,
      DeleteDeclarationComponent,
      DeleteCategorieComponent,
      AddCategorieComponent,
      AddFournisseurComponent,
      DeleteFournisseurComponent,
      QrcodeDisplayComponent
   ],
   providers: [
     // Translate angular-material paginator
     { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },

     // Security auth Corps interceptor
     { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true },
     BnNgIdleService,

     // https://www.jvandemo.com/how-to-use-environment-variables-to-configure-your-angular-application-without-a-rebuild/
     EnvServiceProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
