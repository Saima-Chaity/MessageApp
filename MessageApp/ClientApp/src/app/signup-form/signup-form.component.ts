import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  email: string;
  password: any;
  userName: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    const email = this.email;
    const password = this.password;
    const userName = this.userName;
    this.authService.signup(email, userName, password)
      .subscribe(data => {
        this.router.navigate(['/chatroom']);
      })
  }
}
