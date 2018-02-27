import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { OrmService } from '../../services/orm-service';
import { ModalsService } from '../../services/modals-service';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    language: string;
    availableLanguages = ["en", "de", "it", "fr", "es", "pt", "sk", "tr", "zh", "el"];

    constructor(public navCtrl: NavController, public navParams: NavParams, private translateService: TranslateService,
                private spinner: SpinnerDialog, private ormService: OrmService, private modalsService: ModalsService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
        this.language = this.translateService.currentLang;
    }

    onChangeLanguage(language) {
        this.translateService.use(language);
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
