import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/util/message.service';
import { AuthenticationService } from 'src/app/services/jwt-auth/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  invalidLogin = false;




  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  @Input() error: string | null;

  constructor(private router: Router,
              private messageService: MessageService,
              private loginservice: AuthenticationService) { }

  ngOnInit() {
  }



  // submit() {
  //   if (this.form.valid) {
  //     this.router.navigateByUrl('home');
  //     this.messageService.sendLoginMessage(true);
  //   }
  // }


  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['home']);
        this.invalidLogin = false;

        this.messageService.sendLoginMessage(true);
      },
      error => {
        this.invalidLogin = true;
        this.error = 'Veuillez vérifier les informations saisies !';
        console.error(error.message);

      }
    )
    );

  }

}
