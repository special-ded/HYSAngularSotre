import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  Subscription,
} from 'rxjs';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy, OnInit {
  searchSubject$ = new Subject<string | undefined>();
  private searchSubscription?: Subscription;

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((text) => {
        this.filterService.filterByText(text!);
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  searchInput(val: Event): void {
    const searchQuery = (val.target as HTMLInputElement).value;

    this.searchSubject$.next(searchQuery?.trim());
  }
}
