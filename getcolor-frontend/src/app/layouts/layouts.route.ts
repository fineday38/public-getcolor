import { Routes } from '@angular/router';

import { detailRoute } from './detail/detail.route';

const LAYOUTS_ROUTES = [detailRoute];

export const layoutState: Routes = [
  {
    path: '',
    children: LAYOUTS_ROUTES,
  },
];
