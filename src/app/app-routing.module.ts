import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: 'savagai/search',
    component: SearchComponent,
    data: { title: 'Word Search' }
  },
  {
    path: '',
    redirectTo: '/savagai/search',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
