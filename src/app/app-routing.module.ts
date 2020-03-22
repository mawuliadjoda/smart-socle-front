import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProduitComponent } from './produit/produit.component';
import { CommandeComponent } from './commande/commande.component';
import { PannierComponent } from './commande/pannier/pannier.component';
import { FactureComponent } from './commande/facture/facture.component';
import { CommandListComponent } from './commandList/commandList.component';
import { JqxchartComponent } from './jqxchart/jqxchart.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { NotificationComponent } from './notification/notification.component';
import { AmChartComponent } from './am-chart/am-chart.component';
import { RefProduitComponent } from './ref-produit/ref-produit.component';
import { RefMedicamentANSMComponent } from './referentiels/refMedicamentANSM/refMedicamentANSM.component';
import { FileUploadComponent } from './util-component/file-upload/file-upload.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  //{path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'client', component: ClientComponent},
  {path: 'home', component: HomeComponent},
  {path: 'smart/produits', component: ProduitComponent},
  {path: 'smart/commandes', component: CommandeComponent},
  {path: 'smart/pannier', component: PannierComponent},
  {path: 'smart/facture', component: FactureComponent},
  {path: 'smart/list-commande', component: CommandListComponent},
  {path: 'smart/chart', component: JqxchartComponent},
  {path: 'smart/stat', component: StatistiqueComponent},
  {path: 'smart/notification', component: NotificationComponent},
  {path: 'smart/am-chart', component: AmChartComponent},
  {path: 'smart/ref-produit', component: RefProduitComponent},
  {path: 'smart/ref-medicament-ansm', component: RefMedicamentANSMComponent},
  {path: 'smart/app-file-upload', component: FileUploadComponent},

  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
