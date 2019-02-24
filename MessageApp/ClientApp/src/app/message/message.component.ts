import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../models/chatMessage.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userName: string;
  userEmail: string;
  messageContent: string;
  url: any;
  userImage: any;
  timeStamp: any;
  isOwnMessage: boolean;
  userId: string;
  profilePhoto: any;

  constructor(private authService: AuthService) {
    //if (sessionStorage.getItem('userId')) {
    //  this.userId = sessionStorage.getItem('userId');
    //  this.authService.authenticateUser().subscribe(currentUser => {
    //    if (currentUser) {
    //      this.isOwnMessage = currentUser.email === this.userEmail;
    //    }
    //  });
    //}
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.authService.getCurrentUser().subscribe(data => {
      this.userName = data.json()["name"];
      if (data.json()["profilePhoto"] != null) {
        this.profilePhoto = data.json()["profilePhoto"];
      }
    });
    this.messageContent = chatMessage["sentMessage"];
    this.timeStamp = chatMessage["sendTime"];
    if (chatMessage["sentFile"] != null) {
      this.url = "data:image/jpg;base64," + chatMessage["sentFile"];
    }
  }

}
