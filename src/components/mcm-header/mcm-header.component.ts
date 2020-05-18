import { Component} from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { ViewController, ModalController, DeepLinker } from 'ionic-angular';
import {ModalsService} from "../../services/modals-service";


@Component({
    selector: 'mcm-header',
    templateUrl:'mcm-header.html'

})
export class MCMHeaderComponent{
    showBackButton: boolean = false;
    transparent: boolean = false;
    isOpeningRoute: boolean = false;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public modalService: ModalsService,
                public modalCtrl: ModalController,
                private deepLinker: DeepLinker) {
    }

    private currentpage: string = this.viewCtrl.name;

    retriveTitle(): string {
        //console.log('currentpage ',this.currentpage);
        if (this.navParams && this.navParams.data.headerTitle) {
            return this.navParams.data.headerTitle;
        }
        if (this.currentpage == 'InfoPage') {
            return 'a_about_mcm_title'
        }
        if (this.currentpage == 'SettingsPage') {
            return 'a_action_settings'
        }
        if (this.currentpage == 'ModalCmp') {
            return ''
        }
        return this.currentpage;
    }

    ngOnInit(){
        this.showBackButton = this.navCtrl.canGoBack();
        if(this.currentpage == 'ModalCmp'){
            this.transparent = true;
        }
    }


    goToDashboard(){
        this.navCtrl.setRoot('DashboardPage').then(() =>{
            this.navCtrl.popToRoot();
        });
    }

    goBack(){
        if(this.currentpage === 'TasksMap'){
            let tasksMap = this.navCtrl.getActive().instance;
            if(tasksMap.sessionInfo != null){
                console.log('go back from active session');
                console.log(tasksMap.route.id);
                tasksMap.sessionFinished();
            }else{
                if(!this.isOpeningRoute){
                    this.isOpeningRoute = true;
                    this.navCtrl.pop({}, () => {
                        // necessary because of bug which does not update URL
                        this.deepLinker.navChange('back');
                    });
                    this.modalService.showRoute(tasksMap.route, this.navCtrl).then(async () => {
                        this.isOpeningRoute = false;
                    });
                }
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
