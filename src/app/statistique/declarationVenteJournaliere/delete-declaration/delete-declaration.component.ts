import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-declaration',
  templateUrl: './delete-declaration.component.html',
  styleUrls: ['./delete-declaration.component.css']
})
export class DeleteDeclarationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDeclarationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
   this.dialogRef.close();
  }

}
