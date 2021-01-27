import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Core
import { MainComponent } from './core/main/main.component';



const appRoutes: Routes = [
  { path: 'apps', redirectTo: '', pathMatch: 'full'},
  { path: 'about', redirectTo: '', pathMatch: 'full'},
  { path: '', component: MainComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
