import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// app components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MastheadComponent } from './masthead/masthead.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { APP_SETTINGS, AppSettings } from './app.settings';

import { PagesService } from './pages.service';
import { PostsService } from './posts.service';
// markdown loaders
import { MarkdownService } from './markdown.service';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
// front page posts
import { PostCardComponent } from './post-card/post-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MomentPipe } from './moment.pipe';
// single post
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostFooterComponent } from './post-footer/post-footer.component';
// Maps
import { DclWrapper } from './dcl-wrapper/dcl-wrapper.component';
import { MapUtilities } from './maps/map-utilities';
import { MapComponent } from './map/map.component';
import { VectorTilesComponent } from './maps/vector-tiles/vector-tiles.component';
import { BikeCommuteComponent } from './maps/bike-commute/bike-commute.component';
import { StatesComponent } from './maps/states/states.component';
import { UsDroughtComponent } from './maps/us-drought/us-drought.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MastheadComponent,
    PostComponent,
    PageComponent,
    PostCardComponent,
    SidebarComponent,
    MomentPipe,
    PostHeaderComponent,
    PostFooterComponent,
    MapComponent,
    NotfoundComponent,
    DclWrapper,
    VectorTilesComponent,
    BikeCommuteComponent,
    StatesComponent,
    UsDroughtComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    MarkdownService,
    PagesService,
    PostsService,
    MapUtilities,
    { provide: APP_SETTINGS, useValue: AppSettings }

  ],
  entryComponents: [
    BikeCommuteComponent,
    VectorTilesComponent,
    UsDroughtComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
