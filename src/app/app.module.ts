import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material-module';
import { LoginComponent } from './authentication/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

import { ProduitComponent } from './produit/produit.component';
import { AddProduitComponent } from './produit/add-produit/add-produit.component';
import { EditProduitComponent } from './produit/edit-produit/edit-produit.component';
import { DeleteProduitComponent } from './produit/delete-produit/delete-produit.component';
import { CommandeComponent } from './commande/commande.component';
import { PannierComponent } from './commande/pannier/pannier.component';
import { NgxsModule } from '@ngxs/store';
import { ProductState } from './ngxs/state';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { FactureComponent } from './commande/facture/facture.component';
import { CommandListComponent } from './commandList/commandList.component';
import { NotificationComponent } from './notification/notification.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { AmChartComponent } from './am-chart/am-chart.component';
import { RefProduitComponent } from './ref-produit/ref-produit.component';
import { AddRefProduitComponent } from './ref-produit/add-ref-produit/add-ref-produit.component';
import { EditRefProduitComponent } from './ref-produit/edit-ref-produit/edit-ref-produit.component';
import { DeleteRefProduitComponent } from './ref-produit/delete-ref-produit/delete-ref-produit.component';
import { ApprovisionnementComponent } from './produit/approvisionnement/approvisionnement.component';
import { RefMedicamentANSMComponent } from './referentiels/refMedicamentANSM/refMedicamentANSM.component';
import { MatPaginatorIntl } from '@angular/material';
import { getDutchPaginatorIntl } from './smart-paginator-override';
import { FileUploadComponent } from './util-component/file-upload/file-upload.component';
import { FileDownloadComponent } from './util-component/file-download/file-download.component';
import { FooterComponent } from './template/footer/footer.component';
import { BasicAuthHtppInterceptorService } from './services/jwt-auth/basic-auth-interceptor.service';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';

import { BnNgIdleService } from 'bn-ng-idle';
import { UserIdleComponent } from './authentication/user-idle/user-idle.component';
import { ShoppingCardComponent } from './template/shopping-card/shopping-card.component';
import { CommandeEntrantComponent } from './commande-entrant/commande-entrant.component';
import { SearchComponent } from './util-component/search/search.component';
import { CommandeEntrantReceptionComponent } from './commande-entrant-reception/commande-entrant-reception.component';
import { CommandeEntrantAttenteComponent } from './commande-entrant-attente/commande-entrant-attente.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DeleteCommandeEntrantAttenteComponent
       } from './commande-entrant-attente/delete-commande-entrant-attente/delete-commande-entrant-attente.component';
import { ProduitACoursStockComponent } from './administration/produit-a-cours-stock/produit-a-cours-stock.component';
import { DashboardComponent } from './administration/dashboard/dashboard.component';
import { StatJournaliereComponent } from './statistique/stat-journaliere/stat-journaliere.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { PipeModule } from './pipe.module';
import { TestThingsComponent } from './util-component/test-things/test-things.component';

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
      MdePopoverModule
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
