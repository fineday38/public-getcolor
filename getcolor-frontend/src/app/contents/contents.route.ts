import { Route } from '@angular/router';

import { ContentsComponent } from './contents.component';

export const contentsRoute: Route = {
  path: '',
  component: ContentsComponent
};

export const contentsTabRoute: Route = {
  path: 'content/:type/:tag_id',
  component: ContentsComponent
};
