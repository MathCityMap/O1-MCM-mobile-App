webpackJsonp([2],{

/***/ 1159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskDetailPageModule", function() { return TaskDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_group_detail__ = __webpack_require__(1172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_safari_view_controller__ = __webpack_require__(1161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var TaskDetailPageModule = /** @class */ (function () {
    function TaskDetailPageModule() {
    }
    TaskDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__task_group_detail__["a" /* TaskGroupDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__task_group_detail__["a" /* TaskGroupDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__["a" /* PhotoViewer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_safari_view_controller__["a" /* SafariViewController */]]
        })
    ], TaskDetailPageModule);
    return TaskDetailPageModule;
}());

//# sourceMappingURL=task-group-detail.module.js.map

/***/ }),

/***/ 1161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafariViewController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * @name Safari View Controller
 * @description
 * For displaying read-only web content.
 *
 * Requires Cordova plugin: `cordova-plugin-safariviewcontroller`. For more info, please see the [Safari View Controller plugin docs](https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller).
 *
 * @usage
 * ```typescript
 * import { SafariViewController } from '@ionic-native/safari-view-controller';
 *
 * constructor(private safariViewController: SafariViewController) { }
 *
 * ...
 *
 * this.safariViewController.isAvailable()
 *   .then((available: boolean) => {
 *       if (available) {
 *
 *         this.safariViewController.show({
 *           url: 'http://ionic.io',
 *           hidden: false,
 *           animated: false,
 *           transition: 'curl',
 *           enterReaderModeIfAvailable: true,
 *           tintColor: '#ff0000'
 *         })
 *         .subscribe((result: any) => {
 *             if(result.event === 'opened') console.log('Opened');
 *             else if(result.event === 'loaded') console.log('Loaded');
 *             else if(result.event === 'closed') console.log('Closed');
 *           },
 *           (error: any) => console.error(error)
 *         );
 *
 *       } else {
 *         // use fallback browser, example InAppBrowser
 *       }
 *     }
 *   );
 * ```
 * @interfaces
 * SafariViewControllerOptions
 */
