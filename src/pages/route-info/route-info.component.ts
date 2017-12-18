import { Input, ViewChild, Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MathRoute } from '../../classes/MathRoute';

/**
 * Generated class for the RouteInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/* @IonicPage() */
@Component({
  selector: 'page-route-info',
  templateUrl: 'route-info.html',
})
export class RouteInfoComponent {
  route: MathRoute;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.route = navParams.data.route;
  }

  ionViewDidLoad() {
    console.log('route',this.route);
  }

}
