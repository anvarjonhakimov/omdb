import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { SavedMoviesComponent } from './saved-movies.component';

const routes: Routes = [
  {
    path: '',
    component: SavedMoviesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedMoviesRoutingModule {
}
