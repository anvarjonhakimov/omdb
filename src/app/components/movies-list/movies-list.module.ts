import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { MoviesListComponent } from './movies-list.component';
import { SharedModule } from '../../shared/shared.module';
import { MoviesListRoutingModule } from './movies-list-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MoviesListRoutingModule
  ],
  declarations: [MoviesListComponent]
})

export class MoviesListModule {
}
