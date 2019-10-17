import { Component} from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
/* import { BroadcastService } from '../../services/broadcast-service'; */
import { ViewController, ModalController, DeepLinker } from 'ionic-angular';


@Component({
    selector: 'mcm-header',
    templateUrl:'mcm-header.html'

})
export class MCMHeaderComponent{
    showBackButton: boolean = false;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,/* public broadcastService: BroadcastService, */
                public viewCtrl: ViewController,
                public modalCtrl: ModalController,
                private deepLinker: DeepLinker) {
/*         broadcastService.historyChanged$.subscribe(canGoBack => {
            this.showBackButton = canGoBack;
            console.log(this.showBackButton);
        }); */
    }

    private currentpage: string = this.viewCtrl.name;

    retriveTitle(): string {
        /* console.log('currentpage ',this.currentpage); */
        if (this.navParams && this.navParams.data.headerTitle) {
            return this.navParams.data.headerTitle;
        }
        // make sure to exclude class names from UglifyJS to avoid name mangling (see config/uglifyjs.config.js)
        if (this.currentpage == 'HomePage') {
            return 'a_title_activity_main'
        }
        if (this.currentpage == 'InfoPage') {
            return 'a_about_mcm_title'
        }
        if (this.currentpage == 'SettingsPage') {
            return 'a_action_settings'
        }
        if (this.currentpage == 'ModalCmp') {
            return 'a_title_activity_main'
        }
        return this.currentpage;
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
        if(this.currentpage === 'TasksMap'){
            let tasksMap = this.navCtrl.getActive().instance;
            if(tasksMap.sessionInfo != null){
                console.log('go back from active session');
                console.log(tasksMap.route.id);
                tasksMap.sessionFinished();
            }else{
                this.navCtrl.pop({}, () => {
                    // necessary because of bug which does not update URL
                    this.deepLinker.navChange('back');
                });
            }
        }else{
            this.navCtrl.pop({}, () => {
                // necessary because of bug which does not update URL
                this.deepLinker.navChange('back');
            });
        }
    }

    closeModal() {
        this.viewCtrl.dismiss(this.modalCtrl);
    }



}
