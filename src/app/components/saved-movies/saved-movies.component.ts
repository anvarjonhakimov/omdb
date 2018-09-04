import {
  Component,
  OnInit
} from '@angular/core';

import { StorageService } from '../../services';
import { IMovieInterface } from '../../interfaces';

/**
 * SavedMovies component
 */
@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrls: ['./saved-movies.component.scss']
})
export class SavedMoviesComponent implements OnInit {

  savedMovies: IMovieInterface[];

  /**
   * Creates an instance of SavedMoviesComponent
   */
  constructor() {
  }

  /**
   * OnInit lifecycle hook implementation
   */
  ngOnInit() {
    this.getSavedMovies();
  }

  /**
   * Gets saved movies from localStorage
   *
   * @memberOf SavedMoviesComponent
   */
  private getSavedMovies(): void {
    this.savedMovies = StorageService.getSavedMovies();
  }

  /**
   * Fires on deleting movie from localStorage and updates saved movies list
   *
   * @param {boolean} event
   * @memberOf SavedMoviesComponent
   */
  onDeleteMovie(event: boolean): void {
    if (event) {
      this.getSavedMovies();
    }
  }

}
