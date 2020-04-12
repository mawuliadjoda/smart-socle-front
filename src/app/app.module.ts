import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material-module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NavComponent } from './nav/nav.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { DeleteDialogComponent } from './client/delete/delete.dialog.component';
import { EditDialogComponent } from './client/edit/edit.dialog.component';
import { AddDialogComponent } from './client/add/add-dialog.component';
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
import { JqxchartComponent } from './jqxchart/jqxchart.component';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';
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
import { FooterComponent } from './footer/footer.component';
import { BasicAuthHtppInterceptorService } from './services/jwt-auth/basic-auth-interceptor.service';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';

import { BnNgIdleService } from 'bn-ng-idle';
import { UserIdleComponent } from './dialogs/user-idle/user-idle.component';
@NgModule({
   declarations: [
      AppComponent,
      NavigationBarComponent,
      NavComponent,
      ClientComponent,
      LoginComponent,
      PageNotFoundComponent,
      HomeComponent,
      AddDialogComponent,
      DeleteDialogComponent,
      EditDialogComponent,
      ProduitComponent,
      AddProduitComponent,
      EditProduitComponent,
      DeleteProduitComponent,
      CommandeComponent,
      PannierComponent,
      FactureComponent,
      CommandListComponent,
      JqxchartComponent,
      StatistiqueComponent,
      NotificationComponent,
      D3OrgChartComponent,
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

      UserIdleComponent
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
      jqxChartModule
   ],
   entryComponents: [
      AddDialogComponent,
      EditDialogComponent,
      DeleteDialogComponent,
      AddProduitComponent,
      EditProduitComponent,
      DeleteProduitComponent,
      ApprovisionnementComponent,
      AddRefProduitComponent,
      EditRefProduitComponent,
      DeleteRefProduitComponent,
      UserIdleComponent
   ],
   providers: [
     // Translate angular-material paginator
     { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },

     // Security auth Corps interceptor
     { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true },
     BnNgIdleService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
