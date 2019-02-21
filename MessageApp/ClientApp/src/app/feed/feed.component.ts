import { Component, OnInit} from '@angular/core';
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
  email: string;
  password: string
  allMessages: Array<any>;
  messageSender: any = [];
  messageReceiver: any = [];
  userId: any;

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {
    //this.userId = sessionStorage.getItem('userId');
    //if (sessionStorage.getItem('userId')) {
    //  this.authService.validateUser(this.userId).subscribe(data => {
    //    if (data) {
    //      console.log(data);
    //    }
    //  })
    //}
  }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.chatService.GetAllMessage().subscribe(data =>
      this.allMessages = data.json()
    )
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
