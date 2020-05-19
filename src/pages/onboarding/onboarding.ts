import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
    selector: 'page-onboarding',
    templateUrl: 'onboarding.html',
})
export class OnboardingPage {
    slide3Svg: SafeHtml;
    slide4Svg: SafeHtml;
    slide5Svg: SafeHtml;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private http: HttpClient,
                private sanitizer: DomSanitizer,
                private translate: TranslateService,
    ) {
    }

    async ionViewWillLoad() {
        try {
            let slide3Response = await this.http.get('./assets/icons/onboarding/slide-3.svg', {responseType: 'text'}).toPromise();
            slide3Response = this.translateSvg(slide3Response, [{key: 'start', translateString: 'a_onboarding_slide3_svg'}]);
            this.slide3Svg = this.sanitizer.bypassSecurityTrustHtml(slide3Response);

            let slide4Response = await this.http.get('./assets/icons/onboarding/slide-4.svg', {responseType: 'text'}).toPromise();
            slide4Response = this.translateSvg(slide4Response, [{key: 'check', translateString: 'a_btn_check_answer'}]);
            this.slide4Svg = this.sanitizer.bypassSecurityTrustHtml(slide4Response);

            let slide5Response = await this.http.get('./assets/icons/onboarding/slide-5.svg', {responseType: 'text'}).toPromise();
            slide5Response = this.translateSvg(slide5Response, [{key: 'solution', translateString: 'a_onboarding_slide5_svg'}]);
            this.slide5Svg = this.sanitizer.bypassSecurityTrustHtml(slide5Response);
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
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        } else {
            this.navCtrl.setRoot('HomePage');
        }
    }

}
