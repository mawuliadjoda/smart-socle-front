import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from '../services/util/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
  }

  public logout() {
    this.messageService.sendLoginMessage(false);
    this.router.navigateByUrl('');
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

}
