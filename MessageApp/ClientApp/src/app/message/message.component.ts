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
  userId: number;
  profilePhoto: any;

  constructor(private authService: AuthService) {
    if (sessionStorage.getItem('userId')) {
      this.userId = parseInt(sessionStorage.getItem('userId'));
      this.authService.getUser(this.userId).subscribe(currentUser => {
        if (currentUser) {
          this.isOwnMessage = currentUser.json()["email"] === this.userEmail;
        }
      });
    }
  }

  ngOnInit(chatMessage = this.chatMessage) {
    this.userName = chatMessage["sendBy"];
    this.userImage = "data:image/jpg;base64," + chatMessage["userProfileImage"];
    this.userEmail = chatMessage["userEmail"];
    this.messageContent = chatMessage["sendMessage"];
    this.timeStamp = chatMessage["sendTime"];
    if (chatMessage["sendImage"] != null) {
      this.url = "data:image/jpg;base64," + chatMessage["sendImage"];
    }
  }

}
