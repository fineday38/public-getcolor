import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentsComponent } from './contents.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { CreateComponent } from './create/create.component';
import { AboutComponent } from './about/about.component';
import { contentsRoute, contentsTabRoute } from './contents.route';
import { mainpageRoute } from './mainpage/mainpage.route';
import { detailpageRoute } from './detailpage/detailpage.route';
import { createRoute } from './create/create.route';
import { aboutRoute } from'./about/about.route';

@NgModule({
  declarations: [
    ContentsComponent,
    MainpageComponent,
    DetailpageComponent,
    CreateComponent,
    AboutComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild([contentsRoute, contentsTabRoute, mainpageRoute, detailpageRoute, createRoute, aboutRoute])
  ]
})
export class ContentsModule { }
