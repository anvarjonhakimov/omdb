import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: './components/movies-list/movies-list.module#MoviesListModule'
  },
  {
    path: 'movie/:id',
    loadChildren: './components/movie-info/movie-info.module#MovieInfoModule'
  },
  {
    path: 'saved-movies',
    loadChildren: './components/saved-movies/saved-movies.module#SavedMoviesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
