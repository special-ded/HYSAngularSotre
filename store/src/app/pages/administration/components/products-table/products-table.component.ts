import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { FilterService } from '../../services/filter.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { PaginatorService } from '../../services/paginator.service';
import {
  CreateProduct,
  UpdateProduct,
} from 'src/app/shared/interfaces/products.interface';
import { ProductHttpService } from 'src/app/shared/services/product-http.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  startIndex: number = 0;
  isPriceAscending: boolean = true;
  isNameAscending: boolean = true;
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(
    private filterService: FilterService,
    private modal: MatDialog,
    private http: ProductHttpService,
    private productService: ProductsService,
    public paginatorService: PaginatorService
  ) {}

  ngOnInit(): void {
    this.resetFilter();
    this.productService.generateProducts();
    this.filterService.filteredByPrice$.subscribe((data) => {
      data.length !== 0 ? this.loading$.next(false) : null;

      this.arrowHandler();
    });
  }

  sortByPrice(): void {
    this.filterService.sortByPrice();
  }
  sortByName(): void {
    this.filterService.sortByName();
  }

  arrowHandler(): void {
    this.isPriceAscending = this.filterService.ascendingPrice;
    this.isNameAscending = this.filterService.ascendingName;
  }

  resetFilter(): void {
    this.filterService.filterByText('');
  }

  add() {
    let addDialog = this.modal.open(ProductModalComponent, {
      height: '547px',
      width: '570px',
      data: {
        title: 'Add Product ',
        delete: false,
      },
    });

    addDialog.afterClosed().subscribe((data) => {
      if (data) {
        let createdProduct: CreateProduct = {
          name: data.name,
          price: data.price,
          description: data.description,
          extraInfo: {
            ololo: 1,
            image: 'https://d13o3tuo14g2wf.cloudfront.net/',
          },
        };
        this.http.create<CreateProduct>(createdProduct).subscribe((data) => {
          this.ngOnInit();
        });
      }
    });
  }

  editProduct(id: string) {
    let editDialog = this.modal.open(ProductModalComponent, {
      height: '347px',
      width: '570px',
      data: {
        title: ' Edit Product',
        delete: false,
        edit: true,
        id: id,
      },
    });

    editDialog.afterClosed().subscribe((data) => {
      if (data) {
        let updatedProduct: UpdateProduct = {
          price: data.price,
          extraInfo: {
            Bluetooth: 'Y',
            image: 'Y',
          },
        };
        this.http.update<UpdateProduct>(updatedProduct, id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  deleteProduct(id: string, name: string) {
    let deleteDialog = this.modal.open(ProductModalComponent, {
      height: '200px',
      width: '570px',
      data: {
        title: `Delete product "${name.slice(0, 10)}" ?`,
        delete: true,
        id: id,
      },
    });

    deleteDialog.afterClosed().subscribe((id) => {
      if (id) {
        console.log(id);

        this.http.delete(id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
}
