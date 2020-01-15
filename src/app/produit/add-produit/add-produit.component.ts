import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produit,
    public dataService: ProduitService
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
