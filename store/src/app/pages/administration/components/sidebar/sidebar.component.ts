import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/pages/login/modal/modal.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private modal: MatDialog) {}

  logout() {
    let addDialog = this.modal.open(ModalComponent, {
      height: '247px',
      width: '570px',
      data: {
        title: 'You will be logged out! Proceed?',
        login: false,
      },
    });

    addDialog.afterClosed().subscribe(() => {});
  }
}
