import { Component,Input, Inject} from '@angular/core';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { MCMModalType } from '../../app/app.component';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { OrmService } from '../../services/orm-service';


@Component({
    selector: 'mcm-input-modal',
    templateUrl:'./MCMInputModal.html',
/*     styleUrls: ['./mcm-progress-bar.component.scss'] */
})
export class MCMInputModal{


    userName: string;
    errorMessage: string;

    constructor(private ormService: OrmService, private viewCtrl: ViewController) {

    }

    async saveUser(){
        console.log(this.userName);
        let usernameExists = await this.ormService.checkUsername(this.userName);
        if(usernameExists){
            this.errorMessage = 'g_name_taken';
        }else{
            await this.ormService.setNewActiveUser(this.userName);
        }
        this.viewCtrl.dismiss();
    }

}