import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  IMovieInterface,
  ISearchInterface
} from '../interfaces';

/**
 * Service for operations with movies
 */
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = 'http://www.omdbapi.com';
  private apiKey = '23086a32';

  /**
   * Creates an instance of MoviesService
   *
   * @param {HttpClient} http
   * @memberOf MoviesService
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Calls back-end api and searches movie by query
   *
   * @param {string} query
   * @param {number} page
   * @returns {Observable<ISearchInterface>}
   * @memberOf MoviesService
   */
  searchMovie(query: string, page = 1): Observable<ISearchInterface> {
    const obj = {
      apiKey: this.apiKey,
      s: query,
      page: page.toString()
    };
    const params = new HttpParams({fromObject: obj});

    return this.http.get(this.apiUrl, {params: params})
      .pipe(
        map(res => res as ISearchInterface)
      );
  }

  /**
   * Calls back-end api and searches movie by Imdb ID
   *
   * @param {string} imdbId
   * @returns {Observable<IMovieInterface>}
   * @memberOf MoviesService
   */
  searchMovieByImdbId(imdbId: string): Observable<IMovieInterface> {
    const obj = {
      apiKey: this.apiKey,
      i: imdbId
    };
    const params = new HttpParams({fromObject: obj});

    return this.http.get(this.apiUrl, {params: params})
      .pipe(
        map(res => res as IMovieInterface)
      );
  }
}
