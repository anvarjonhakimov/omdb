import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MovieInfoComponent } from './movie-info.component';
import { MovieInfoRoutingModule } from './movie-info-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MovieInfoRoutingModule
  ],
  declarations: [MovieInfoComponent]
})
export class MovieInfoModule {
}
