import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Issue } from '../models/issue';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService extends DataService <Issue> {

  constructor(private httpClient: HttpClient) {
     super();
     super.init('issues/', this.httpClient);
  }

}
