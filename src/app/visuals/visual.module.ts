import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

// Maps
import { MapUtilities } from './map-utilities';
import { VisualComponent } from './visual/visual.component';

const components = [
    VisualComponent,
]

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
  ],
  providers: [
    MapUtilities
  ],
  entryComponents: [
  ],
})
export class VisualModule { }
