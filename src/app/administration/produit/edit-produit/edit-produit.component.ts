import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProduitService } from 'src/app/services/produit.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditProduitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ProduitService) { }

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
