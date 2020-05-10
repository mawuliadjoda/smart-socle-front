import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../services/util/message.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/jwt-auth/authentication.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  login: string;
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
    // this.router.navigate(['login']);
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

}
