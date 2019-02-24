import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  file: any;
  url: any;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.url = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.url = (<FileReader>e.target).result;
      this.file = reader.result.split(',')[1];
    };
  }

  send() {
    if (this.message && !this.file) {
      this.chatService.sendMessage(this.message).subscribe();
      this.message = '';
      window.location.reload();
    }
    if (this.message && this.file) {
      this.chatService.sendMessageAndFile(this.message, this.file).subscribe();
      this.message = '';
      this.file = '';
      window.location.reload();
    }
    if (this.file) {
      this.chatService.sendFile(this.file).subscribe();
      this.file = '';
      window.location.reload();
    }
  }

  handleSubmit(event: any) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

}
