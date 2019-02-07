import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const email = this.email;
    const password = this.password;

    this.authService.login(email, password)
      .subscribe(data => {
        this.router.navigate(['/chat']);
      })
  };
}
