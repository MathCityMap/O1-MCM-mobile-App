webpackJsonp([5],{

/***/ 1129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings__ = __webpack_require__(1146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(233);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__settings__["a" /* SettingsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 1146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_spinner_dialog__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_orm_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_modals_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_language_service__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__classes_Helper__ = __webpack_require__(25);
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








var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, translateService, spinner, ormService, modalsService, languageService, helper) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translateService = translateService;
        this.spinner = spinner;
        this.ormService = ormService;
        this.modalsService = modalsService;
        this.languageService = languageService;
        this.helper = helper;
        this.developerMode = false;
        this.availableLanguages = languageService.getAvailableLanguages();
        this.translatedLangs = [];
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _i, _b, lang, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        console.log('ionViewDidLoad SettingsPage');
                        _a = this;
                        return [4 /*yield*/, this.languageService.getLanguage()];
                    case 1:
                        _a.language = _f.sent();
                        _i = 0, _b = this.availableLanguages;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        lang = _b[_i];
                        _d = (_c = this.translatedLangs).push;
                        _e = {};
                        return [4 /*yield*/, this.translateService.instant('a_language_' + lang)];
                    case 3:
                        _d.apply(_c, [(_e.value = _f.sent(), _e.id = lang, _e)]);
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.translatedLangs.sort(function (a, b) {
                            if (a.value < b.value) {
                                return -1;
                            }
                            if (a.value > b.value) {
                                return 1;
                            }
                            return 0;
                        });
                        this.developerMode = this.helper.getDevMode();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage.prototype.onChangeLanguage = function (language) {
        this.languageService.setLanguage(language);
    };
    SettingsPage.prototype.openOnboarding = function () {
        this.navCtrl.push('OnboardingPage');
    };
    SettingsPage.prototype.deleteAppData = function () {
        var _this = this;
        this.modalsService.showDialog('a_main_settings_delCache', 'a_main_settings_delCache_confirm', 'no', function () { }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinner.show(null, this.translateService.instant('a_main_settings_delCache'), true);
                        return [4 /*yield*/, this.ormService.removeAllDownloadedData()];
                    case 1:
                        _a.sent();
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    SettingsPage.prototype.switchDevMode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.helper.setDevMode(this.developerMode + '')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/settings/settings.html"*/'<mcm-header></mcm-header>\n<ion-content class="has-header pattern-bg">\n\n    <div class="card select">\n        <ion-label>{{\'a_settings_language\' | translate}}{{language != \'en\' ? \' / LANGUAGE\' : \'\'}}</ion-label>\n        <ion-select [(ngModel)]="language" (ngModelChange)="onChangeLanguage($event)">\n            <ion-option *ngFor="let lang of translatedLangs" [value]="lang.id">{{lang.value}}</ion-option>\n        </ion-select>\n    </div>\n    <div class="card transparent">\n        <button ion-button block default round (click)="openOnboarding()">{{\'a_settings_onboarding\' | translate }}</button>\n    </div>\n\n    <div class="card transparent divider">\n        <ion-label>{{\'a_settings_expert\' | translate }}</ion-label>\n    </div>\n    <div class="card">\n        <ion-label>{{\'a_settings_editing\' | translate }}</ion-label>\n        <ion-item no-lines no-padding>\n            <p item-content>{{\'a_settings_editing_text\' | translate }}</p>\n            <ion-toggle mode="ios" [(ngModel)]="developerMode" (ionChange)="switchDevMode()"></ion-toggle>\n        </ion-item>\n    </div>\n<!--    <div class="card has-button-on-the-edge">\n        <ion-label>{{\'a_settings_console\' | translate }}</ion-label>\n        <p item-content>{{\'a_settings_console_text\' | translate }}</p>\n        <ion-item>\n            <ion-input type="text" placeholder="######"></ion-input>\n        </ion-item>\n        <button class="on-the-edge" ion-button small round>{{\'a_settings_console_button\' | translate }}</button>\n    </div>-->\n\n    <div class="card transparent divider">\n        <ion-label>{{\'a_settings_data\' | translate }}</ion-label>\n    </div>\n    <div class="card transparent">\n        <button ion-button block default round color="danger" (click)="deleteAppData()">{{\'a_main_settings_delCache\' | translate }}</button>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_spinner_dialog__["a" /* SpinnerDialog */], __WEBPACK_IMPORTED_MODULE_4__services_orm_service__["a" /* OrmService */], __WEBPACK_IMPORTED_MODULE_5__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_6__services_language_service__["a" /* LanguageService */], __WEBPACK_IMPORTED_MODULE_7__classes_Helper__["b" /* Helper */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=5.js.map