import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpModule } from '@angular/http';
// app components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MastheadComponent } from './masthead/masthead.component';
import { NotfoundComponent } from './notfound/notfound.component';
// markdown loaders
import { MarkdownService } from './markdown.service';
import { PageComponent } from './page/page.component';
import { PostComponent } from './post/post.component';
// front page posts
import { PostsComponent } from './posts/posts.component';
import { PostCardComponent } from './post-card/post-card.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MomentPipe } from './moment.pipe';
// single post
import { PostHeaderComponent } from './post-header/post-header.component';
import { PostFooterComponent } from './post-footer/post-footer.component';
// Maps
import { DclWrapperComponent } from './dcl-wrapper/dcl-wrapper.component';
import { MapUtilities } from './maps/map-utilities';
import { MapComponent } from './map/map.component';
import { VectorTilesComponent } from './maps/vector-tiles/vector-tiles.component';
import { BikeCommuteComponent } from './maps/bike-commute/bike-commute.component';
import { StatesComponent } from './maps/states/states.component';
import { UsDroughtComponent } from './maps/us-drought/us-drought.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MastheadComponent,
    PostComponent,
    PageComponent,
    PostsComponent,
    PostCardComponent,
    SidebarComponent,
    MomentPipe,
    PostHeaderComponent,
    PostFooterComponent,
    MapComponent,
    NotfoundComponent,
    DclWrapperComponent,
    VectorTilesComponent,
    BikeCommuteComponent,
    StatesComponent,
    UsDroughtComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    MarkdownService,
    MapUtilities
  ],
  entryComponents: [
    BikeCommuteComponent,
    VectorTilesComponent,
    UsDroughtComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
