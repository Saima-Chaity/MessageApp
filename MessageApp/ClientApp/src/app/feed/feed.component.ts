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
export class FeedComponent implements OnInit, OnChanges  {
  message: string;
  file: string;
  url: any;
  email: string;
  password: string
  allMessages: Array<any>;
  messageSender: any = [];
  messageReceiver: any = [];
  userId: any;

  feed: Array<ChatMessage>;

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
    this.chatService.GetAllMessage().subscribe(
      data => {
        this.feed = data.json();
        console.log(this.feed);
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

  //ngOnInit(chatMessage = this.chatMessage) {
  //  this.url = chatMessage.file;
  //  this.getAllMessages();
  //}

  //onFileChanged(event) {
  //  this.url = event.target.files[0];
  //  const reader = new FileReader();
  //  reader.readAsDataURL(event.target.files[0]);
  //  reader.onload = (e) => {
  //    this.url = (<FileReader>e.target).result;
  //    this.file = reader.result.split(',')[1];
  //  };
  //}


  //getAllMessages() {
  //  this.chatService.GetAllMessage().subscribe(data => {
  //    console.log(JSON.stringify(data.json()));
  //    this.allMessages = data.json();
  //    this.url = data.json()["sendFile"];
  //  });
  //}

  //send() {
  //  if (this.message && !this.file) {
  //    this.chatService.sendMessage(this.message).subscribe(data => {
  //      this.getAllMessages();
  //    });
  //    this.message = '';
  //  }
  //  if (this.message && this.file) {
  //    this.chatService.sendMessageAndFile(this.message, this.file).subscribe(data => {
  //      this.getAllMessages();
  //    });
  //    this.message = '';
  //    this.file = '';
  //  }
  //}

  //handleSubmit(event: any) {
  //  if (event.keyCode === 13) {
  //    this.send();
  //  }
  //}

}
