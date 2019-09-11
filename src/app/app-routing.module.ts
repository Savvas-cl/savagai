import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { SearchDetailsComponent } from './components/search-details/search-details.component';

const routes: Routes = [
  {
    path: 'savagai/search',
    component: SearchComponent,
    data: { title: 'Word Search' }
  },
  {
    path: 'savagai/search/details/:word',
    component: SearchDetailsComponent,
    data: { title: 'Word Search Details' }
  },
  {
    path: '',
    redirectTo: '/savagai/search/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
