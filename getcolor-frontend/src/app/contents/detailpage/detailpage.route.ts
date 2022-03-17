import { Route } from '@angular/router';

import { DetailpageComponent } from './detailpage.component';

export const detailpageRoute: Route = {
  path: 'detailpage/:pallete_id',
  component: DetailpageComponent
};
