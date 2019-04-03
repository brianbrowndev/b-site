import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';

// app components
import { MastheadComponent } from '@app/core/masthead/masthead.component';
import { NotfoundComponent } from '@app/core/notfound/notfound.component';
import { AboutComponent } from '@app/core/about/about.component';
import { PanelComponent } from './panel/panel.component';
import { PanelSidebarComponent } from './panel-sidebar/panel-sidebar.component';

import { AppsOverviewComponent } from './apps/apps-overview/apps-overview.component';

// Visuals
import { VisualModule } from '@app/visuals';
import { VisualsComponent } from './visuals/visuals.component';

@NgModule({
  declarations: [
    MastheadComponent,
    NotfoundComponent,
    AboutComponent,
    PanelComponent,
    VisualsComponent,
    PanelSidebarComponent,
    AppsOverviewComponent
  ],
  exports: [
    MastheadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    VisualModule
  ],
  providers: [],
})
export class CoreModule { }
