import { Component } from '@angular/core';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent {
  constructor(private filterService: FilterService) {}

  price: number = 0;
  priceSelectOption: string = 'More than';

  priceInput(val: Event): void {
    if (isNaN(+(val.target as HTMLInputElement).value)) {
      this.priceSelectOption = (val.target as HTMLInputElement).value;
      this.filterService.priceSelectOption$.next(this.priceSelectOption);
    }

    if (!isNaN(+(val.target as HTMLInputElement).value)) {
      this.price = +(val.target as HTMLInputElement).value;
      this.filterService.priceInput$.next(this.price);
    }

    this.filterService.filterByPrice(this.priceSelectOption, this.price);
  }
}
