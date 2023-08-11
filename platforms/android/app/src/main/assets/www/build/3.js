webpackJsonp([3],{

/***/ 1151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OnboardingPageModule", function() { return OnboardingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__onboarding__ = __webpack_require__(1165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var OnboardingPageModule = /** @class */ (function () {
    function OnboardingPageModule() {
    }
    OnboardingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__onboarding__["a" /* OnboardingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__onboarding__["a" /* OnboardingPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], OnboardingPageModule);
    return OnboardingPageModule;
}());

//# sourceMappingURL=onboarding.module.js.map

/***/ }),

/***/ 1165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnboardingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var OnboardingPage = /** @class */ (function () {
    function OnboardingPage(navCtrl, navParams, http, sanitizer, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.sanitizer = sanitizer;
        this.translate = translate;
    }
    OnboardingPage.prototype.ionViewWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var slide3Response, slide4Response, slide5Response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.http.get('./assets/icons/onboarding/slide-3.svg', { responseType: 'text' }).toPromise()];
                    case 1:
                        slide3Response = _a.sent();
                        slide3Response = this.translateSvg(slide3Response, [{ key: 'start', translateString: 'a_onboarding_slide3_svg' }]);
                        this.slide3Svg = this.sanitizer.bypassSecurityTrustHtml(slide3Response);
                        return [4 /*yield*/, this.http.get('./assets/icons/onboarding/slide-4.svg', { responseType: 'text' }).toPromise()];
                    case 2:
                        slide4Response = _a.sent();
                        slide4Response = this.translateSvg(slide4Response, [{ key: 'check', translateString: 'a_btn_check_answer' }]);
                        this.slide4Svg = this.sanitizer.bypassSecurityTrustHtml(slide4Response);
                        return [4 /*yield*/, this.http.get('./assets/icons/onboarding/slide-5.svg', { responseType: 'text' }).toPromise()];
                    case 3:
                        slide5Response = _a.sent();
                        slide5Response = this.translateSvg(slide5Response, [{ key: 'solution', translateString: 'a_onboarding_slide5_svg' }]);
                        this.slide5Svg = this.sanitizer.bypassSecurityTrustHtml(slide5Response);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error('HTTPERROR', e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OnboardingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OnboardingPage');
    };
    OnboardingPage.prototype.translateSvg = function (svg, toTranslate) {
        for (var _i = 0, toTranslate_1 = toTranslate; _i < toTranslate_1.length; _i++) {
            var pair = toTranslate_1[_i];
            var regex = new RegExp("{{" + pair.key + "}}", 'g');
            svg = svg.replace(regex, this.translate.instant(pair.translateString));
        }
        return svg;
    };
    OnboardingPage.prototype.goToHomePage = function () {
        if (this.navCtrl.canGoBack()) {
            this.navCtrl.pop();
        }
        else {
            this.navCtrl.setRoot('HomePage');
        }
    };
    OnboardingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-onboarding',template:/*ion-inline-start:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/onboarding/onboarding.html"*/'<ion-header>\n    <ion-toolbar hideBackButton [attr.transparent]="true">\n        <ion-buttons right>\n            <button ion-button icon-only (click)="goToHomePage()">\n                <img class="header-icon" src="assets/icons/icon_close-modal.svg"/>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content slides class="has-header transparent padding top bottom">\n    <ion-slides pager="true">\n        <ion-slide>\n            <object type="image/svg+xml" data="./assets/icons/onboarding/slide-1.svg"></object>\n            <div class="text">\n                <h1>{{ \'a_onboarding_slide1_title\' | translate }}</h1>\n                <p [innerHTML]="\'a_onboarding_slide1_text\' | translate"></p>\n            </div>\n        </ion-slide>\n        <ion-slide>\n            <object type="image/svg+xml" data="./assets/icons/onboarding/slide-2.svg"></object>\n            <div class="text">\n                <h1>{{ \'a_onboarding_slide2_title\' | translate }}</h1>\n                <p [innerHTML]="\'a_onboarding_slide2_text\' | translate"></p>\n            </div>\n        </ion-slide>\n        <ion-slide>\n            <div class="img" [innerHTML]="slide3Svg"></div>\n            <div class="text">\n                <h1>{{ \'a_onboarding_slide3_title\' | translate }}</h1>\n                <p [innerHTML]="\'a_onboarding_slide3_text\' | translate"></p>\n            </div>\n        </ion-slide>\n        <ion-slide>\n            <div class="img" [innerHTML]="slide4Svg"></div>\n            <div class="text">\n                <h1>{{ \'a_onboarding_slide4_title\' | translate }}</h1>\n                <p [innerHTML]="\'a_onboarding_slide4_text\' | translate"></p>\n            </div>\n        </ion-slide>\n        <ion-slide>\n            <div class="img" [innerHTML]="slide5Svg"></div>\n            <div class="text">\n                <h1>{{ \'a_onboarding_slide5_title\' | translate }}</h1>\n                <p [innerHTML]="\'a_onboarding_slide5_text\' | translate"></p>\n                <button ion-button round (click)="goToHomePage()">{{ \'a_onboarding_slide5_button\' | translate }}</button>\n            </div>\n        </ion-slide>\n    </ion-slides>\n</ion-content>\n'/*ion-inline-end:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/onboarding/onboarding.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], OnboardingPage);
    return OnboardingPage;
}());

//# sourceMappingURL=onboarding.js.map

/***/ })

});
//# sourceMappingURL=3.js.map