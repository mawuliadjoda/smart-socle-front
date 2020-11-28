import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';
import { EtablissementAssurance } from 'src/app/models/etablissement-assurance';

@Component({
  selector: 'app-add-ets-assurance',
  templateUrl: './add-ets-assurance.component.html',
  styleUrls: ['./add-ets-assurance.component.scss']
})
export class AddEtsAssuranceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEtsAssuranceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EtablissementAssurance
  ) {}

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

}
