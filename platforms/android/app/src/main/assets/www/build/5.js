webpackJsonp([5],{

/***/ 1147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutesListPageModule", function() { return RoutesListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RoutesList__ = __webpack_require__(1159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var RoutesListPageModule = /** @class */ (function () {
    function RoutesListPageModule() {
    }
    RoutesListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__RoutesList__["a" /* RoutesListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__RoutesList__["a" /* RoutesListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], RoutesListPageModule);
    return RoutesListPageModule;
}());

//# sourceMappingURL=RoutesList.module.js.map

/***/ }),

/***/ 1159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_promise_timeout__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_promise_timeout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_promise_timeout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_modals_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_DB_Updater__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_spinner_dialog__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_MCMRouteByCodeModal_MCMRouteByCodeModal__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_gps_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_chat_and_session_service__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modals_MCMIconModal_MCMIconModal__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_app_component__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_pipes_search_pipe__ = __webpack_require__(640);
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















var RoutesListPage = /** @class */ (function () {
    function RoutesListPage(ormService, navCtrl, modalsService, modalCtrl, spinner, translateService, dbUpdater, helper, gpsService, chatAndSessionService, app, navParams) {
        var _this = this;
        this.ormService = ormService;
        this.navCtrl = navCtrl;
        this.modalsService = modalsService;
        this.modalCtrl = modalCtrl;
        this.spinner = spinner;
        this.translateService = translateService;
        this.dbUpdater = dbUpdater;
        this.helper = helper;
        this.gpsService = gpsService;
        this.chatAndSessionService = chatAndSessionService;
        this.app = app;
        this.navParams = navParams;
        this.items = [];
        this.downloadedItems = [];
        this.filteredItems = [];
        this.routesListSearch = "";
        this.isOpeningRoute = false;
        this.showAllRoutes = true;
        /**
         * How many elements shall be loaded each time the list is scrolled to the end.
         * @type {number}
         */
        this.infiniteScrollBlockSize = 20;
        this.eventSubscription = this.ormService.eventEmitter.subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes(this.compareFunction)];
                    case 1:
                        _a.downloadedItems = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.ormService.getVisibleRoutes(false, this.compareFunction)];
                    case 2:
                        _b.items = _c.sent();
                        this.sortAndRebuildFilteredItems();
                        this.filterItems();
                        return [2 /*return*/];
                }
            });
        }); });
    }
    RoutesListPage.prototype.ngOnDestroy = function () {
        this.eventSubscription.unsubscribe();
    };
    RoutesListPage.prototype.getRoutesList = function () {
        return this.routesListSearch.length > 2 ? this.items : this.filteredItems;
    };
    RoutesListPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var activeUser, online, e_1, quality, e_2, e_3, activeSession, that_1, route_1, modal_1, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.pipe = new __WEBPACK_IMPORTED_MODULE_14__app_pipes_search_pipe__["a" /* SearchPipe */]();
                        if (this.navParams.data && this.navParams.data.showAllRoutes != null) {
                            this.showAllRoutes = this.navParams.data && this.navParams.data.showAllRoutes;
                        }
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 1:
                        activeUser = _c.sent();
                        if (!!activeUser) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.modalsService.showNoInternetModalIfOffline()];
                    case 2:
                        online = _c.sent();
                        if (!online) return [3 /*break*/, 8];
                        this.spinner.show(null, this.translateService.instant('a_toast_update_start'), true);
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.dbUpdater.checkForUpdates()];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        console.error('caught error while checking for updates:');
                        console.error(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, this.ormService.setNewActiveUser('Me')];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [3 /*break*/, 14];
                    case 9: return [4 /*yield*/, this.helper.checkConnection()];
                    case 10:
                        quality = _c.sent();
                        if (!(quality == __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["a" /* ConnectionQuality */].FAST || quality == __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["a" /* ConnectionQuality */].SLOW)) return [3 /*break*/, 14];
                        this.spinner.show(null, this.translateService.instant('a_toast_update_start'), true);
                        _c.label = 11;
                    case 11:
                        _c.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, this.dbUpdater.checkForUpdates()];
                    case 12:
                        _c.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_2 = _c.sent();
                        console.error('caught error while checking for updates:');
                        console.error(e_2);
                        return [3 /*break*/, 14];
                    case 14:
                        if (!!this.gpsService.getLastPosition()) return [3 /*break*/, 18];
                        _c.label = 15;
                    case 15:
                        _c.trys.push([15, 17, , 18]);
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_3_promise_timeout__["timeout"])(this.gpsService.getCurrentPosition().catch(function (err) {
                                console.error("Error loading GPS data", err);
                            }), 2000)];
                    case 16:
                        _c.sent();
                        return [3 /*break*/, 18];
                    case 17:
                        e_3 = _c.sent();
                        console.log("could not obtain position: " + e_3.message);
                        // make position check async
                        this.gpsService.getCurrentPosition().then(function (position) {
                            if (position && position.coords) {
                            }
                        }, function (err) {
                            console.error("Error loading GPS data", err);
                        });
                        return [3 /*break*/, 18];
                    case 18:
                        console.log('check for active session');
                        return [4 /*yield*/, this.chatAndSessionService.getActiveSession()];
                    case 19:
                        activeSession = _c.sent();
                        if (!(activeSession != null)) return [3 /*break*/, 21];
                        console.log('active session found');
                        that_1 = this;
                        return [4 /*yield*/, this.ormService.findRouteById(activeSession.session.trail_id)];
                    case 20:
                        route_1 = _c.sent();
                        modal_1 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_12__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                            title: 'a_session_return_title',
                            // imageUrl: this.task.getSolutionSampleImgSrc(),
                            message: 'a_session_return_text',
                            type: 'text',
                            modalType: __WEBPACK_IMPORTED_MODULE_13__app_app_component__["a" /* MCMModalType */].hint,
                            narrativeEnabled: route_1.isNarrativeEnabled(),
                            narrative: this.app.activeNarrative,
                            buttons: [
                                {
                                    title: 'a_session_return_stay',
                                    callback: function () {
                                        modal_1.dismiss();
                                        that_1.modalsService.showRoute(route_1, that_1.navCtrl);
                                    }
                                },
                                {
                                    title: 'a_private_session_quit',
                                    callback: function () {
                                        if (this.sessionInfo != null) {
                                            var details = JSON.stringify({});
                                            that_1.chatAndSessionService.addUserEvent("event_session_leave", details, "0");
                                        }
                                        that_1.chatAndSessionService.exitActiveSession();
                                        // activeSession.sessionUser = null;
                                        modal_1.dismiss();
                                        clearInterval(this.refreshIntervalId);
                                    }
                                }
                            ]
                        }, { showBackdrop: true, enableBackdropDismiss: true });
                        // modal.onDidDismiss(data => {
                        //     if(this.sessionInfo != null){
                        //         let details = JSON.stringify({});
                        //         this.chatAndSessionService.addUserEvent("event_viewed_sample_solution", details, this.task.id.toString());
                        //     }
                        // });
                        modal_1.present();
                        _c.label = 21;
                    case 21:
                        _a = this;
                        return [4 /*yield*/, this.ormService.getVisibleRoutes(true, this.compareFunction)];
                    case 22:
                        _a.items = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes(this.compareFunction)];
                    case 23:
                        _b.downloadedItems = _c.sent();
                        this.filteredItems = this.items.slice(0, this.infiniteScrollBlockSize);
                        this.filterItems();
                        if (this.helper.getActivateAddRoute()) {
                            this.addRouteByCode();
                            this.helper.setActivateAddRoute(false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesListPage.prototype.doRefresh = function (refresher) {
        return __awaiter(this, void 0, void 0, function () {
            var online, e_4, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.modalsService.showNoInternetModalIfOffline()];
                    case 1:
                        online = _b.sent();
                        if (!online) return [3 /*break*/, 7];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.dbUpdater.checkForUpdates()];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _b.sent();
                        console.error('caught error while checking for updates:', e_4);
                        return [3 /*break*/, 5];
                    case 5:
                        _a = this;
                        return [4 /*yield*/, this.ormService.getVisibleRoutes(false, null, true)];
                    case 6:
                        _a.items = _b.sent();
                        this.sortAndRebuildFilteredItems();
                        _b.label = 7;
                    case 7:
                        refresher.complete();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesListPage.prototype.addRouteByCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var route, alreadyAdded, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_9__modals_MCMRouteByCodeModal_MCMRouteByCodeModal__["a" /* MCMRouteByCodeModal */].show(this.navCtrl, this.modalCtrl, this.translateService, this.modalsService)];
                    case 1:
                        route = _a.sent();
                        if (route) {
                            alreadyAdded = false;
                            for (i = 0; !alreadyAdded && i < this.items.length; i++) {
                                if (this.items[i].id == route.id) {
                                    // route has been added twice
                                    alreadyAdded = true;
                                }
                            }
                            if (!alreadyAdded) {
                                this.items.push(route);
                                this.sortAndRebuildFilteredItems();
                            }
                            this.scrollTo(route);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesListPage.prototype.compareFunction = function (a, b) {
        var distA = a.getDistance();
        var distB = b.getDistance();
        if (distA > distB) {
            return 1;
        }
        else if (distA < distB) {
            return -1;
        }
        return a.title.localeCompare(b.title);
    };
    RoutesListPage.prototype.scrollTo = function (route) {
        var that = this;
        setTimeout(function () {
            var element = document.getElementById('route-item-' + route.id);
            if (element) {
                that.content.scrollTo(0, element.offsetTop);
            }
        }, 300);
    };
    RoutesListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.items.length > this.filteredItems.length) {
            console.info("Add " + this.infiniteScrollBlockSize + " list items ...");
            var itemsToAdd = this.items.slice(this.filteredItems.length, this.filteredItems.length + this.infiniteScrollBlockSize);
            itemsToAdd.forEach(function (item) { return _this.filteredItems.push(item); });
        }
        else {
            console.info('End of list reached');
        }
        setTimeout(function () {
            infiniteScroll.complete();
        }, 2000);
    };
    RoutesListPage.prototype.sortAndRebuildFilteredItems = function () {
        this.filteredItems = this.items.slice(0, this.filteredItems.length);
    };
    /*    async reactOnDownloadedRoute(event) {
            if (event && event.route) {
                //this.modalsService.showRoute(event.route, this.navCtrl);
            }
        }*/
    RoutesListPage.prototype.switchToMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //this.events.publish('changeViewType', (false));
                this.navCtrl.setRoot('RoutesMapPage', { showAllRoutes: this.showAllRoutes });
                return [2 /*return*/];
            });
        });
    };
    RoutesListPage.prototype.updateRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes(this.compareFunction)];
                    case 1:
                        _a.downloadedItems = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesListPage.prototype.showRouteDetail = function (item) {
        var _this = this;
        if (!this.isOpeningRoute) {
            this.isOpeningRoute = true;
            this.modalsService.showRoute(item, this.navCtrl).then(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isOpeningRoute = false;
                            return [4 /*yield*/, this.updateRoutes()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    RoutesListPage.prototype.filterItems = function () {
        var value;
        if (this.showAllRoutes)
            value = this.getRoutesList();
        else
            value = this.downloadedItems;
        this.filteredResult = this.pipe.transform(value, 'title,city,code', this.routesListSearch);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], RoutesListPage.prototype, "content", void 0);
    RoutesListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'routes-list',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/tabs/RoutesList/RoutesList.html"*/'<ion-header>\n    <ion-toolbar>\n        <ion-searchbar type="text"\n                       [ngClass]="{\'disabled\' : !showAllRoutes && downloadedItems.length == 0}"\n                       [(ngModel)]="routesListSearch"\n                       (ngModelChange)="filterItems()"\n                       placeholder="{{ \'a_search_trails\' | translate }}"\n                       debounce="500"></ion-searchbar>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="addRouteByCode()">\n                <img class="header-icon" src="assets/icons/add-scan.svg"/>\n            </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content #container class="list routes">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content refreshingText="{{\'a_toast_update_start\' | translate}}"></ion-refresher-content>\n    </ion-refresher>\n\n    <!--Complete Routes List-->\n    <ion-list no-margin no-padding lazy-load-images image-size="s" *ngIf="showAllRoutes">\n        <route-teaser *ngFor="let item of filteredResult"\n                      tappable (click)="showRouteDetail(item)" [route]="item" [isOnline]="helper.isOnline"\n                      ></route-teaser>\n    </ion-list>\n    <ion-infinite-scroll  *ngIf="showAllRoutes" (ionInfinite)="doInfinite($event)" threshold="50%">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n    <!--Downloaded Routes List-->\n    <ion-list no-margin no-padding lazy-load-images image-size="s" *ngIf="!showAllRoutes">\n        <route-teaser class=downloaded *ngFor="let item of filteredResult"\n                      tappable (click)="showRouteDetail(item)" [route]="item" [isOnline]="helper.isOnline"\n                      ></route-teaser>\n    </ion-list>\n\n    <div class="user-feedback">\n        <div class="download-empty" *ngIf="!showAllRoutes && downloadedItems.length == 0">\n            <img src="assets/icons/download-empty.svg"/>\n            <h4 class="message">{{ "a_list_noDownloads" | translate}}</h4>\n        </div>\n        <div class="search-empty a" *ngIf="showAllRoutes && filteredResult?.length == 0">\n            <img src="assets/icons/search-empty.svg"/>\n            <h4 class="message">{{ "p_review_no_elements" | translate }}</h4>\n        </div>\n        <div class="search-empty d" *ngIf="!showAllRoutes && filteredResult?.length == 0 && downloadedItems.length != 0">\n            <img src="assets/icons/search-empty.svg"/>\n            <h4 class="message">{{ "p_review_no_elements" | translate }}</h4>\n        </div>\n    </div>\n\n    <ion-fab right bottom *ngIf="showAllRoutes || !showAllRoutes && downloadedItems.length != 0">\n        <button ion-fab color="primary" (click)="switchToMap()">\n            <img src="assets/icons/map.svg"/>\n        </button>\n    </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/tabs/RoutesList/RoutesList.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_6__classes_DB_Updater__["a" /* DB_Updater */],
            __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */],
            __WEBPACK_IMPORTED_MODULE_10__services_gps_service__["a" /* GpsService */],
            __WEBPACK_IMPORTED_MODULE_11__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_13__app_app_component__["b" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], RoutesListPage);
    return RoutesListPage;
}());

//# sourceMappingURL=RoutesList.js.map

/***/ })

});
//# sourceMappingURL=5.js.map