import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  IMovieInterface,
  IMovieShortSummaryInterface
} from '../../interfaces';
import {
  MoviesService,
  StorageService
} from '../../services';

/**
 * MovieCard component
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnDestroy, OnChanges {

  private unSubscribe: Subject<void> = new Subject<void>();

  isSaved: boolean;
  isPending: boolean;

  @Input('movie') movie: IMovieInterface | IMovieShortSummaryInterface;
  @Input('isMainPage') isMainPage: boolean;
  @Output() movieDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Creates an instance of MovieCardComponent
   *
   * @param {MoviesService} moviesService - injected MoviesService
   * @param {StorageService} storageService - injected StorageService
   * @param {Router} router
   */
  constructor(private moviesService: MoviesService,
              private storageService: StorageService,
              private router: Router) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
  }

  /**
   * OnChanges lifecycle hook implementation
   */
  ngOnChanges() {
    this.checkIsMovieSaved();
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  /**
   * Checks if movie saved in localStorage
   *
   * @memberOf MovieCardComponent
   */
  private checkIsMovieSaved(): void {
    if (this.movie) {
      this.isSaved = StorageService.isMovieSaved(this.movie.imdbID);
    }
  }

  /**
   * Gets movie info and saves movie to localStorage
   *
   * @param {IMovieShortSummaryInterface | IMovieInterface} movie
   * @memberOf MovieCardComponent
   */
  saveMovie(movie: IMovieShortSummaryInterface | IMovieInterface): void {
    this.isPending = true;

    this.moviesService.searchMovieByImdbId(movie.imdbID)
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((res: IMovieInterface) => {
        this.storageService.saveMovie(res);
        this.isPending = false;
        this.isSaved = true;
      });
  }

  /**
   * Deletes movie from localStorage and emits confirmation
   *
   * @param {IMovieShortSummaryInterface | IMovieInterface} movie
   * @memberOf MovieCardComponent
   */
  deleteMovie(movie: IMovieShortSummaryInterface | IMovieInterface): void {
    this.storageService.deleteMovie(movie.imdbID);
    this.isSaved = false;
    this.movieDeleted.emit(true);
  }

  /**
   * Navigates to movie information page
   *
   * @memberOf MovieCardComponent
   */
  moreInfo(): void {
    this.router.navigate([`/movie/${this.movie.imdbID}`]);
  }

}
