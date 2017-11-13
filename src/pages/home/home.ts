import { Component } from '@angular/core';

import { MapPage } from './tabs/Map/Map';
import { RoutesListPage } from './tabs/RoutesList/RoutesList';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  tab1Root = MapPage;
  tab2Root = RoutesListPage;

  constructor() {}
}