import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  userId: string;
  name: string;

  constructor(private authService: AuthService, private router: Router) {}

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit() {
    this.currentUser();
    if (sessionStorage.getItem('userId')) {
      this.userId = sessionStorage.getItem('userId');
    }
  }

  currentUser() {
    this.authService.getCurrentUser().subscribe(data => {
      this.name = data.json()["name"];
    });
  }

  logout() {
    this.authService.logout().subscribe(data => {
      sessionStorage.removeItem('userId');
      this.router.navigate(['/login']);
    });
  }

}
