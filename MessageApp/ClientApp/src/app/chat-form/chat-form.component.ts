import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Router } from '@angular/router';
import { concat } from 'rxjs/operator/concat';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  file: string;
  url: any;
  allMessages: Array<any>;

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
  }

  send() {
    if (this.message && !this.file) {
      this.chatService.sendMessage(this.message).subscribe();
      this.message = '';
      this.getAllMessages();
    }
  }

  getAllMessages() {
    this.chatService.GetAllMessage().subscribe(data => {
      console.log(data._body);
      console.log(data);
      this.allMessages = data._body;
    });
  }

  handleSubmit(event: any) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
