import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { DetailComponent } from './detail/detail.component';
import { layoutState } from './layouts.route';


@NgModule({
  declarations: [
    NavbarComponent,
    SearchbarComponent,
    DetailComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(layoutState)
  ]
})
export class LayoutsModule { }
