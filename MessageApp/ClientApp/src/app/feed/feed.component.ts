import { Component, OnInit, OnChanges  } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { ChatMessage } from '../models/chatMessage.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: Array<ChatMessage>;

  constructor(private chatService: ChatService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.chatService.GetAllMessage().subscribe(
      data => {
        this.feed = data.json();
      }
    );
  }

  ngOnChanges() {
    this.chatService.GetAllMessage().subscribe(
      data => {
        this.feed = data.json();
        console.log(this.feed);
      }
    );
  }
}
