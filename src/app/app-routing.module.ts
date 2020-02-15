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
