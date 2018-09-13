import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

// Maps
import { DclWrapper } from './dcl-wrapper/dcl-wrapper.component';
import { MapUtilities } from './map-utilities';
import { MapComponent } from './map/map.component';
import { VectorTilesComponent } from './vector-tiles/vector-tiles.component';
import { StatesComponent } from './states/states.component';
import { UsDroughtComponent } from './us-drought/us-drought.component';
import { AboutMeMapComponent } from './about-me-map/about-me-map.component';
import { AboutMePopupComponent } from './about-me-map/popup/about-me-popup.component';

const components = [
    MapComponent,
    DclWrapper,
    VectorTilesComponent,
    StatesComponent,
    UsDroughtComponent,
    AboutMeMapComponent,
    AboutMePopupComponent 
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
    VectorTilesComponent,
    UsDroughtComponent
  ],
})
export class MapModule { }
