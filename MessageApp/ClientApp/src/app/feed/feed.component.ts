import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
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

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.getAllMessages();
  }

  send() {
    if (this.message && !this.file) {
      this.chatService.sendMessage(this.message).subscribe(data => {
        this.getAllMessages();
      });
      this.message = '';
    }
  }

  getAllMessages() {
    this.chatService.GetAllMessage().subscribe(data => {
      this.allMessages = data.json();
    });
  }

  handleSubmit(event: any) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
