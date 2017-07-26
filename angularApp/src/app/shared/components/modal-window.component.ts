import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Delete</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{content}}</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-danger" (click)="activeModal.close(true)">Delete</button>
      <button type="button" class="btn btn-secondary" (click)="activeModal.close(false)">Cancel</button>
    </div>
  `
})
export class ModalWindowComponent {
  @Input() content;

  constructor(public activeModal: NgbActiveModal) {}
}