import { Component} from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
/* import { BroadcastService } from '../../services/broadcast-service'; */
import { ViewController, modalCtrl } from 'ionic-angular/navigation/view-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@Component({
    selector: 'mcm-header',
    templateUrl:'mcm-header.html'

})
export class MCMHeaderComponent{
    showBackButton = false;
    constructor(public navCtrl: NavController, public navParams: NavParams,/* public broadcastService: BroadcastService, */ public viewCtrl: ViewController, public modalCtrl: ModalController) {
        console.log("MCM header in use");
/*         broadcastService.historyChanged$.subscribe(canGoBack => {
            this.showBackButton = canGoBack;
            console.log(this.showBackButton);
        }); */
    }

    currentpage = this.viewCtrl.name

    ngOnInit(){
        this.showBackButton = this.navCtrl.canGoBack();
/*         console.log(this.currentpage);
        console.log(this.currentpage == 'DashboardPage'); */
/*         this.broadcastService.historyChanged(this.navCtrl.canGoBack()); */
    }

    goToDashboard(){
        console.log("popToRoot");
        this.navCtrl.setRoot('DashboardPage').then(() =>{
            this.navCtrl.popToRoot();
/*             this.broadcastService.historyChanged(this.navCtrl.canGoBack()); */
        });
    }

    goBack(){
        this.navCtrl.pop();
    }

    closeModal() {
        this.viewCtrl.dismiss(this.modalCtrl);
    }

}