import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  name: string;
  email: string;
  status: string;
  userImage: any;
  url: any;
  imageString: any;
  userID: number;
  filetoUpload: any;

  constructor(private authService: AuthService, private router: Router) {
    if (sessionStorage.getItem("userId") != null) {
      this.userID = parseInt(sessionStorage.getItem("userId"));
    }
}


  ngOnInit() {
    this.currentUser();

  }

  currentUser() {
    this.authService.getCurrentUser().subscribe(data => {
      this.name = data.json()["name"];
      this.email = data.json()["email"];
      if (data.json()["profilePhoto"] != null) {
        this.url = data.json()["profilePhoto"];
      }
    });
  }

  onFileUpload(event) {
    this.filetoUpload = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.url = (<FileReader>e.target).result;
      this.imageString = reader.result.split(',')[1];
    };
  }


  save() {

    this.authService.saveProfileSettings(this.imageString).subscribe(data => {
      this.router.navigate(['/chatroom']);
    });
  }

}
