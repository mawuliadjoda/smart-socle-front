import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-categorie',
  templateUrl: './delete-categorie.component.html',
  styleUrls: ['./delete-categorie.component.css']
})
export class DeleteCategorieComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteCategorieComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

ngOnInit() {
}

onNoClick(): void {
this.dialogRef.close();
}

}
