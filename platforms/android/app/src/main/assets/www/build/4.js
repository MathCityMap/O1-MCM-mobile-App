webpackJsonp([4],{

/***/ 1124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPageModule", function() { return DashboardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard__ = __webpack_require__(1139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__dashboard__["a" /* DashboardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__dashboard__["a" /* DashboardPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], DashboardPageModule);
    return DashboardPageModule;
}());

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ 1134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright (c) 2015-2017 David M. Lee, II


/**
 * Local reference to TimeoutError
 * @private
 */
var TimeoutError;

/**
 * Rejects a promise with a {@link TimeoutError} if it does not settle within
 * the specified timeout.
 *
 * @param {Promise} promise The promise.
 * @param {number} timeoutMillis Number of milliseconds to wait on settling.
 * @returns {Promise} Either resolves/rejects with `promise`, or rejects with
 *                   `TimeoutError`, whichever settles first.
 */
var timeout = module.exports.timeout = function(promise, timeoutMillis) {
  var error = new TimeoutError(),
      timeout;

  return Promise.race([
    promise,
    new Promise(function(resolve, reject) {
      timeout = setTimeout(function() {
        reject(error);
      }, timeoutMillis);
    }),
  ]).then(function(v) {
    clearTimeout(timeout);
    return v;
  }, function(err) {
    clearTimeout(timeout);
    throw err;
  });
};

/**
 * Exception indicating that the timeout expired.
 */
TimeoutError = module.exports.TimeoutError = function() {
  Error.call(this)
  this.stack = Error().stack
  this.message = 'Timeout';
};

TimeoutError.prototype = Object.create(Error.prototype);
TimeoutError.prototype.name = "TimeoutError";


/***/ }),

/***/ 1139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_controller__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_Helper__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_gps_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_promise_timeout__ = __webpack_require__(1134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_promise_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_promise_timeout__);
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







