import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Subject } from 'rxjs';
import {
  takeUntil,
  mergeMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  tap
} from 'rxjs/operators';

import { MoviesService } from '../../services';
import {
  ISearchInterface,
  IMovieShortSummaryInterface
} from '../../interfaces';

/**
 * MoviesList component
 */
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  private unSubscribe: Subject<void> = new Subject<void>();

  autoCompleteData: IMovieShortSummaryInterface[];
  searchQuery: FormControl = new FormControl();
  moviesList: IMovieShortSummaryInterface[];
  notFound: boolean;

  /**
   * Creates an instance of MoviesListComponent
   *
   * @param {MoviesService} moviesService - injected MoviesService
   * @memberOf MoviesListComponent
   */
  constructor(private moviesService: MoviesService) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.listenSearchInput();
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  /**
   * Searches movies for autocomplete
   *
   * @memberOf MoviesListComponent
   */
  private listenSearchInput(): void {
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((value: string) => {
          if (value.length === 0) {
            this.autoCompleteData = null;
            this.notFound = false;
          }
        }),
        filter((value: string) => value.length > 2),
        takeUntil(this.unSubscribe),
        mergeMap((searchQuery: string) => this.moviesService.searchMovie(searchQuery))
      )
      .subscribe((res: ISearchInterface) => this.autoCompleteData = res.Search);
  }

  /**
   * Searches movie
   *
   * @param {string} searchQuery
   * @memberOf MoviesListComponent
   */
  private searchMovies(searchQuery: string): void {
    this.moviesService.searchMovie(searchQuery)
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((res: ISearchInterface) => this.moviesList = res.Search);
  }

  /**
   * Searches movie on autocomplete option selected
   *
   * @param {MatAutocompleteSelectedEvent} event
   * @memberOf MoviesListComponent
   */
  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const searchQuery = event.option.value;
    this.searchMovies(searchQuery);
  }

}
