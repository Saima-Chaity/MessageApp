import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<any>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userList();
  }

  userList() {
    this.authService.getUserList().subscribe(data => {
      this.users = data.json();
    });
  }

}
