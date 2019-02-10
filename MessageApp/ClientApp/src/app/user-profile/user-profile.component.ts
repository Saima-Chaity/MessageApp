import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  email: string;
  status: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser();
  }

  currentUser() {
    this.authService.getCurrentUser().subscribe(data =>
    {
      this.name = data.json()["name"];
      this.email = data.json()["email"];
      this.status = data.json()["status"];
      sessionStorage.setItem("userId", data.json()["userId"]);
    });
  }
}
