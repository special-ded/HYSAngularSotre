import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductHttpService } from 'src/app/shared/services/product-http.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent {
  form: FormGroup = this.fb.group({
    name: null,
    price: null,
    description: null,
  });

  constructor(
    private fb: FormBuilder,
    private http: ProductHttpService,
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; delete: boolean; edit: boolean; id: string }
  ) {}

  ok(): void {
    if (this.data.delete) {
      this.dialogRef.close(this.data.id);
      return;
    }

    this.dialogRef.close({
      name: this.form.getRawValue().name,
      price: this.form.getRawValue().price,
      description: this.form.getRawValue().description,
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
