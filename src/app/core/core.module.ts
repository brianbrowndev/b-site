import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

// app components
import { MastheadComponent } from '@app/core/masthead/masthead.component';
import { NotfoundComponent } from '@app/core/notfound/notfound.component';
import { AboutComponent } from '@app/core/about/about.component';

import { AppsOverviewComponent } from './apps/apps-overview/apps-overview.component';

// Visuals
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    MastheadComponent,
    NotfoundComponent,
    AboutComponent,
    AppsOverviewComponent,
    MainComponent
  ],
  exports: [
    MastheadComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [],
})
export class CoreModule { }
