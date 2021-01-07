import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ToastService } from 'src/app/services/Toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastService: ToastService, private modalService: ModalService) { }

  ngOnInit(): void {
    
  }

  toast() {
    this.toastService.show("Ayy","Mah man");
  }
  modal() {
    this.modalService.show("Pipi","Weenie kkkkk");
  }

  throwError(){
    throw new Error("AAAAAAA");
  }
}
