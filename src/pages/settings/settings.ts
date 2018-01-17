import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { OrmService } from '../../services/orm-service';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class SettingsPage {
    language: string;
    availableLanguages = ["en", "de", "it", "fr", "es", "pt", "sk", "tr", "zh"];

    constructor(public navCtrl: NavController, public navParams: NavParams, private translateService: TranslateService,
                private spinner: SpinnerDialog, private ormService: OrmService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsPage');
        this.language = this.translateService.currentLang;
    }

    onChangeLanguage(language) {
        this.translateService.use(language);
    }

    async deleteAppData() {
        this.spinner.show(null, this.translateService.instant('a_main_settings_delCache'), true);
        let routes = await this.ormService.getDownloadedRoutes();
        for (let route of routes) {
            await this.ormService.removeDownloadedRoute(route);
        }
        this.spinner.hide();
    }
}
