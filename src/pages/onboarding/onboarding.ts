import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
    templateUrl: 'onboarding.html',
})
export class OnboardingPage {
    slide3Svg: SafeHtml;
    slide4Svg: SafeHtml;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private http: HttpClient,
                private sanitizer: DomSanitizer,
                private translate: TranslateService,
    ) {
    }

    async ionViewWillLoad() {
        try {
            let slide3Response = await this.http.get('./assets/icons/onboarding/slide3.svg', {responseType: 'text'}).toPromise();
            slide3Response = this.translateSvg(slide3Response, [{key: 'startTrail', translateString: 'a_r_start'}]);
            this.slide3Svg = this.sanitizer.bypassSecurityTrustHtml(slide3Response);

            let slide4Response = await this.http.get('./assets/icons/onboarding/slide4.svg', {responseType: 'text'}).toPromise();
            slide4Response = this.translateSvg(slide4Response, [{key: 'check', translateString: 'a_btn_check_answer'}]);
            this.slide4Svg = this.sanitizer.bypassSecurityTrustHtml(slide4Response);
        } catch (e) {
            console.error('HTTPERROR', e);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad OnboardingPage');
    }

    translateSvg(svg, toTranslate:[{key: string, translateString: string}]) {
        for (let pair of toTranslate) {
            let regex = new RegExp(`{{${pair.key}}}`, 'g');
            svg = svg.replace(regex, this.translate.instant(pair.translateString));
        }
        return svg;
    }

    goToHomePage() {
        this.navCtrl.setRoot('HomePage');
    }

}
