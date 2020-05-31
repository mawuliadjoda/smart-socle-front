import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-fournisseur',
  templateUrl: './delete-fournisseur.component.html',
  styleUrls: ['./delete-fournisseur.component.css']
})
export class DeleteFournisseurComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteFournisseurComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
  this.dialogRef.close();
  }

}
