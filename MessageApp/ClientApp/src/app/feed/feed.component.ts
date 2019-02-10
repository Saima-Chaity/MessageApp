import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  message: string;
  file: string;
  url: any;
  allMessages: Array<any>;
  messageSender: any = [];
  messageReceiver: any = [];

  constructor(private chatService: ChatService, private router: Router) {
  }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.chatService.GetAllMessage().subscribe(data => {
      this.allMessages = data.json();
      for (let i = 0; i < this.allMessages.length; i++) {
        if (this.allMessages[i]["sendBy"] === "Saima") {
          this.messageSender.push(this.allMessages[i]);
        }
        else {
          this.messageReceiver.push(this.allMessages[i]);
        }
      }
    });
  }

  send() {
    if (this.message && !this.file) {
      this.chatService.sendMessage(this.message).subscribe(data => {
        this.getAllMessages();
      });
      this.message = '';
    }
  }

  handleSubmit(event: any) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
