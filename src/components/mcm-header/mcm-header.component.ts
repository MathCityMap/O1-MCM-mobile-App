import { Component} from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
/* import { BroadcastService } from '../../services/broadcast-service'; */
import { ViewController, ModalController, DeepLinker } from 'ionic-angular';
import { SettingsPage } from '../../pages/settings/settings';
import { Route } from '../../entity/Route';
import { Task } from '../../entity/Task';


@Component({
    selector: 'mcm-header',
    templateUrl:'mcm-header.html'

})
export class MCMHeaderComponent{
    showBackButton: boolean = false;
    private route: Route;
    private task: Task;


    constructor(public navCtrl: NavController, public navParams: NavParams,/* public broadcastService: BroadcastService, */ public viewCtrl: ViewController, public modalCtrl: ModalController, private deepLinker: DeepLinker) {
        console.log("MCM header in use");
/*         broadcastService.historyChanged$.subscribe(canGoBack => {
            this.showBackButton = canGoBack;
            console.log(this.showBackButton);
        }); */
    }

    private currentpage: string = this.viewCtrl.name;

    retriveTitle(): string{
        /* console.log('currentpage ',this.currentpage); */
        if( this.currentpage == 'HomePage' ){ return 'title_activity_main' }
        else if( this.currentpage == 'InfoPage' ){ return 'about_mcm_title' }
        else if( this.currentpage == 'SettingsPage' ){ return 'action_settings' }
        else if(  this.currentpage == 'ModalCmp' ){ return 'DER ROUTENNAME' }
        else if(  this.currentpage == 'TasksMap' ){ return 'DER ROUTENNAME' }
        else if( this.currentpage == 'TaskDetail' ){ return 'DER TASKNAME' }
    }

    ngOnInit(){
        this.showBackButton = this.navCtrl.canGoBack();
/*         console.log(this.currentpage);
        console.log(this.currentpage == 'DashboardPage'); */
/*         this.broadcastService.historyChanged(this.navCtrl.canGoBack()); */
    }

    goToDashboard(){
/*         console.log("popToRoot"); */
        this.navCtrl.setRoot('DashboardPage').then(() =>{
            this.navCtrl.popToRoot();
/*             this.broadcastService.historyChanged(this.navCtrl.canGoBack()); */
        });
    }

   goToInfo() {
        // Let's navigate to info/imprint
        this.navCtrl.push('InfoPage');
    }

   goToSettings() {
        // Let's navigate to settings
        this.navCtrl.push('SettingsPage');
    }

    goBack(){
        this.navCtrl.pop({}, () => {
          // necessary because of bug which does not update URL
          this.deepLinker.navChange('back');
        });
    }

    closeModal() {
        this.viewCtrl.dismiss(this.modalCtrl);
    }



}