import {Component, EventEmitter, Input, Output} from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import {ViewController, ModalController, DeepLinker, NavController} from 'ionic-angular';
import {ModalsService} from "../../services/modals-service";


@Component({
    selector: 'mcm-header',
    templateUrl:'mcm-header.html'

})
export class MCMHeaderComponent{
    showBackButton: boolean = false;
    transparent: boolean = false;
    isOpeningRoute: boolean = false;

    @Input() showTranslate: boolean = false;
    @Input() translatePage: boolean = false;
    @Input() translationFetched: boolean = false;
    @Output() translateClicked: EventEmitter<void> = new EventEmitter();


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public modalService: ModalsService,
                public modalCtrl: ModalController,
                private deepLinker: DeepLinker) {
    }

    protected currentpage: string = this.viewCtrl.name;

    retrieveTitle(): string {
        if (this.navParams && this.navParams.data.headerTitle) {
            return this.navParams.data.headerTitle;
        }
        if (this.currentpage == 'ModalCmp' || this.currentpage == 'TaskDetail') {
            return ''
        }
        return this.currentpage;
    }

    ngOnInit(){
        this.showBackButton = this.navCtrl.canGoBack();
        if(this.currentpage == 'ModalCmp'){
            this.transparent = true;
        }
        if(this.currentpage == 'TaskDetail'){
            this.transparent = true;
        }
    }


    goToDashboard(){
        this.navCtrl.setRoot('DashboardPage').then(() =>{
            this.navCtrl.popToRoot();
        });
    }

    goBack(){
        console.log('Header going back');
        if (this.viewCtrl.instance.goBack) {
            return this.viewCtrl.instance.goBack();
        }
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
