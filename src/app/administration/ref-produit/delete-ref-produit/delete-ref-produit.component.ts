import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RefProduitService } from 'src/app/services/ref-produit.service';

@Component({
  selector: 'app-delete-ref-produit',
  templateUrl: './delete-ref-produit.component.html',
  styleUrls: ['./delete-ref-produit.component.css']
})

export class DeleteRefProduitComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteRefProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: RefProduitService
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {}
}
