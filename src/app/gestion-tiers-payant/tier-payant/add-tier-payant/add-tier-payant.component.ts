import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';


import { TierPayant } from 'src/app/models/tierPayant';

@Component({
  selector: 'app-add-tier-payant',
  templateUrl: './add-tier-payant.component.html',
  styleUrls: ['./add-tier-payant.component.scss']
})
export class AddTierPayantComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddTierPayantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TierPayant
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
