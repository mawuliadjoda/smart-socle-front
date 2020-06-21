import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { Produit } from 'src/app/models/produit';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jspdf from 'jspdf';
// import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-qrcode-display',
  templateUrl: './qrcode-display.component.html',
  styleUrls: ['./qrcode-display.component.css']
})
export class QrcodeDisplayComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QrcodeDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  @ViewChild('content') content: ElementRef;

  makePdf() {
    let doc = new jspdf();
    doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });
  }

  public convetToPDF()
{
var data = document.getElementById('contentToConvert');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 30;
var pageHeight = 30;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;

const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
pdf.save('new-file.pdf'); // Generated PDF
});
}

}