var DashboardPage = /** @class */ (function () {
    function DashboardPage(navCtrl, navParams, helper, storage, gpsService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.helper = helper;
        this.storage = storage;
        this.gpsService = gpsService;
        this.tabBarElement = document.querySelector('.tabbar');
    }
    DashboardPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        /**
                         * The first time the app is opened it will ask for geolocation to prevent the map and list to show data
                         * from the default one (Frankfurt) for a few seconds
                         * The devmode variable is fetched due to not being able to do it trhough the helper service because of the delayed response.
                         */
                        _a = this;
                        return [4 /*yield*/, this.storage.get('devMode')];
                    case 1:
                        /**
                         * The first time the app is opened it will ask for geolocation to prevent the map and list to show data
                         * from the default one (Frankfurt) for a few seconds
                         * The devmode variable is fetched due to not being able to do it trhough the helper service because of the delayed response.
                         */
                        _a.devMode = ((_b.sent()) === 'true');
                        if (!!this.gpsService.getLastPosition()) return [3 /*break*/, 5];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_6_promise_timeout__["timeout"])(this.gpsService.getCurrentPosition().catch(function (err) {
                                console.error("Error loading GPS data", err);
                            }), 2000)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        console.log("could not obtain position: " + e_1.message);
                        // make position check async
                        this.gpsService.getCurrentPosition().then(function (position) {
                            if (position && position.coords) {
                            }
                        }, function (err) {
                            console.error("Error loading GPS data", err);
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPage.prototype.pushSettingsPage = function () {
        this.navCtrl.push('SettingsPage');
    };
    DashboardPage.prototype.pushInfoPage = function () {
        this.navCtrl.push('InfoPage');
    };
    DashboardPage.prototype.switchTab = function (index, addRoute) {
        if (addRoute === void 0) { addRoute = false; }
        if (addRoute) {
            this.helper.setActivateAddRoute(true);
        }
        if (index == 3 && !this.devMode) {
            return;
        }
        this.navCtrl.parent.select(index);
    };
    DashboardPage.prototype.ionViewWillEnter = function () {
        this.devMode = this.helper.getDevMode();
        if (this.tabBarElement != null) {
            this.tabBarElement.style.display = 'none';
        }
    };
    DashboardPage.prototype.ionViewDidLeave = function () {
        this.tabBarElement.style.display = 'flex';
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-dashboard',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/dashboard/dashboard.html"*/'<ion-content class="padding top bottom">\n    <div class="stretch-container">\n        <img class="logo" src="./assets/images/mcm-logo-white.svg">\n\n        <div class="secondary">\n            <button ion-button clear icon-start color="light" (click)="pushSettingsPage()">\n                <img class="icon" src="./assets/icons/settings.svg">{{ "a_action_settings" | translate}}\n            </button>\n            <button ion-button clear icon-start color="light" (click)="pushInfoPage()">\n                <img class="icon" src="./assets/icons/info.svg">{{ "a_about" | translate}}\n            </button>\n        </div>\n\n        <div class="tiles">\n            <div class="tile">\n                <ion-item tappable no-lines (click)="switchTab(1)">\n                    <div item-content>\n                        <div>\n                            <h2 class="title">{{\'a_dashboard_browse_title\' | translate }}</h2>\n                            <p>{{\'a_dashboard_browse_text\' | translate }}</p>\n                        </div>\n                        <img class="icon" src="./assets/icons/dashboard/browse.svg">\n                    </div>\n                </ion-item>\n            </div>\n            <div class="tile">\n                <ion-item tappable no-lines (click)="switchTab(2, true)">\n                    <div item-content>\n                        <div>\n                            <h2 class="title">{{\'a_dashboard_add_title\' | translate }}</h2>\n                            <p>{{\'a_dashboard_add_text\' | translate }}</p>\n                        </div>\n                        <img class="icon" src="./assets/icons/dashboard/add.svg">\n                    </div>\n                </ion-item>\n            </div>\n            <div class="tile">\n                <ion-item tappable no-lines (click)="switchTab(2)">\n                    <div item-content>\n                        <div>\n                            <h2 class="title">{{\'a_dashboard_downloads_title\' | translate }}</h2>\n                            <p>{{\'a_dashboard_downloads_text\' | translate }}</p>\n                        </div>\n                        <img class="icon" src="./assets/icons/dashboard/downloads.svg">\n                    </div>\n                </ion-item>\n            </div>\n            <div class="tile" [ngClass]="{\'disabled\' : !devMode}">\n                <ion-item tappable no-lines (click)="switchTab(3)">\n                    <div item-content>\n                        <div>\n                            <h2 class="title">{{\'a_dashboard_create_title\' | translate }}</h2>\n                            <p>{{\'a_dashboard_create_text\' | translate }}</p>\n                        </div>\n                        <img class="icon" src="./assets/icons/dashboard/create.svg">\n                    </div>\n                </ion-item>\n            </div>\n        </div>\n    </div>\n</ion-content>\n\n<!--<div ion-fixed>-->\n    <!--<img style="z-index: 12; display: block; position: relative;" margin-top padding-top src="https://dejpknyizje2n.cloudfront.net/svgcustom/clipart/preview/1-fan-foam-finger-sticker-31468-300x300.png">-->\n    <!--<p> G⃣   O⃣    W⃣   O⃣   M⃣   B⃣   A⃣   T⃣   S⃣    G⃣   O⃣ </p>-->\n    <!--<p>🐎  🎀  𝒲🌺𝓂𝒷𝒶𝓉𝓈 𝒶𝓇𝑒 𝓈𝒽💞𝓇𝓉-𝓁𝑒𝑔𝑔𝑒𝒹, <b>𝓂𝓊𝓈𝒸𝓊𝓁𝒶𝓇</b> 𝓆𝓊𝒶𝒹𝓇𝓊𝓅𝑒𝒹𝒶𝓁 𝓂𝒶𝓇𝓈𝓊𝓅𝒾𝒶𝓁𝓈 𝓉𝒽𝒶𝓉 𝒶𝓇𝑒 𝓃𝒶𝓉𝒾𝓋𝑒 𝓉🍪 𝒜𝓊𝓈𝓉𝓇𝒶𝓁𝒾𝒶. 𝒯𝒽𝑒𝓎 𝒶𝓇𝑒 𝒶𝒷🌞𝓊𝓉 𝟣 𝓂 𝒾𝓃 𝓁𝑒𝓃𝑔𝓉𝒽 𝓌𝒾𝓉𝒽 𝓈𝓂𝒶𝓁𝓁, 𝓈𝓉𝓊𝒷𝒷𝓎 𝓉𝒶𝒾𝓁𝓈. 𝒯𝒽𝑒𝓇𝑒 𝒶𝓇𝑒 𝓉𝒽𝓇𝑒𝑒 𝑒𝓍𝓉𝒶𝓃𝓉 𝓈𝓅𝑒𝒸𝒾𝑒𝓈 𝒶𝓃𝒹 𝓉𝒽𝑒𝓎 𝒶𝓇𝑒 𝒶𝓁𝓁 𝓂𝑒𝓂𝒷𝑒𝓇𝓈 🏵𝒻 𝓉𝒽𝑒 𝒻𝒶𝓂𝒾𝓁𝓎 𝒱🍩𝓂𝒷𝒶𝓉𝒾𝒹𝒶𝑒.  🎀  🐎</p>-->\n    <!--<img margin-top padding-top style="position: absolute; top: 0;" src="https://cdn.britannica.com/88/81288-050-3084149B/Phascolomis-Vombatus-ursinus.jpg">-->\n<!--</div>-->\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/dashboard/dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_controller__["a" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__classes_Helper__["b" /* Helper */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5__services_gps_service__["a" /* GpsService */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ })

});
//# sourceMappingURL=4.js.map