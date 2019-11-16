import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from '../services/util/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  @Input() error: string | null;

  constructor(private router: Router, private messageService: MessageService) { }

  ngOnInit() {
  }



  submit() {
    if (this.form.valid) {
      this.router.navigateByUrl('home');
      this.messageService.sendLoginMessage(true);
    }
  }

}
