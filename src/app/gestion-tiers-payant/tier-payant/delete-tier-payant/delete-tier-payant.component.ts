import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-tier-payant',
  templateUrl: './delete-tier-payant.component.html',
  styleUrls: ['./delete-tier-payant.component.scss']
})
export class DeleteTierPayantComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTierPayantComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
  this.dialogRef.close();
  }
}
