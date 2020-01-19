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
import { HttpClientModule } from '@angular/common/http';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ProduitComponent } from './produit/produit.component';
import { AddProduitComponent } from './produit/add-produit/add-produit.component';
import { EditProduitComponent } from './produit/edit-produit/edit-produit.component';
import { DeleteProduitComponent } from './produit/delete-produit/delete-produit.component';
import { CommandeComponent } from './commande/commande.component';

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
      FournisseurComponent,
      ProduitComponent,
      AddProduitComponent,
      EditProduitComponent,
      DeleteProduitComponent,
      CommandeComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      AngularMaterialModule
   ],
   entryComponents: [
      AddDialogComponent,
      EditDialogComponent,
      DeleteDialogComponent,
      AddProduitComponent,
      EditProduitComponent,
      DeleteProduitComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
