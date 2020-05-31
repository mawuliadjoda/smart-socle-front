import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/util/file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnvService } from 'src/app/services/config/env.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;

  downloadUrl = this.env.baseUrl + '/smart/' + '/download5';
  constructor(private fileService: FileService, private env: EnvService) { }

  ngOnInit() {
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.fileService.pushFileToStorage(this.currentFileUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert('File Successfully Uploaded');
      }
      this.selectedFiles = undefined;
    });

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
