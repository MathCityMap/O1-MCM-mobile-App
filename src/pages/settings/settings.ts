import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { OrmService } from '../../services/orm-service';
import { ModalsService } from '../../services/modals-service';
import { LanguageService } from '../../services/language-service';
import {Helper} from "../../classes/Helper";

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    language: string;
    availableLanguages;
    translatedLangs;

    developerMode: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, private translateService: TranslateService,
                private spinner: SpinnerDialog, private ormService: OrmService, private modalsService: ModalsService,
                private languageService: LanguageService, private helper: Helper) {
        this.availableLanguages = languageService.getAvailableLanguages();
        this.translatedLangs = [];
    }

    async ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
        this.language = await this.languageService.getLanguage();

        for (let lang of this.availableLanguages){
            this.translatedLangs.push({value: await this.translateService.instant('a_language_' + lang), id: lang})
        }
        this.translatedLangs.sort(function(a, b){
            if(a.value < b.value) { return -1; }
            if(a.value > b.value) { return 1; }
            return 0;})
        this.developerMode = this.helper.getDevMode();
    }

    onChangeLanguage(language) {
        this.languageService.setLanguage(language);
    }

    deleteAppData() {
        this.modalsService.showDialog('a_main_settings_delCache', 'a_main_settings_delCache_confirm',
            'no', () => {},
            'yes', async () => {
                this.spinner.show(null, this.translateService.instant('a_main_settings_delCache'), true);
                await this.ormService.removeAllDownloadedData();
                this.spinner.hide();
        });
    }

    switchDevMode(){
        this.helper.setDevMode(this.developerMode);
    }
}
