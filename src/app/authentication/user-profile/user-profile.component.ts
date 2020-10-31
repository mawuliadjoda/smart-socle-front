import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/jwt-auth/authentication.service';
import { MessageService } from 'src/app/services/util/message.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  login: string;
  lastConnecionDate: Date = new Date();

  constructor(private messageService: MessageService,
              private router: Router,
              private authentocationService: AuthenticationService) { }

  ngOnInit() {
    this.login = this.authentocationService.getUserLogin();
  }

  public logout() {
    this.messageService.sendLoginMessage(false);
    this.router.navigateByUrl('');

    this.authentocationService.logOut();
  }
}
