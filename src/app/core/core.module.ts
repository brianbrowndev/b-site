import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// app components
import { HomeComponent } from '@app/core/home/home.component';
import { MastheadComponent } from '@app/core/masthead/masthead.component';
import { NotfoundComponent } from '@app/core/notfound/notfound.component';
import { LoadingComponent } from '@app/core/loading/loading.component';
import { AboutComponent } from '@app/core/about/about.component';

// services
import { PagesService } from '@app/core/services/pages.service';
import { PostsService } from '@app/core/services/posts.service';
import { MarkdownService } from '@app/core/services/markdown.service';


// front page posts
import { PostCardComponent } from '@app/core/posts/post-card/post-card.component';
import { PostSidebarComponent } from '@app/core/posts/post-sidebar/sidebar.component';

// single post/page
import { PostHeaderComponent } from '@app/core/posts/post-header/post-header.component';
import { PostFooterComponent } from '@app/core/posts/post-footer/post-footer.component';
import { PageComponent } from '@app/core/page/page.component';
import { PostComponent } from '@app/core/posts/post/post.component';

// Maps
import { MapModule } from '@app/maps';

@NgModule({
  declarations: [
    HomeComponent,
    MastheadComponent,
    PostComponent,
    PageComponent,
    PostCardComponent,
    PostSidebarComponent,
    PostHeaderComponent,
    PostFooterComponent,
    NotfoundComponent,
    LoadingComponent,
    AboutComponent
  ],
  exports: [
    MastheadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MapModule
  ],
  providers: [
    MarkdownService,
    PagesService,
    PostsService,
  ],
})
export class CoreModule { }
