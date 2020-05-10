import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FormControl, Validators } from '@angular/forms';
import { RefProduitService } from 'src/app/services/ref-produit.service';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produit,
    public dataService: ProduitService,
    private refProduitService: RefProduitService
  ) {}

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  ngOnInit() {}

  // @HostListener('window:mousedown', ['$event'])
  getRefProduit(event) {
    this.refProduitService.findByReference(event).subscribe(data => {
      this.data.setRefProduit(data);
      console.log(data);
    });
    console.log('value change ');
  }

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
    console.log(this.data);
    // this.dataService.add(this.data).subscribe(
    //   data => {
    //     this.data = data;
    //   }
    // );
  }
}
