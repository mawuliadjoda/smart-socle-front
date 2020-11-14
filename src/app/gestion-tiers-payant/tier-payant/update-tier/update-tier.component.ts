import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProduitService } from 'src/app/services/produit.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-tier',
  templateUrl: './update-tier.component.html',
  styleUrls: ['./update-tier.component.scss']
})
export class UpdateTierComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdateTierComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  formControl = new FormControl('', [
  Validators.required
  // Validators.email,
  ]);

  ngOnInit(): void {
  }
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
    this.formControl.hasError('email') ? 'Not a valid email' :
    '';
  }

  submit() {
  // emppty stuff
  }

  onNoClick(): void {
   this.dialogRef.close();
  }

  stopEdit(): void {
  }
}
