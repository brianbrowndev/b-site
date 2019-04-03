import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

// Maps
import { MapUtilities } from './map-utilities';
import { VisualComponent } from './visual/visual.component';
import { StatesComponent } from './states/states.component';
import { UsDroughtComponent } from './us-drought/us-drought.component';
import { AboutMeMapComponent } from './about-me-map/about-me-map.component';
import { AboutMePopupComponent } from './about-me-map/popup/about-me-popup.component';
import { SpendingHistoryComponent } from './spending-history/spending-history.component';

const components = [
    VisualComponent,
    StatesComponent,
    UsDroughtComponent,
    AboutMeMapComponent,
    AboutMePopupComponent 
]

@NgModule({
  declarations: [...components, SpendingHistoryComponent],
  exports: [...components],
  imports: [
    CommonModule,
  ],
  providers: [
    MapUtilities
  ],
  entryComponents: [
    UsDroughtComponent
  ],
})
export class VisualModule { }
