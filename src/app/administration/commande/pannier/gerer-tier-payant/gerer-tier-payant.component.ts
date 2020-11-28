import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TierPayant } from 'src/app/models/tierPayant';
import { TierPayanService } from 'src/app/services/tier-payan.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-gerer-tier-payant',
  templateUrl: './gerer-tier-payant.component.html',
  styleUrls: ['./gerer-tier-payant.component.scss']
})
export class GererTierPayantComponent implements OnInit {
  fieldValue: string;
  showResult: boolean;
  isEpire: boolean;
  constructor(public dialogRef: MatDialogRef<GererTierPayantComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TierPayant,
              private tierPayantService: TierPayanService,
              private utilService: UtilService) { }

  ngOnInit() {
    this.showResult = false;
    this.isEpire = false;
  }

  rechercherTiersParNumAssurance() {
    this.tierPayantService.findByNumCarteAssurance(this.fieldValue).subscribe( data => {
      this.data = data;
      this.showResult = true;
      this.isEpire = false;

      if (this.data && this.data.dateExpirationAssurance && new Date() > new Date(this.data.dateExpirationAssurance) ) {

        this.isEpire = true;
        this.utilService.displayMessage('La carte est expirée !', '');
      }

      if (!data) {
        this.utilService.displayMessage('Acun résultat trouvé !', '');
      }
    },
    (err: HttpErrorResponse) => {
        console.log(err.name + ' ' + err.message);
        this.utilService.displayMessage('Erreur lors de la recherche du numero assurance', 'Erreur');
    });
    this.fieldValue = '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
