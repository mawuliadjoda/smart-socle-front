import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit.service';
import { FormControl, Validators } from '@angular/forms';
import { RefProduitService } from 'src/app/services/ref-produit.service';
@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.css']
})
export class ApprovisionnementComponent implements OnInit {
  // public qteAajouter: number;
  constructor(
    public dialogRef: MatDialogRef<ApprovisionnementComponent>,
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

  public confirm(qteAajouter: HTMLInputElement): void {
    this.data.qte = qteAajouter.value ?  this.data.qte + Number(qteAajouter.value) : this.data.qte ;
    console.log(this.formControl);
    // this.dataService.add(this.data).subscribe(
    //   data => {
    //     this.data = data;
    //   }
    // );
  }
}
