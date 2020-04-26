import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-delete-produit',
  templateUrl: './delete-produit.component.html',
  styleUrls: ['./delete-produit.component.css']
})
export class DeleteProduitComponent implements OnInit {


constructor(public dialogRef: MatDialogRef<DeleteProduitComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any, public dataService: ProduitService) { }

  ngOnInit() {
  }

  onNoClick(): void {
  this.dialogRef.close();
  }

  confirmDelete(): void {
  }
}
