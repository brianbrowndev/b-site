import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core
import { NotfoundComponent } from './core/notfound/notfound.component';
import { MainComponent } from './core/main/main.component';



const appRoutes: Routes = [
  { path: 'apps', redirectTo: '', pathMatch: 'full'},
  { path: 'about', redirectTo: '', pathMatch: 'full'},
  { path: '', component: MainComponent},
  { path: '**', component: NotfoundComponent, data: {title: 'Not Found'}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
