import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MoviesService } from '../../services';
import { IMovieInterface } from '../../interfaces';

/**
 * MovieInfo component
 */
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit, OnDestroy {

  private unSubscribe: Subject<void> = new Subject<void>();

  imdbId = this.route.snapshot.params['id'];
  movie: IMovieInterface;

  /**
   * Creates an instance of MovieInfoComponent
   *
   * @param {ActivatedRoute} route
   * @param {MoviesService} moviesService - injected MoviesService
   */
  constructor(private route: ActivatedRoute,
              private moviesService: MoviesService) {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.getMovie();
  }

  /**
   * OnDestroy lifecycle hook implementation
   */
  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }

  /**
   * Gets movie
   *
   * @memberOf MovieInfoComponent
   */
  getMovie(): void {
    this.moviesService.searchMovieByImdbId(this.imdbId)
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((res: IMovieInterface) => {
        this.movie = res;
      }, err => {
        console.log(err);
      });
  }

}
