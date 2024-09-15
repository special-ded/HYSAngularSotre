import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ColorEnum } from '../enums/colors.enum';

@Directive({
  selector: '[appColorPrice]',
})
export class ColorPriceDirective implements OnInit {
  @Input() public price: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setPriceColor(this.price);
  }

  setPriceColor(price: number): void {
    if (price > 1000) {
      this.el.nativeElement.style.color = ColorEnum.red;
      return;
    }

    if (price > 500) {
      this.el.nativeElement.style.color = ColorEnum.yellow;
    }
  }
}
