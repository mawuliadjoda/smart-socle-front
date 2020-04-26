import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-commande-entrant-attente',
  templateUrl: './delete-commande-entrant-attente.component.html',
  styleUrls: ['./delete-commande-entrant-attente.component.css']
})
export class DeleteCommandeEntrantAttenteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCommandeEntrantAttenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    ngOnInit() {
    }

    onNoClick(): void {
    this.dialogRef.close();
    }

    confirmDelete(): void {
    }
}
