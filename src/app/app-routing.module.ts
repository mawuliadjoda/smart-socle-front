import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './produit/produit.component';
import { CommandeComponent } from './commande/commande.component';
import { PannierComponent } from './commande/pannier/pannier.component';
import { FactureComponent } from './commande/facture/facture.component';
import { CommandListComponent } from './commandList/commandList.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { NotificationComponent } from './notification/notification.component';
import { AmChartComponent } from './am-chart/am-chart.component';
import { RefProduitComponent } from './ref-produit/ref-produit.component';
import { RefMedicamentANSMComponent } from './referentiels/refMedicamentANSM/refMedicamentANSM.component';
import { FileUploadComponent } from './util-component/file-upload/file-upload.component';
import { AuthGaurdService } from './services/jwt-auth/auth-gaurd.service';
import { ElasticsearchComponent } from './elasticsearch/elasticsearch.component';
import { ApprovisionnementComponent } from './produit/approvisionnement/approvisionnement.component';
import { CommandeEntrantComponent } from './commande-entrant/commande-entrant.component';
import { CommandeEntrantAttenteComponent } from './commande-entrant-attente/commande-entrant-attente.component';
import { CommandeEntrantReceptionComponent } from './commande-entrant-reception/commande-entrant-reception.component';
import { ProduitACoursStockComponent } from './administration/produit-a-cours-stock/produit-a-cours-stock.component';
import { StatJournaliereComponent } from './statistique/stat-journaliere/stat-journaliere.component';
import { TestThingsComponent } from './util-component/test-things/test-things.component';
import { DeclarationVenteJournaliereComponent } from './statistique/declarationVenteJournaliere/declarationVenteJournaliere.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  // {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/produits', component: ProduitComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/commandes-sortant', component: CommandeComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/pannier', component: PannierComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/facture', component: FactureComponent, canActivate: [AuthGaurdService]},
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


  {path: 'smart/declaration-vente', component: DeclarationVenteJournaliereComponent, canActivate: [AuthGaurdService]},
  {path: 'smart/test-things', component: TestThingsComponent, canActivate: [AuthGaurdService]},


  {path: '**', component: PageNotFoundComponent}
];

//useHash: true == > https://stackoverflow.com/questions/47366792/404-error-on-refresh-for-angularv4-deployed-on-tomcat-server
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
