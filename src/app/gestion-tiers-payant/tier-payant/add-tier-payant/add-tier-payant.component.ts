import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';


import { TierPayant } from 'src/app/models/tierPayant';
import { EtablissementAssuranceService } from 'src/app/services/etablissement-assurance.service';
import { EtablissementAssurance } from 'src/app/models/etablissement-assurance';

@Component({
  selector: 'app-add-tier-payant',
  templateUrl: './add-tier-payant.component.html',
  styleUrls: ['./add-tier-payant.component.scss']
})
export class AddTierPayantComponent implements OnInit {

  etablissementAssurances: EtablissementAssurance [] = [];
  constructor(
    public dialogRef: MatDialogRef<AddTierPayantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TierPayant,
    private etsService: EtablissementAssuranceService
  ) {}

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit() {
    this.loadEtsAssurance();
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
  loadEtsAssurance() {
    this.etsService.getAll().subscribe(data => {
      this.etablissementAssurances = data;
    });
  }
}
