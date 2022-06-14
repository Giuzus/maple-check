import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfo } from 'src/app/models/Modal';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('content', { static: false }) modalContent: TemplateRef<void>;
  
  public title: String;
  public contentText: String;

  constructor(private ngbModal: NgbModal, private modalService: ModalService) { }


  ngOnInit(): void {

    this.modalService.modalEvents.on("open", (info: ModalInfo) => {

      this.title = info.title;
      this.contentText = info.content;

      const modalRef = this.ngbModal.open(this.modalContent);
    });

  }

}


