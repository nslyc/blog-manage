import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

/**
 * @export 路由变化服务
 * @class RouteChangedService
 */
@Injectable()
export class RouteChangedService {

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
		this.routeChange();
	}
	// 路由变化
	routeChange() {
		return this.router.events
			.filter(event => event instanceof NavigationEnd)
			// .map(() => this.activatedRoute)
			// .map(route => {
			// 	while (route.firstChild) route = route.firstChild;
			// 	return route;
			// })
			// .filter(route => route.outlet === 'primary')
			// .mergeMap(route => route.data);
	}
}