var SafariViewController = (function (_super) {
    __extends(SafariViewController, _super);
    function SafariViewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Checks if SafariViewController is available
     * @returns {Promise<boolean>}
     */
    /**
       * Checks if SafariViewController is available
       * @returns {Promise<boolean>}
       */
    SafariViewController.prototype.isAvailable = /**
       * Checks if SafariViewController is available
       * @returns {Promise<boolean>}
       */
    function () { return; };
    /**
     * Shows Safari View Controller
     * @param options {SafariViewControllerOptions} optional
     * @returns {Observable<any>}
     */
    /**
       * Shows Safari View Controller
       * @param options {SafariViewControllerOptions} optional
       * @returns {Observable<any>}
       */
    SafariViewController.prototype.show = /**
       * Shows Safari View Controller
       * @param options {SafariViewControllerOptions} optional
       * @returns {Observable<any>}
       */
    function (options) { return; };
    /**
     * Hides Safari View Controller
     */
    /**
       * Hides Safari View Controller
       */
    SafariViewController.prototype.hide = /**
       * Hides Safari View Controller
       */
    function () { return; };
    /**
     * Tries to connect to the  Chrome's custom tabs service. you must call this method before calling any of the other methods listed below.
     * @returns {Promise<any>}
     */
    /**
       * Tries to connect to the  Chrome's custom tabs service. you must call this method before calling any of the other methods listed below.
       * @returns {Promise<any>}
       */
    SafariViewController.prototype.connectToService = /**
       * Tries to connect to the  Chrome's custom tabs service. you must call this method before calling any of the other methods listed below.
       * @returns {Promise<any>}
       */
    function () { return; };
    /**
     * Call this method whenever there's a chance the user will open an external url.
     * @returns {Promise<any>}
     */
    /**
       * Call this method whenever there's a chance the user will open an external url.
       * @returns {Promise<any>}
       */
    SafariViewController.prototype.warmUp = /**
       * Call this method whenever there's a chance the user will open an external url.
       * @returns {Promise<any>}
       */
    function () { return; };
    /**
     * For even better performance optimization, call this methods if there's more than a 50% chance the user will open a certain URL.
     * @param url{string}
     * @returns {Promise<any>}
     */
    /**
       * For even better performance optimization, call this methods if there's more than a 50% chance the user will open a certain URL.
       * @param url{string}
       * @returns {Promise<any>}
       */
    SafariViewController.prototype.mayLaunchUrl = /**
       * For even better performance optimization, call this methods if there's more than a 50% chance the user will open a certain URL.
       * @param url{string}
       * @returns {Promise<any>}
       */
    function (url) { return; };
    SafariViewController.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], SafariViewController.prototype, "isAvailable", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])({
            successIndex: 1,
            errorIndex: 2,
            observable: true
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"])
    ], SafariViewController.prototype, "show", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], SafariViewController.prototype, "hide", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], SafariViewController.prototype, "connectToService", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], SafariViewController.prototype, "warmUp", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SafariViewController.prototype, "mayLaunchUrl", null);
    /**
     * @name Safari View Controller
     * @description
     * For displaying read-only web content.
     *
     * Requires Cordova plugin: `cordova-plugin-safariviewcontroller`. For more info, please see the [Safari View Controller plugin docs](https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller).
     *
     * @usage
     * ```typescript
     * import { SafariViewController } from '@ionic-native/safari-view-controller';
     *
     * constructor(private safariViewController: SafariViewController) { }
     *
     * ...
     *
     * this.safariViewController.isAvailable()
     *   .then((available: boolean) => {
     *       if (available) {
     *
     *         this.safariViewController.show({
     *           url: 'http://ionic.io',
     *           hidden: false,
     *           animated: false,
     *           transition: 'curl',
     *           enterReaderModeIfAvailable: true,
     *           tintColor: '#ff0000'
     *         })
     *         .subscribe((result: any) => {
     *             if(result.event === 'opened') console.log('Opened');
     *             else if(result.event === 'loaded') console.log('Loaded');
     *             else if(result.event === 'closed') console.log('Closed');
     *           },
     *           (error: any) => console.error(error)
     *         );
     *
     *       } else {
     *         // use fallback browser, example InAppBrowser
     *       }
     *     }
     *   );
     * ```
     * @interfaces
     * SafariViewControllerOptions
     */
    SafariViewController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["h" /* Plugin */])({
            pluginName: 'SafariViewController',
            plugin: 'cordova-plugin-safariviewcontroller',
            pluginRef: 'SafariViewController',
            repo: 'https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller',
            platforms: ['Android', 'iOS']
        })
    ], SafariViewController);
    return SafariViewController;
}(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* IonicNativePlugin */]));

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskGroupDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskGroupDetailPage = /** @class */ (function () {
    function TaskGroupDetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], TaskGroupDetailPage.prototype, "content", void 0);
    TaskGroupDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-task-group-detail',template:/*ion-inline-start:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/task-group-detail/task-group-detail.html"*/'<mcm-header></mcm-header>\n<ion-content no-bounce class="has-header padding bottom">\n    <div class="task-header">\n<!--        <img class="image" [src]="task.getImageURL()" />-->\n        <img class="image" src="https://image.newyorkcity.de/wp-content/uploads/2013/02/Central-Park.jpg.webp" />\n    </div>\n    <div class="task-content">\n        <div class="transition"></div>\n\n        <div class="card task">\n            <div class="head">\n                <ion-label>{{ "a_taskgroup_task_group" | translate }}</ion-label>\n            </div>\n            <p>This gotta be the introduction to a task group, a group of subtasks, that help figure out a mathematic problem from different angles. Fresh, frech and fun!\n<!--                {{task.group.description}}--></p>\n        </div>\n\n        <div class="card task-list-head">\n            <ion-label>{{ "a_taskgroup_tasks" | translate }}</ion-label>\n            <ion-label class="count text-right">1 / 4</ion-label>\n        </div>\n        <div class="card task-list">\n            <div class="task-list-container">\n                <div class="task-list-item detail-box solved good">\n                    <div tappable class="image-container">\n                        <div class="cover">\n                            <img alt="preview" class="thumb" src="https://cdn.britannica.com/95/156695-131-FF89C9FA/oak-tree.jpg" />\n                        </div>\n                    </div>\n                    <div class="text-container">\n                        <h2>Task Title</h2>\n                    </div>\n                    <ion-label class="tag score">25</ion-label>\n                </div>\n                <div class="task-list-item detail-box">\n                    <div tappable class="image-container">\n                        <div class="cover">\n                            <img alt="preview" class="thumb" src="https://cdn.britannica.com/95/156695-131-FF89C9FA/oak-tree.jpg" />\n                        </div>\n                    </div>\n                    <div class="text-container">\n                        <h2>Task Title</h2>\n                    </div>\n                    <ion-label class="tag score">25</ion-label>\n                </div>\n            </div>\n        </div>\n        <div class="card task-list-evaluation evaluation">\n            <div class="head">\n                <ion-label>{{ "a_taskgroup_score_total" | translate }}</ion-label>\n                <ion-label class="tag score">100</ion-label>\n            </div>\n        </div>\n\n        <div class="card transparent skip">\n            <button ion-button block default round color="danger">{{\'a_taskgroup_skip_button\' | translate }}</button>\n        </div>\n\n        <div class="card secondary">\n            <ion-label>{{ "a_taskgroup_skip_info" | translate }}</ion-label>\n            <p>\n                {{ "a_taskgroup_skip_info_text" | translate }}\n            </p>\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/task-group-detail/task-group-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], TaskGroupDetailPage);
    return TaskGroupDetailPage;
}());

//# sourceMappingURL=task-group-detail.js.map

/***/ })

});
//# sourceMappingURL=2.js.map