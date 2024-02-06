webpackJsonp([2],{

/***/ 1159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskDetailPageModule", function() { return TaskDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_group_detail__ = __webpack_require__(1171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_safari_view_controller__ = __webpack_require__(1162);
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
                __WEBPACK_IMPORTED_MODULE_3__task_group_detail__["a" /* TaskGroupDetail */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__task_group_detail__["a" /* TaskGroupDetail */]),
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

/***/ 1162:
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

/***/ 1171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskGroupDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_orm_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_modals_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_chat_and_session_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_Helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_photo_viewer__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_spinner_dialog__ = __webpack_require__(64);
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








var TaskGroupDetail = /** @class */ (function () {
    function TaskGroupDetail(navCtrl, navParams, ormService, modalsService, chatAndSessionService, deepLinker, photoViewer, spinnerDialog) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ormService = ormService;
        this.modalsService = modalsService;
        this.chatAndSessionService = chatAndSessionService;
        this.deepLinker = deepLinker;
        this.photoViewer = photoViewer;
        this.spinnerDialog = spinnerDialog;
        this.subtasks = [];
        this.groupIsFinished = false;
    }
    TaskGroupDetail.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        this.routeId = this.navParams.get('routeId');
                        _a = this;
                        return [4 /*yield*/, this.ormService.findRouteById(this.routeId)];
                    case 1:
                        _a.route = _g.sent();
                        this.groupId = this.navParams.get('groupId');
                        _b = this;
                        return [4 /*yield*/, this.ormService.findTaskById(this.groupId)];
                    case 2:
                        _b.group = _g.sent();
                        _c = this;
                        _e = (_d = this.route).getScoreForUser;
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 3:
                        _c.score = _e.apply(_d, [_g.sent()]);
                        _f = this;
                        return [4 /*yield*/, this.chatAndSessionService.getActiveSession()];
                    case 4:
                        _f.sessionInfo = _g.sent();
                        this.subtasks = this.group.getSubtasksInOrder();
                        this.groupIsFinished = this.checkIfGroupIsFinished();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskGroupDetail.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var goToNextTaskById;
            return __generator(this, function (_a) {
                if (this.groupIsFinished) {
                    //This guarantees that the state is updated before the map opens and gets the information.
                    if (this.navParams.get('goToNextTaskById')) {
                        goToNextTaskById = this.navParams.get('goToNextTaskById');
                        goToNextTaskById(this.groupId, false);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    TaskGroupDetail.prototype.getSolvedSubtaskCount = function () {
        var count = 0;
        for (var _i = 0, _a = this.group.getLegitSubtasks(); _i < _a.length; _i++) {
            var subtask = _a[_i];
            if (this.isTaskFinished(subtask)) {
                count++;
            }
        }
        return count;
    };
    TaskGroupDetail.prototype.isTaskFinished = function (task) {
        if (!this.score) {
            return false;
        }
        var taskDetails = this.score.getTaskStateForTask(task.id);
        return (taskDetails.saved || taskDetails.solved || taskDetails.solvedLow || taskDetails.failed || taskDetails.skipped);
    };
    TaskGroupDetail.prototype.getAdditionalSubtaskClasses = function (task) {
        var classString = "";
        var taskDetails = this.score.getTaskStateForTask(task.id);
        if (this.isTaskFinished(task)) {
            if (!taskDetails.skipped) {
                classString += "solved";
            }
            if (taskDetails.solved) {
                classString += " perfect";
            }
            else if (taskDetails.solvedLow) {
                classString += " good";
            }
            else if (taskDetails.saved) {
                classString += " saved";
            }
            else if (taskDetails.failed) {
                classString += " failed";
            }
            else if (taskDetails.skipped) {
                classString += " skipped";
            }
        }
        return classString;
    };
    TaskGroupDetail.prototype.getScoreForTask = function (task) {
        var taskDetails = this.score.getTaskStateForTask(task.id);
        if (this.isTaskFinished(task) && (!taskDetails.skipped)) {
            return taskDetails.score;
        }
        var maxScore = task.solutionType !== 'info' ? 100 : 0;
        var penalty = Math.floor(maxScore) * 0.15;
        var minScore = Math.floor(maxScore) / 10;
        if (!taskDetails) {
            return maxScore;
        }
        if (taskDetails.tries == 0) {
            return maxScore;
        }
        else {
            return maxScore - (taskDetails.tries - 1) * penalty > minScore ? maxScore - (taskDetails.tries - 1) * penalty : minScore;
        }
    };
    TaskGroupDetail.prototype.getTotalScoreForGroup = function () {
        var score = 0;
        for (var _i = 0, _a = this.subtasks; _i < _a.length; _i++) {
            var task = _a[_i];
            var taskDetails = this.score.getTaskStateForTask(task.id);
            if (this.isTaskFinished(task) && !taskDetails.skipped) {
                return taskDetails.score;
            }
        }
        return score;
    };
    TaskGroupDetail.prototype.openSubtask = function (task) {
        return this.navCtrl.push("TaskDetail", {
            taskId: task.id,
            routeId: this.routeId,
            headerTitle: task.title
        });
    };
    TaskGroupDetail.prototype.skipGroup = function () {
        var _this = this;
        this.modalsService.showDialog('a_taskGroup_skip_button', 'a_taskGroup_skip_confirm', 'no', function () {
        }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, task, taskDetails, goToNextTaskById;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.subtasks;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        task = _a[_i];
                        taskDetails = this.score.getTaskStateForTask(task.id);
                        if (this.isTaskFinished(task)) {
                            return [3 /*break*/, 3];
                        }
                        if (this.sessionInfo != null) {
                            this.chatAndSessionService.addUserEvent("event_task_skipped", "{}", this.groupId.toString());
                        }
                        taskDetails.skipped = true;
                        return [4 /*yield*/, this.ormService.insertOrUpdateTaskState(this.score, taskDetails)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (this.navParams.get('goToNextTaskById')) {
                            goToNextTaskById = this.navParams.get('goToNextTaskById');
                            goToNextTaskById(this.groupId, true);
                        }
                        this.deepLinker.navChange('back');
                        this.navCtrl.pop();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    TaskGroupDetail.prototype.checkIfGroupIsFinished = function () {
        if (this.score.getGroupsFinished().indexOf(this.groupId) !== -1)
            return true;
        var finished = true;
        for (var _i = 0, _a = this.group.getLegitSubtasks(); _i < _a.length; _i++) {
            var task = _a[_i];
            if (!this.isTaskFinished(task)) {
                finished = false;
                break;
            }
        }
        if (finished) {
            this.score.addGroupFinished(this.groupId);
        }
        return finished;
    };
    TaskGroupDetail.prototype.openInPhotoviewer = function () {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].isPluginAvailable(__WEBPACK_IMPORTED_MODULE_6__ionic_native_photo_viewer__["a" /* PhotoViewer */])) {
            this.spinnerDialog.show();
            setTimeout(function () {
                // use short timeout to let spinner dialog appear
                _this.photoViewer.show(_this.group.getImageURL(true));
                setTimeout(function () {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    _this.spinnerDialog.hide();
                }, 1000);
            }, 100);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], TaskGroupDetail.prototype, "content", void 0);
    TaskGroupDetail = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-task-group-detail',template:/*ion-inline-start:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/task-group-detail/task-group-detail.html"*/'<mcm-header></mcm-header>\n<ion-content no-bounce class="has-header padding bottom">\n    <div class="task-header">\n        <img *ngIf="group && group.image" class="image" [src]="group.getImageURL()" (click)="openInPhotoviewer()"/>\n    </div>\n    <div class="task-content">\n        <div class="transition"></div>\n\n        <div class="card task">\n            <div class="head">\n                <ion-label>{{ "a_taskGroup_task_group" | translate }}</ion-label>\n            </div>\n            <p *ngIf="group">{{group.description}}</p>\n        </div>\n\n        <div class="card task-list-head">\n            <ion-label>{{ "a_taskGroup_tasks" | translate }}</ion-label>\n            <ion-label *ngIf="group" class="count text-right">{{getSolvedSubtaskCount()}} / {{group.getLegitSubtasks().length}}</ion-label>\n        </div>\n        <div class="card task-list">\n            <div class="task-list-container">\n                <div *ngFor="let subtask of subtasks" class="task-list-item detail-box" [ngClass]="getAdditionalSubtaskClasses(subtask)" (click)="openSubtask(subtask)">\n                    <div tappable class="image-container">\n                        <div class="cover">\n                            <img alt="preview" class="thumb" [src]="subtask.getImageURL()" onerror="this.style.opacity=\'0\'"/>\n                        </div>\n                    </div>\n                    <div class="text-container">\n                        <h2>{{subtask.title}}</h2>\n                    </div>\n                    <ion-label *ngIf="route && route.isAnswerFeedbackEnabled()" class="tag score">{{getScoreForTask(subtask)}}</ion-label>\n                </div>\n            </div>\n        </div>\n        <div *ngIf="route && route.isAnswerFeedbackEnabled()" class="card task-list-evaluation evaluation">\n            <div class="head">\n                <ion-label>{{ "a_taskGroup_score_total" | translate }}</ion-label>\n                <ion-label class="tag score">{{getTotalScoreForGroup()}}</ion-label>\n            </div>\n        </div>\n\n        <div *ngIf="!groupIsFinished" class="card transparent skip" >\n            <button ion-button block default round color="danger" (click)="skipGroup()">{{\'a_taskGroup_skip_button\' | translate }}</button>\n        </div>\n\n        <div *ngIf="!groupIsFinished" class="card secondary">\n            <ion-label>{{ "a_taskGroup_skip_info" | translate }}</ion-label>\n            <p>\n                {{ "a_taskGroup_skip_info_text" | translate }}\n            </p>\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/task-group-detail/task-group-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_3__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_4__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* DeepLinker */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_spinner_dialog__["a" /* SpinnerDialog */]])
    ], TaskGroupDetail);
    return TaskGroupDetail;
}());

//# sourceMappingURL=task-group-detail.js.map

/***/ })

});
//# sourceMappingURL=2.js.map