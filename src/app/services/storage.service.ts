import { Injectable } from '@angular/core';
import { IMovieInterface } from '../interfaces/movie.interface';

/**
 * Service for operations with localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Creates an instance of StorageService
   */
  constructor() {
  }

  /**
   * Gets saved movies from localStorage
   *
   * @returns {IMovieInterface[]}
   * @memberOf StorageService
   */
  public static getSavedMovies(): IMovieInterface[] {
    return JSON.parse(localStorage.getItem('savedMovies')) || [];
  }

  /**
   * Checks if movie saved in localStorage
   *
   * @param {string} imdbId
   * @returns {boolean}
   * @memberOf StorageService
   */
  public static isMovieSaved(imdbId: string): boolean {
    const savedMovies = StorageService.getSavedMovies();

    return !!savedMovies.find(movie => movie.imdbID === imdbId);
  }

  /**
   * Saves movie to localStorage
   *
   * @param {IMovieInterface} movie
   * @memberOf StorageService
   */
  saveMovie(movie: IMovieInterface): void {
    const savedMovies = StorageService.getSavedMovies();

    if (!savedMovies.find(savedMovie => savedMovie.imdbID === movie.imdbID)) {
      savedMovies.push(movie);
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    }
  }

  /**
   * Deletes movie from localStorage
   *
   * @param {string} imdbId
   * @memberOf StorageService
   */
  deleteMovie(imdbId: string): void {
    let savedMovies = StorageService.getSavedMovies();

    savedMovies = savedMovies.filter(movie => movie.imdbID !== imdbId);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }
}
