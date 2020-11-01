import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FormControl, Validators } from '@angular/forms';
import { RefProduitService } from 'src/app/services/ref-produit.service';
import { RefProduit } from 'src/app/models/ref-produit';

@Component({
  selector: 'app-add-ref-produit',
  templateUrl: './add-ref-produit.component.html',
  styleUrls: ['./add-ref-produit.component.css']
})
export class AddRefProduitComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddRefProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RefProduit,
    public dataService: RefProduitService
  ) {}

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {}
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    // this.dataService.add(this.data).subscribe(
    //   data => {
    //     this.data = data;
    //   }
    // );
  }
}
