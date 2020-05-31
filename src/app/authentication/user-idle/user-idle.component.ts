import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { MessageService } from 'src/app/services/util/message.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/jwt-auth/authentication.service';


@Component({
  selector: 'app-user-idle',
  templateUrl: './user-idle.component.html',
  styleUrls: ['./user-idle.component.css']
})
export class UserIdleComponent implements OnInit {

  timerSubscription: Subscription;
  minutesDisplay = 0;
  secondsDisplay = 0;
  isLogged: boolean;
  constructor(private bnNgIdleService: BnNgIdleService,
              private messageService: MessageService,
              private router: Router,
              private authentocationService: AuthenticationService) { }

  ngOnInit() {
    this.isLogged =  true;
    const interval = 1000;
    const duration = 10;
    this.timerSubscription = timer(0, interval).pipe(
      take(duration)
    ).subscribe(value => {
      this.render((duration - +value) * interval);
      this.isLogged = true;
    }
      ,
      err => { },
      () => {
        if (!this.authentocationService.isResetTimer()) {
          this.messageService.sendLoginMessage(false);
          this.router.navigateByUrl('');
          this.authentocationService.logOut();
          this.isLogged = false;
          console.log('-------session expired---------');
        } else {
          console.log('-----this.authentocationService.isResetTimer()---: ' + this.authentocationService.isResetTimer());
        }
      }
    );
  }

  private render(count) {
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
  }
  private getSeconds(ticks: number) {
    const seconds = ((ticks % 60000) / 1000).toFixed(0);
    return this.pad(seconds);
  }

  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
}
