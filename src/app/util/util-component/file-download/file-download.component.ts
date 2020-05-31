import { Component, OnInit, Input } from '@angular/core';
import { FileService } from 'src/app/services/util/file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {
  @Input()
  downloadUrl: string;

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.downloadUrl);
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
