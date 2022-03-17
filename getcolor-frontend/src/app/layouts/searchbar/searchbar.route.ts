import { Route } from '@angular/router';

import { SearchbarComponent } from './searchbar.component';

export const searchbarRoute: Route = {
  path: '',
  component: SearchbarComponent,
  outlet: 'searchbar',
};
