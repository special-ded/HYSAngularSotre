import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  constructor(
    private filterService: FilterService,
    public paginatorService: PaginatorService
  ) {}

  ngOnInit(): void {
    this.filterService.filteredByPrice$.subscribe(() => {
      this.paginatorService.ngOnInit();
    });
  }

  nextPage(): void {
    this.paginatorService.nextPage();
  }

  prevPage(): void {
    this.paginatorService.prevPage();
  }
}
