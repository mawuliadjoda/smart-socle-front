import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { RefProduitService } from 'src/app/services/ref-produit.service';
@Component({
  selector: 'app-edit-ref-produit',
  templateUrl: './edit-ref-produit.component.html',
  styleUrls: ['./edit-ref-produit.component.css']
})
export class EditRefProduitComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditRefProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: RefProduitService) { }

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

