import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { searchbarRoute } from './layouts/searchbar/searchbar.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { contentsRoute } from './contents/contents.route';
import { mainpageRoute } from './contents/mainpage/mainpage.route';
import { detailpageRoute } from './contents/detailpage/detailpage.route';
const routes: Routes = [searchbarRoute, navbarRoute, contentsRoute, mainpageRoute, detailpageRoute];

@NgModule({
  imports: [RouterModule.forRoot(
    [
      {
        path: 'layout',
        loadChildren: () => import('./layouts/layouts.module').then( m=> m.LayoutsModule),
      },
      ...routes
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
