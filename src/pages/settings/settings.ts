import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { OrmService } from '../../services/orm-service';
import { ModalsService } from '../../services/modals-service';
import { LanguageService } from '../../services/language-service';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    language: string;
    availableLanguages;

    constructor(public navCtrl: NavController, public navParams: NavParams, private translateService: TranslateService,
                private spinner: SpinnerDialog, private ormService: OrmService, private modalsService: ModalsService,
                private languageService: LanguageService) {
        this.availableLanguages = languageService.getAvailableLanguages();
    }

    async ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
        this.language = await this.languageService.getLanguage();
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
}
