import { Component, OnInit } from '@angular/core';
import * as jsonData from './_files/myJson.json';
import { Store } from '@ngxs/store';
import { LoadProducts } from './ngxs/action/index.js';
import { BnNgIdleService } from 'bn-ng-idle';
import { MatDialog } from '@angular/material';
import { UserIdleComponent } from './dialogs/user-idle/user-idle.component';

import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AuthenticationService } from './services/jwt-auth/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular8-socle-project';

  path: any = (jsonData as any).default[0];


  timerSubscription: Subscription;
  isLogged: boolean;
  constructor(
    private store: Store,
    private bnNgIdleService: BnNgIdleService,
    private dialog: MatDialog,
    private authentocationService: AuthenticationService
  ) {
    this.store.dispatch(new LoadProducts());
    console.log('----path----:' + this.path.client);
  }

  ngOnInit(): void {

    this.bnNgIdleService.startWatching(environment.userIdleDuration).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        if (this.authentocationService.isUserLoggedIn()) {
          this.authentocationService.setisResetTimer(false);
          const dialogRef = this.dialog.open(UserIdleComponent);
          dialogRef.afterClosed().subscribe(result => {
            // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
            if (result === 'confirm') {
              console.log('Unregistered');
              this.bnNgIdleService.resetTimer();
              this.authentocationService.setisResetTimer(true);
            }
          });
        }
      }
    });

  }
}
