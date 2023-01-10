import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductHttpService } from 'src/app/shared/services/product-http.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent {
  form: FormGroup = this.fb.group({
    name: null,
    password: null,
  });

  constructor(
    private fb: FormBuilder,
    private http: ProductHttpService,
    public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; delete: boolean; edit: boolean; id: string }
  ) {}

  ok(): void {
    if (this.data.delete) {
      this.dialogRef.close(this.data.id);
      return;
    }

    this.dialogRef.close({
      username: this.form.getRawValue().name,
      password: this.form.getRawValue().password,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
