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
  @ViewChild('contentToConvert') content: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<QrcodeDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Produit
  ) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  // makePdf() {
  //   let doc = new jspdf();
  //   doc.addHTML(this.content.nativeElement, function() {
  //      doc.save("obrz.pdf");
  //   });
  // }

  public convetToPDF() {
    // var  data = document.getElementById('contentToConvert');
    let  data = this.content.nativeElement;
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 30;
      let pageHeight = 30;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }

}
