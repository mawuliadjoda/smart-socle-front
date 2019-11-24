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
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './dialogs/add/add-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FournisseurComponent } from './fournisseur/fournisseur.component';

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
      FournisseurComponent
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
      DeleteDialogComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
