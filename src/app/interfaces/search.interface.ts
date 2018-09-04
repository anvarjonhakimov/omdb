import { IMovieShortSummaryInterface } from './movie-short-summary.interface';

export interface ISearchInterface {
  Response: string;
  Search: IMovieShortSummaryInterface[];
  totalResults: string;
}
