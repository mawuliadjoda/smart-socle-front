import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-ets-assurance',
  templateUrl: './delete-ets-assurance.component.html',
  styleUrls: ['./delete-ets-assurance.component.scss']
})
export class DeleteEtsAssuranceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteEtsAssuranceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
  this.dialogRef.close();
  }
}
