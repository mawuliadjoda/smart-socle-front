import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';
import { EtablissementAssurance } from 'src/app/models/etablissement-assurance';
@Component({
  selector: 'app-update-ets-assurance',
  templateUrl: './update-ets-assurance.component.html',
  styleUrls: ['./update-ets-assurance.component.scss']
})
export class UpdateEtsAssuranceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateEtsAssuranceComponent>,
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
