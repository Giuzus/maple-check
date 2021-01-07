import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public modalEvents = new EventEmitter();

  constructor() { }

  public show(title: string, content: string) {
    this.modalEvents.emit("open", { title: title, content: content });
  }
}
