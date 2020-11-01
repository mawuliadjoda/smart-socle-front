import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommandeComponent } from './administration/commande/commande.component';
import { PannierComponent } from './administration/commande/pannier/pannier.component';
import { FactureComponent } from './administration/commande/facture/facture.component';
import { CommandListComponent } from './administration/commandList/commandList.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { AuthGaurdService } from './services/jwt-auth/auth-gaurd.service';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';
import { CommandeEntrantComponent } from './administration/commande-entrant/commande-entrant.component';
import { CommandeEntrantAttenteComponent } from './administration/commande-entrant-attente/commande-entrant-attente.component';
import { CommandeEntrantReceptionComponent } from './administration/commande-entrant-reception/commande-entrant-reception.component';
import { ProduitACoursStockComponent } from './administration/produit-a-cours-stock/produit-a-cours-stock.component';
import { StatJournaliereComponent } from './statistique/stat-journaliere/stat-journaliere.component';

import { DeclarationVenteJournaliereComponent } from './statistique/declarationVenteJournaliere/declarationVenteJournaliere.component';
import { CompaireStatComponent } from './statistique/compaire-stat/compaire-stat.component';
import { CategorieComponent } from './administration/categorie/categorie.component';
import { FournisseurComponent } from './administration/fournisseur/fournisseur.component';
import { FileUploadComponent } from './util/util-component/file-upload/file-upload.component';
import { TestThingsComponent } from './util/util-component/test-things/test-things.component';
import { NotificationComponent } from './util/notification/notification.component';
import { AmChartComponent } from './statistique/am-chart/am-chart.component';
import { RefProduitComponent } from './administration/ref-produit/ref-produit.component';
import { RefMedicamentANSMComponent } from './administration/refMedicamentANSM/refMedicamentANSM.component';
import { ProduitComponent } from './administration/produit/produit.component';
import { PageNotFoundComponent } from './util/page-not-found/page-not-found.component';
import { GenerateQrCodeComponent } from './administration/generate-qr-code/generate-qr-code.component';
// import { ViewFactureComponent } from './administration/commande/facture/view-facture/view-facture.component';
// import { QrCodeScannerComponent } from './util/qr-code-scanner/qr-code-scanner.component';
import { NgThermalPrintComponent } from './util/ng-thermal-print/ng-thermal-print.component';
import { SimplePrintComponent } from './util/simple-print/simple-print.component';
import { HandleSearchComponent } from './elasticsearch/handle-search/handle-search.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: CompaireStatComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/produits', component: ProduitComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/commandes-sortant', component: CommandeComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/pannier', component: PannierComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/facture', component: FactureComponent, canActivate: [AuthGaurdService]},
  // {path: 'smart/facture', component: ViewFactureComponent, canActivate: [AuthGaurdService]},

  {path: 'smart/list-commande-sortant', component: CommandListComponent, canActivate: [AuthGaurdService]},

  {path: 'smart/stat', component: StatistiqueComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/notification', component: NotificationComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/am-chart', component: AmChartComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/ref-produit', component: RefProduitComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/ref-medicament-ansm', component: RefMedicamentANSMComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/app-file-upload', component: FileUploadComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/search', component: ElasticsearchComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/commandes-entrant', component: CommandeEntrantComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/commandes-attente', component: CommandeEntrantAttenteComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/commandes-entrant-reception', component: CommandeEntrantReceptionComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/produitsAcmder', component: ProduitACoursStockComponent, canActivate: [AuthGaurdService]},

  {path: 'smart/compare-stat', component: CompaireStatComponent, canActivate: [AuthGaurdService]},

  {path: 'smart/declaration-vente', component: DeclarationVenteJournaliereComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/test-things', component: TestThingsComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/gestion-categorie', component: CategorieComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/gestion-fournisseur', component: FournisseurComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/generate-qr-code', component: GenerateQrCodeComponent, canActivate: [AuthGaurdService]},
  // {path: 'smart/scan-qr-code', component: QrCodeScannerComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/print', component: NgThermalPrintComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/simple-print', component: SimplePrintComponent, canActivate: [AuthGaurdService]},

  {path: 'smart/handle-search', component: HandleSearchComponent, canActivate: [AuthGaurdService]},
  {path: '**', component: PageNotFoundComponent}
];

// useHash: true == > https://stackoverflow.com/questions/47366792/404-error-on-refresh-for-angularv4-deployed-on-tomcat-server
// https://codecraft.tv/courses/angular/routing/routing-strategies/#_hashlocationstrategy
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    enableTracing: false,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
