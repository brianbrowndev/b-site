import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// app components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './core/home/home.component';
import { MastheadComponent } from './core/masthead/masthead.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

// services
import { PagesService } from './services/pages.service';
import { PostsService } from './services/posts.service';
import { MarkdownService } from './services/markdown.service';


// front page posts
import { PostCardComponent } from './posts/post-card/post-card.component';
import { PostSidebarComponent } from './posts/post-sidebar/sidebar.component';

// single post/page
import { PostHeaderComponent } from './posts/post-header/post-header.component';
import { PostFooterComponent } from './posts/post-footer/post-footer.component';
import { PageComponent } from './page/page.component';
import { PostComponent } from './posts/post/post.component';

// Maps
import { DclWrapper } from './maps/dcl-wrapper/dcl-wrapper.component';
import { MapUtilities } from './maps/map-utilities';
import { MapComponent } from './maps/map/map.component';
import { VectorTilesComponent } from './maps/vector-tiles/vector-tiles.component';
import { StatesComponent } from './maps/states/states.component';
import { UsDroughtComponent } from './maps/us-drought/us-drought.component';
import { LoadingComponent } from './core/loading/loading.component';
import { AboutComponent } from './core/about/about.component';
import { AboutMeMapComponent } from './maps/about-me-map/about-me-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MastheadComponent,
    PostComponent,
    PageComponent,
    PostCardComponent,
    PostSidebarComponent,
    PostHeaderComponent,
    PostFooterComponent,
    MapComponent,
    NotfoundComponent,
    DclWrapper,
    VectorTilesComponent,
    StatesComponent,
    UsDroughtComponent,
    LoadingComponent,
    AboutComponent,
    AboutMeMapComponent
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
    MapUtilities
  ],
  entryComponents: [
    VectorTilesComponent,
    UsDroughtComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
