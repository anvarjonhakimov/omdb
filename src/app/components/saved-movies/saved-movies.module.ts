import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SavedMoviesRoutingModule } from './saved-movies-routing.module';
import { SavedMoviesComponent } from './saved-movies.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SavedMoviesRoutingModule
  ],
  declarations: [SavedMoviesComponent]
})
export class SavedMoviesModule {
}
