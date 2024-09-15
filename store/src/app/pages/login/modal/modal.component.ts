import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  constructor(
    private ls: LocalStorageService,
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; login: boolean }
  ) {}

  ok(): void {
    if (!this.data.login) {
      this.ls.deleteToken();
      this.dialogRef.close();
      this.router.navigate(['shop']);
      return;
    }

    this.dialogRef.close({
      login: this.data.title,
    });
  }

  cancel(): void {
    if (!this.data.login) {
      this.dialogRef.close();
      return;
    }
    this.router.navigate(['shop']);
    this.dialogRef.close();
  }
}
