webpackJsonp([10],{

/***/ 1074:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InitialMigration1513274191111; });
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
var InitialMigration1513274191111 = /** @class */ (function () {
    function InitialMigration1513274191111() {
    }
    InitialMigration1513274191111.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_state (_id INTEGER PRIMARY KEY AUTOINCREMENT,option VARCHAR (64) NOT NULL,value VARCHAR (256) NOT NULL,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_task (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,public VARCHAR (1) NOT NULL,lat VARCHAR (64) NOT NULL,lon VARCHAR (64) NOT NULL,title TEXT NOT NULL,description TEXT NOT NULL,image TEXT ,solution_type TEXT NOT NULL,solution TEXT NOT NULL,hint1 TEXT ,hint2 TEXT ,hint3 TEXT ,assistive_equipment TEXT ,author TEXT ,mail TEXT ,grade VARCHAR (2) NOT NULL DEFAULT '13',tags TEXT ,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,solutionsample TEXT NOT NULL,attr TEXT ,create_date TIMESTAMP NOT NULL,lang_code VARCHAR (2))")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_route (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,public VARCHAR (1) NOT NULL,title TEXT NOT NULL,country_code TEXT NOT NULL,city TEXT NOT NULL,image TEXT ,code VARCHAR (64),grade TEXT (64),tags VARCHAR ,duration VARCHAR (64),length VARCHAR (64),bounding_box TEXT ,center TEXT ,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,description TEXT ,create_date TIMESTAMP NOT NULL,attr TEXT TEXT)")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_rel_route_task (_id INTEGER PRIMARY KEY AUTOINCREMENT,route_id INTEGER (64) NOT NULL,task_id INTEGER (64) NOT NULL,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_users (_id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR (32) NOT NULL,create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE IF NOT EXISTS mcm_score (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER (64) NOT NULL,route_id INTEGER (64) NOT NULL,score INTEGER (64) NOT NULL,tasks_solved TEXT ,tasks_solved_low TEXT ,task_details TEXT ,time INTEGER (64),distance INTEGER (64))")];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InitialMigration1513274191111.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return InitialMigration1513274191111;
}());

//# sourceMappingURL=1513274191111-InitialMigration.js.map

/***/ }),

/***/ 1075:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FailedTaskMigration1515428187000; });
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
var FailedTaskMigration1515428187000 = /** @class */ (function () {
    function FailedTaskMigration1515428187000() {
    }
    FailedTaskMigration1515428187000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_score ADD tasks_failed TEXT")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FailedTaskMigration1515428187000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return FailedTaskMigration1515428187000;
}());

//# sourceMappingURL=1515428187000-failedTaskMigration.js.map

/***/ }),

/***/ 1076:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typeorm__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["h" /* PrimaryGeneratedColumn */])({ name: '_id' }),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 32 }),
        __metadata("design:type", String)
    ], User.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'create_date' }),
        __metadata("design:type", String)
    ], User.prototype, "createDate", void 0);
    User = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["b" /* Entity */])('mcm_users')
    ], User);
    return User;
}());

//# sourceMappingURL=User.js.map

/***/ }),

/***/ 1077:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return State; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typeorm__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var State = /** @class */ (function () {
    function State() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["h" /* PrimaryGeneratedColumn */])({ name: '_id' }),
        __metadata("design:type", Number)
    ], State.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 64 }),
        __metadata("design:type", String)
    ], State.prototype, "option", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 256 }),
        __metadata("design:type", String)
    ], State.prototype, "value", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], State.prototype, "timestamp", void 0);
    State = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["b" /* Entity */])('mcm_state')
    ], State);
    return State;
}());

//# sourceMappingURL=State.js.map

/***/ }),

/***/ 1078:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskState; });
var TaskState = /** @class */ (function () {
    function TaskState() {
        this.saved = false;
        this.solved = false;
        this.solvedLow = false;
        this.skipped = false;
        this.failed = false;
        this.hint1 = false;
        this.hint2 = false;
        this.hint3 = false;
        this.tries = 0;
        this.newTries = 0; //newTries since user has skipped the task and opened again
        this.answer = "";
        this.answerMultipleChoice = [];
        this.timeFirstOpen = 0;
        this.timeSolved = 0;
        this.score = 0;
        this.penalty = 0;
    }
    TaskState.prototype.getTaskDetailAsJSON = function () {
        return JSON.stringify({
            taskId: +this.taskId,
            saved: this.saved,
            solved: this.solved,
            solvedLow: this.solvedLow,
            skipped: this.skipped,
            failed: this.failed,
            hint1: this.hint1,
            hint2: this.hint2,
            hint3: this.hint3,
            tries: +this.tries,
            newTries: +this.newTries,
            answer: this.answer,
            answerMultipleChoice: this.answerMultipleChoice,
            timeFirstOpen: +this.timeFirstOpen,
            timeSolved: +this.timeSolved,
            score: +this.score,
            penalty: this.penalty
        });
    };
    TaskState.getTaskStateAsJSONArray = function (taskDetails) {
        var result = [];
        taskDetails.forEach(function (details) {
            result.push(details.getTaskDetailAsJSON());
        });
        return JSON.stringify(result);
    };
    TaskState.prototype.getAllTaskState = function (jsonArray) {
        var flags = JSON.parse(jsonArray);
        var taskDetails = [];
        for (var i = 0; i < flags.length; i++) {
            taskDetails.push(this.getTaskStateByTask(flags[i]));
        }
        return taskDetails;
    };
    TaskState.prototype.findDetailsForTask = function (taskId, jsonArray) {
        var flags = JSON.parse(jsonArray);
        for (var i = 0; i < flags.length; i++) {
            var detail_1 = this.getTaskStateByTask(flags[i]);
            if (detail_1.taskId == taskId) {
                return detail_1;
            }
        }
        var detail = new TaskState();
        detail.taskId = taskId;
        return detail;
    };
    TaskState.prototype.getTaskStateByTask = function (jsonObject) {
        var flags = JSON.parse(jsonObject);
        var taskState = new TaskState();
        taskState.taskId = flags.taskId;
        taskState.saved = flags.saved;
        taskState.solved = flags.solved;
        taskState.solvedLow = flags.solvedLow;
        taskState.skipped = flags.skipped;
        taskState.failed = flags.failed;
        taskState.hint1 = flags.hint1;
        taskState.hint2 = flags.hint2;
        taskState.hint3 = flags.hint3;
        taskState.tries = flags.tries;
        taskState.newTries = flags.newTries;
        taskState.answer = flags.answer;
        taskState.answerMultipleChoice = flags.answerMultipleChoice;
        taskState.timeFirstOpen = flags.timeFirstOpen;
        taskState.timeSolved = flags.timeSolved;
        taskState.score = flags.score;
        taskState.penalty = flags.penalty;
        return taskState;
    };
    return TaskState;
}());

//# sourceMappingURL=TaskState.js.map

/***/ }),

/***/ 1080:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddImageUrlAndDownloadedFlagMigration1513679923000; });
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
var AddImageUrlAndDownloadedFlagMigration1513679923000 = /** @class */ (function () {
    function AddImageUrlAndDownloadedFlagMigration1513679923000() {
    }
    AddImageUrlAndDownloadedFlagMigration1513679923000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN downloaded INTEGER(1)")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddImageUrlAndDownloadedFlagMigration1513679923000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddImageUrlAndDownloadedFlagMigration1513679923000;
}());

//# sourceMappingURL=1513679923000-AddImageUrlAndDownloadedFlagMigration.js.map

/***/ }),

/***/ 1081:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheManagerMCM; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MyMath__ = __webpack_require__(1082);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tilesDb__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_images_service__ = __webpack_require__(45);
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





var CacheManagerMCM = /** @class */ (function () {
    function CacheManagerMCM() {
    }
    CacheManagerMCM.getTilesCoverageMinMaxZoom = function (pBB, pZoomMin, pZoomMax) {
        var result = new Array();
        for (var zoomLevel = pZoomMin; zoomLevel <= pZoomMax; zoomLevel++) {
            console.debug("Calculating ZOOM: " + zoomLevel);
            var resultForZoom = CacheManagerMCM.getTilesCoverageZoom(pBB, zoomLevel);
            console.debug("Result.size: " + resultForZoom.length);
            result = result.concat(resultForZoom);
            console.debug("Result.concat.size: " + result.length);
        }
        return result;
    };
    CacheManagerMCM.getTilesCoverageZoom = function (pBB, pZoomLevel) {
        var result = new Array();
        var mapTileUpperBound = 1 << pZoomLevel;
        console.debug("shift attributes " + mapTileUpperBound);
        console.debug("south: " + pBB.getSouth() + " east: " + pBB.getEast());
        console.debug("north: " + pBB.getNorth() + " west: " + pBB.getWest());
        var lowerRight = CacheManagerMCM.getMapTileFromCoordinates(pBB.getSouth(), pBB.getEast(), pZoomLevel);
        var upperLeft = CacheManagerMCM.getMapTileFromCoordinates(pBB.getNorth(), pBB.getWest(), pZoomLevel);
        console.debug("lowerRight " + lowerRight + " upperLeft " + upperLeft);
        var width = lowerRight.x - upperLeft.x + 1;
        if (width <= 0) {
            width += mapTileUpperBound;
        }
        console.debug("Width: " + width + " " + typeof width);
        var height = lowerRight.y - upperLeft.y + 1;
        if (height <= 0) {
            height += mapTileUpperBound;
        }
        console.debug("Height: " + height + " " + typeof height);
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                var x = __WEBPACK_IMPORTED_MODULE_1__MyMath__["a" /* MyMath */].mod(upperLeft.x + i, mapTileUpperBound);
                var y = __WEBPACK_IMPORTED_MODULE_1__MyMath__["a" /* MyMath */].mod(upperLeft.y + j, mapTileUpperBound);
                result.push(new __WEBPACK_IMPORTED_MODULE_0__Helper__["c" /* MapTile */](pZoomLevel, x, y));
            }
        }
        console.debug("Result.length = " + result.length);
        return result;
    };
    CacheManagerMCM.getMapTileFromCoordinates = function (aLat, aLon, zoom) {
        var z = 1 << zoom;
        var y = Math.floor((1 - Math.log(Math.tan(aLat * Math.PI / 180) + 1 / Math.cos(aLat * Math.PI / 180)) / Math.PI) / 2 * z);
        var x = Math.floor((aLon + 180) / 360 * z);
        console.debug("aLat: " + aLat + " aLon: " + aLon + " zoom: " + zoom + " => x: " + x + " y: " + y);
        return new __WEBPACK_IMPORTED_MODULE_3_leaflet__["Point"](x, y);
    };
    CacheManagerMCM.downloadTiles = function (route, pZoomMin, pZoomMax, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var tiles, tilesUrls, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(route.getBoundingBoxLatLng(), pZoomMin, pZoomMax);
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2__tilesDb__["a" /* tilesDb */].initialize()];
                    case 1:
                        _a.sent();
                        tilesUrls = tiles.map(function (tile) {
                            var domain = route.getTilesServerSubdomains(route.getNarrativeName())[Math.floor(Math.random() * route.getTilesServerSubdomains(route.getNarrativeName()).length)];
                            return route.getTilesMap(route.getNarrativeName()).replace('{s}', domain).replace('{z}', String(tile.zoomLevel)).replace('{x}', String(tile.x)).replace('{y}', String(tile.y));
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4__services_images_service__["a" /* ImagesService */].INSTANCE.downloadURLs(tilesUrls, false, callback, true)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.debug("remove already added tiles because download failed or was aborted");
                        throw e_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /*    static async removeDownloadedTiles(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number) {
            //const tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(pBB, pZoomMin, pZoomMax);
            await tilesDb.initialize();
            tilesDb.removeItems(CacheManagerMCM.getTileURLs(pBB, pZoomMin, pZoomMax));
        }*/
    CacheManagerMCM.getTileURLs = function (route, pZoomMin, pZoomMax) {
        var tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(route.getBoundingBoxLatLng(), pZoomMin, pZoomMax);
        return tiles.map(function (tile) { return route.getTilesMap(route.getNarrativeName()).replace('{s}', __WEBPACK_IMPORTED_MODULE_0__Helper__["b" /* Helper */].subDomains[0]).replace('{z}', String(tile.zoomLevel)).replace('{x}', String(tile.x)).replace('{y}', String(tile.y)); });
    };
    return CacheManagerMCM;
}());

//# sourceMappingURL=CacheManagerMCM.js.map

/***/ }),

/***/ 1082:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyMath; });
var MyMath = /** @class */ (function () {
    function MyMath() {
    }
    MyMath.mod = function (n, m) {
        if (n > 0) {
            return n % m;
        }
        var nn = n;
        while (nn < 0) {
            nn += m;
        }
        return nn;
    };
    return MyMath;
}());

//# sourceMappingURL=MyMath.js.map

/***/ }),

/***/ 1083:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddUnlockedColumn1516037215000; });
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
var AddUnlockedColumn1516037215000 = /** @class */ (function () {
    function AddUnlockedColumn1516037215000() {
    }
    AddUnlockedColumn1516037215000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN unlocked INTEGER(1)")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddUnlockedColumn1516037215000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddUnlockedColumn1516037215000;
}());

//# sourceMappingURL=1516037215000-AddUnlockedColumn.js.map

/***/ }),

/***/ 1084:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCompletedColumn1519817905000; });
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
var AddCompletedColumn1519817905000 = /** @class */ (function () {
    function AddCompletedColumn1519817905000() {
    }
    AddCompletedColumn1519817905000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN completed INTEGER(1)")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddCompletedColumn1519817905000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddCompletedColumn1519817905000;
}());

//# sourceMappingURL=1519817905000-AddCompletedColumn.js.map

/***/ }),

/***/ 1092:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBC_Plan; });
var DBC_Plan = /** @class */ (function () {
    function DBC_Plan(tableName, fields, fieldsType, attributes) {
        this.tableName = tableName;
        this.fields = fields;
        this.fieldsType = fieldsType;
        this.attributes = attributes;
        this.fieldsCount = fields.length;
    }
    DBC_Plan.prototype.getCreateStatement = function () {
        var stmt = "CREATE TABLE IF NOT EXISTS " + this.tableName + " (";
        for (var i = 0; i < this.fields.length; i++) {
            stmt += this.fields[i] + " " + this.fieldsType[i] + " " + this.attributes[i];
            if (i < this.fields.length - 1) {
                stmt += ",";
            }
        }
        return stmt + ")";
    };
    /*
    returns a string for bulk statements of all available fields in the form of:
    (field1, field2, field3, ..., fieldn)
     */
    DBC_Plan.prototype.getFieldsInScopes = function () {
        var result = "(";
        for (var i = 0; i < this.fields.length; i++) {
            if (i < this.fields.length - 1) {
                result += this.fields[i] + ", ";
            }
            else {
                result += this.fields[i];
            }
        }
        return result + ")";
    };
    /*
    returns a string for bulk statements of all available field placehokder in the form of:
    (?, ?, ?, ?)
     */
    DBC_Plan.prototype.getFieldsPlaceholders = function () {
        var result = "(";
        for (var i = 0; i < this.fields.length; i++) {
            if (i < this.fields.length - 1) {
                result += "?, ";
            }
            else {
                result += "?";
            }
        }
        return result + ")";
    };
    DBC_Plan.prototype.getTableName = function () {
        return this.tableName;
    };
    return DBC_Plan;
}());

//# sourceMappingURL=DBC_Plan.js.map

/***/ }),

/***/ 1093:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddVisibleColumn1526306624000; });
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
var AddVisibleColumn1526306624000 = /** @class */ (function () {
    function AddVisibleColumn1526306624000() {
    }
    AddVisibleColumn1526306624000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_task ADD COLUMN `visible` INTEGER(1) NOT NULL DEFAULT 1")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'visible' already exists");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddVisibleColumn1526306624000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddVisibleColumn1526306624000;
}());

//# sourceMappingURL=1526306624000-AddVisibleColumn.js.map

/***/ }),

/***/ 1094:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddLangCodeColumn1526306730000; });
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
var AddLangCodeColumn1526306730000 = /** @class */ (function () {
    function AddLangCodeColumn1526306730000() {
    }
    AddLangCodeColumn1526306730000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN lang_code VARCHAR(2)")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'lang_code' already exists");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddLangCodeColumn1526306730000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddLangCodeColumn1526306730000;
}());

//# sourceMappingURL=1526306730000-AddLangCodeColumn.js.map

/***/ }),

/***/ 1095:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddDownloadDateColumn15711518720000; });
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
var AddDownloadDateColumn15711518720000 = /** @class */ (function () {
    function AddDownloadDateColumn15711518720000() {
    }
    AddDownloadDateColumn15711518720000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN downloadedDate VARCHAR(50)")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'lang_code' already exists");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddDownloadDateColumn15711518720000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddDownloadDateColumn15711518720000;
}());

//# sourceMappingURL=15711518720000-AddDownloadDateColumn.js.map

/***/ }),

/***/ 1096:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCompletedDateColumn15713974540000; });
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
var AddCompletedDateColumn15713974540000 = /** @class */ (function () {
    function AddCompletedDateColumn15713974540000() {
    }
    AddCompletedDateColumn15713974540000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN completedDate VARCHAR(50)")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'lang_code' already exists");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddCompletedDateColumn15713974540000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddCompletedDateColumn15713974540000;
}());

//# sourceMappingURL=15713974540000-AddCompletedDateColumn.js.map

/***/ }),

/***/ 1097:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddZipMapFields15783117210000; });
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
var AddZipMapFields15783117210000 = /** @class */ (function () {
    function AddZipMapFields15783117210000() {
    }
    AddZipMapFields15783117210000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, e_2, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN map_version VARCHAR(50)")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'map_version' already exists");
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN map_filename VARCHAR(50)")];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.log("column 'map_filename' already exists");
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN map_date VARCHAR(50)")];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_3 = _a.sent();
                        console.log("column 'map_date' already exists");
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AddZipMapFields15783117210000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddZipMapFields15783117210000;
}());

//# sourceMappingURL=15783117210000-AddZipMapFields.js.map

/***/ }),

/***/ 1098:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddSavedTasks16013795030000; });
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
var AddSavedTasks16013795030000 = /** @class */ (function () {
    function AddSavedTasks16013795030000() {
    }
    AddSavedTasks16013795030000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_score ADD COLUMN tasks_saved VARCHAR(50)")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'tasks_saved' already exists");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddSavedTasks16013795030000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddSavedTasks16013795030000;
}());

//# sourceMappingURL=16013795030000-AddSavedTasks.js.map

/***/ }),

/***/ 1099:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddSubtasks16026790930000; });
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
var AddSubtasks16026790930000 = /** @class */ (function () {
    function AddSubtasks16026790930000() {
    }
    AddSubtasks16026790930000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_task ADD COLUMN task_id INTEGER")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'task_id' already exists");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddSubtasks16026790930000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddSubtasks16026790930000;
}());

//# sourceMappingURL=16026790930000-AddSubtasks.js.map

/***/ }),

/***/ 1100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPositionField16194302450000; });
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
var AddPositionField16194302450000 = /** @class */ (function () {
    function AddPositionField16194302450000() {
    }
    AddPositionField16194302450000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_task ADD COLUMN position INTEGER")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("column 'position' already exists");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddPositionField16194302450000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddPositionField16194302450000;
}());

//# sourceMappingURL=16194302450000-AddPositionField.js.map

/***/ }),

/***/ 1101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddPathFields16208100470000; });
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
var AddPathFields16208100470000 = /** @class */ (function () {
    function AddPathFields16208100470000() {
    }
    AddPathFields16208100470000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN path_geojson TEXT")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN path_info TEXT")];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log("columns 'path_geojson' and 'path_info' already exist");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AddPathFields16208100470000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddPathFields16208100470000;
}());

//# sourceMappingURL=16208100470000-AddPathFields.js.map

/***/ }),

/***/ 1102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddZoom16225449820000; });
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
var AddZoom16225449820000 = /** @class */ (function () {
    function AddZoom16225449820000() {
    }
    AddZoom16225449820000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE mcm_route ADD COLUMN min_zoom INTEGER ")];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log("columns 'min_zoom' already exist");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AddZoom16225449820000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AddZoom16225449820000;
}());

//# sourceMappingURL=16225449820000-AddZoom.js.map

/***/ }),

/***/ 1103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return McmImageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_images_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_photo_viewer__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_spinner_dialog__ = __webpack_require__(74);
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
 * Generated class for the McmImageComponent component.
 *
 * This component shall encapsulate all functionality regarding images, e.g. downloading, resizing
 * or viewing in fullscreen.
 */
var McmImageComponent = /** @class */ (function () {
    function McmImageComponent(imagesService, photoViewerPlugin, spinnerDialog) {
        this.imagesService = imagesService;
        this.photoViewerPlugin = photoViewerPlugin;
        this.spinnerDialog = spinnerDialog;
        this.offline = true;
        this.fullWidth = false;
        this.photoViewer = false;
        this.click = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    McmImageComponent.prototype.ngOnChanges = function () {
        this.imageUrl = this.offline ? this.imagesService.getOfflineURL(this.src)
            : this.imagesService.getOnlineURL(this.src);
    };
    McmImageComponent.prototype.onClick = function ($event) {
        var _this = this;
        this.click.next($event);
        if (this.photoViewer && __WEBPACK_IMPORTED_MODULE_3__classes_Helper__["b" /* Helper */].isPluginAvailable(__WEBPACK_IMPORTED_MODULE_2__ionic_native_photo_viewer__["a" /* PhotoViewer */])) {
            this.spinnerDialog.show();
            setTimeout(function () {
                // use short timeout to let spinner dialog appear
                _this.photoViewerPlugin.show(_this.offline ? _this.imagesService.getOfflineURL(_this.src, undefined, undefined, true) : _this.imageUrl);
                setTimeout(function () {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    _this.spinnerDialog.hide();
                }, 1000);
            }, 100);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], McmImageComponent.prototype, "src", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], McmImageComponent.prototype, "offline", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], McmImageComponent.prototype, "fullWidth", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], McmImageComponent.prototype, "photoViewer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], McmImageComponent.prototype, "click", void 0);
    McmImageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-image',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-image/mcm-image.html"*/'<!-- Generated template for the McmImageComponent component -->\n<img [src]="imageUrl" [ngClass]="{\'full-width\': fullWidth}" (click)="onClick($event)"/>'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-image/mcm-image.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_images_service__["a" /* ImagesService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_spinner_dialog__["a" /* SpinnerDialog */]])
    ], McmImageComponent);
    return McmImageComponent;
}());

//# sourceMappingURL=mcm-image.js.map

/***/ }),

/***/ 1104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMHeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_controller__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_modals_service__ = __webpack_require__(75);
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





var MCMHeaderComponent = /** @class */ (function () {
    function MCMHeaderComponent(navCtrl, navParams, viewCtrl, modalService, modalCtrl, deepLinker) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalService = modalService;
        this.modalCtrl = modalCtrl;
        this.deepLinker = deepLinker;
        this.showBackButton = false;
        this.transparent = false;
        this.isOpeningRoute = false;
        this.currentpage = this.viewCtrl.name;
    }
    MCMHeaderComponent.prototype.retriveTitle = function () {
        //console.log('currentpage ',this.currentpage);
        if (this.navParams && this.navParams.data.headerTitle) {
            return this.navParams.data.headerTitle;
        }
        if (this.currentpage == 'InfoPage') {
            return 'a_about_mcm_title';
        }
        if (this.currentpage == 'SettingsPage') {
            return 'a_action_settings';
        }
        if (this.currentpage == 'ModalCmp') {
            return '';
        }
        return this.currentpage;
    };
    MCMHeaderComponent.prototype.ngOnInit = function () {
        this.showBackButton = this.navCtrl.canGoBack();
        if (this.currentpage == 'ModalCmp') {
            this.transparent = true;
        }
    };
    MCMHeaderComponent.prototype.goToDashboard = function () {
        var _this = this;
        this.navCtrl.setRoot('DashboardPage').then(function () {
            _this.navCtrl.popToRoot();
        });
    };
    MCMHeaderComponent.prototype.goBack = function () {
        var _this = this;
        console.log('Header going back');
        if (this.viewCtrl.instance.goBack) {
            return this.viewCtrl.instance.goBack();
        }
        if (this.currentpage === 'TasksMap') {
            var tasksMap = this.navCtrl.getActive().instance;
            if (tasksMap.sessionInfo != null) {
                console.log('go back from active session');
                console.log(tasksMap.route.id);
                tasksMap.sessionFinished();
            }
            else {
                if (!this.isOpeningRoute) {
                    this.isOpeningRoute = true;
                    this.navCtrl.pop({}, function () {
                        // necessary because of bug which does not update URL
                        _this.deepLinker.navChange('back');
                    });
                    this.modalService.showRoute(tasksMap.route, this.navCtrl).then(function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.isOpeningRoute = false;
                            return [2 /*return*/];
                        });
                    }); });
                }
            }
        }
        else {
            this.navCtrl.pop({}, function () {
                // necessary because of bug which does not update URL
                _this.deepLinker.navChange('back');
            });
        }
    };
    MCMHeaderComponent.prototype.closeModal = function () {
        this.viewCtrl.dismiss(this.modalCtrl);
    };
    MCMHeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-header',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-header/mcm-header.html"*/'<ion-header>\n    <ion-toolbar hideBackButton [attr.transparent]="transparent ? true : null">\n        <ion-buttons left>\n            <button ion-button icon-only *ngIf="showBackButton && currentpage != \'ModalCmp\'" (click)="goBack()">\n                <img class="header-icon" src="assets/icons/back.svg"/>\n            </button>\n            <button ion-button icon-only *ngIf="currentpage == \'ModalCmp\'" (click)="closeModal()">\n                <!--<img class="header-icon" src="assets/icons/icon_close-modal.svg"/>-->\n                <img class="header-icon" src="assets/icons/back.svg"/>\n            </button>\n        </ion-buttons>\n        <ion-title>{{ retriveTitle() | translate }}</ion-title>\n        <ion-buttons end></ion-buttons>\n    </ion-toolbar>\n</ion-header>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-header/mcm-header.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_controller__["a" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__["a" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* DeepLinker */]])
    ], MCMHeaderComponent);
    return MCMHeaderComponent;
}());

//# sourceMappingURL=mcm-header.component.js.map

/***/ }),

/***/ 1105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DistancePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/*
 * this is still pretty basic and could defenitely use some rework in terms of international scale and number notation
 * so far the functiuonalities are:
 * - checks if the value is over o km and if so, then converts m to km and adds the correct unit
*/
var DistancePipe = /** @class */ (function () {
    function DistancePipe() {
    }
    DistancePipe.prototype.transform = function (value, unit) {
        /*     console.log('value', value); */
        if (value > 0 && value < 1000) {
            return value + ' ' + unit;
        }
        else if (value > 1000) {
            return (Math.round(value / 100) / 10) + ' km';
        }
        else if (value <= 0) {
            return 0 + ' ' + unit;
        }
    };
    DistancePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'distance' })
    ], DistancePipe);
    return DistancePipe;
}());

//# sourceMappingURL=distance.pipe.js.map

/***/ }),

/***/ 1106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_Route__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_Helper__ = __webpack_require__(19);
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



var MCMProgressBarComponent = /** @class */ (function () {
    function MCMProgressBarComponent(helper) {
        this.helper = helper;
    }
    MCMProgressBarComponent.prototype.ngOnChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.route && this.route.scores)) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.helper.calculateProgress(this.route)];
                    case 2:
                        data = _a.sent();
                        this.currentProgress = data.currentProgress;
                        this.total = data.totalTasks;
                        this.progressWidth = (100 / this.total) * this.currentProgress;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (this.total && this.currentProgress) {
                            this.progressWidth = (100 / this.total) * this.currentProgress;
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__entity_Route__["a" /* Route */])
    ], MCMProgressBarComponent.prototype, "route", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], MCMProgressBarComponent.prototype, "isAudioPlaying", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], MCMProgressBarComponent.prototype, "isAudio", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], MCMProgressBarComponent.prototype, "remainingTime", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], MCMProgressBarComponent.prototype, "currentProgress", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], MCMProgressBarComponent.prototype, "total", void 0);
    MCMProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-progress-bar',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-progress-bar/mcm-progress-bar.html"*/'<span *ngIf="!isAudio">{{ currentProgress }} / {{ total }}</span>\n<div class="container progress-vertical route">\n    <div class="bar" [ngStyle]="{\'width\': ((100/total)*currentProgress) +\'%\'}"></div>\n</div>\n<!-- +900 to display 00:00 remaining only a short time-->\n<span *ngIf="isAudio && isAudioPlaying" class="audio">{{ (total - currentProgress)+900 | date: \'mm:ss\' }} </span>\n<span *ngIf="isAudio && !isAudioPlaying" class="audio">{{ total | date: \'mm:ss\' }} </span>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-progress-bar/mcm-progress-bar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */]])
    ], MCMProgressBarComponent);
    return MCMProgressBarComponent;
}());

//# sourceMappingURL=mcm-progress-bar.js.map

/***/ }),

/***/ 1107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LazyLoadImagesDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intersection_observer__ = __webpack_require__(1108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intersection_observer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_intersection_observer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_images_service__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




/**
 * Angular Lazy Loading Images Directive
 *
 * The library allows to lazy load images from your web application
 * using the MutationObserver and the IntersectionObserver. Images will be loaded as
 * soon as they enter the viewport in a non-blocking way.
 */
var LazyLoadImagesDirective = /** @class */ (function () {
    function LazyLoadImagesDirective(element, renderer, ngZone, platformId, imagesService) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.platformId = platformId;
        this.imagesService = imagesService;
        this.rootElement = element.nativeElement;
    }
    LazyLoadImagesDirective.prototype.init = function () {
        var _this = this;
        this.registerIntersectionObserver();
        this.observeDOMChanges(this.rootElement, function () {
            var imagesFoundInDOM = _this.getAllImagesToLazyLoad(_this.rootElement);
            imagesFoundInDOM.forEach(function (image) { return _this.intersectionObserver.observe(image); });
        });
    };
    LazyLoadImagesDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.isBrowser()) {
            return;
        }
        this.ngZone.runOutsideAngular(function () { return _this.init(); });
    };
    LazyLoadImagesDirective.prototype.ngOnDestroy = function () {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    };
    LazyLoadImagesDirective.prototype.isBrowser = function () {
        return Object(__WEBPACK_IMPORTED_MODULE_1__angular_common__["j" /* isPlatformBrowser */])(this.platformId);
    };
    LazyLoadImagesDirective.prototype.registerIntersectionObserver = function () {
        var _this = this;
        this.intersectionObserver = new IntersectionObserver(function (images) { return images.forEach(function (image) { return _this.onIntersectionChange(image); }); }, this.intersectionObserverConfig instanceof Object ? this.intersectionObserverConfig : undefined);
        return this.intersectionObserver;
    };
    LazyLoadImagesDirective.prototype.observeDOMChanges = function (rootElement, onChange) {
        // Create a Mutation Observer instance
        var observer = new MutationObserver(function (mutations) { return onChange(mutations); });
        // Observer Configuration
        var observerConfig = {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true
        };
        // Observe Directive DOM Node
        observer.observe(rootElement, observerConfig);
        // Fire onChange callback to check current DOM nodes
        onChange();
        return observer;
    };
    LazyLoadImagesDirective.prototype.getAllImagesToLazyLoad = function (pageNode) {
        return Array.from(pageNode.querySelectorAll('img[data-src], [data-srcset], [data-background-src], img[data-async-src], [data-async-background-src]'));
    };
    LazyLoadImagesDirective.prototype.onIntersectionChange = function (image) {
        if (!image.isIntersecting) {
            return;
        }
        this.onImageAppearsInViewport(image.target);
    };
    LazyLoadImagesDirective.prototype.onImageAppearsInViewport = function (image) {
        var _this = this;
        if (image.dataset.asyncSrc) {
            this.imagesService.getAsyncImageURL(image.dataset.asyncSrc, this.imageSize).then(function (asyncSrc) {
                _this.renderer.setAttribute(image, 'src', asyncSrc);
            });
            this.renderer.removeAttribute(image, 'data-async-src');
        }
        if (image.dataset.src) {
            this.renderer.setAttribute(image, 'src', image.dataset.src);
            this.renderer.removeAttribute(image, 'data-src');
        }
        if (image.dataset.srcset) {
            this.renderer.setAttribute(image, 'srcset', image.dataset.srcset);
            this.renderer.removeAttribute(image, 'data-srcset');
        }
        if (image.dataset.asyncBackgroundSrc) {
            this.imagesService.getAsyncImageURL(image.dataset.asyncBackgroundSrc, this.imageSize).then(function (asyncSrc) {
                _this.renderer.setStyle(image, 'background-image', "url(" + asyncSrc + ")");
            });
            this.renderer.removeAttribute(image, 'data-async-background-src');
        }
        if (image.dataset.backgroundSrc) {
            this.renderer.setStyle(image, 'background-image', "url(" + image.dataset.backgroundSrc + ")");
            this.renderer.removeAttribute(image, 'data-background-src');
        }
        // Stop observing the current target
        if (this.intersectionObserver) {
            this.intersectionObserver.unobserve(image);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('lazy-load-images'),
        __metadata("design:type", Object)
    ], LazyLoadImagesDirective.prototype, "intersectionObserverConfig", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('image-size'),
        __metadata("design:type", String)
    ], LazyLoadImagesDirective.prototype, "imageSize", void 0);
    LazyLoadImagesDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[lazy-load-images]'
        }),
        __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["PLATFORM_ID"])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], Object, __WEBPACK_IMPORTED_MODULE_3__services_images_service__["a" /* ImagesService */]])
    ], LazyLoadImagesDirective);
    return LazyLoadImagesDirective;
}());

//# sourceMappingURL=ngx-lazy-load-images.directive.js.map

/***/ }),

/***/ 1109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouteTeaserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity_Route__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_modals_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_DB_Updater__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(29);
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







var RouteTeaserComponent = /** @class */ (function () {
    function RouteTeaserComponent(modalsService, ormService, helper, dbUpdater, translateService) {
        this.modalsService = modalsService;
        this.ormService = ormService;
        this.helper = helper;
        this.dbUpdater = dbUpdater;
        this.translateService = translateService;
        this.downloadRoute = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.removeRoute = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.currentProgress = 0;
        this.total = 0;
        this.completedRadius = 339.292;
    }
    RouteTeaserComponent.prototype.ngOnChanges = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.route && this.route.downloaded)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.route.getTaskCount()];
                    case 1:
                        _a.total = _b.sent();
                        if (!this.route.scores) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.helper.calculateProgress(this.route)];
                    case 2:
                        data = _b.sent();
                        this.currentProgress = data.currentProgress;
                        this.completedRadius = this.calculatePercentage();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RouteTeaserComponent.prototype.calculatePercentage = function () {
        var c = 2 * Math.PI * 54;
        var completedPercentage = (1 / this.total) * this.currentProgress;
        return c * (1 - completedPercentage);
    };
    RouteTeaserComponent.prototype.doDownload = function (event, route) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.modalsService.doDownload(route)];
                    case 1:
                        if (_a.sent()) {
                            this.downloadRoute.emit({ route: route });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RouteTeaserComponent.prototype.deleteRoute = function (event, route) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.stopPropagation();
                        return [4 /*yield*/, this.ormService.removeDownloadedRoute(route, true)];
                    case 1:
                        if (_a.sent()) {
                            this.removeRoute.emit();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__entity_Route__["a" /* Route */])
    ], RouteTeaserComponent.prototype, "route", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], RouteTeaserComponent.prototype, "isOnline", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], RouteTeaserComponent.prototype, "downloadRoute", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], RouteTeaserComponent.prototype, "removeRoute", void 0);
    RouteTeaserComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'route-teaser',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/route-teaser/route-teaser.html"*/'<div class="main">\n    <div *ngIf="route" class="container image" [ngClass]="{\'downloaded\' : !!route.downloaded, \'completed\': !!route.completed}">\n        <svg class="progress" width="120" height="120" viewBox="0 0 120 120">\n            <circle class="progress__meter" cx="60" cy="60" r="54" stroke-width="12"></circle>\n            <circle class="progress__value" cx="60" cy="60" r="54" stroke-width="12" [ngStyle]="{\'stroke-dasharray\': 339.292, \'stroke-dashoffset\': completedRadius}"></circle>\n        </svg>\n        <div class="cover">\n            <img class="thumb" [attr.data-async-src]="route.getImageURL()" onerror="this.style.opacity=\'0\'" />\n        </div>\n        <img *ngIf="route.isNarrativeEnabled()" class="indicator" src="./assets/images/{{route.getNarrativeName()}}/indicator-badge.svg"/>\n    </div>\n\n    <div *ngIf="route" class="container text">\n        <h2 class="item-text-wrap">{{route.title}}</h2>\n        <div class="bottom">\n            <div class="text">\n            <span class="icon location">{{route.city}}, {{route.countryCode}} | {{route.getDistance() | distance: \'m\'}}</span>\n            <span class="icon grade" *ngIf="route.grade">{{route.grade}} +</span>\n            </div>\n            <div *ngIf="route" class="container buttons">\n                <button ion-button icon-only round color="primary" class="dot" *ngIf="!route.downloaded && isOnline" (click)="doDownload($event, route)">\n                    <img src="./assets/icons/download.svg"/>\n                </button>\n                <button ion-button icon-only round color="danger" class="dot" *ngIf="!!route.downloaded" (click)="deleteRoute($event, route)">\n                    <img src="./assets/icons/delete.svg"/>\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class="secondary">\n    <span class="icon key" no-margin>{{route.code}}</span>\n    <span class="icon downloaded" no-margin>{{route.downloadedDate}}</span>\n    <!--<mcm-progress-bar class="icon finished" *ngIf="route && route.downloadedDate && !route.completed" [route]="route" ></mcm-progress-bar>-->\n    <div class="evaluation">\n        <span class="icon finished" *ngIf="route?.completed">{{route?.completedDate}}</span>\n        <p class="icon finished" *ngIf="!route?.completed">{{currentProgress}} / {{total}}</p>\n        <div class="ratings" *ngIf="route?.scores && route.isAnswerFeedbackEnabled()">\n            <div class="rating perfect">\n                <p *ngIf="route?.scores[0]">{{route.scores[0].getTasksSolved().length}}</p>\n                <p *ngIf="!route?.scores[0]">0</p>\n            </div>\n            <div class="rating good">\n                <p *ngIf="route?.scores[0]">{{route.scores[0].getTasksSolvedLow().length}}</p>\n                <p *ngIf="!route?.scores[0]">0</p>\n            </div>\n            <div class="rating failed">\n                <p *ngIf="route?.scores[0]">{{route.scores[0].getTasksFailed().length}}</p>\n                <p *ngIf="!route?.scores[0]">0</p>\n            </div>\n        </div>\n        <div class="ratings" *ngIf="route?.scores && !route.isAnswerFeedbackEnabled()">\n            <div class="rating saved">\n                <p *ngIf="route?.scores[0]">{{route.scores[0].getTasksSaved().length}}</p>\n                <p *ngIf="!route?.scores[0]">0</p>\n            </div>\n        </div>\n    </div>\n\n    <!--Dummy just for quick testing purposes  -->\n    <!--<div class="evaluation">-->\n        <!--<span class="icon finished">Oct 21 2019</span>-->\n        <!--<div class="ratings">-->\n            <!--<div class="rating perfect"><p>1</p></div>-->\n            <!--<div class="rating good"><p>3</p></div>-->\n            <!--<div class="rating failed"><p>20</p></div>-->\n        <!--</div>-->\n    <!--</div>-->\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/route-teaser/route-teaser.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_3__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_4__classes_Helper__["b" /* Helper */],
            __WEBPACK_IMPORTED_MODULE_5__classes_DB_Updater__["a" /* DB_Updater */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], RouteTeaserComponent);
    return RouteTeaserComponent;
}());

//# sourceMappingURL=route-teaser.js.map

/***/ }),

/***/ 1110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalizedDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LocalizedDatePipe = /** @class */ (function () {
    function LocalizedDatePipe(translateService) {
        this.translateService = translateService;
    }
    LocalizedDatePipe.prototype.transform = function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        var datePipe = new __WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* DatePipe */](this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang);
        return datePipe.transform(value, pattern);
    };
    LocalizedDatePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({
            name: 'localizedDate',
            pure: false
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]])
    ], LocalizedDatePipe);
    return LocalizedDatePipe;
}());

//# sourceMappingURL=localDate.pipe.js.map

/***/ }),

/***/ 1129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createTranslateLoader;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngx_translate_http_loader__ = __webpack_require__(1130);

function createTranslateLoader(httpClient) {
    return new __WEBPACK_IMPORTED_MODULE_0__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](httpClient, './assets/localization/', '.json');
}
//# sourceMappingURL=translate-loader.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ChatMessage */
/* unused harmony export LeaderBoardItemRespone */
/* unused harmony export UserInfo */
/* unused harmony export SessionInfo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatAndSessionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_api_services_session_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__gps_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_api_services_session_user_service__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_api_services_session_chat_service__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_api_services_session_event_service__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_api_models_events_add_request__ = __webpack_require__(950);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_api_models_event_add_request__ = __webpack_require__(951);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_api_services_session_user_leaderboard_service__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_typescript_collections_dist_lib_arrays__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_typescript_collections_dist_lib_arrays___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_typescript_collections_dist_lib_arrays__);
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


















var ChatMessage = /** @class */ (function () {
    function ChatMessage() {
    }
    return ChatMessage;
}());

var LeaderBoardItemRespone = /** @class */ (function () {
    function LeaderBoardItemRespone() {
    }
    return LeaderBoardItemRespone;
}());

var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());

// TODO Refactor, so that only important session params are exposed
var SessionInfo = /** @class */ (function () {
    function SessionInfo() {
    }
    return SessionInfo;
}());

var ChatAndSessionService = /** @class */ (function () {
    function ChatAndSessionService(events, storage, sessionService, sessionUserService, sessionChatService, sessionEventService, gpsService, localNotifications, translate, toast, leaderBoardService, platform) {
        this.events = events;
        this.storage = storage;
        this.sessionService = sessionService;
        this.sessionUserService = sessionUserService;
        this.sessionChatService = sessionChatService;
        this.sessionEventService = sessionEventService;
        this.gpsService = gpsService;
        this.localNotifications = localNotifications;
        this.translate = translate;
        this.toast = toast;
        this.leaderBoardService = leaderBoardService;
        this.platform = platform;
        this.subject = new __WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject__["ReplaySubject"](1);
        this.timerBackground = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(ChatAndSessionService_1.CHAT_PULL_INTERVAL_IN_SECS * 1000).timeInterval();
        this.timerUserSeesMessages = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(ChatAndSessionService_1.CHAT_PULL_INTERVAL_USER_SEES_MESSAGES_IN_SECS * 1000).timeInterval();
        this.sendEventsTimer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(ChatAndSessionService_1.EVENTS_POST_INTERVAL_IN_SECS * 1000);
        this.getLeaderboardTimer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(ChatAndSessionService_1.EVENTS_POST_INTERVAL_IN_SECS * 1000);
        this.getAuthorEventsTimer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(ChatAndSessionService_1.CHAT_PULL_INTERVAL_IN_SECS * 1000);
        this.pushPositionTimer = __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].interval(ChatAndSessionService_1.POSITION_PUSH_INTERVAL_IN_SECS * 1000);
        this.lastPositionPush = 0;
        this.coordinatesList = [];
        // TODO should be reloaded if session changes
        // if a new team enters session, authors receiver list should be updated
        this.receivers = [];
        this.alreadySeenMessages = {};
        this.pastLocalNotifications = [];
        this.leaderBoard = { leaderboard: [] };
        this.newMsgNumber = 0;
    }
    ChatAndSessionService_1 = ChatAndSessionService;
    ChatAndSessionService.prototype.updateSession = function (sessionInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.set(ChatAndSessionService_1.STORAGE_KEY_SESSION, sessionInfo)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Init chatservice");
                        return [4 /*yield*/, this.getActiveSession()];
                    case 1:
                        _a.sent();
                        this.subscribeForAndSendEvents(this.transientActiveSession);
                        if (Object(__WEBPACK_IMPORTED_MODULE_11__ionic_native_core__["i" /* checkAvailability */])(__WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["b" /* LocalNotifications */].pluginRef, null, __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["b" /* LocalNotifications */].pluginName) === true) {
                            this.localNotifications.on('click')
                                .subscribe(function (next) {
                                console.log('local notification has been pressed');
                                console.log(next);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.exit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.subscribeForAndSendEvents(null);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Converts api SessionChatMessageResponse to ChatMessage
     * @param msg
     * @param sessionUser
     */
    ChatAndSessionService.prototype.getChatMessage = function (msg, sessionUser) {
        msg.time = this.formatTime(msg.time);
        var timezoneOffset = new Date().getTimezoneOffset();
        var chatMessage = {
            messageId: msg.messageId,
            userId: msg.senderId,
            userName: msg.username,
            userAvatar: './assets/to-user.jpg',
            toUserId: msg.receiverId,
            time: Date.parse(msg.time) - (timezoneOffset * 60000),
            message: msg.message,
            status: msg.status,
            media: msg.media
        };
        if (chatMessage.media.length > 0 && chatMessage.media[0].substring(chatMessage.media[0].lastIndexOf('.')) == '.aac') {
            chatMessage.audioDuration = msg.mediaDuration;
        }
        return chatMessage;
    };
    /**
     * Helper: Converts formats time field because iOS does not accept yyyy-mm-dd (ISO 8601) date format
     * @param time
     */
    ChatAndSessionService.prototype.formatTime = function (time) {
        if (this.platform.is('ios')) {
            var originalTime = time;
            var dateParts = originalTime.substring(0, 10).split('-');
            var timePart = originalTime.substr(11);
            return dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timePart;
        }
        else
            return time;
    };
    /**
     * Returns all Chat Messages
     * @param sessionInfo
     * @param receiverToken
     */
    ChatAndSessionService.prototype.getMsgList = function (sessionInfo, receiverToken) {
        var _this = this;
        var params = {
            sessionCode: sessionInfo.session.code,
            senderToken: sessionInfo.sessionUser.token,
            receiverToken: receiverToken
        };
        return this.sessionChatService.getMessages(params).map(function (chatResponse) {
            var chatMessages = [];
            chatResponse.messages.forEach(function (msg) {
                chatMessages.push(_this.getChatMessage(msg, sessionInfo.sessionUser));
            });
            return chatMessages;
        });
    };
    ChatAndSessionService.prototype.getNewMsgs = function (sessionInfo, receiverToken) {
        var _this = this;
        var params = {
            sessionCode: sessionInfo.session.code,
            senderToken: sessionInfo.sessionUser.token,
            receiverToken: receiverToken
        };
        return this.sessionChatService.getNewMessages(params).map(function (newMessages) {
            _this.newMsgNumber += newMessages.length;
            var chatMessages = [];
            newMessages.forEach(function (msg) {
                chatMessages.push(_this.getChatMessage(msg, sessionInfo.sessionUser));
            });
            return chatMessages;
        });
    };
    /**
     * Sends a message to all receivers
     *
     * FIXME Send message to selected receivers
     *
     * @param msg
     * @param sessionInfo
     */
    ChatAndSessionService.prototype.sendMsg = function (msg, sessionInfo) {
        var _this = this;
        var msgsSend = [];
        console.log("Sending chat message: ", msg);
        this.receivers.forEach(function (receiver) {
            msgsSend.push(_this.sessionChatService.sendMessageToUser({
                receiverToken: receiver.token,
                senderToken: sessionInfo.sessionUser.token,
                sessionCode: sessionInfo.session.code,
                chatMessage: msg // FIXME ChatMessage convert to SessionChatMessageRequest (msg = string)
            }).toPromise().then(function (msg) {
                return _this.getChatMessage(msg, sessionInfo.sessionUser);
            }));
        });
        return Promise.all(msgsSend).then(function (msgs) {
            console.info("New Chat Messages were send: [".concat(msgs.length.toString(), "]"));
            return msgs;
        });
    };
    ChatAndSessionService.prototype.postMedia = function (file, sessionInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var x, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.sessionChatService.postMedia(file, sessionInfo.session.code, sessionInfo.sessionUser.token)];
                    case 1:
                        x = _a.sent();
                        return [2 /*return*/, this.sessionService.rootUrl.replace("index.php", "") + x.body];
                    case 2:
                        e_1 = _a.sent();
                        console.log("ERROR sending media to chat: ", e_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionInfo, userInfo_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getActiveSession()];
                    case 1:
                        sessionInfo = _a.sent();
                        if (sessionInfo != null) {
                            userInfo_1 = {
                                id: sessionInfo.sessionUser.id,
                                name: sessionInfo.sessionUser.team_name,
                                token: sessionInfo.sessionUser.token,
                                avatar: './assets/user.jpg' // FIXME User Avatar
                            };
                            return [2 /*return*/, new Promise(function (resolve) { return resolve(userInfo_1); })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.setActiveSession = function (session, teamName, teamMembers) {
        return __awaiter(this, void 0, void 0, function () {
            var sessionUser, sessionInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Joining session.");
                        return [4 /*yield*/, this.sessionService.joinSession({
                                sessionCode: session.code,
                                request: { teamName: teamName, teamMembers: teamMembers }
                            }).toPromise()];
                    case 1:
                        sessionUser = _a.sent();
                        if (!sessionUser) return [3 /*break*/, 3];
                        console.log("Successfully joined. Storing active session");
                        sessionInfo = {
                            session: session,
                            sessionUser: sessionUser,
                            started: false,
                            authorEvents_lastPull: __WEBPACK_IMPORTED_MODULE_16_moment__().unix()
                        };
                        return [4 /*yield*/, this.storage.set(ChatAndSessionService_1.STORAGE_KEY_SESSION, sessionInfo)];
                    case 2:
                        _a.sent();
                        this.transientActiveSession = sessionInfo;
                        console.log("Session stored");
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("Error joining session.");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.getActiveSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, currentTimeUnix, endTimeInUnix;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Getting Active session.");
                        _a = this;
                        return [4 /*yield*/, this.storage.get(ChatAndSessionService_1.STORAGE_KEY_SESSION)];
                    case 1:
                        _a.transientActiveSession = _b.sent();
                        console.log(this.transientActiveSession);
                        if (this.transientActiveSession) {
                            console.log("Found active session. Checking if still active.");
                            currentTimeUnix = __WEBPACK_IMPORTED_MODULE_16_moment__().unix();
                            console.log("Current time: " + currentTimeUnix);
                            endTimeInUnix = __WEBPACK_IMPORTED_MODULE_16_moment__(this.transientActiveSession.session.ends_at).unix();
                            console.log("End time: " + endTimeInUnix);
                            if (currentTimeUnix > endTimeInUnix) {
                                console.log("Session ended. Exit session.");
                                this.exitActiveSession();
                            }
                            else {
                                console.log("Session running.");
                            }
                        }
                        return [2 /*return*/, this.transientActiveSession];
                }
            });
        });
    };
    ChatAndSessionService.prototype.getSessionInfo = function () {
        return this.transientActiveSession;
    };
    ChatAndSessionService.prototype.exitActiveSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sendUserEvents()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.remove(ChatAndSessionService_1.STORAGE_KEY_SESSION)];
                    case 2:
                        _a.sent();
                        this.subscribeForAndSendEvents(null);
                        if (!(this.transientActiveSession != null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.sessionUserService.leaveSession({
                                userToken: this.transientActiveSession.sessionUser.token,
                                sessionCode: this.transientActiveSession.session.code
                            }).toPromise()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        // Reset watch parameters
                        this.receivers = [];
                        this.alreadySeenMessages = {};
                        this.pastLocalNotifications = [];
                        this.leaderBoard = { leaderboard: [] };
                        this.newMsgNumber = 0;
                        this.transientActiveSession = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.getSubject = function () {
        return this.subject;
    };
    ChatAndSessionService.prototype.subscribeForAndSendEvents = function (sessionInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.subject.next(sessionInfo);
                        if (!sessionInfo) return [3 /*break*/, 4];
                        if (this.positionSubscription) {
                            this.positionSubscription.unsubscribe();
                        }
                        this.positionSubscription = this.pushPositionTimer.subscribe(function (tick) { return __awaiter(_this, void 0, void 0, function () {
                            var position, lat_1, lon_1, e_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        position = this.gpsService.getLastPosition();
                                        if (position && position.coords) {
                                            this.coordinatesList.push(position.coords);
                                        }
                                        else {
                                            this.coordinatesList.push({
                                                accuracy: 0,
                                                altitude: null,
                                                altitudeAccuracy: null,
                                                heading: null,
                                                latitude: ChatAndSessionService_1.DEFAULT_LAT,
                                                longitude: ChatAndSessionService_1.DEFAULT_LON,
                                                speed: null
                                            });
                                        }
                                        if (!(this.coordinatesList.length >= 15)) return [3 /*break*/, 4];
                                        console.log("calculate sums");
                                        lat_1 = 0;
                                        lon_1 = 0;
                                        Object(__WEBPACK_IMPORTED_MODULE_17_typescript_collections_dist_lib_arrays__["forEach"])(this.coordinatesList, function (coords) {
                                            lat_1 += coords.latitude;
                                            lon_1 += coords.longitude;
                                        });
                                        lat_1 = lat_1 / this.coordinatesList.length;
                                        lon_1 = lon_1 / this.coordinatesList.length;
                                        console.log(lat_1 + ", " + lon_1);
                                        this.coordinatesList = [];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this.sessionUserService.updatePosition({
                                                sessionCode: sessionInfo.session.code,
                                                userToken: sessionInfo.sessionUser.token,
                                                latitude: lat_1,
                                                longitude: lon_1
                                            }).toPromise()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_2 = _a.sent();
                                        console.error("ChatAndSessionService: Could not push position", e_2);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        if (this.sendEventsSubscription) {
                            this.sendEventsSubscription.unsubscribe();
                        }
                        this.sendEventsSubscription = this.sendEventsTimer.subscribe(function (tick) {
                            console.log('tick tock');
                            _this.sendUserEvents();
                        });
                        if (this.getLeaderboardSubscription) {
                            this.getLeaderboardSubscription.unsubscribe();
                        }
                        this.getLeaderboardSubscription = this.getLeaderboardTimer.subscribe(function (tick) {
                            _this.fetchLeaderboard();
                        });
                        if (this.getAuthorEventsSubscription) {
                            this.getAuthorEventsSubscription.unsubscribe();
                        }
                        this.getAuthorEventsSubscription = this.getAuthorEventsTimer.subscribe(function (tick) {
                            _this.fetchAuthorEvents();
                        });
                        this.determineDefaultReceivers(sessionInfo).then(function (receivers) {
                            _this.receivers = receivers;
                        });
                        this.refreshChatSubscription(sessionInfo);
                        return [4 /*yield*/, this.localNotifications.hasPermission()];
                    case 1:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.localNotifications.requestPermission()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.receivers = [];
                        if (this.positionSubscription) {
                            this.positionSubscription.unsubscribe();
                            this.positionSubscription = null;
                        }
                        // TODO i think this type of code is a little bit confusing. refactor to subscribe/unsubscribe methods.
                        if (this.chatSubscription) {
                            this.chatSubscription.unsubscribe();
                            this.chatSubscription = null;
                        }
                        if (this.sendEventsSubscription) {
                            this.sendEventsSubscription.unsubscribe();
                            this.sendEventsSubscription = null;
                        }
                        if (this.getLeaderboardSubscription) {
                            this.getLeaderboardSubscription.unsubscribe();
                            this.getLeaderboardSubscription = null;
                        }
                        if (this.getAuthorEventsSubscription) {
                            this.getAuthorEventsSubscription.unsubscribe();
                            this.getAuthorEventsSubscription = null;
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.refreshChatSubscription = function (sessionInfo) {
        var _this = this;
        console.debug('refreshChatSubscription()');
        if (this.chatSubscription) {
            this.chatSubscription.unsubscribe();
        }
        this.chatSubscription = this.getRelevantTimer().subscribe(function (tick) {
            _this.checkForNewMessages(sessionInfo);
        });
    };
    ChatAndSessionService.prototype.getRelevantTimer = function () {
        if (this.userSeesNewMessages) {
            return this.timerUserSeesMessages;
        }
        else {
            return this.timerBackground;
        }
    };
    ChatAndSessionService.prototype.checkForNewMessages = function (sessionInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("check for new msgs ...");
                this.receivers.forEach(function (receiver) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    var messages;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.getNewMsgs(sessionInfo, receiver.token).toPromise()];
                            case 1:
                                messages = _a.sent();
                                // foreach msg -> publish new event
                                messages.forEach(function (msg) {
                                    // console.log("chat msgs received: ", msg);
                                    _this.events.publish('chat:received', msg);
                                    var alreadySeen = _this.alreadySeenMessages[msg.messageId];
                                    if (!alreadySeen) {
                                        _this.alreadySeenMessages[msg.messageId] = true;
                                        if (!_this.userSeesNewMessages) {
                                            console.info("scheduling notfication for " + msg.userName + ": " + msg.message);
                                            var notification = void 0;
                                            _this.pastLocalNotifications.push(notification = {
                                                id: _this.pastLocalNotifications.length + 1,
                                                title: msg.userName,
                                                text: msg.message,
                                                silent: false,
                                                actions: [{
                                                        id: 'reply',
                                                        type: __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* ILocalNotificationActionType */].INPUT,
                                                        title: _this.translate.instant('a_chat_reply'),
                                                        emptyText: _this.translate.instant('a_chat_type_message'),
                                                        submitTitle: _this.translate.instant('a_chat_reply'),
                                                        foreground: true,
                                                        launch: true
                                                    }],
                                            });
                                            _this.localNotifications.schedule(notification);
                                            _this.toast.create({
                                                message: msg.userName + ": " + msg.message,
                                                duration: 3000,
                                                position: 'bottom'
                                            }).present();
                                        }
                                    }
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ChatAndSessionService.prototype.determineDefaultReceivers = function (sessionInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var receivers, admin, users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receivers = [];
                        if (!(!sessionInfo.sessionUser.wp_user_id || sessionInfo.sessionUser.wp_user_id <= 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sessionService.getSessionAdmin({
                                sessionCode: sessionInfo.session.code,
                                userToken: sessionInfo.sessionUser.token
                            }).toPromise().then(function (res) {
                                return res;
                            })];
                    case 1:
                        admin = _a.sent();
                        receivers.push(admin);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.sessionService.getSessionUsers(sessionInfo.session.code)
                            .toPromise()
                            .then(function (users) {
                            return users.users;
                        })];
                    case 3:
                        users = _a.sent();
                        users.filter(function (user) {
                            return !(user.id === sessionInfo.sessionUser.id);
                        });
                        receivers = users;
                        _a.label = 4;
                    case 4: return [2 /*return*/, Promise.all(receivers)];
                }
            });
        });
    };
    ChatAndSessionService.prototype.getReceivers = function () {
        return this.receivers;
    };
    ChatAndSessionService.prototype.setUserSeesNewMessages = function (value) {
        var refreshSubscription = value != this.userSeesNewMessages && this.transientActiveSession;
        this.userSeesNewMessages = value;
        if (refreshSubscription) {
            this.refreshChatSubscription(this.transientActiveSession);
        }
    };
    /*
    Session User Events
    Was haben Krokodile und Italiener gemeinsam?
     */
    ChatAndSessionService.prototype.sendUserEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionInfo, position_1, eventsAddRequest, params, sessionEventsResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionInfo = this.transientActiveSession;
                        console.log('send user events');
                        if (!sessionInfo) return [3 /*break*/, 2];
                        if (!(ChatAndSessionService_1.USER_EVENTS.length > 0)) return [3 /*break*/, 2];
                        position_1 = this.gpsService.getLastPosition();
                        if (position_1 && position_1.coords) {
                            console.log(position_1.coords);
                            ChatAndSessionService_1.USER_EVENTS.forEach(function (event) {
                                event.lat = position_1.coords.latitude.toString();
                                event.lon = position_1.coords.longitude.toString();
                            });
                        }
                        eventsAddRequest = new __WEBPACK_IMPORTED_MODULE_13__app_api_models_events_add_request__["a" /* EventsAddRequest */]();
                        eventsAddRequest.events = ChatAndSessionService_1.USER_EVENTS;
                        params = {
                            events: eventsAddRequest,
                            sessionCode: sessionInfo.session.code,
                            userToken: sessionInfo.sessionUser.token
                        };
                        return [4 /*yield*/, this.sessionEventService.addEvents(params).toPromise()];
                    case 1:
                        sessionEventsResponse = _a.sent();
                        console.log(ChatAndSessionService_1.USER_EVENTS);
                        ChatAndSessionService_1.USER_EVENTS = [];
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.addUserEvent = function (title, details, task_id) {
        var eventAddRequest = new __WEBPACK_IMPORTED_MODULE_14__app_api_models_event_add_request__["a" /* EventAddRequest */]();
        eventAddRequest.title = title;
        eventAddRequest.details = details;
        eventAddRequest.task_id = task_id;
        eventAddRequest.lat = "" + ChatAndSessionService_1.DEFAULT_LAT;
        eventAddRequest.lon = "" + ChatAndSessionService_1.DEFAULT_LON;
        ChatAndSessionService_1.USER_EVENTS.push(eventAddRequest);
    };
    ChatAndSessionService.prototype.fetchLeaderboard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionInfo, params, leaderboard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionInfo = this.transientActiveSession;
                        if (!sessionInfo) return [3 /*break*/, 2];
                        if (!sessionInfo.session.has_leaderboard) return [3 /*break*/, 2];
                        params = new /** @class */ (function () {
                            function class_1() {
                            }
                            return class_1;
                        }());
                        params.sessionCode = sessionInfo.session.code;
                        params.userToken = sessionInfo.sessionUser.token;
                        return [4 /*yield*/, this.leaderBoardService.getLeaderboard(params).toPromise()];
                    case 1:
                        leaderboard = _a.sent();
                        console.log(leaderboard);
                        this.leaderBoard = leaderboard;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.fetchAuthorEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sessionInfo, params, authorEvents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionInfo = this.transientActiveSession;
                        if (!sessionInfo) return [3 /*break*/, 3];
                        params = new /** @class */ (function () {
                            function class_2() {
                            }
                            return class_2;
                        }());
                        params.sessionCode = sessionInfo.session.code;
                        params.userToken = sessionInfo.sessionUser.token;
                        params.unixTime = sessionInfo.authorEvents_lastPull.toString();
                        return [4 /*yield*/, this.sessionEventService.getAuthorEvents(params).toPromise()];
                    case 1:
                        authorEvents = _a.sent();
                        console.log(authorEvents);
                        // Update this sessions last update info
                        sessionInfo.authorEvents_lastPull = __WEBPACK_IMPORTED_MODULE_16_moment__().unix();
                        this.transientActiveSession = sessionInfo;
                        return [4 /*yield*/, this.updateSession(sessionInfo)];
                    case 2:
                        _a.sent();
                        this.parseAuthorEvents(authorEvents);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ChatAndSessionService.prototype.parseAuthorEvents = function (events) {
        /*
        Two cases right now:
        1. Author kicks a user: If user == current session user > Leave active session
        2. Author updates session: Get updated session
         */
        var that = this;
        events.events.forEach(function (event) {
            var _this = this;
            if (event.title === 'event_author_kick_user') {
                try {
                    var details = JSON.parse(event.details);
                    if (details.userToken == that.transientActiveSession.sessionUser.token) {
                        that.events.publish('user:kicked', 'self');
                    }
                    else {
                        that.events.publish('user:kicked', 'other');
                    }
                }
                catch (e) {
                    console.log("Could not parse details of author event.");
                }
            }
            else if (event.title === 'event_author_update_session') {
                that.sessionService.getSessionByCode(that.transientActiveSession.session.code).toPromise().then(function (session) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                that.transientActiveSession.session = session;
                                return [4 /*yield*/, that.updateSession(that.transientActiveSession)];
                            case 1:
                                _a.sent();
                                that.events.publish('session:updated', that.transientActiveSession);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            else if (event.title === 'event_author_assign_task') {
                try {
                    var details = JSON.parse(event.details);
                    if (details.userToken == that.transientActiveSession.sessionUser.token) {
                        that.transientActiveSession.sessionUser.assigned_task_id = details.assigned_task_id;
                        that.updateSession(that.transientActiveSession);
                        that.events.publish('user:assigned_task', details.assigned_task_id);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
            }
        });
    };
    ChatAndSessionService.prototype.getLeaderboard = function () {
        return this.leaderBoard.leaderboard;
    };
    ChatAndSessionService.prototype.getNewMsgNumber = function () {
        return this.newMsgNumber;
    };
    ChatAndSessionService.prototype.setNewMsgNumber = function (n) {
        this.newMsgNumber = n;
    };
    ChatAndSessionService.POSITION_PUSH_INTERVAL_IN_SECS = 1;
    ChatAndSessionService.CHAT_PULL_INTERVAL_IN_SECS = 15;
    ChatAndSessionService.EVENTS_POST_INTERVAL_IN_SECS = 10;
    ChatAndSessionService.CHAT_PULL_INTERVAL_USER_SEES_MESSAGES_IN_SECS = 2;
    ChatAndSessionService.STORAGE_KEY_SESSION = 'ChatAndSessionService.activeSession';
    ChatAndSessionService.USER_EVENTS = [];
    ChatAndSessionService.DEFAULT_LAT = 999;
    ChatAndSessionService.DEFAULT_LON = 999;
    ChatAndSessionService = ChatAndSessionService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__app_api_services_session_service__["a" /* SessionService */],
            __WEBPACK_IMPORTED_MODULE_7__app_api_services_session_user_service__["a" /* SessionUserService */],
            __WEBPACK_IMPORTED_MODULE_8__app_api_services_session_chat_service__["a" /* SessionChatService */],
            __WEBPACK_IMPORTED_MODULE_12__app_api_services_session_event_service__["a" /* SessionEventService */],
            __WEBPACK_IMPORTED_MODULE_6__gps_service__["a" /* GpsService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["b" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_15__app_api_services_session_user_leaderboard_service__["a" /* SessionUserLeaderboardService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
    ], ChatAndSessionService);
    return ChatAndSessionService;
    var ChatAndSessionService_1;
}());

//# sourceMappingURL=chat-and-session-service.js.map

/***/ }),

/***/ 1134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BroadcastService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BroadcastService = /** @class */ (function () {
    function BroadcastService() {
        this.historyChanged$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.downloadProgress$ = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    BroadcastService.prototype.historyChanged = function (canGoBack) {
        this.historyChanged$.emit(canGoBack);
    };
    BroadcastService.prototype.downloadProgressChanged = function (total, doneDownload) {
        this.downloadProgress$.emit({ total: total, done: doneDownload });
    };
    BroadcastService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], BroadcastService);
    return BroadcastService;
}());

//# sourceMappingURL=broadcast-service.js.map

/***/ }),

/***/ 1135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePlayerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__youtube_player_component__ = __webpack_require__(1136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_youtube_player_service__ = __webpack_require__(634);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var YoutubePlayerModule = /** @class */ (function () {
    function YoutubePlayerModule() {
    }
    YoutubePlayerModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__youtube_player_component__["a" /* YoutubePlayerComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__youtube_player_component__["a" /* YoutubePlayerComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__services_youtube_player_service__["a" /* YoutubePlayerService */]
            ]
        })
    ], YoutubePlayerModule);
    return YoutubePlayerModule;
}());

//# sourceMappingURL=ngx-youtube-player.module.js.map

/***/ }),

/***/ 1136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePlayerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_youtube_player_service__ = __webpack_require__(634);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var YoutubePlayerComponent = /** @class */ (function () {
    function YoutubePlayerComponent(playerService, renderer) {
        this.playerService = playerService;
        this.renderer = renderer;
        this.videoId = '';
        /**
         * @description sets the protocol by the navigator object
         * if there is no window, it sets a default http protocol
         * unless the protocol is set from outside
         */
        this.protocol = this.getProtocol();
        this.playerVars = {};
        // player created and initialized - sends instance of the player
        this.ready = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // state change: send the YT event with its state
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    YoutubePlayerComponent.prototype.ngAfterContentInit = function () {
        var htmlId = this.playerService.generateUniqueId();
        var playerSize = { height: this.height, width: this.width };
        var container = this.renderer.selectRootElement('#yt-player-ngx-component');
        this.renderer.setAttribute(container, 'id', htmlId);
        this.playerService.loadPlayerApi({
            protocol: this.protocol
        });
        this.playerService.setupPlayer(htmlId, {
            change: this.change,
            ready: this.ready,
        }, playerSize, this.videoId, this.playerVars);
    };
    YoutubePlayerComponent.prototype.getProtocol = function () {
        var hasWindow = window && window.location;
        var protocol = hasWindow
            ? window.location.protocol.replace(':', '')
            : 'http';
        return protocol == 'file' ? 'https' : protocol;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], YoutubePlayerComponent.prototype, "videoId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], YoutubePlayerComponent.prototype, "height", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], YoutubePlayerComponent.prototype, "width", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], YoutubePlayerComponent.prototype, "protocol", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], YoutubePlayerComponent.prototype, "playerVars", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], YoutubePlayerComponent.prototype, "ready", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], YoutubePlayerComponent.prototype, "change", void 0);
    YoutubePlayerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush,
            selector: 'youtube-player',
            template: "\n    <div id=\"yt-player-ngx-component\"></div>\n  ",
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_youtube_player_service__["a" /* YoutubePlayerService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
    ], YoutubePlayerComponent);
    return YoutubePlayerComponent;
}());

//# sourceMappingURL=youtube-player.component.js.map

/***/ }),

/***/ 1137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Autoresize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Autoresize = /** @class */ (function () {
    function Autoresize(element) {
        this.element = element;
    }
    Autoresize.prototype.onInput = function (textArea) {
        this.adjust();
    };
    Autoresize.prototype.ngOnInit = function () {
        this.adjust();
    };
    Autoresize.prototype.adjust = function () {
        var ta = this.element.nativeElement;
        if (ta) {
            ta.style.overflow = "visible";
            ta.style.height = "auto";
            ta.style.height = (ta.scrollHeight - 20) + "px";
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])("input", ["$event.target"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLTextAreaElement]),
        __metadata("design:returntype", void 0)
    ], Autoresize.prototype, "onInput", null);
    Autoresize = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: "textarea[autoresize]" // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], Autoresize);
    return Autoresize;
}());

//# sourceMappingURL=autoresize.js.map

/***/ }),

/***/ 1138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_configuration__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_session_chat_service__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_session_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_session_event_service__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_session_user_service__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_session_user_leaderboard_service__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_trail_service__ = __webpack_require__(1139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









/**
 * Module that provides instances for all API services
 */
var ApiModule = /** @class */ (function () {
    function ApiModule() {
    }
    ApiModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClientModule */]
            ],
            declarations: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__api_configuration__["a" /* ApiConfiguration */],
                __WEBPACK_IMPORTED_MODULE_3__services_session_chat_service__["a" /* SessionChatService */],
                __WEBPACK_IMPORTED_MODULE_4__services_session_service__["a" /* SessionService */],
                __WEBPACK_IMPORTED_MODULE_5__services_session_event_service__["a" /* SessionEventService */],
                __WEBPACK_IMPORTED_MODULE_6__services_session_user_service__["a" /* SessionUserService */],
                __WEBPACK_IMPORTED_MODULE_7__services_session_user_leaderboard_service__["a" /* SessionUserLeaderboardService */],
                __WEBPACK_IMPORTED_MODULE_8__services_trail_service__["a" /* TrailService */]
            ],
        })
    ], ApiModule);
    return ApiModule;
}());

//# sourceMappingURL=api.module.js.map

/***/ }),

/***/ 1139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrailService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_configuration__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__);
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
/* tslint:disable */






var TrailService = /** @class */ (function (_super) {
    __extends(TrailService, _super);
    function TrailService(config, http) {
        return _super.call(this, config, http) || this;
    }
    /**
     * @param trailId Trail ID
     * @return Returns a list of FeedItems
     */
    TrailService.prototype.getUpcomingSessionsResponse = function (trailId) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/trail/" + trailId + "/sessions/upcoming"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param trailId Trail ID
     * @return Returns a list of FeedItems
     */
    TrailService.prototype.getUpcomingSessions = function (trailId) {
        return this.getUpcomingSessionsResponse(trailId).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param trailId Trail ID
     * @return Returns a list of FeedItems
     */
    TrailService.prototype.getSessionsResponse = function (trailId) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/trail/" + trailId + "/sessions"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param trailId Trail ID
     * @return Returns a list of FeedItems
     */
    TrailService.prototype.getSessions = function (trailId) {
        return this.getSessionsResponse(trailId).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    TrailService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_configuration__["a" /* ApiConfiguration */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], TrailService);
    return TrailService;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=trail.service.js.map

/***/ }),

/***/ 1143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__safe_inner_html_safe_inner_html__ = __webpack_require__(1144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__safe_inner_html_safe_inner_html__["a" /* SafeInnerHtmlDirective */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__safe_inner_html_safe_inner_html__["a" /* SafeInnerHtmlDirective */]]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 1144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafeInnerHtmlDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__ = __webpack_require__(140);
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
 * Generated class for the SafeInnerHtmlDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var SafeInnerHtmlDirective = /** @class */ (function () {
    function SafeInnerHtmlDirective(el, iab) {
        this.el = el;
        this.iab = iab;
    }
    SafeInnerHtmlDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.el.nativeElement.innerHTML = this.test;
        var childLinks = this.el.nativeElement.querySelector('a');
        if (childLinks) {
            childLinks.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var link = e.srcElement.href;
                _this.iab.create(link, '_system');
                console.log('EventListenerClick', e.srcElement);
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('linkedInnerHtml'),
        __metadata("design:type", String)
    ], SafeInnerHtmlDirective.prototype, "test", void 0);
    SafeInnerHtmlDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[linkedInnerHtml]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], SafeInnerHtmlDirective);
    return SafeInnerHtmlDirective;
}());

//# sourceMappingURL=safe-inner-html.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DB_Updater; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_typescript_collections__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_typescript_collections___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_typescript_collections__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DBC__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DB_Handler__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_images_service__ = __webpack_require__(45);
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








var DB_Updater = /** @class */ (function () {
    function DB_Updater(ormService, helper, imageService) {
        this.ormService = ormService;
        this.helper = helper;
        this.imageService = imageService;
    }
    /*
      Compare online and offline table versions and update if necessary
      14.05.2018 - Do not sync the tasks table anymore! (Gurjanow)
    */
    DB_Updater.prototype.checkForUpdates = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbHandler, db, data, offlineVersions, onlineVersions, i, row, option, value, sqlUpdateQuery, downloadedRoutes, unlockedRoutes, completedRoutes, _a, routesToSave, alreadyVisitedIds, _i, _b, oldRoute, newRoute, repo, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        dbHandler = __WEBPACK_IMPORTED_MODULE_5__DB_Handler__["a" /* DB_Handler */].getInstance();
                        return [4 /*yield*/, dbHandler.ready()];
                    case 1:
                        _d.sent();
                        db = dbHandler.getDB();
                        return [4 /*yield*/, this.helper.invokeApi('getVersionsV2')];
                    case 2:
                        data = _d.sent();
                        if (!data) {
                            return [2 /*return*/];
                        }
                        console.log("WAITING FOR offlineVersions");
                        return [4 /*yield*/, dbHandler.getTableVersions()];
                    case 3:
                        offlineVersions = _d.sent();
                        console.log("OFFLINE versions", offlineVersions);
                        onlineVersions = new __WEBPACK_IMPORTED_MODULE_2_typescript_collections__["Dictionary"]();
                        for (i = 0; i < data.length; i++) {
                            row = data[i];
                            option = row["option"];
                            value = row["value"];
                            onlineVersions.setValue(option, value);
                        }
                        sqlUpdateQuery = "UPDATE " + __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DATABASE_TABLE_STATE + " SET " + __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_STATE.fields[2] + " = ? WHERE " + __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_STATE.fields[1] + " = ?";
                        if (!(Number(offlineVersions.getValue("version_route")) < Number(onlineVersions.getValue("version_route")))) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes()];
                    case 4:
                        downloadedRoutes = _d.sent();
                        return [4 /*yield*/, this.ormService.getUnlockedRoutes()];
                    case 5:
                        unlockedRoutes = _d.sent();
                        return [4 /*yield*/, this.ormService.getCompletedRoutes()];
                    case 6:
                        completedRoutes = _d.sent();
                        _a = this.insertJSONinSQLiteDB;
                        return [4 /*yield*/, this.helper.invokeApi('getRoutes')];
                    case 7: 
                    // Routes need update
                    return [4 /*yield*/, _a.apply(this, [_d.sent(), __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_ROUTE])];
                    case 8:
                        // Routes need update
                        _d.sent();
                        // Update local table
                        return [4 /*yield*/, db.executeSql(sqlUpdateQuery, [
                                onlineVersions.getValue("version_route"),
                                "version_route"
                            ])];
                    case 9:
                        // Update local table
                        _d.sent();
                        routesToSave = [];
                        alreadyVisitedIds = {};
                        _i = 0, _b = downloadedRoutes.concat(unlockedRoutes).concat(completedRoutes);
                        _d.label = 10;
                    case 10:
                        if (!(_i < _b.length)) return [3 /*break*/, 15];
                        oldRoute = _b[_i];
                        if (alreadyVisitedIds[oldRoute.id]) {
                            // this id has already been visited
                            return [3 /*break*/, 14];
                        }
                        return [4 /*yield*/, this.ormService.findRouteById(oldRoute.id)];
                    case 11:
                        newRoute = _d.sent();
                        if (!newRoute) return [3 /*break*/, 14];
                        newRoute.downloaded = oldRoute.downloaded;
                        newRoute.downloadedDate = oldRoute.downloadedDate;
                        newRoute.completedDate = oldRoute.completedDate;
                        newRoute.unlocked = oldRoute.unlocked;
                        newRoute.completed = oldRoute.completed;
                        alreadyVisitedIds[oldRoute.id] = true;
                        if (!(newRoute.downloaded && Number(newRoute.mapVersion) > Number(oldRoute.mapVersion))) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.imageService.downloadAndUnzip(newRoute, function () { }, function () { })];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13:
                        routesToSave.push(newRoute);
                        _d.label = 14;
                    case 14:
                        _i++;
                        return [3 /*break*/, 10];
                    case 15: return [4 /*yield*/, this.ormService.getRouteRepository()];
                    case 16:
                        repo = _d.sent();
                        return [4 /*yield*/, repo.save(routesToSave)];
                    case 17:
                        _d.sent();
                        console.log("UPDATED VERSION!", "version_route");
                        _d.label = 18;
                    case 18:
                        if (!(Number(offlineVersions.getValue("version_rel_route_task")) < Number(onlineVersions.getValue("version_rel_route_task")))) return [3 /*break*/, 22];
                        _c = this.insertJSONinSQLiteDB;
                        return [4 /*yield*/, this.helper.invokeApi('getRelations')];
                    case 19: 
                    // Relation needs update
                    return [4 /*yield*/, _c.apply(this, [_d.sent(), __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_RELROUTETASK])];
                    case 20:
                        // Relation needs update
                        _d.sent();
                        // Update local table
                        console.log("UPDATING version_rel_route_task VERSION!", onlineVersions.getValue("version_rel_route_task"));
                        return [4 /*yield*/, db.executeSql(sqlUpdateQuery, [
                                onlineVersions.getValue("version_rel_route_task"),
                                "version_rel_route_task"
                            ])];
                    case 21:
                        _d.sent();
                        console.log("UPDATED VERSION!", "version_rel_route_task");
                        _d.label = 22;
                    case 22: return [2 /*return*/];
                }
            });
        });
    };
    /*
      Get Rows in JSON form and a table definition
      Inserts Data from MYSQL online (represented as JSON) into sqlite database of app
    */
    DB_Updater.prototype.insertJSONinSQLiteDB = function (data, table) {
        return __awaiter(this, void 0, void 0, function () {
            var sqlInsertQry, sqlReplaceIntoQry, dbh, db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sqlInsertQry = "INSERT INTO " + table.getTableName() + " " + table.getFieldsInScopes() + " VALUES " + table.getFieldsPlaceholders() + ";";
                        sqlReplaceIntoQry = "REPLACE INTO " + table.getTableName() + " " + table.getFieldsInScopes() + " VALUES " + table.getFieldsPlaceholders() + ";";
                        dbh = __WEBPACK_IMPORTED_MODULE_5__DB_Handler__["a" /* DB_Handler */].getInstance();
                        db = dbh.getDB();
                        if (!(table.getTableName() !== __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DATABASE_TABLE_TASK)) return [3 /*break*/, 2];
                        return [4 /*yield*/, db.executeSql("DELETE FROM " + table.getTableName(), null)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, db.transaction(function (tr) {
                            var primaryCounter = table === __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_TASK ? data.tasks.length : data.length;
                            var subCounter = table === __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_TASK ? data.subtasks.length : 0;
                            for (var i = 0; i < primaryCounter; i++) {
                                var row = table === __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_TASK ? data.tasks[i] : data[i];
                                var params = [];
                                for (var n = 1; n <= table.fieldsCount; n++) {
                                    // Check which data type is used in table > choose right bind
                                    if (table.fieldsType[n - 1] === "INTEGER") {
                                        // integer
                                        // params.push(n)
                                        params.push(Number(row[table.fields[n - 1]]));
                                    }
                                    else if (table.fieldsType[n - 1] === "VARCHAR"
                                        || table.fieldsType[n - 1] === "TEXT"
                                        || table.fieldsType[n - 1] === "TIMESTAMP") {
                                        // params.push(n)
                                        params.push(row[table.fields[n - 1]]);
                                    }
                                    else {
                                        console.warn("Caution: Datatype not Integer, Varchar or Text!");
                                    }
                                }
                                if (table.getTableName() !== __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DATABASE_TABLE_TASK) {
                                    tr.executeSql(sqlInsertQry, params);
                                }
                                else {
                                    // For tasks: Replace rows when refreshing the trail
                                    tr.executeSql(sqlReplaceIntoQry, params);
                                }
                            }
                            for (var i = 0; i < subCounter; i++) {
                                var row = data.subtasks[i];
                                var params = [];
                                for (var n = 1; n <= table.fieldsCount; n++) {
                                    // Check which data type is used in table > choose right bind
                                    if (table.fieldsType[n - 1] === "INTEGER") {
                                        // integer
                                        // params.push(n)
                                        if (table.fields[n - 1] === '_id') {
                                            params.push(Number(row.task_id + row[table.fields[n - 1]]));
                                        }
                                        else if (row[table.fields[n - 1]]) {
                                            params.push(Number(row[table.fields[n - 1]]));
                                        }
                                        else {
                                            params.push(0);
                                        }
                                    }
                                    else if (table.fieldsType[n - 1] === "VARCHAR"
                                        || table.fieldsType[n - 1] === "TEXT"
                                        || table.fieldsType[n - 1] === "TIMESTAMP") {
                                        // params.push(n)
                                        if (row[table.fields[n - 1]]) {
                                            params.push(row[table.fields[n - 1]]);
                                        }
                                        else {
                                            params.push("");
                                        }
                                    }
                                    else {
                                        console.warn("Caution: Datatype not Integer, Varchar or Text!");
                                    }
                                }
                                if (table.getTableName() !== __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DATABASE_TABLE_TASK) {
                                    tr.executeSql(sqlInsertQry, params);
                                }
                                else {
                                    // For tasks: Replace rows when refreshing the trail
                                    tr.executeSql(sqlReplaceIntoQry, params);
                                }
                            }
                        }).catch(function (error) {
                            console.error("Transaction Error: " + error.toString());
                        })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    Gets table data for a given route via API call "downloadTrail"
     */
    DB_Updater.prototype.downloadRouteTasksData = function (route, lang_code) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, postparams, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        user_id = 0;
                        postparams = "&route_id=" + route.id + "&user_id=" + user_id + "&lang_code=" + lang_code;
                        _a = this.insertJSONinSQLiteDB;
                        return [4 /*yield*/, this.helper.invokeApi('downloadTrailV2', postparams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_c.sent(), __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_TASK])];
                    case 2:
                        _c.sent();
                        // refresh the tasks
                        _b = route;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_6__services_orm_service__["a" /* OrmService */].INSTANCE.findRouteById(route.id)];
                    case 3: return [4 /*yield*/, (_c.sent()).getTasks()];
                    case 4:
                        // refresh the tasks
                        _b.tasks = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
     Gets table data updates for a given route via API call "updateTrail"
     */
    DB_Updater.prototype.updateRouteTasksData = function (route, lang_code) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, postparams, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.helper.isOnline) return [3 /*break*/, 3];
                        user_id = 0;
                        postparams = "&route_id=" + route.id + "&user_id=" + user_id + "&lang_code=" + lang_code;
                        _a = this.insertJSONinSQLiteDB;
                        return [4 /*yield*/, this.helper.invokeApi('updateTrailV2', postparams)];
                    case 1: return [4 /*yield*/, _a.apply(this, [_b.sent(), __WEBPACK_IMPORTED_MODULE_3__DBC__["a" /* DBC */].DB_TASK])];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DB_Updater = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__services_orm_service__["a" /* OrmService */], __WEBPACK_IMPORTED_MODULE_4__Helper__["b" /* Helper */], __WEBPACK_IMPORTED_MODULE_7__services_images_service__["a" /* ImagesService */]])
    ], DB_Updater);
    return DB_Updater;
}());

//# sourceMappingURL=DB_Updater.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_globalization__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(51);
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






var LanguageService = /** @class */ (function () {
    function LanguageService(translateService, platform, globalization, storage) {
        this.translateService = translateService;
        this.platform = platform;
        this.globalization = globalization;
        this.storage = storage;
        this.isInitialized = false;
        this.initializeListeners = [];
        this.availableLanguages = ["en", "de", "it", "fr", "es", "pt", "sk", "tr", "zh", "el", "id"];
    }
    LanguageService_1 = LanguageService;
    LanguageService.prototype.getAvailableLanguages = function () {
        return this.availableLanguages;
    };
    LanguageService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.isInitialized) {
                    return [2 /*return*/, Promise.resolve()];
                }
                if (this.initializeListeners.length > 0) {
                    // a parallel call has already been started
                    return [2 /*return*/, new Promise(function (success) {
                            _this.initializeListeners.push(success);
                        })];
                }
                return [2 /*return*/, new Promise(function (success) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        var defaultLang, lang, preferredLanguage, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    defaultLang = 'en';
                                    this.translateService.setDefaultLang(defaultLang);
                                    this.initializeListeners.push(success);
                                    return [4 /*yield*/, this.platform.ready()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.storage.get(LanguageService_1.STORAGE_KEY)];
                                case 2:
                                    lang = _a.sent();
                                    if (!(!lang && Object(__WEBPACK_IMPORTED_MODULE_4__ionic_native_core__["i" /* checkAvailability */])(__WEBPACK_IMPORTED_MODULE_3__ionic_native_globalization__["a" /* Globalization */].getPluginRef(), null, __WEBPACK_IMPORTED_MODULE_3__ionic_native_globalization__["a" /* Globalization */].getPluginName()) === true)) return [3 /*break*/, 6];
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 5, , 6]);
                                    return [4 /*yield*/, this.globalization.getPreferredLanguage()];
                                case 4:
                                    preferredLanguage = _a.sent();
                                    if (preferredLanguage && preferredLanguage.value) {
                                        lang = preferredLanguage.value;
                                        if (lang.indexOf('-') > -1) {
                                            lang = lang.split('-')[0];
                                        }
                                        if (lang.indexOf('_') > -1) {
                                            lang = lang.split('_')[0];
                                        }
                                        lang = lang.toLowerCase();
                                        if (this.availableLanguages.indexOf(lang) == -1) {
                                            // detected language is not available
                                            lang = null;
                                        }
                                    }
                                    return [3 /*break*/, 6];
                                case 5:
                                    e_1 = _a.sent();
                                    return [3 /*break*/, 6];
                                case 6:
                                    if (!lang) {
                                        lang = defaultLang;
                                    }
                                    return [4 /*yield*/, this.translateService.use(lang)];
                                case 7:
                                    _a.sent();
                                    setTimeout(function () {
                                        // use timeout to let language switch propagate
                                        _this.isInitialized = true;
                                        _this.initializeListeners.map(function (success) {
                                            success();
                                        });
                                        _this.initializeListeners = null;
                                    }, 100);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    LanguageService.prototype.getLanguage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.translateService.currentLang];
            });
        });
    };
    LanguageService.prototype.setLanguage = function (lang) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.translateService.use(lang);
                        return [4 /*yield*/, this.storage.set(LanguageService_1.STORAGE_KEY, lang)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LanguageService.STORAGE_KEY = 'LanguageService.lang';
    LanguageService = LanguageService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_globalization__["a" /* Globalization */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], LanguageService);
    return LanguageService;
    var LanguageService_1;
}());

//# sourceMappingURL=language-service.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_language_service__ = __webpack_require__(116);
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





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, platform, splashScreen, languageService, helper) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.languageService = languageService;
        this.helper = helper;
        this.tab1Root = 'DashboardPage';
        this.tab2Root = 'RoutesListPage';
        this.tab3Root = 'PortalPage';
        HomePage_1.nav = navCtrl;
    }
    HomePage_1 = HomePage;
    HomePage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.platform.ready().then(function () {
                    _this.languageService.initialize().then(function () {
                        console.log('Platform is ready!');
                        _this.splashScreen.hide();
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/home.html"*/'<ion-tabs>\n    <ion-tab [root]="tab1Root" tabIcon="tab-home"></ion-tab>\n    <ion-tab [root]="tab2Root" [rootParams]="{showAllRoutes: true}" tabIcon="tab-browse" class="home"></ion-tab>\n    <ion-tab [root]="tab2Root" [rootParams]="{showAllRoutes: false}" tabIcon="tab-downloads"></ion-tab>\n    <ion-tab [root]="tab3Root" [enabled]="helper.getDevMode()" tabIcon="tab-create"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__services_language_service__["a" /* LanguageService */],
            __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MapTile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionQuality; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Helper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_gps_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_leaflet_geometryutil__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_leaflet_geometryutil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_leaflet_geometryutil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_common_http__ = __webpack_require__(38);
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












var MapTile = /** @class */ (function () {
    function MapTile(pZoomLevel, pX, pY) {
        this.pZoomLevel = pZoomLevel;
        this.pX = pX;
        this.pY = pY;
    }
    Object.defineProperty(MapTile.prototype, "x", {
        get: function () {
            return this.pX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapTile.prototype, "y", {
        get: function () {
            return this.pY;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapTile.prototype, "zoomLevel", {
        get: function () {
            return this.pZoomLevel;
        },
        enumerable: true,
        configurable: true
    });
    return MapTile;
}());

var ConnectionQuality;
(function (ConnectionQuality) {
    ConnectionQuality[ConnectionQuality["FAST"] = 1] = "FAST";
    ConnectionQuality[ConnectionQuality["SLOW"] = 2] = "SLOW";
    ConnectionQuality[ConnectionQuality["BAD"] = 3] = "BAD";
    ConnectionQuality[ConnectionQuality["NONE"] = 4] = "NONE";
})(ConnectionQuality || (ConnectionQuality = {}));
var Helper = /** @class */ (function () {
    function Helper(http, gpsService, network, httpClient, platform, ormService, storage, file) {
        this.http = http;
        this.gpsService = gpsService;
        this.network = network;
        this.httpClient = httpClient;
        this.platform = platform;
        this.ormService = ormService;
        this.storage = storage;
        this.file = file;
        this.isOnline = false;
        this.devModeEnabled = false;
        this.activateAddRouteModal = false;
        Helper_1.INSTANCE = this;
        // noinspection JSIgnoredPromiseFromCall
        this.init();
    }
    Helper_1 = Helper;
    Helper.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.storage.get('devMode')];
                    case 1:
                        _a.devModeEnabled = ((_b.sent()) === 'true');
                        return [4 /*yield*/, this.platform.ready()];
                    case 2:
                        _b.sent();
                        this.isOnline = navigator.onLine;
                        console.info("Connection status: " + this.isOnline);
                        Helper_1.windowWidth = this.platform.width();
                        Helper_1.windowHeight = this.platform.height();
                        this.network.onDisconnect().subscribe(function () {
                            console.info('Network disconnected!');
                            _this.isOnline = false;
                        });
                        this.network.onConnect().subscribe(function () {
                            console.info('Network connected!');
                            _this.isOnline = true;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Helper.prototype.getDistanceToCenterByLatLng = function (latLng) {
        if (!latLng) {
            return 0;
        }
        return this.getDistanceToCenter(latLng.lat, latLng.lng);
    };
    Helper.prototype.getDistanceToCenter = function (lat2, lon2) {
        var distance = -1;
        var location = this.gpsService.getLastPosition();
        if (location && location.coords) {
            var lat1 = new Number(location.coords.latitude).valueOf();
            var lon1 = new Number(location.coords.longitude).valueOf();
            var R = 6371e3; // metres
            var p = Math.PI / 180;
            var φ1 = lat1 * p;
            var φ2 = lat2 * p;
            var Δφ = (lat2 - lat1) * p;
            var Δλ = (lon2 - lon1) * p;
            var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            distance = Math.round(R * c);
        }
        return distance;
    };
    Helper.safeJsonDecode = function (str) {
        return JSON.parse(str.replace(/(?:\r\n|\r|\n)/g, '\\n'));
    };
    // public static JSONArray getJSONArray(String arrString){
    //   try{
    //       JSONArray solutionList;
    //       solutionList = new JSONArray(Html.fromHtml(arrString).toString());
    //       return solutionList;
    //   }catch(Exception e){
    //       e.printStackTrace();
    //       return null;
    //   }
    // }
    Helper.getAngle = function (prev, curr) {
        // angle in degrees
        var angle = Math.atan2(curr.latitude - prev.latitude, prev.longitude - curr.longitude) * 180 / Math.PI + 270;
        return angle;
    };
    /*public static followUser(bounds: L.Bounds, userPoint: L.Point, zoom: number){
      let center = bounds.getCenter();

      let dif: any;
      let newCenter: any;

      if(!bounds.contains(userPoint)){

         if(userPoint.x > bounds.getTopRight().x){
            dif = userPoint.x - bounds.getTopRight().x;
            newCenter = L.point(center.x + dif, center.y);
            return newCenter;
          }
          else if(userPoint.y > bounds.getBottomLeft().y){
            dif = bounds.getBottomLeft().y - userPoint.y;
            newCenter = L.point(center.x, center.y - dif);
            return newCenter;
          }
         else if(userPoint.x < bounds.getBottomLeft().x){
            dif = bounds.getBottomLeft().x - userPoint.x;
            newCenter = L.point(center.x - dif, center.y);
            return newCenter;
          }
          else if(userPoint.y < bounds.getTopRight().y){
            dif = bounds.getTopRight().y - userPoint.y;
            newCenter = L.point(center.x, center.y - dif);
            return newCenter;
          }
         else return null;

        }
      }
      */
    Helper.isPluginAvailable = function (plugin) {
        return !!Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["i" /* checkAvailability */])(plugin.getPluginRef(), null, plugin.getPluginName());
    };
    Helper.prototype.invokeApi = function (queryAction, postparams, timeoutInSecs) {
        var _this = this;
        if (timeoutInSecs === void 0) { timeoutInSecs = 30; }
        if (!this.isOnline) {
            console.warn("No internet!");
            return new Promise(function (resolve) { return resolve(); });
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        });
        var options = new __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var data = "pass=" + encodeURI(Helper_1.REQUEST_PASS)
            + "&action=" + encodeURI(queryAction);
        if (postparams) {
            data += postparams;
        }
        return new Promise(function (resolve, reject) {
            var timeOutTimer = setTimeout(function () {
                timeOutTimer = null;
                console.log("server query " + queryAction + " timed out");
                reject('timeout');
            }, timeoutInSecs * 1000);
            _this.http.post(Helper_1.API_URL, data, options)
                .toPromise()
                .then(function (response) {
                if (timeOutTimer) {
                    clearTimeout(timeOutTimer);
                }
                else {
                    return;
                }
                console.log('API response: ', response.text().substr(0, 255));
                var resText = response.text();
                if (resText && resText.length > 0) {
                    var tableRows = response.json();
                    resolve(tableRows);
                }
                else {
                    reject('no response from server');
                }
            })
                .catch(function (error) {
                if (timeOutTimer) {
                    clearTimeout(timeOutTimer);
                }
                else {
                    return;
                }
                console.error('API error(status): ', error.status);
                console.error('API error: ', JSON.stringify(error));
                reject(JSON.stringify(error));
            });
        });
    };
    Helper.prototype.checkConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var before, after, diff, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isOnline) {
                            return [2 /*return*/, ConnectionQuality.NONE];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        before = new Date();
                        return [4 /*yield*/, this.invokeApi('getVersionsV2', null, 2)];
                    case 2:
                        _a.sent();
                        after = new Date();
                        diff = after.getTime() - before.getTime();
                        if (diff < 1000) {
                            return [2 /*return*/, ConnectionQuality.FAST];
                        }
                        else {
                            return [2 /*return*/, ConnectionQuality.SLOW];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, ConnectionQuality.BAD];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Helper.prototype.setDevMode = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.set('devMode', value)];
                    case 1:
                        _a.sent();
                        this.devModeEnabled = (value === 'true');
                        return [2 /*return*/];
                }
            });
        });
    };
    Helper.prototype.getDevMode = function () {
        return this.devModeEnabled;
    };
    Helper.prototype.setActivateAddRoute = function (value) {
        this.activateAddRouteModal = value;
    };
    Helper.prototype.getActivateAddRoute = function () {
        return this.activateAddRouteModal;
    };
    Helper.prototype.calculateProgress = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var totalTasks, score, _a, _b, currentProgress;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, route.getTaskCount()];
                    case 1:
                        totalTasks = _c.sent();
                        _b = (_a = route).getScoreForUser;
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 2:
                        score = _b.apply(_a, [_c.sent()]);
                        currentProgress = 0;
                        if (route.isAnswerFeedbackEnabled()) {
                            currentProgress = score.getTasksSolved().length + score.getTasksSolvedLow().length + score.getTasksFailed().length;
                        }
                        else {
                            currentProgress = score.getTasksSaved().length;
                        }
                        return [2 /*return*/, { totalTasks: totalTasks, currentProgress: currentProgress }];
                }
            });
        });
    };
    Helper.calculateZoom = function (bounds) {
        var width = __WEBPACK_IMPORTED_MODULE_0_leaflet__["GeometryUtil"].length([bounds.getSouthWest(), bounds.getSouthEast()]);
        var height = __WEBPACK_IMPORTED_MODULE_0_leaflet__["GeometryUtil"].length([bounds.getNorthWest(), bounds.getSouthWest()]);
        var area = (width / 1000) * (height / 1000);
        console.log("####Area = ", width / 1000, height / 1000, area);
        if (area <= 0.4) {
            return { min_zoom: 16, max_zoom: 20 };
        }
        else if (area <= 1.5) {
            return { min_zoom: 16, max_zoom: 19 };
        }
        else
            return { min_zoom: 15, max_zoom: 18 };
    };
    /*
      Intents #
       */
    Helper.MCM_PASS_TASK = "mathcitymap.showTask";
    Helper.MCM_PARENT_ROUTELIST = "mathcitymap.parentRouteList";
    Helper.MCM_ROUTELIST_PUBLIC = "mathcitymap.parentRouteListPublic";
    Helper.MCM_OSM_LASTCENTER = "mathcitymap.lastKnownCenterPoint";
    Helper.MCM_OSM_LASTZOOM = "mathcitymap.lastZoom";
    Helper.MCM_OSM_GUIDESTATE = "mathcitymap.osmGuideState";
    Helper.MCM_OSM_ONLINE = "mathcitymap.osmOnlineMap";
    /*
    INTENTS END ###
     */
    /*
    SETTINGS #
     */
    Helper.NEAREST_DEFINTION = 10000; // in Meters
    Helper.DISTANCE_TASK_DISPLAY = 50; // in Meters, the max distance to display the task
    Helper.DISTANCE_TASKS_MULTIPLE = 15; // in Meters, if tapped on marker, look for near markers in max 10m distance, display multiple select box
    Helper.ENABLE_DISTANCE_CHECK = false;
    Helper.routeImageUpdate = 0;
    Helper.gamification = 0; // 0 -> Keine, 1 -> Score, 2 -> Leaderbord, 3 -> Badges
    Helper.max_score = 100;
    Helper.max_score_mc = 75;
    Helper.max_score_l = 99;
    Helper.min_score_l = 40;
    Helper.min_score_cap = 10;
    Helper.first_try_bonus = 10;
    Helper.first_start_bonus = 10;
    Helper.distance_bonus = 15;
    Helper.p_second_try = 5;
    Helper.p_third_try = 10;
    Helper.studie = false;
    Helper.updated_once = false;
    // Map Settings (also which tiles to download)
    Helper.min_zoom = 15;
    Helper.max_zoom = 19;
    /*
    SETTINGS END ###
     */
    /*
    GLOBAL VARS #
     */
    Helper.WEBSERVER_URL = "https://mathcitymap.eu/";
    // static readonly WEBSERVER_URL: string = "https://dev.mathcitymap.eu/"
    // static readonly API_URL: string = "/mcm-api/db_query_post.php"
    Helper.API_URL = "https://mathcitymap.eu/db_query_post.php";
    // static readonly API_URL: string = "https://dev.mathcitymap.eu/db_query_post.php"
    Helper.REQUEST_PASS = "evilknivel2k16";
    Helper.REPLACE_TASK_IMAGE_PATH = "mcm_images/tasks/";
    Helper.REPLACE_ROUTE_IMAGE_PATH = "mcm_images/routes/";
    // public static ProgressDialog updater_dialog = null
    Helper.mapCode = "mapbox.streets";
    Helper.accessToken = "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww";
    Helper.mapquestUrl = "https://{s}.tiles.mapbox.com/v4/" + Helper_1.mapCode + "/{z}/{x}/{y}@2x.png?&tilesize=256&access_token=" + Helper_1.accessToken;
    Helper.subDomains = ['a', 'b', 'c', 'd'];
    // public static OnlineTileSourceBase mbTileSource = new XYTileSource("MapBoxSatelliteLabelled",
    //         2, 20, 256, ".png", new String[]{
    //         "http://a.tiles.mapbox.com/v4/" + Helper.mapCode + "/",
    //         "http://b.tiles.mapbox.com/v4/" + Helper.mapCode + "/",
    //         "http://c.tiles.mapbox.com/v4/" + Helper.mapCode + "/",
    //         "http://d.tiles.mapbox.com/v4/" + Helper.mapCode + "/"})
    // {
    //     @Override
    //     public String getTileURLString(MapTile aTile) {
    //         String str = super.getTileURLString(aTile) + "?access_token=" + Helper.accessToken
    //         return str
    //     }
    // }
    // public static User user = null
    // public static Map<String, String> aiNamesMap = new HashMap<String, String>()
    // public static Map<String, ArrayList<Integer>> oldScoreMap = new HashMap<String, ArrayList<Integer>>()
    Helper.phone_id = "";
    Helper.phone_name = "";
    // public static Location myLocation = null
    Helper.testLocation = null;
    Helper.myAzimuth = 0.0;
    // public static HashMap<String, int[]> routeStates = new HashMap<String, int[]>()
    // public static GoogleApiClient googleApiClient
    Helper.REQUEST_LOCATION = 199;
    Helper.windowWidth = 0;
    Helper.windowHeight = 0;
    Helper.searchResults = 999;
    Helper = Helper_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4__services_gps_service__["a" /* GpsService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_11__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__services_orm_service__["a" /* OrmService */], __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */]])
    ], Helper);
    return Helper;
    var Helper_1;
}());

//# sourceMappingURL=Helper.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_configuration__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__);
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
/* tslint:disable */






var SessionService = /** @class */ (function (_super) {
    __extends(SessionService, _super);
    function SessionService(config, http) {
        return _super.call(this, config, http) || this;
    }
    /**
     * @param sessionCreateRequest session data
     * @return Return created session
     */
    SessionService.prototype.createSessionResponse = function (sessionCreateRequest) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        __body = sessionCreateRequest;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("POST", this.rootUrl + "/session", __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param sessionCreateRequest session data
     * @return Return created session
     */
    SessionService.prototype.createSession = function (sessionCreateRequest) {
        return this.createSessionResponse(sessionCreateRequest).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionService.UpdateSessionParams` containing the following parameters:
     *
     * - `sessionUpdateRequest`: session data
     *
     * - `sessionCode`: The session Code to join
     *
     * @return Return updated Session
     */
    SessionService.prototype.updateSessionResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        __body = params.sessionUpdateRequest;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("PUT", this.rootUrl + ("/session/" + params.sessionCode), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionService.UpdateSessionParams` containing the following parameters:
     *
     * - `sessionUpdateRequest`: session data
     *
     * - `sessionCode`: The session Code to join
     *
     * @return Return updated Session
     */
    SessionService.prototype.updateSession = function (params) {
        return this.updateSessionResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param sessionCode The session Code to join
     */
    SessionService.prototype.deleteSessionResponse = function (sessionCode) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("DELETE", this.rootUrl + ("/session/" + sessionCode), __body, {
            headers: __headers,
            params: __params,
            responseType: 'text'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param sessionCode The session Code to join
     */
    SessionService.prototype.deleteSession = function (sessionCode) {
        return this.deleteSessionResponse(sessionCode).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionService.JoinSessionParams` containing the following parameters:
     *
     * - `sessionCode`: The session Code to join
     *
     * - `request`: Join Session Request
     *
     * @return Returns a SessionUser object
     */
    SessionService.prototype.joinSessionResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        __body = params.request;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("POST", this.rootUrl + ("/session/join/" + params.sessionCode), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionService.JoinSessionParams` containing the following parameters:
     *
     * - `sessionCode`: The session Code to join
     *
     * - `request`: Join Session Request
     *
     * @return Returns a SessionUser object
     */
    SessionService.prototype.joinSession = function (params) {
        return this.joinSessionResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param sessionId Session ID
     * @return Returns requested Session
     */
    SessionService.prototype.getSessionResponse = function (sessionId) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + sessionId), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param sessionId Session ID
     * @return Returns requested Session
     */
    SessionService.prototype.getSession = function (sessionId) {
        return this.getSessionResponse(sessionId).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param code Code
     * @return Returns requested Session
     */
    SessionService.prototype.getSessionByCodeResponse = function (code) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/code/" + code), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param code Code
     * @return Returns requested Session
     */
    SessionService.prototype.getSessionByCode = function (code) {
        return this.getSessionByCodeResponse(code).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param sessionCode Session Code
     * @return Returns a list of SessionUsers
     */
    SessionService.prototype.getSessionUsersResponse = function (sessionCode) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + sessionCode + "/users"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param sessionCode Session Code
     * @return Returns a list of SessionUsers
     */
    SessionService.prototype.getSessionUsers = function (sessionCode) {
        return this.getSessionUsersResponse(sessionCode).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionService.GetSessionAdminParams` containing the following parameters:
     *
     * - `userToken`: requesting user token
     *
     * - `sessionCode`: Session Code
     *
     * @return Get session admin
     */
    SessionService.prototype.getSessionAdminResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken + "/admin"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionService.GetSessionAdminParams` containing the following parameters:
     *
     * - `userToken`: requesting user token
     *
     * - `sessionCode`: Session Code
     *
     * @return Get session admin
     */
    SessionService.prototype.getSessionAdmin = function (params) {
        return this.getSessionAdminResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    SessionService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_configuration__["a" /* ApiConfiguration */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], SessionService);
    return SessionService;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Task2Route; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typeorm__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Task__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Route__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orm_service__ = __webpack_require__(33);
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




var Task2Route = /** @class */ (function () {
    function Task2Route() {
    }
    Task2Route.prototype.getTaskWithSubtasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3__services_orm_service__["a" /* OrmService */].INSTANCE.getTaskRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.createQueryBuilder("tasks")
                                .where({ id: this.task.id })
                                .leftJoinAndSelect("tasks.subtasks", "subtasks")
                                .getOne()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["h" /* PrimaryGeneratedColumn */])({ name: '_id' }),
        __metadata("design:type", Number)
    ], Task2Route.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["e" /* ManyToOne */])(function (type) { return __WEBPACK_IMPORTED_MODULE_2__Route__["a" /* Route */]; }, function (route) { return route.task2Routes; }),
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["c" /* JoinColumn */])({ name: 'route_id', referencedColumnName: 'id' }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__Route__["a" /* Route */])
    ], Task2Route.prototype, "route", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["e" /* ManyToOne */])(function (type) { return __WEBPACK_IMPORTED_MODULE_1__Task__["a" /* Task */]; }, function (task) { return task.task2Routes; }, { eager: true }),
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["c" /* JoinColumn */])({ name: 'task_id', referencedColumnName: 'id' }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__Task__["a" /* Task */])
    ], Task2Route.prototype, "task", void 0);
    Task2Route = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["b" /* Entity */])('mcm_rel_route_task')
    ], Task2Route);
    return Task2Route;
}());

//# sourceMappingURL=Task2Route.js.map

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mcm_image_mcm_image__ = __webpack_require__(1103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mcm_header_mcm_header_component__ = __webpack_require__(1104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_pipes_distance_pipe__ = __webpack_require__(1105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_pipes_search_pipe__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mcm_progress_bar_mcm_progress_bar__ = __webpack_require__(1106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_viewer__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_ngx_lazy_load_images_directive__ = __webpack_require__(1107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__route_teaser_route_teaser__ = __webpack_require__(1109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_pipes_localDate_pipe__ = __webpack_require__(1110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var components = [
    __WEBPACK_IMPORTED_MODULE_3__mcm_header_mcm_header_component__["a" /* MCMHeaderComponent */],
    __WEBPACK_IMPORTED_MODULE_5__app_pipes_distance_pipe__["a" /* DistancePipe */],
    __WEBPACK_IMPORTED_MODULE_6__app_pipes_search_pipe__["a" /* SearchPipe */],
    __WEBPACK_IMPORTED_MODULE_11__app_pipes_localDate_pipe__["a" /* LocalizedDatePipe */],
    __WEBPACK_IMPORTED_MODULE_7__mcm_progress_bar_mcm_progress_bar__["a" /* MCMProgressBarComponent */],
    __WEBPACK_IMPORTED_MODULE_1__mcm_image_mcm_image__["a" /* McmImageComponent */],
    __WEBPACK_IMPORTED_MODULE_9__directives_ngx_lazy_load_images_directive__["a" /* LazyLoadImagesDirective */]
];
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [components, __WEBPACK_IMPORTED_MODULE_10__route_teaser_route_teaser__["a" /* RouteTeaserComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */]],
            exports: [components, __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */], __WEBPACK_IMPORTED_MODULE_10__route_teaser_route_teaser__["a" /* RouteTeaserComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_viewer__["a" /* PhotoViewer */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMModalType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_customKeyBoard_custom_keyboard__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_language_service__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_chat_and_session_service__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_screen_orientation__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__ = __webpack_require__(641);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_modals_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_tabs_RoutesMap_RoutesMap__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_portal_portal__ = __webpack_require__(644);
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
















var MCMModalType;
(function (MCMModalType) {
    MCMModalType[MCMModalType["hint"] = 1] = "hint";
    MCMModalType[MCMModalType["error"] = 2] = "error";
    MCMModalType[MCMModalType["solved"] = 3] = "solved";
    MCMModalType[MCMModalType["sampleSolution"] = 4] = "sampleSolution";
    MCMModalType[MCMModalType["solvedLow"] = 5] = "solvedLow";
    MCMModalType[MCMModalType["saved"] = 6] = "saved";
    MCMModalType[MCMModalType["subtask"] = 7] = "subtask";
    MCMModalType[MCMModalType["calculation"] = 8] = "calculation";
})(MCMModalType || (MCMModalType = {}));
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, languageService, chatService, events, app, alertCtrl, translate, screenOrientation, storage, modalService, deepLinker) {
        var _this = this;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.modalService = modalService;
        this.deepLinker = deepLinker;
        this.rootPage = 'HomePage';
        this.activeNarrative = 'default';
        this.isOpeningRoute = false;
        var that = this;
        platform.ready().then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, languageService.initialize()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setRootPage()];
                    case 2:
                        _a.sent();
                        // Okay, so the platform is ready and our plugins are available.
                        // Here you can do any higher level native things you might need.
                        // statusBar.styleDefault();
                        // statusBar.show();
                        if (platform.is('cordova')) {
                            if (window.wkWebView) {
                                window.wkWebView.injectCookie(__WEBPACK_IMPORTED_MODULE_10__classes_Helper__["b" /* Helper */].WEBSERVER_URL);
                            }
                            if (platform.is('tablet')) {
                                //force landscape mode on tablets
                                screenOrientation.lock(screenOrientation.ORIENTATIONS.LANDSCAPE);
                            }
                            else {
                                //force portrait mode on phones
                                screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        platform.registerBackButtonAction(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var activeNav, rootNav, alert_1, tasksMap;
            return __generator(this, function (_a) {
                activeNav = app.getActiveNavs()[0];
                rootNav = app.getRootNav();
                if (rootNav.getActive().component.name === __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */].name
                    && (activeNav.getActive().component.name === "RoutesListPage" || activeNav.getActive().component.name === __WEBPACK_IMPORTED_MODULE_14__pages_home_tabs_RoutesMap_RoutesMap__["a" /* RoutesMapPage */].name || activeNav.getActive().component.name === __WEBPACK_IMPORTED_MODULE_15__pages_portal_portal__["a" /* PortalPage */].name)) {
                    activeNav.parent.select(0);
                    return [2 /*return*/];
                }
                if (activeNav.getActive().component.name === __WEBPACK_IMPORTED_MODULE_11__pages_dashboard_dashboard__["a" /* DashboardPage */].name) {
                    alert_1 = alertCtrl.create({
                        title: translate.instant("a_alert_confirm_close"),
                        buttons: [{
                                text: translate.instant("no"),
                                role: 'cancel'
                            }, {
                                text: translate.instant("yes"),
                                handler: function () {
                                    platform.exitApp();
                                }
                            }]
                    });
                    alert_1.present();
                    return [2 /*return*/];
                }
                if (activeNav.getActive().component.name === __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalCmp */].name) {
                    activeNav.getActive().dismiss();
                    return [2 /*return*/];
                }
                if (rootNav.canGoBack()) {
                    if (rootNav.getActive().component.name === 'TasksMap') {
                        tasksMap = rootNav.getActive().instance;
                        if (tasksMap.sessionInfo != null) {
                            tasksMap.sessionFinished();
                        }
                        else {
                            if (!this.isOpeningRoute) {
                                this.isOpeningRoute = true;
                                rootNav.pop({}, function () {
                                    // necessary because of bug which does not update URL
                                    _this.deepLinker.navChange('back');
                                });
                                this.modalService.showRoute(tasksMap.route, rootNav).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        this.isOpeningRoute = false;
                                        return [2 /*return*/];
                                    });
                                }); });
                            }
                        }
                        return [2 /*return*/];
                    }
                    else {
                        rootNav.pop();
                        return [2 /*return*/];
                    }
                }
                return [2 /*return*/];
            });
        }); });
        statusBar.backgroundColorByHexString('#035f87'); // set status bar color
        // Keyboard key tab (used in the app.html template)
        var decimalSeparator = window.navigator.language.substring(0, 2) == 'en' ? '.' : ',';
        this.keysTab = [
            "1", "2", "3", "C",
            "4", "5", "6", "",
            "7", "8", "9", "",
            "-", "0", decimalSeparator, "✔"
        ]; // ✔
        // chatService.init();
        events.subscribe('narrativeChange', function (narrative) {
            _this.activeNarrative = narrative;
        });
    }
    MyApp.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_4__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].hide();
    };
    // Event emitter
    MyApp.prototype.keyClick = function (k) {
        console.log('Event emitter - key: ', k);
    };
    MyApp.prototype.isFirstStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var OnboardingHasAlreadyBeenShown;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('OnboardingHasBeenShown')];
                    case 1:
                        OnboardingHasAlreadyBeenShown = _a.sent();
                        if (!OnboardingHasAlreadyBeenShown) {
                            this.storage.set('OnboardingHasBeenShown', true);
                        }
                        return [2 /*return*/, !OnboardingHasAlreadyBeenShown];
                }
            });
        });
    };
    MyApp.prototype.setRootPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isFirstStart()];
                    case 1:
                        if (_a.sent()) {
                            this.rootPage = 'OnboardingPage';
                        }
                        else {
                            this.rootPage = 'HomePage';
                        }
                        this.splashScreen.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/app/app.html"*/'<ion-nav [root]="rootPage" [class]="activeNarrative"></ion-nav>\n<custom-keyboard [keysTab]="keysTab"\n                 (keyClick)="keyClick($event)"\n                 [colNb]=4\n                 class="kb-light">\n</custom-keyboard>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__services_language_service__["a" /* LanguageService */], __WEBPACK_IMPORTED_MODULE_6__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_screen_orientation__["a" /* ScreenOrientation */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_12__services_modals_service__["a" /* ModalsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* DeepLinker */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Score; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typeorm__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Route__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TaskState__ = __webpack_require__(1078);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Score = /** @class */ (function () {
    function Score() {
        this.tasksSolved = '[]';
        this.tasksSolvedLow = '[]';
        this.tasksFailed = '[]';
        this.tasksSaved = '[]';
        this.taskDetails = '[]';
    }
    Score.prototype.setTasksSolved = function (taskIds) {
        this.tasksSolved = JSON.stringify(taskIds);
    };
    Score.prototype.addSolvedTask = function (taskId) {
        var idList = this.getTasksSolved();
        if (idList.indexOf(taskId) == -1) {
            idList.push(taskId);
        }
        this.setTasksSolved(idList);
    };
    Score.prototype.getTasksSolved = function () {
        var ids = [];
        var jsonIds = JSON.parse(this.tasksSolved);
        jsonIds.forEach(function (id) {
            ids.push(+id);
        });
        return ids;
    };
    Score.prototype.setTasksFailed = function (taskIds) {
        this.tasksFailed = JSON.stringify(taskIds);
    };
    Score.prototype.addFailedTask = function (taskId) {
        var idList = this.getTasksFailed();
        if (idList.indexOf(taskId) == -1) {
            idList.push(taskId);
        }
        this.setTasksFailed(idList);
    };
    Score.prototype.getTasksFailed = function () {
        var ids = [];
        var jsonIds = JSON.parse(this.tasksFailed);
        jsonIds.forEach(function (id) {
            ids.push(+id);
        });
        return ids;
    };
    Score.prototype.setTasksSolvedLow = function (taskIds) {
        this.tasksSolvedLow = JSON.stringify(taskIds);
    };
    Score.prototype.addSolvedTaskLow = function (taskId) {
        var idList = this.getTasksSolvedLow();
        if (idList.indexOf(taskId) == -1) {
            idList.push(taskId);
        }
        this.setTasksSolvedLow(idList);
    };
    Score.prototype.getTasksSolvedLow = function () {
        var ids = [];
        var jsonIds = JSON.parse(this.tasksSolvedLow);
        jsonIds.forEach(function (id) {
            ids.push(+id);
        });
        return ids;
    };
    Score.prototype.setTasksSaved = function (taskIds) {
        this.tasksSaved = JSON.stringify(taskIds);
    };
    Score.prototype.addSavedTask = function (taskId) {
        var idList = this.getTasksSaved();
        if (idList.indexOf(taskId) == -1) {
            idList.push(taskId);
        }
        this.setTasksSaved(idList);
    };
    Score.prototype.getTasksSaved = function () {
        var ids = [];
        var jsonIds = JSON.parse(this.tasksSaved);
        jsonIds.forEach(function (id) {
            ids.push(+id);
        });
        return ids;
    };
    Score.prototype.getTaskState = function () {
        var taskDetails = new __WEBPACK_IMPORTED_MODULE_2__TaskState__["a" /* TaskState */]();
        return taskDetails.getAllTaskState(this.taskDetails);
    };
    Score.prototype.getTaskStateForTask = function (taskId) {
        var taskDetails = new __WEBPACK_IMPORTED_MODULE_2__TaskState__["a" /* TaskState */]();
        return taskDetails.findDetailsForTask(taskId, this.taskDetails);
    };
    Score.prototype.addTaskStateForTask = function (allTaskStates, detailsToSave) {
        for (var i = 0; i < allTaskStates.length; i++) {
            var details = allTaskStates[i];
            if (detailsToSave.taskId == details.taskId) {
                //already in array -> replace
                allTaskStates[i] = detailsToSave;
                this.setTaskState(allTaskStates);
                return allTaskStates;
            }
        }
        allTaskStates.push(detailsToSave);
        this.setTaskState(allTaskStates);
        return allTaskStates;
    };
    Score.prototype.setTaskState = function (taskDetails) {
        this.taskDetails = __WEBPACK_IMPORTED_MODULE_2__TaskState__["a" /* TaskState */].getTaskStateAsJSONArray(taskDetails);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["h" /* PrimaryGeneratedColumn */])({ name: '_id' }),
        __metadata("design:type", Number)
    ], Score.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'user_id' }),
        __metadata("design:type", Number)
    ], Score.prototype, "userId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["e" /* ManyToOne */])(function (type) { return __WEBPACK_IMPORTED_MODULE_1__Route__["a" /* Route */]; }, function (route) { return route.scores; }),
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["c" /* JoinColumn */])({ name: 'route_id', referencedColumnName: 'id' }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__Route__["a" /* Route */])
    ], Score.prototype, "route", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", Number)
    ], Score.prototype, "score", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'tasks_solved' }),
        __metadata("design:type", String)
    ], Score.prototype, "tasksSolved", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'tasks_solved_low' }),
        __metadata("design:type", String)
    ], Score.prototype, "tasksSolvedLow", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'tasks_failed' }),
        __metadata("design:type", String)
    ], Score.prototype, "tasksFailed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'tasks_saved' }),
        __metadata("design:type", String)
    ], Score.prototype, "tasksSaved", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'task_details' }),
        __metadata("design:type", String)
    ], Score.prototype, "taskDetails", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", Number)
    ], Score.prototype, "time", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", Number)
    ], Score.prototype, "distance", void 0);
    Score = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["b" /* Entity */])('mcm_score')
    ], Score);
    return Score;
}());

//# sourceMappingURL=Score.js.map

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomKeyBoard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CustomKeyBoard = /** @class */ (function () {
    function CustomKeyBoard(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.colNb = 5;
        this.visible = true;
        // Outputs
        this.cKClickEmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deleteEmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.hideEmit = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.zoom = 1;
        this.rowNb = 1;
        CustomKeyBoard_1.m_component = this;
    }
    CustomKeyBoard_1 = CustomKeyBoard;
    CustomKeyBoard.prototype.ngOnInit = function () {
        // Init with the @input values
        if (this.colNb)
            this.m_main_column_nb = this.colNb;
        if (this.keysTab) {
            this.m_main_rows = this.range(0, (this.keysTab.length - 1), this.m_main_column_nb);
            this.m_main_cols = this.range(0, this.m_main_column_nb - 1, 1);
            this.rowNb = Math.floor((this.keysTab.length / this.m_main_column_nb + 1));
        }
        this.resize();
    };
    Object.defineProperty(CustomKeyBoard, "onCKClick", {
        get: function () {
            return this.m_clickObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomKeyBoard, "onDeleteClick", {
        get: function () {
            return this.m_deleteObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomKeyBoard, "onCKShow", {
        get: function () {
            return this.m_showObs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomKeyBoard, "onCKHide", {
        get: function () {
            return this.m_hideObs;
        },
        enumerable: true,
        configurable: true
    });
    CustomKeyBoard.prototype.cKClick = function (event, key) {
        CustomKeyBoard_1.onCKClick.next(key);
        this.cKClickEmit.emit(key);
    };
    CustomKeyBoard.prototype.deleteClick = function (event) {
        CustomKeyBoard_1.onDeleteClick.next();
        this.deleteEmit.emit();
    };
    CustomKeyBoard.prototype.hideClick = function (event) {
        CustomKeyBoard_1.hide(null);
        CustomKeyBoard_1.onCKHide.next();
        this.hideEmit.emit();
    };
    CustomKeyBoard.prototype.onWindowResize = function (event) {
        this.resize();
    };
    CustomKeyBoard.show = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        if (this.m_component && !this.m_component.visible) {
            this.m_component.visible = true;
            setTimeout(function () {
                callback();
                CustomKeyBoard_1.onCKShow.next();
            }, 100);
        }
    };
    CustomKeyBoard.hide = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        if (this.m_component && this.m_component.visible) {
            this.m_component.visible = false;
            if (callback) {
                setTimeout(function () {
                    callback();
                    CustomKeyBoard_1.onCKHide.next();
                }, 100);
            }
        }
    };
    CustomKeyBoard.isVisible = function () {
        return this.m_component.visible;
    };
    CustomKeyBoard.destroy = function (callback) {
        if (callback === void 0) { callback = function (success) { }; }
        if (this.m_component) {
            this.m_component.el.nativeElement.remove();
            this.m_component = null;
            callback(true);
        }
        else
            callback(true);
    };
    CustomKeyBoard.prototype.resize = function () {
        // Compute the keyboard height (key height = 50px, toolbar height = 30px)
        var keyboardHeight = (50 * this.rowNb) + 30;
        var screenHeight = window.screen.height;
        // Make sure the keyboard is not bigger than 0.40 * screen size
        if (keyboardHeight > (screenHeight * 0.40))
            this.zoom = (screenHeight * 0.40) / keyboardHeight;
        else
            this.zoom = 1;
    };
    CustomKeyBoard.prototype.range = function (min, max, step) {
        step = step || 1;
        var tab = [];
        for (var i = min; i <= max; i += step) {
            tab.push(i);
        }
        return tab;
    };
    // Component reference
    CustomKeyBoard.m_component = null;
    // Observables for subscribers to get the events
    CustomKeyBoard.m_clickObs = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
    CustomKeyBoard.m_deleteObs = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
    CustomKeyBoard.m_showObs = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
    CustomKeyBoard.m_hideObs = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Subject"]();
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], CustomKeyBoard.prototype, "keysTab", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Number)
    ], CustomKeyBoard.prototype, "colNb", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], CustomKeyBoard.prototype, "width", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.visible'), Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], CustomKeyBoard.prototype, "visible", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CustomKeyBoard.prototype, "cKClickEmit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CustomKeyBoard.prototype, "deleteEmit", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], CustomKeyBoard.prototype, "hideEmit", void 0);
    CustomKeyBoard = CustomKeyBoard_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'custom-keyboard',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/customKeyBoard/custom-keyboard.html"*/'<div (window:resize)="onWindowResize($event)" class="center" [style.width]="width">\n\n	<!-- Keyboard toolbar (Hide & delete buttons) -->\n	<div class="kb-toolbar">\n		<span style="font-size:unset"><ion-icon name="arrow-dropdown" (tap)="hideClick($event)"></ion-icon></span>\n		<span style="font-size:unset"><ion-icon name="backspace" (tap)="deleteClick($event)"></ion-icon></span>\n	</div>\n\n	<!-- Keys -->\n	<div class="kb-row" [style.zoom]="zoom" *ngFor="let n of m_main_rows">\n		<div class="kb-key-cell" *ngFor="let m of m_main_cols">\n			<div class="kb-key" (tap)="cKClick($event, keysTab[n + m])">\n				{{keysTab[n + m]}}\n			</div>\n		</div>\n	</div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/customKeyBoard/custom-keyboard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], CustomKeyBoard);
    return CustomKeyBoard;
    var CustomKeyBoard_1;
}());

//# sourceMappingURL=custom-keyboard.js.map

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 253;

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/chat/chat.module": [
		298
	],
	"../pages/dashboard/dashboard.module": [
		1145,
		9
	],
	"../pages/home/home.module": [
		1146,
		8
	],
	"../pages/home/tabs/RoutesList/RoutesList.module": [
		1148,
		5
	],
	"../pages/home/tabs/RoutesMap/RoutesMap.module": [
		1149,
		7
	],
	"../pages/home/tabs/TasksMap/TasksMap.module": [
		1147,
		1
	],
	"../pages/info/info.module": [
		1150,
		4
	],
	"../pages/onboarding/onboarding.module": [
		1152,
		3
	],
	"../pages/portal/portal.module": [
		1151,
		6
	],
	"../pages/settings/settings.module": [
		1153,
		2
	],
	"../pages/task-detail/task-detail.module": [
		1154,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 297;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatPageModule", function() { return ChatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(235);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ChatPageModule = /** @class */ (function () {
    function ChatPageModule() {
    }
    ChatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */]
            ],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__chat__["a" /* ChatPage */]
            ]
        })
    ], ChatPageModule);
    return ChatPageModule;
}());

//# sourceMappingURL=chat.module.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrmService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_typeorm__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__migration_1513274191111_InitialMigration__ = __webpack_require__(1074);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__migration_1515428187000_failedTaskMigration__ = __webpack_require__(1075);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__entity_User__ = __webpack_require__(1076);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entity_State__ = __webpack_require__(1077);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entity_Task__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entity_Route__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__migration_1513679923000_AddImageUrlAndDownloadedFlagMigration__ = __webpack_require__(1080);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__images_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__classes_CacheManagerMCM__ = __webpack_require__(1081);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__entity_Score__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__entity_Task2Route__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_spinner_dialog__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__migration_1516037215000_AddUnlockedColumn__ = __webpack_require__(1083);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__migration_1519817905000_AddCompletedColumn__ = __webpack_require__(1084);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_rxjs_Subject__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__classes_DB_Handler__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__migration_1526306624000_AddVisibleColumn__ = __webpack_require__(1093);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__migration_1526306730000_AddLangCodeColumn__ = __webpack_require__(1094);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__migration_15711518720000_AddDownloadDateColumn__ = __webpack_require__(1095);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__migration_15713974540000_AddCompletedDateColumn__ = __webpack_require__(1096);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__migration_15783117210000_AddZipMapFields__ = __webpack_require__(1097);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__migration_16013795030000_AddSavedTasks__ = __webpack_require__(1098);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__migration_16026790930000_AddSubtasks__ = __webpack_require__(1099);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__migration_16194302450000_AddPositionField__ = __webpack_require__(1100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__migration_16208100470000_AddPathFields__ = __webpack_require__(1101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__migration_16225449820000_AddZoom__ = __webpack_require__(1102);
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


































var OrmService = /** @class */ (function () {
    function OrmService(imagesService, spinner, translateService, platform, storage, alertCtrl) {
        this.imagesService = imagesService;
        this.spinner = spinner;
        this.translateService = translateService;
        this.platform = platform;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_20_rxjs_Subject__["Subject"]();
        OrmService_1.INSTANCE = this;
    }
    OrmService_1 = OrmService;
    OrmService.prototype.getConnection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sqliteAvailable, entities, migrations, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.connection) {
                            return [2 /*return*/, this.connection];
                        }
                        return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_21__classes_DB_Handler__["a" /* DB_Handler */].getInstance().ready()];
                    case 2:
                        _c.sent();
                        sqliteAvailable = Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["i" /* checkAvailability */])(__WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */].getPluginRef(), null, __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */].getPluginName()) === true;
                        entities = [
                            __WEBPACK_IMPORTED_MODULE_6__entity_User__["a" /* User */],
                            __WEBPACK_IMPORTED_MODULE_9__entity_Route__["a" /* Route */],
                            __WEBPACK_IMPORTED_MODULE_7__entity_State__["a" /* State */],
                            __WEBPACK_IMPORTED_MODULE_8__entity_Task__["a" /* Task */],
                            __WEBPACK_IMPORTED_MODULE_13__entity_Score__["a" /* Score */],
                            __WEBPACK_IMPORTED_MODULE_14__entity_Task2Route__["a" /* Task2Route */]
                        ];
                        migrations = [
                            __WEBPACK_IMPORTED_MODULE_4__migration_1513274191111_InitialMigration__["a" /* InitialMigration1513274191111 */],
                            __WEBPACK_IMPORTED_MODULE_10__migration_1513679923000_AddImageUrlAndDownloadedFlagMigration__["a" /* AddImageUrlAndDownloadedFlagMigration1513679923000 */],
                            __WEBPACK_IMPORTED_MODULE_5__migration_1515428187000_failedTaskMigration__["a" /* FailedTaskMigration1515428187000 */],
                            __WEBPACK_IMPORTED_MODULE_18__migration_1516037215000_AddUnlockedColumn__["a" /* AddUnlockedColumn1516037215000 */],
                            __WEBPACK_IMPORTED_MODULE_19__migration_1519817905000_AddCompletedColumn__["a" /* AddCompletedColumn1519817905000 */],
                            __WEBPACK_IMPORTED_MODULE_22__migration_1526306624000_AddVisibleColumn__["a" /* AddVisibleColumn1526306624000 */],
                            __WEBPACK_IMPORTED_MODULE_23__migration_1526306730000_AddLangCodeColumn__["a" /* AddLangCodeColumn1526306730000 */],
                            __WEBPACK_IMPORTED_MODULE_25__migration_15711518720000_AddDownloadDateColumn__["a" /* AddDownloadDateColumn15711518720000 */],
                            __WEBPACK_IMPORTED_MODULE_26__migration_15713974540000_AddCompletedDateColumn__["a" /* AddCompletedDateColumn15713974540000 */],
                            __WEBPACK_IMPORTED_MODULE_27__migration_15783117210000_AddZipMapFields__["a" /* AddZipMapFields15783117210000 */],
                            __WEBPACK_IMPORTED_MODULE_29__migration_16013795030000_AddSavedTasks__["a" /* AddSavedTasks16013795030000 */],
                            __WEBPACK_IMPORTED_MODULE_30__migration_16026790930000_AddSubtasks__["a" /* AddSubtasks16026790930000 */],
                            __WEBPACK_IMPORTED_MODULE_31__migration_16194302450000_AddPositionField__["a" /* AddPositionField16194302450000 */],
                            __WEBPACK_IMPORTED_MODULE_32__migration_16208100470000_AddPathFields__["a" /* AddPathFields16208100470000 */],
                            __WEBPACK_IMPORTED_MODULE_33__migration_16225449820000_AddZoom__["a" /* AddZoom16225449820000 */]
                        ];
                        if (!sqliteAvailable) return [3 /*break*/, 4];
                        _a = this;
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_3_typeorm__["k" /* createConnection */])({
                                type: 'cordova',
                                location: 'default',
                                database: 'mcm_db.sqlite3',
                                logging: ['error',],
                                logger: 'simple-console',
                                synchronize: false,
                                entities: entities,
                                migrationsRun: true,
                                migrations: migrations
                            })];
                    case 3:
                        _a.connection = _c.sent();
                        return [2 /*return*/, this.connection];
                    case 4:
                        _b = this;
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_3_typeorm__["k" /* createConnection */])({
                                type: 'websql',
                                version: '1.0',
                                description: 'MCM DB',
                                size: 2 * 1024 * 1024,
                                database: 'mcm',
                                logging: ['error',],
                                logger: 'simple-console',
                                synchronize: false,
                                entities: entities,
                                migrationsRun: true,
                                migrations: migrations
                            })];
                    case 5:
                        _b.connection = _c.sent();
                        return [2 /*return*/, this.connection];
                }
            });
        });
    };
    OrmService.prototype.getTaskRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/, connection.getRepository(__WEBPACK_IMPORTED_MODULE_8__entity_Task__["a" /* Task */])];
                }
            });
        });
    };
    OrmService.prototype.getStateRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/, connection.getRepository(__WEBPACK_IMPORTED_MODULE_7__entity_State__["a" /* State */])];
                }
            });
        });
    };
    OrmService.prototype.getScoreRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/, connection.getRepository(__WEBPACK_IMPORTED_MODULE_13__entity_Score__["a" /* Score */])];
                }
            });
        });
    };
    OrmService.prototype.getRouteRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/, connection.getRepository(__WEBPACK_IMPORTED_MODULE_9__entity_Route__["a" /* Route */])];
                }
            });
        });
    };
    OrmService.prototype.getUserRepository = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConnection()];
                    case 1:
                        connection = _a.sent();
                        return [2 /*return*/, connection.getRepository(__WEBPACK_IMPORTED_MODULE_6__entity_User__["a" /* User */])];
                }
            });
        });
    };
    OrmService.prototype.findRouteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRouteRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.findOneById(id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrmService.prototype.findRouteByCode = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRouteRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.findOne({ where: { code: code } })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrmService.prototype.findScoreByRoute = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getScoreRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.findOne({ where: { routeId: id } })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrmService.prototype.getAllTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo, tasks, solutionTypes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTaskRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.find({ relations: ["routes"] })];
                    case 2:
                        tasks = _a.sent();
                        solutionTypes = [];
                        tasks.forEach(function (task) {
                            if (solutionTypes.indexOf(task.solutionType) == -1) {
                                solutionTypes.push(task.solutionType);
                            }
                            if (task.solutionType == "gps" && task.public == "1") {
                                task.routes.forEach(function (route) {
                                    if (route.public == "1") {
                                        console.log(route);
                                        console.log(task);
                                    }
                                });
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.findTaskById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTaskRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.createQueryBuilder("tasks")
                                .where({ id: id })
                                .leftJoinAndSelect("tasks.subtasks", "subtasks")
                                .getOne()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrmService.prototype.insertOrUpdateTaskState = function (score, detailsToSave) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getScoreRepository()];
                    case 1:
                        repo = _a.sent();
                        score.addTaskStateForTask(score.getTaskState(), detailsToSave);
                        return [4 /*yield*/, this.getActiveUser()];
                    case 2:
                        user = _a.sent();
                        score.userId = user.id;
                        return [4 /*yield*/, repo.save(score)];
                    case 3:
                        _a.sent();
                        this.eventEmitter.next(OrmService_1.EVENT_ROUTES_CHANGED);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.deleteUserScore = function (score) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getScoreRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.deleteById(score.id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.setNewActiveUser = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserRepository()];
                    case 1:
                        repo = _a.sent();
                        user = new __WEBPACK_IMPORTED_MODULE_6__entity_User__["a" /* User */]();
                        user.name = userName;
                        return [4 /*yield*/, this.setActiveUser(userName)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, repo.save(user)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    OrmService.prototype.setActiveUser = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStateRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.findOne({ where: { option: 'active_user' } })];
                    case 2:
                        state = _a.sent();
                        if (!state) {
                            state = new __WEBPACK_IMPORTED_MODULE_7__entity_State__["a" /* State */]();
                            state.option = "active_user";
                        }
                        state.value = userName;
                        return [4 /*yield*/, repo.save(state)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.getActiveUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo, state, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getStateRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.findOne({ where: { option: 'active_user' } })];
                    case 2:
                        state = _a.sent();
                        user = null;
                        if (!(state && state.value)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getUserByName(state.value)];
                    case 3:
                        user = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, user];
                }
            });
        });
    };
    OrmService.prototype.checkUsername = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserByName(userName)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    OrmService.prototype.getUserByName = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var repo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.findOne({ where: { name: userName } })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OrmService.prototype.getVisibleRoutes = function (showSpinner, compareFn, forceUpdateFromDb) {
        if (showSpinner === void 0) { showSpinner = true; }
        if (compareFn === void 0) { compareFn = null; }
        if (forceUpdateFromDb === void 0) { forceUpdateFromDb = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var repo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (showSpinner)
                            this.spinner.show(null, this.translateService.instant('a_toast_routes_loading'), true);
                        if (!forceUpdateFromDb && this.visibleRoutesCache) {
                            return [2 /*return*/, new Promise(function (success) {
                                    setTimeout(function () {
                                        if (compareFn) {
                                            _this.visibleRoutesCache.sort(compareFn);
                                        }
                                        if (showSpinner) {
                                            setTimeout(function () {
                                                _this.spinner.hide();
                                            }, 100);
                                        }
                                        success(_this.visibleRoutesCache);
                                    }, 100);
                                })];
                        }
                        return [4 /*yield*/, this.getRouteRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.createQueryBuilder('r').where('r.map_version != 0').andWhere('r.public = 1').orWhere('r.unlocked = 1').getMany()];
                    case 2:
                        result = _a.sent();
                        if (compareFn) {
                            result.sort(compareFn);
                        }
                        if (!this.visibleRoutesCache) {
                            this.visibleRoutesCache = result;
                        }
                        else {
                            // add objects to existing array (because it is referenced by views)
                            this.visibleRoutesCache.splice(0, this.visibleRoutesCache.length);
                            result.map(function (route) { return _this.visibleRoutesCache.push(route); });
                        }
                        if (showSpinner) {
                            setTimeout(function () {
                                _this.spinner.hide();
                            }, 100);
                        }
                        return [2 /*return*/, this.visibleRoutesCache];
                }
            });
        });
    };
    OrmService.prototype.getDownloadedRoutes = function (compareFn) {
        if (compareFn === void 0) { compareFn = null; }
        return __awaiter(this, void 0, void 0, function () {
            var repo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRouteRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.find({
                                where: {
                                    downloaded: '1'
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        result = result.filter(function (route) {
                            return route.mapVersion != '0';
                        });
                        if (compareFn) {
                            result.sort(compareFn);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrmService.prototype.getUnlockedRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRouteRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.find({
                                where: {
                                    unlocked: '1'
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        result = result.filter(function (route) {
                            return route.mapVersion != '0';
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrmService.prototype.getCompletedRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var repo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRouteRepository()];
                    case 1:
                        repo = _a.sent();
                        return [4 /*yield*/, repo.find({
                                where: {
                                    completed: '1'
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        result = result.filter(function (route) {
                            return route.mapVersion != '0';
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    OrmService.prototype.downloadRoute = function (route, statusCallback, dbUpdater) {
        return __awaiter(this, void 0, void 0, function () {
            var alreadyDownloadedUrls, zoomLevels, _a, _b, _c, repo, e_1, alert_1, postparams;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        alreadyDownloadedUrls = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 11, , 13]);
                        // 15.04.18 - get data rows for route tasks from online DB first
                        return [4 /*yield*/, dbUpdater.downloadRouteTasksData(route, this.translateService.instant("a_language_code"))];
                    case 2:
                        // 15.04.18 - get data rows for route tasks from online DB first
                        _d.sent();
                        statusCallback(0, 0, 'a_rdl_title_map');
                        if (!!route.isNarrativeEnabled()) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.imagesService.downloadAndUnzip(route, function (done) {
                                return statusCallback(done, 100);
                            }, function (tile) {
                                alreadyDownloadedUrls.push(tile);
                            })];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        zoomLevels = __WEBPACK_IMPORTED_MODULE_24__classes_Helper__["b" /* Helper */].calculateZoom(route.getViewBoundingBoxLatLng());
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_12__classes_CacheManagerMCM__["a" /* CacheManagerMCM */].downloadTiles(route, zoomLevels.min_zoom, zoomLevels.max_zoom, function (done, total, url) {
                                alreadyDownloadedUrls.push(url);
                                return statusCallback(done, total);
                            })];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _b = (_a = this.imagesService).downloadURLs;
                        _c = this.getDownloadImagesForTasks;
                        return [4 /*yield*/, route.getTasks()];
                    case 7: 
                    //statusCallback(0, 0, 'a_rdl_title_img');
                    return [4 /*yield*/, _b.apply(_a, [_c.apply(this, [_d.sent()]), false, function (done, total, url) {
                                alreadyDownloadedUrls.push(url);
                                return statusCallback(done, total, 'a_rdl_title_img');
                            }])];
                    case 8:
                        //statusCallback(0, 0, 'a_rdl_title_img');
                        _d.sent();
                        route.downloaded = true;
                        route.downloadedDate = new Date().toDateString().split(' ').slice(1).join(' ');
                        return [4 /*yield*/, this.getRouteRepository()];
                    case 9:
                        repo = _d.sent();
                        return [4 /*yield*/, repo.save(route)];
                    case 10:
                        _d.sent();
                        this.updateRouteInCache(route);
                        return [3 /*break*/, 13];
                    case 11:
                        e_1 = _d.sent();
                        console.log("download failed or was aborted");
                        if (e_1.message) {
                            console.log(e_1.message);
                        }
                        if (e_1.http_status && e_1.http_status === 404) {
                            alert_1 = this.alertCtrl.create({
                                title: this.translateService.instant("a_missing_map_data_error_msg"),
                                buttons: [{
                                        text: this.translateService.instant("a_g_ok"),
                                        role: 'cancel'
                                    }]
                            });
                            alert_1.present();
                            postparams = "&route_id=" + route.id;
                            __WEBPACK_IMPORTED_MODULE_24__classes_Helper__["b" /* Helper */].INSTANCE.invokeApi('downloadTrailFailed', postparams);
                        }
                        console.log(e_1);
                        return [4 /*yield*/, this.imagesService.removeDownloadedURLs(alreadyDownloadedUrls, false)];
                    case 12:
                        _d.sent();
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.getTileURLs = function (route) {
        var zoomLevels = __WEBPACK_IMPORTED_MODULE_24__classes_Helper__["b" /* Helper */].calculateZoom(route.getViewBoundingBoxLatLng());
        return __WEBPACK_IMPORTED_MODULE_12__classes_CacheManagerMCM__["a" /* CacheManagerMCM */].getTileURLs(route, zoomLevels.min_zoom, zoomLevels.max_zoom);
    };
    OrmService.prototype.getTileURLsAsObject = function (route) {
        var tiles = this.getTileURLs(route);
        var result = {};
        for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
            var tile = tiles_1[_i];
            result[tile] = true;
        }
        return result;
    };
    OrmService.prototype.getDownloadImagesForTasks = function (tasks) {
        var result = [];
        tasks.map(function (task) { return task.getImagesForDownload(); }).map(function (images) {
            result = result.concat(images);
        });
        return result;
    };
    OrmService.prototype.removeDownloadedRoute = function (route, removeTiles) {
        if (removeTiles === void 0) { removeTiles = false; }
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b, _c, _d, state, repo;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.getActiveUser()];
                    case 1:
                        user = _e.sent();
                        _a = this.deleteUserScore;
                        return [4 /*yield*/, this.findRouteById(route.id)];
                    case 2: return [4 /*yield*/, _a.apply(this, [(_e.sent()).getScoreForUser(user)])];
                    case 3:
                        _e.sent();
                        if (!removeTiles) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.imagesService.removeDownloadedURLs(this.getTileURLs(route), false)];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        _c = (_b = this.imagesService).removeDownloadedURLs;
                        _d = this.getDownloadImagesForTasks;
                        return [4 /*yield*/, route.getTasks()];
                    case 6:
                        _c.apply(_b, [_d.apply(this, [_e.sent()]), false]);
                        return [4 /*yield*/, this.storage.get("savedMapStateByRoute")];
                    case 7:
                        state = _e.sent();
                        delete state[route.id];
                        this.storage.set("savedMapStateByRoute", state);
                        route.downloaded = null;
                        route.downloadedDate = null;
                        route.completed = null;
                        route.completedDate = null;
                        return [4 /*yield*/, this.getRouteRepository()];
                    case 8:
                        repo = _e.sent();
                        return [4 /*yield*/, repo.save(route)];
                    case 9:
                        _e.sent();
                        this.updateRouteInCache(route);
                        return [2 /*return*/, route];
                }
            });
        });
    };
    OrmService.prototype.unlockRoute = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        route.unlocked = true;
                        return [4 /*yield*/, this.getRouteRepository()];
                    case 1:
                        (_a.sent()).save(route);
                        this.imagesService.downloadURLs([route.image], true);
                        this.updateRouteInCache(route);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.saveAndFireChangedEvent = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRouteRepository()];
                    case 1: return [4 /*yield*/, (_a.sent()).save(route)];
                    case 2:
                        _a.sent();
                        this.updateRouteInCache(route);
                        this.eventEmitter.next(OrmService_1.EVENT_ROUTES_CHANGED);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.removeAllDownloadedData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var routes, _i, routes_1, route;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDownloadedRoutes()];
                    case 1:
                        routes = _a.sent();
                        _i = 0, routes_1 = routes;
                        _a.label = 2;
                    case 2:
                        if (!(_i < routes_1.length)) return [3 /*break*/, 5];
                        route = routes_1[_i];
                        return [4 /*yield*/, this.removeDownloadedRoute(route, true)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.eventEmitter.next(OrmService_1.EVENT_ROUTES_CHANGED);
                        return [2 /*return*/];
                }
            });
        });
    };
    OrmService.prototype.updateRouteInCache = function (routeToUpdate) {
        if (this.visibleRoutesCache) {
            for (var i = 0; i < this.visibleRoutesCache.length; i++) {
                if (this.visibleRoutesCache[i].id == routeToUpdate.id) {
                    this.visibleRoutesCache[i] = routeToUpdate;
                    break;
                }
            }
        }
        this.eventEmitter.next(OrmService_1.EVENT_ROUTES_CHANGED);
    };
    OrmService.EVENT_ROUTES_CHANGED = 'EVENT_ROUTES_CHANGED';
    OrmService = OrmService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_11__images_service__["a" /* ImagesService */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_28__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_17_ionic_angular__["a" /* AlertController */]])
    ], OrmService);
    return OrmService;
    var OrmService_1;
}());

//# sourceMappingURL=orm-service.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionUserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_configuration__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__);
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
/* tslint:disable */






var SessionUserService = /** @class */ (function (_super) {
    __extends(SessionUserService, _super);
    function SessionUserService(config, http) {
        return _super.call(this, config, http) || this;
    }
    /**
     * @param params The `SessionUserService.UpdatePositionParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * - `longitude`: The session user's longitude
     *
     * - `latitude`: The session user's latitude
     *
     * @return Returns an empty response
     */
    SessionUserService.prototype.updatePositionResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("PUT", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken + "/position/" + params.latitude + "/" + params.longitude), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionUserService.UpdatePositionParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * - `longitude`: The session user's longitude
     *
     * - `latitude`: The session user's latitude
     *
     * @return Returns an empty response
     */
    SessionUserService.prototype.updatePosition = function (params) {
        return this.updatePositionResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionUserService.GetSessionUserByTokenParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns requested sessionUser
     */
    SessionUserService.prototype.getSessionUserByTokenResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionUserService.GetSessionUserByTokenParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns requested sessionUser
     */
    SessionUserService.prototype.getSessionUserByToken = function (params) {
        return this.getSessionUserByTokenResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionUserService.LeaveSessionParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns an empty response
     */
    SessionUserService.prototype.leaveSessionResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("DELETE", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionUserService.LeaveSessionParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns an empty response
     */
    SessionUserService.prototype.leaveSession = function (params) {
        return this.leaveSessionResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    SessionUserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_configuration__["a" /* ApiConfiguration */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], SessionUserService);
    return SessionUserService;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=session-user.service.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_configuration__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__);
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
/* tslint:disable */






var SessionChatService = /** @class */ (function (_super) {
    __extends(SessionChatService, _super);
    function SessionChatService(config, http) {
        return _super.call(this, config, http) || this;
    }
    /**
     * @param params The `SessionChatService.GetMessagesParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `receiverToken`: The receiver token
     *
     * @return Returns the chat - inclusive chat history
     */
    SessionChatService.prototype.getMessagesResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + params.sessionCode + "/chat/" + params.senderToken + "/" + params.receiverToken), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionChatService.GetMessagesParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `receiverToken`: The receiver token
     *
     * @return Returns the chat - inclusive chat history
     */
    SessionChatService.prototype.getMessages = function (params) {
        return this.getMessagesResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionChatService.SetMessageReadParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `receiverToken`: The receiver token
     *
     * @return Returns sended chat message
     */
    SessionChatService.prototype.setMessageReadResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("PUT", this.rootUrl + ("/session/" + params.sessionCode + "/chat/" + params.senderToken + "/" + params.receiverToken), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionChatService.SetMessageReadParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `receiverToken`: The receiver token
     *
     * @return Returns sended chat message
     */
    SessionChatService.prototype.setMessageRead = function (params) {
        return this.setMessageReadResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionChatService.SendMessageToUserParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `receiverToken`: The receiver token
     *
     * - `chatMessage`: The message
     *
     * @return Returns sended chat message
     */
    SessionChatService.prototype.sendMessageToUserResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        __body = params.chatMessage;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("POST", this.rootUrl + ("/session/" + params.sessionCode + "/chat/" + params.senderToken + "/" + params.receiverToken), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionChatService.SendMessageToUserParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `receiverToken`: The receiver token
     *
     * - `chatMessage`: The message
     *
     * @return Returns sended chat message
     */
    SessionChatService.prototype.sendMessageToUser = function (params) {
        return this.sendMessageToUserResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionChatService.GetNewMessagesParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token, User A
     *
     * - `receiverToken`: The receiver token, User B
     *
     * @return Returns new (unread) msgs for User A from User B
     */
    SessionChatService.prototype.getNewMessagesResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + params.sessionCode + "/chat/" + params.senderToken + "/" + params.receiverToken + "/new"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionChatService.GetNewMessagesParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token, User A
     *
     * - `receiverToken`: The receiver token, User B
     *
     * @return Returns new (unread) msgs for User A from User B
     */
    SessionChatService.prototype.getNewMessages = function (params) {
        return this.getNewMessagesResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionChatService.SendMessageToUsersParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `chatMessage`: The message
     *
     * @return Returns sended chat messages
     */
    SessionChatService.prototype.sendMessageToUsersResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        __body = params.chatMessage;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("POST", this.rootUrl + ("/session/" + params.sessionCode + "/chat/" + params.senderToken), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    SessionChatService.prototype.postMedia = function (file, session, sender) {
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        __headers.append('Content-Type', 'multipart/form-data');
        __headers.append('Accept', 'application/json');
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("POST", this.rootUrl + ("/session/" + session + "/media/" + sender), file, {
            headers: __headers
        });
        return this.http.request(req).toPromise().catch(function (err) { console.log("ERROR#####: ", err); });
    };
    /**
     * @param params The `SessionChatService.SendMessageToUsersParams` containing the following parameters:
     *
     * - `sessionCode`: The session code
     *
     * - `senderToken`: The senders token
     *
     * - `chatMessage`: The message
     *
     * @return Returns sended chat messages
     */
    SessionChatService.prototype.sendMessageToUsers = function (params) {
        return this.sendMessageToUsersResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    SessionChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_configuration__["a" /* ApiConfiguration */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], SessionChatService);
    return SessionChatService;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=session-chat.service.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionEventService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_configuration__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__);
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
/* tslint:disable */






var SessionEventService = /** @class */ (function (_super) {
    __extends(SessionEventService, _super);
    function SessionEventService(config, http) {
        return _super.call(this, config, http) || this;
    }
    /**
     * @param sessionCode The session code
     * @return Returns all events of the session
     */
    SessionEventService.prototype.getEventsResponse = function (sessionCode) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + sessionCode + "/event"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param sessionCode The session code
     * @return Returns all events of the session
     */
    SessionEventService.prototype.getEvents = function (sessionCode) {
        return this.getEventsResponse(sessionCode).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionEventService.GetUserEventsParams` containing the following parameters:
     *
     * - `userToken`: The user token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns all events of the session for given user token
     */
    SessionEventService.prototype.getUserEventsResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken + "/events"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionEventService.GetUserEventsParams` containing the following parameters:
     *
     * - `userToken`: The user token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns all events of the session for given user token
     */
    SessionEventService.prototype.getUserEvents = function (params) {
        return this.getUserEventsResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionEventService.AddEventsParams` containing the following parameters:
     *
     * - `userToken`: userToken of sending user
     *
     * - `sessionCode`: The session code
     *
     * - `events`: An array of user events EventsAddRequest
     *
     * @return Returns added event
     */
    SessionEventService.prototype.addEventsResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        __body = params.events;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("POST", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken + "/events"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionEventService.AddEventsParams` containing the following parameters:
     *
     * - `userToken`: userToken of sending user
     *
     * - `sessionCode`: The session code
     *
     * - `events`: An array of user events EventsAddRequest
     *
     * @return Returns added event
     */
    SessionEventService.prototype.addEvents = function (params) {
        return this.addEventsResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    /**
     * @param params The `SessionEventService.GetAuthorEventsParams` containing the following parameters:
     *
     * - `userToken`: The user token
     *
     * - `unixTime`: Unix time
     *
     * - `sessionCode`: The session code
     *
     * @return Returns author events that happened after given unix time
     */
    SessionEventService.prototype.getAuthorEventsResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken + "/authorEvents/" + params.unixTime), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionEventService.GetAuthorEventsParams` containing the following parameters:
     *
     * - `userToken`: The user token
     *
     * - `unixTime`: Unix time
     *
     * - `sessionCode`: The session code
     *
     * @return Returns author events that happened after given unix time
     */
    SessionEventService.prototype.getAuthorEvents = function (params) {
        return this.getAuthorEventsResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    SessionEventService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_configuration__["a" /* ApiConfiguration */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], SessionEventService);
    return SessionEventService;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=session-event.service.js.map

/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionUserLeaderboardService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__base_service__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_configuration__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__);
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
/* tslint:disable */






var SessionUserLeaderboardService = /** @class */ (function (_super) {
    __extends(SessionUserLeaderboardService, _super);
    function SessionUserLeaderboardService(config, http) {
        return _super.call(this, config, http) || this;
    }
    /**
     * @param params The `SessionUserLeaderboardService.GetLeaderboardParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns Leaderboard array
     */
    SessionUserLeaderboardService.prototype.getLeaderboardResponse = function (params) {
        var __params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]();
        var __headers = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]();
        var __body = null;
        var req = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["e" /* HttpRequest */]("GET", this.rootUrl + ("/session/" + params.sessionCode + "/user/" + params.userToken + "/leaderboard"), __body, {
            headers: __headers,
            params: __params,
            responseType: 'json'
        });
        return this.http.request(req).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators_filter__["filter"])(function (_r) { return _r instanceof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["f" /* HttpResponse */]; }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) {
            var _resp = _r;
            var _body = null;
            _body = _resp.body;
            return _resp.clone({ body: _body });
        }));
    };
    /**
     * @param params The `SessionUserLeaderboardService.GetLeaderboardParams` containing the following parameters:
     *
     * - `userToken`: The session user's token
     *
     * - `sessionCode`: The session code
     *
     * @return Returns Leaderboard array
     */
    SessionUserLeaderboardService.prototype.getLeaderboard = function (params) {
        return this.getLeaderboardResponse(params).pipe(Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators_map__["map"])(function (_r) { return _r.body; }));
    };
    SessionUserLeaderboardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_configuration__["a" /* ApiConfiguration */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], SessionUserLeaderboardService);
    return SessionUserLeaderboardService;
}(__WEBPACK_IMPORTED_MODULE_2__base_service__["a" /* BaseService */]));

//# sourceMappingURL=session-user-leaderboard.service.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImagesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_async__ = __webpack_require__(1079);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(46);
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










var ImagesService = /** @class */ (function () {
    function ImagesService(fileManager, platform, transfer, http, httpClient, sanitizer) {
        this.fileManager = fileManager;
        this.platform = platform;
        this.transfer = transfer;
        this.http = http;
        this.httpClient = httpClient;
        this.sanitizer = sanitizer;
        this.isInitialized = false;
        this.downloadQueue = null;
        this.offlineImageUrlCache = {};
        this.offlineThumbnailUrlCache = {};
        this.lazyLoadedImagesCache = {};
        ImagesService_1.INSTANCE = this;
        this.init();
    }
    ImagesService_1 = ImagesService;
    ImagesService.prototype.saveThumb = function (newFileName, base64, fileManager) {
        console.log("saving thumbnail to " + newFileName);
        // var url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        fetch(base64)
            .then(function (res) {
            res.blob().then(function (blob) {
                fileManager.writeFile(fileManager.dataDirectory, newFileName, blob, { replace: true }).then(function (val) {
                }, function (error) { return console.error("Write error: " + JSON.stringify(error)); })
                    .catch(function (error) { return console.error("Write error: " + JSON.stringify(error)); });
            }, function (error) { return console.error("Blob error: " + JSON.stringify(error)); })
                .catch(function (error) { return console.error("Blob error: " + JSON.stringify(error)); });
        })
            .then(function (blob) { return console.log(blob); });
    };
    ImagesService.prototype.resizedataURL = function (datas, wantedWidth, wantedHeight) {
        return new Promise(function (resolve, reject) {
            var img = document.createElement('img');
            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = wantedWidth;
                canvas.height = wantedHeight;
                ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);
                var dataURI = canvas.toDataURL();
                resolve(dataURI);
            };
            img.src = datas;
        });
    };
    ImagesService.prototype.isFilePluginAvailable = function () {
        return this.filePluginAvailable;
    };
    ImagesService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isInitialized) {
                            return [2 /*return*/, this.nativeBaseURL];
                        }
                        return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _b.sent();
                        this.filePluginAvailable = Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["i" /* checkAvailability */])(__WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */].getPluginRef(), null, __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */].getPluginName()) === true;
                        if (!this.filePluginAvailable) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.fileManager.resolveDirectoryUrl(this.fileManager.dataDirectory)];
                    case 2:
                        _a.dataDirectory = _b.sent();
                        this.nativeBaseURL = this.dataDirectory.nativeURL;
                        _b.label = 3;
                    case 3:
                        this.isInitialized = true;
                        return [2 /*return*/, this.nativeBaseURL];
                }
            });
        });
    };
    ImagesService.prototype.downloadURLs = function (urls, createThumbs, progressCallback, skipCheckForExistingFiles) {
        if (progressCallback === void 0) { progressCallback = null; }
        if (skipCheckForExistingFiles === void 0) { skipCheckForExistingFiles = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promiseError, fileTransfer, dataDirectory, fileManager, resizedataURL, saveThumb, totalDownload, alreadyDownloaded, that, promise, _loop_1, this_1, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isFilePluginAvailable()) {
                            return [2 /*return*/];
                        }
                        promiseError = null;
                        fileTransfer = this.transfer.create();
                        dataDirectory = this.fileManager.dataDirectory;
                        fileManager = this.fileManager;
                        resizedataURL = this.resizedataURL;
                        saveThumb = this.saveThumb;
                        totalDownload = urls.length;
                        alreadyDownloaded = 0;
                        that = this;
                        this.downloadQueue = __WEBPACK_IMPORTED_MODULE_5_async___default.a.queue(function (task, continueCallback) {
                            function callback() {
                                alreadyDownloaded++;
                                console.log("download progress: " + alreadyDownloaded + "/" + totalDownload + " - " + task.imgFileName);
                                if (task.callback) {
                                    task.callback(alreadyDownloaded, totalDownload, task.imgFileName);
                                }
                                if (progressCallback) {
                                    if (progressCallback(alreadyDownloaded, totalDownload, task.imgFileName)) {
                                        // user aborted download process
                                        that.downloadQueue.kill();
                                        promiseError("user canceled download");
                                        return;
                                    }
                                }
                                continueCallback();
                            }
                            console.log('Starting download task for ' + task.outputName);
                            var url = task.imgFileName.indexOf('http') === 0 ? task.imgFileName
                                : __WEBPACK_IMPORTED_MODULE_6__classes_Helper__["b" /* Helper */].WEBSERVER_URL + encodeURI(task.imgFileName);
                            setTimeout(function () {
                                fileTransfer.download(url, dataDirectory + task.outputName)
                                    .then(function () {
                                    if (!createThumbs) {
                                        callback();
                                        return;
                                    }
                                    fileManager.readAsDataURL(dataDirectory, task.outputName)
                                        .then(function (dataURI) {
                                        resizedataURL(dataURI, 120, 120)
                                            .then(function (resizedBase64) {
                                            saveThumb(that.getLocalThumbFileName(task.imgFileName), resizedBase64, fileManager);
                                            callback();
                                        })
                                            .catch(function (error) {
                                            console.error("saveThumb error " + JSON.stringify(error));
                                            callback();
                                        });
                                    }, function (error) {
                                        console.error("readAsDataURL error: " + JSON.stringify(error));
                                        callback();
                                    })
                                        .catch(function (error) {
                                        console.error("readAsDataURL error: " + JSON.stringify(error));
                                        callback();
                                    });
                                })
                                    .catch(function (error) {
                                    console.error("Error downloading image " + task.imgFileName);
                                    callback();
                                });
                            }, 50);
                        }, 8);
                        promise = new Promise(function (success, error) {
                            promiseError = error;
                            _this.downloadQueue.drain = success;
                        });
                        _loop_1 = function () {
                            var imgFileName, outputName, file, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        imgFileName = urls[i];
                                        // No image in task
                                        if (!imgFileName || imgFileName.trim() === "" || imgFileName.toLowerCase() === "null") {
                                            return [2 /*return*/, "continue"];
                                        }
                                        outputName = this_1.getLocalFileName(imgFileName);
                                        file = void 0;
                                        _a = !skipCheckForExistingFiles;
                                        if (!_a) return [3 /*break*/, 2];
                                        _b = null;
                                        return [4 /*yield*/, this_1.fileManager.getFile(this_1.dataDirectory, outputName, { create: false })
                                                .then(function (res) { return res; }, function (err) { return null; })];
                                    case 1:
                                        _a = _b !== (file = _c.sent());
                                        _c.label = 2;
                                    case 2:
                                        if (_a) {
                                            file.file(function (file) {
                                                if (file.size <= 0) {
                                                    // Path not empty and file does not exist - download from url
                                                    _this.downloadQueue.push({
                                                        fileTransfer: fileTransfer,
                                                        imgFileName: imgFileName,
                                                        outputName: outputName,
                                                        callback: urls.length == 1 ? progressCallback : null
                                                    }, function () {
                                                        console.log("Finished downloading " + outputName);
                                                    });
                                                }
                                                else {
                                                    alreadyDownloaded++;
                                                    if (progressCallback) {
                                                        console.log("Already downloaded: " + outputName);
                                                        progressCallback(alreadyDownloaded, totalDownload, imgFileName);
                                                    }
                                                }
                                            }, function (error) {
                                                // file could not be read
                                                _this.downloadQueue.push({
                                                    fileTransfer: fileTransfer,
                                                    imgFileName: imgFileName,
                                                    outputName: outputName,
                                                    callback: urls.length == 1 ? progressCallback : null
                                                }, function () {
                                                    console.log("Finished downloading " + outputName);
                                                });
                                            });
                                        }
                                        else {
                                            // Path not empty and file does not exist - download from url
                                            console.log("Adding to download queue: " + outputName);
                                            this_1.downloadQueue.push({
                                                fileTransfer: fileTransfer,
                                                imgFileName: imgFileName,
                                                outputName: outputName,
                                                callback: urls.length == 1 ? progressCallback : null
                                            }, function () {
                                                console.log("Finished downloading " + outputName);
                                            });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < urls.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (this.downloadQueue.length() === 0) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, promise];
                }
            });
        });
    };
    ImagesService.prototype.getLocalFileName = function (imgPath, isMapTile) {
        if (isMapTile === void 0) { isMapTile = false; }
        if (imgPath.indexOf('http') === 0) {
            // strip hostname
            imgPath = imgPath.substring(imgPath.indexOf('/', 9) + 1);
            var queryIndex = imgPath.indexOf('?');
            if (queryIndex > 0) {
                // strip query
                imgPath = imgPath.substring(0, queryIndex);
            }
        }
        return isMapTile ? 'tiles/' + imgPath.replace('v4/mapbox.streets/', '') :
            imgPath.replace(/\/| |@/g, '_');
    };
    ImagesService.prototype.getLocalThumbFileName = function (imgPath) {
        return 'thumb_' + this.getLocalFileName(imgPath);
    };
    ImagesService.prototype.getOfflineURL = function (imgPath, asThumbNail, isMapTile, asRawString) {
        if (asThumbNail === void 0) { asThumbNail = false; }
        if (isMapTile === void 0) { isMapTile = false; }
        if (asRawString === void 0) { asRawString = false; }
        if (asThumbNail) {
            return this.offlineThumbnailUrlCache[imgPath] ? this.fixUrlForWebview(this.offlineThumbnailUrlCache[imgPath])
                : this.fixUrlForWebview(this.offlineThumbnailUrlCache[imgPath] =
                    (this.nativeBaseURL ? this.nativeBaseURL + this.getLocalThumbFileName(imgPath)
                        : this.getOnlineURL(imgPath)));
        }
        if (asRawString) {
            return this.offlineImageUrlCache[imgPath] ? this.offlineImageUrlCache[imgPath]
                : this.offlineImageUrlCache[imgPath] =
                    (this.nativeBaseURL ? this.nativeBaseURL + this.getLocalFileName(imgPath, isMapTile)
                        : this.getOnlineURL(imgPath));
        }
        return this.offlineImageUrlCache[imgPath] ? this.fixUrlForWebview(this.offlineImageUrlCache[imgPath])
            : this.fixUrlForWebview(this.offlineImageUrlCache[imgPath] =
                (this.nativeBaseURL ? this.nativeBaseURL + this.getLocalFileName(imgPath, isMapTile)
                    : this.getOnlineURL(imgPath)));
    };
    ImagesService.prototype.getOnlineURL = function (imgPath) {
        return imgPath.indexOf('http') !== 0 ? __WEBPACK_IMPORTED_MODULE_6__classes_Helper__["b" /* Helper */].WEBSERVER_URL + imgPath : imgPath;
    };
    ImagesService.prototype.fixUrlForWebview = function (url) {
        if (!this.platform.is('cordova'))
            return url;
        var fixedUrl = window.Ionic.WebView.convertFileSrc(url);
        //FIXME: needs a more reliable check if url can be used as is or needs a security trust bypass
        if (fixedUrl.includes('mcm_images_tasks')) {
            fixedUrl = this.sanitizer.bypassSecurityTrustUrl(fixedUrl);
        }
        return fixedUrl;
    };
    ImagesService.prototype.removeDownloadedURLs = function (urls, removeThumbs) {
        if (removeThumbs === void 0) { removeThumbs = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _loop_2, this_2, i;
            return __generator(this, function (_a) {
                if (!this.dataDirectory) {
                    return [2 /*return*/];
                }
                _loop_2 = function () {
                    var imgFileName = urls[i];
                    // No image in task
                    if (imgFileName.trim() === "" || imgFileName.toLowerCase() === "null") {
                        return "continue";
                    }
                    var outputName = this_2.getLocalFileName(imgFileName);
                    this_2.fileManager.getFile(this_2.dataDirectory, outputName, { create: false }).then(function (file) {
                        file.remove(function () { return console.log("deleted file " + outputName); }, function () { return console.log("could not delete file " + outputName); });
                    }, function () { return console.log("could not delete file " + outputName); });
                    if (removeThumbs) {
                        outputName = this_2.getLocalThumbFileName(imgFileName);
                        this_2.fileManager.getFile(this_2.dataDirectory, outputName, { create: false }).then(function (file) {
                            file.remove(function () { return console.log("deleted file " + outputName); }, function () { return console.log("could not delete file " + outputName); });
                        }, function () { return console.log("could not delete file " + outputName); });
                    }
                };
                this_2 = this;
                for (i = 0; i < urls.length; i++) {
                    _loop_2();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * @param {string} imgPath
     * @param {string} imageSize 's', 'thumb', 'xl' or 'xxl'
     * @returns {Promise<string>}
     */
    ImagesService.prototype.getAsyncImageURL = function (imgPath, imageSize) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var lastSlashIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (imageSize) {
                            lastSlashIndex = imgPath.lastIndexOf('/');
                            imgPath = imgPath.substring(0, lastSlashIndex) + '/' + imageSize + imgPath.substring(lastSlashIndex);
                        }
                        if (this.lazyLoadedImagesCache[imgPath]) {
                            return [2 /*return*/, this.lazyLoadedImagesCache[imgPath]];
                        }
                        if (!this.dataDirectory) return [3 /*break*/, 2];
                        // we need to check for downloaded files
                        return [4 /*yield*/, new Promise(function (success) {
                                _this.downloadURLs([imgPath], false, function (alreadyDownloaded, totalDownload, url) {
                                    if (url == imgPath) {
                                        success();
                                    }
                                    return false;
                                }, false);
                            })];
                    case 1:
                        // we need to check for downloaded files
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.lazyLoadedImagesCache[imgPath] = this.getOfflineURL(imgPath)];
                }
            });
        });
    };
    ImagesService.prototype.downloadAndUnzip = function (route, progressCallback, tileCallback) {
        return __awaiter(this, void 0, void 0, function () {
            var url, downloadRequest, dataDirectory, pathToFileInString;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window.JJzip) {
                            // JJZip is only available on native platforms. In browser we don't need to download
                            return [2 /*return*/];
                        }
                        url = __WEBPACK_IMPORTED_MODULE_6__classes_Helper__["b" /* Helper */].WEBSERVER_URL + 'mcm_maps/' + route.mapFileName;
                        downloadRequest = this.transfer.create();
                        dataDirectory = this.fileManager.dataDirectory;
                        pathToFileInString = dataDirectory + route.mapFileName;
                        return [4 /*yield*/, new Promise(function (success, error) {
                                downloadRequest.onProgress(function (progress) {
                                    if (progress.loaded && progress.total && progress.loaded < progress.total) {
                                        if (progress.total > 0) {
                                            if (progressCallback(Math.round(100 * (progress.loaded / progress.total)))) {
                                                error('download was canceled');
                                                downloadRequest.abort();
                                            }
                                        }
                                    }
                                });
                                downloadRequest.download(url, pathToFileInString).then(function (result) {
                                    window.JJzip.unzip(pathToFileInString, { target: dataDirectory + '/tiles' }, function (data) {
                                        /* Wow everything goes good, but just in case verify data.success */
                                        console.log("victory");
                                        console.log("victory " + JSON.stringify(data));
                                        success();
                                    }, function (error) {
                                        /* Wow something goes wrong, check the error.message */
                                        console.log("no victory :(((");
                                        console.log(error);
                                    });
                                }, error).catch(function (err) { console.log("ERROR DOWNLOADING: ", err); });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImagesService = ImagesService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ImagesService);
    return ImagesService;
    var ImagesService_1;
}());

//# sourceMappingURL=images-service.js.map

/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Task; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typeorm__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Route__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Task2Route__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_images_service__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Task = /** @class */ (function () {
    function Task() {
    }
    Task_1 = Task;
    Task.prototype.getImageURL = function (asRawString) {
        if (asRawString === void 0) { asRawString = false; }
        return __WEBPACK_IMPORTED_MODULE_4__services_images_service__["a" /* ImagesService */].INSTANCE.getOfflineURL(this.image, undefined, undefined, asRawString);
    };
    Task.prototype.getSingleQuotedImageURL = function () {
        return "'" + this.getImageURL() + "'";
    };
    Task.prototype.getImagesForDownload = function () {
        var result = [];
        // Add title image
        if (this.image) {
            result.push(this.image);
        }
        // Add sample solution image if available
        var sampleSolutionImg = this.getSolutionSampleImgSrc();
        if (sampleSolutionImg != "") {
            result.push(sampleSolutionImg);
        }
        if (this.subtasks) {
            for (var _i = 0, _a = this.subtasks; _i < _a.length; _i++) {
                var subtask = _a[_i];
                result = result.concat(subtask.getImagesForDownload());
            }
        }
        // Add hint images
        return result.concat(this.getHints().filter(function (hint) {
            return hint.type == 'image' && hint.value && hint.value.trim();
        }).map(function (hint) { return hint.value.trim(); }));
    };
    Task.prototype.getSolutionOptionList = function () {
        if (this.solutionType == 'multiple_choice') {
            var multipleChoiceSolutionList_1 = [];
            var temp = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.solution);
            temp[0].forEach(function (element) {
                multipleChoiceSolutionList_1.push({ userChecked: false, rightAnswer: false, value: element });
            });
            temp[1].forEach(function (element) {
                multipleChoiceSolutionList_1[element].rightAnswer = true;
            });
            console.log(multipleChoiceSolutionList_1);
            return multipleChoiceSolutionList_1;
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.solution);
        }
    };
    Task.prototype.getSolution = function () {
        var solution = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.solution);
        if (this.solutionType === "vector_values" || this.solutionType === "vector_intervals" || this.solutionType === 'set' || this.solutionType === 'blanks') {
            return solution;
        }
        if (this.solutionType != 'multiple_choice') {
            return solution[0];
        }
        else {
            var solutionArray = this.getSolutionOptionList();
            var solutionText = "";
            for (var i = 0; i < solutionArray.length; i++) {
                if (solutionArray[i].rightAnswer) {
                    if (solutionText != "") {
                        solutionText = solutionText + ", ";
                    }
                    solutionText = solutionText + solutionArray[i].value;
                }
            }
            return solutionText;
        }
    };
    Task.prototype.getSolutionList = function () {
        var solution = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.solution);
        var results = [];
        solution.forEach(function (element) {
            results.push(+element);
        });
        return results;
    };
    /*
    Returns details of gps task.
    Keys:
    task - type of gps task (e.g. centerTwo, centerThree, linearFx, square, lineNoDirection, lineDirection, triangle)
    points - the number of points the user has to place to solve the task (also number of buttons to display on map)
    setPoints - the number of points the author had to define in the web portal. The system needs to validate the solution
    against these points.
    point1 (point2, point3 ... etc.) - depending on the number of 'setPoints' there are [lat, lon] arrays saved behind the keys
     */
    Task.prototype.getSolutionGpsValue = function (key) {
        if (this.solutionType == "gps") {
            var solution = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.solution);
            return solution[key];
        }
        else {
            return null;
        }
    };
    Task.prototype.getSolutionSample = function () {
        if (this.solutionSample) {
            var sample = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.solutionSample);
            if (sample.length > 0) {
                return sample[0];
            }
        }
        return "";
    };
    /*
    Returns the src of sample solution image if provided, empty string if not
     */
    Task.prototype.getSolutionSampleImgSrc = function () {
        if (this.solutionSample) {
            var sample = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.solutionSample);
            if (sample.length > 0) {
                return (sample[1] != null) ? sample[1] : "";
            }
        }
        else {
            return "";
        }
    };
    Task.prototype.getAssistiveEquipment = function () {
        if (this.assistiveEquipment) {
            var json = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.assistiveEquipment);
            if (json == null) {
                return new Array();
            }
            return json;
        }
        else {
            return new Array();
        }
    };
    Task.prototype.getHint = function (index) {
        var hint = this.getHintObject(index);
        if (hint) {
            return hint;
        }
        return null;
    };
    Task.prototype.hasHintMessage = function (index) {
        var hint = this.getHint(index);
        if (!hint)
            return;
        else {
            if (hint.value)
                return true;
            else
                return false;
        }
    };
    Task.prototype.getHintObject = function (index) {
        var hint;
        switch (index) {
            case 1:
                hint = this.hint1;
                break;
            case 2:
                hint = this.hint2;
                break;
            case 3:
                hint = this.hint3;
                break;
        }
        if (hint && hint.length > 0) {
            var array = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(hint);
            if (array.length >= 2) {
                return {
                    type: array[0],
                    value: array[1]
                };
            }
        }
        return null;
    };
    Task.prototype.getHints = function () {
        var result = [];
        for (var i = 1; i <= 3; i++) {
            var hint = this.getHintObject(i);
            if (hint) {
                result.push(hint);
            }
        }
        return result;
    };
    Task.prototype.isAttrObject = function () {
        if (this.attr == null) {
            return false;
        }
        try {
            JSON.parse(this.attr);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    Task.prototype.hasSideFacts = function () {
        // make sure the attr field is available (old tasks dont have one)
        if (!this.isAttrObject()) {
            return false;
        }
        var attr = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.attr);
        if (attr.hasOwnProperty('side_facts')) {
            var side_facts = attr.side_facts;
            if (side_facts.hasOwnProperty('text')) {
                return side_facts.text != "";
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    Task.prototype.getSideFactsText = function () {
        if (this.hasSideFacts()) {
            var attr = __WEBPACK_IMPORTED_MODULE_2__classes_Helper__["b" /* Helper */].safeJsonDecode(this.attr);
            return attr.side_facts.text;
        }
        else {
            return "";
        }
    };
    Task.prototype.getSubtasksInOrder = function () {
        return this.subtasks.sort(function (a, b) {
            if (a.position > b.position)
                return 1;
            if (a.position < b.position)
                return -1;
            return 0;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["h" /* PrimaryGeneratedColumn */])({ name: '_id' }),
        __metadata("design:type", Number)
    ], Task.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'user_id' }),
        __metadata("design:type", Number)
    ], Task.prototype, "userId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 1 }),
        __metadata("design:type", String)
    ], Task.prototype, "public", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", Number)
    ], Task.prototype, "lat", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", Number)
    ], Task.prototype, "lon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "description", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "image", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'solution_type' }),
        __metadata("design:type", String)
    ], Task.prototype, "solutionType", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "solution", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "hint1", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "hint2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "hint3", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'assistive_equipment' }),
        __metadata("design:type", String)
    ], Task.prototype, "assistiveEquipment", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "author", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "mail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 2 }),
        __metadata("design:type", String)
    ], Task.prototype, "grade", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "tags", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'create_date' }),
        __metadata("design:type", String)
    ], Task.prototype, "createDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "timestamp", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Task.prototype, "attr", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'solutionsample' }),
        __metadata("design:type", String)
    ], Task.prototype, "solutionSample", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'lang_code' }),
        __metadata("design:type", String)
    ], Task.prototype, "langCode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'position' }),
        __metadata("design:type", Number)
    ], Task.prototype, "position", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["d" /* ManyToMany */])(function (type) { return __WEBPACK_IMPORTED_MODULE_1__Route__["a" /* Route */]; }, function (route) { return route.tasks; }),
        __metadata("design:type", Array)
    ], Task.prototype, "routes", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["g" /* OneToMany */])(function (type) { return __WEBPACK_IMPORTED_MODULE_3__Task2Route__["a" /* Task2Route */]; }, function (task2Route) { return task2Route.task; }),
        __metadata("design:type", Array)
    ], Task.prototype, "task2Routes", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["e" /* ManyToOne */])(function (type) { return Task_1; }, function (task) { return task.subtasks; }),
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["c" /* JoinColumn */])({ name: 'task_id' }),
        __metadata("design:type", Task)
    ], Task.prototype, "task_id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["g" /* OneToMany */])(function (type) { return Task_1; }, function (task) { return task.task_id; }),
        __metadata("design:type", Array)
    ], Task.prototype, "subtasks", void 0);
    Task = Task_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["b" /* Entity */])('mcm_task')
    ], Task);
    return Task;
    var Task_1;
}());

//# sourceMappingURL=Task.js.map

/***/ }),

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DB_Handler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DBC__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_typescript_collections__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_typescript_collections___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_typescript_collections__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_core__ = __webpack_require__(13);
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




var WebSQLObject = /** @class */ (function (_super) {
    __extends(WebSQLObject, _super);
    function WebSQLObject() {
        return _super.call(this, openDatabase('mcm', '1.0', 'MCM DB', 2 * 1024 * 1024)) || this;
    }
    WebSQLObject.prototype.executeSql = function (statement, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._objectInstance.transaction(function (tx) {
                console.debug(statement);
                tx.executeSql(statement, params, function (tx, results) {
                    resolve(results);
                }, function (tx, error) {
                    reject(error);
                });
            });
        });
    };
    return WebSQLObject;
}(__WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__["b" /* SQLiteObject */]));
var WebSQL = /** @class */ (function (_super) {
    __extends(WebSQL, _super);
    function WebSQL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebSQL.prototype.create = function (config) {
        return new Promise(function (resolve, reject) {
            resolve(new WebSQLObject());
        });
    };
    return WebSQL;
}(__WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__["a" /* SQLite */]));
var DB_Handler = /** @class */ (function () {
    function DB_Handler() {
        this.mSQLite = null;
        this.mDB = null;
        this.mReady = false;
        this.cache = {};
    }
    DB_Handler.getInstance = function () {
        if (this.mInstance === null) {
            this.mInstance = new DB_Handler();
        }
        return this.mInstance;
    };
    DB_Handler.prototype.ready = function () {
        var _this = this;
        if (this.mReady) {
            return Promise.resolve();
        }
        return new Promise(function (resolve, reject) {
            _this.mSQLite = Object(__WEBPACK_IMPORTED_MODULE_3__ionic_native_core__["i" /* checkAvailability */])(__WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__["a" /* SQLite */].getPluginRef(), null, __WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__["a" /* SQLite */].getPluginName()) === true ? new __WEBPACK_IMPORTED_MODULE_0__ionic_native_sqlite__["a" /* SQLite */]() : new WebSQL();
            _this.mSQLite.create({
                name: 'mcm_db.sqlite3',
                location: 'default'
            })
                .then(function (db) {
                _this.mDB = db;
                _this.mReady = true;
                console.log('Connected to DB');
                // it's ok to always run onCreate because SQL has IF EXISTS
                _this.onCreate().then(function () {
                    _this.mReady = true;
                    resolve();
                });
            })
                .catch(function (e) {
                console.error('Error connecting to DB', JSON.stringify(e));
                reject(e);
            });
        });
    };
    DB_Handler.prototype.onCreate = function () {
        var _this = this;
        // Create Tables
        var CREATE_STATE_TABLE = __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_STATE.getCreateStatement();
        var CREATE_TASK_TABLE = __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_TASK.getCreateStatement();
        var CREATE_ROUTE_TABLE = __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_ROUTE.getCreateStatement();
        var CREATE_RELROUTETASK_TABLE = __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_RELROUTETASK.getCreateStatement();
        var CREATE_USERS_TABLE = __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_USERS.getCreateStatement();
        var CREATE_SCORE_TABLE = __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_SCORE.getCreateStatement();
        return new Promise(function (resolve, reject) {
            Promise.all([
                _this.mDB.executeSql(CREATE_STATE_TABLE, null),
                _this.mDB.executeSql(CREATE_TASK_TABLE, null),
                _this.mDB.executeSql(CREATE_ROUTE_TABLE, null),
                _this.mDB.executeSql(CREATE_RELROUTETASK_TABLE, null),
                _this.mDB.executeSql(CREATE_USERS_TABLE, null),
                _this.mDB.executeSql(CREATE_SCORE_TABLE, null)
            ]).then(function () {
                resolve();
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    DB_Handler.prototype.initTableVersions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO " + __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DATABASE_TABLE_STATE + " (" + __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_STATE.fields[1] + "," + __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_STATE.fields[2] + ") VALUES (?,?)";
            Promise.all([
                _this.mDB.executeSql(sql, ["version_task", "0"]),
                _this.mDB.executeSql(sql, ["version_route", "0"]),
                _this.mDB.executeSql(sql, ["version_rel_route_task", "0"])
            ]).then(function () {
                resolve();
            }).catch(reject);
        });
    };
    // TODO:
    /*
    Get the table versions in a hashmap
     */
    DB_Handler.prototype._getTableVersions = function (data) {
        var result = new __WEBPACK_IMPORTED_MODULE_2_typescript_collections__["Dictionary"]();
        for (var i = 0; i < data.rows.length; i++) {
            var row = data.rows.item(i);
            result.setValue(row.option, row.value);
        }
        return result;
    };
    DB_Handler.prototype.getDB = function () {
        return this.mDB;
    };
    DB_Handler.prototype.getTableVersions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sqlQuery = "SELECT " + __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_STATE.fields[1] + "," + __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DB_STATE.fields[2] + " FROM " + __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DATABASE_TABLE_STATE;
            _this.mDB.executeSql(sqlQuery, [])
                .then(function (result) {
                console.log("TABLE VERSIONS:", result.rows.length);
                // console.log(JSON.stringify(result.rows.item(1).option))
                if (result.rows.length < 3) {
                    console.warn("ZERO RESULTS: call initTableVersions");
                    _this.initTableVersions().then(function () {
                        console.log("RECEIVED RESULTS, REPEATING SQL");
                        _this.mDB.executeSql(sqlQuery, []).then(function (result) {
                            console.log("RECEIVED RESULTS", result.rows.length);
                            resolve(_this._getTableVersions(result));
                        }).catch(reject);
                    }).catch(reject);
                }
                else {
                    // we have results
                    resolve(_this._getTableVersions(result));
                }
            })
                .catch(function (error) {
                console.error("DB_Handler.getTableVersions(): Error:", error);
                reject(error);
            });
        });
    };
    //  Wird im ImageDownloader verwendet, dieser benötigt von allen Trails die Infos public und image
    // 15.05.18 - Select only public trails
    DB_Handler.prototype.getTrailsImageInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.mDB.executeSql("SELECT public,image FROM " + __WEBPACK_IMPORTED_MODULE_1__DBC__["a" /* DBC */].DATABASE_TABLE_ROUTE + " WHERE public = 1", null)
                .then(function (result) {
                var info = null;
                for (var i = 0; i < result.rows.length; i++) {
                    var item = [result.rows.item(i).public, result.rows.item(i).image];
                    if (info === null) {
                        info = [item];
                    }
                    else {
                        info.push(item);
                    }
                }
                resolve(info);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DB_Handler.mInstance = null;
    return DB_Handler;
}());

//# sourceMappingURL=DB_Handler.js.map

/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DBC; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typescript_collections__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typescript_collections___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_typescript_collections__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DBC_Plan__ = __webpack_require__(1092);


var DBC = /** @class */ (function () {
    function DBC() {
    }
    DBC.initialize = function () {
        if (DBC.MAP_DB === null) {
            DBC.MAP_DB = new __WEBPACK_IMPORTED_MODULE_0_typescript_collections__["Dictionary"]();
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_REL_ROUTE_TASK, DBC.DB_RELROUTETASK);
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_ROUTE, DBC.DB_ROUTE);
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_STATE, DBC.DB_STATE);
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_TASK, DBC.DB_TASK);
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_USERS, DBC.DB_USERS);
            DBC.MAP_DB.setValue(DBC.DATABASE_TABLE_SCORE, DBC.DB_SCORE);
        }
    };
    DBC.DATABASE_NAME = "mcm_app";
    DBC.DATABASE_VERSION = 32;
    // // Table names (For table definitions look at the corresponding classes DBC_tablename)
    DBC.DATABASE_TABLE_STATE = "mcm_state";
    DBC.DATABASE_TABLE_TASK = "mcm_task";
    DBC.DATABASE_TABLE_TASKMETA = "mcm_task_meta";
    DBC.DATABASE_TABLE_ROUTE = "mcm_route";
    DBC.DATABASE_TABLE_ROUTEMETA = "mcm_route_meta";
    DBC.DATABASE_TABLE_REL_ROUTE_TASK = "mcm_rel_route_task";
    DBC.DATABASE_TABLE_USERS = "mcm_users";
    DBC.DATABASE_TABLE_SCORE = "mcm_score";
    // // Option Names for STATE DB
    DBC.ON_ROUTE_DATA = "route_id_data_dl";
    DBC.ON_ROUTE_DONE = "route_id_done";
    DBC.ON_ROUTE_PRIVATE_ACCESS = "route_id_private_access";
    DBC.ON_TASK_HINT1_TAKEN = "task_id_hint1_taken";
    DBC.ON_TASK_HINT2_TAKEN = "task_id_hint2_taken";
    DBC.ON_TASK_HINT3_TAKEN = "task_id_hint3_taken";
    DBC.ON_TASK_SOLVED = "task_id_solved";
    DBC.ON_TASK_SOLVED_LOW = "task_id_solved_low";
    DBC.ON_ACTIVE_USER = "active_user";
    DBC.ON_GAMIFICATION = "gamification";
    // /* TABLE DEFINITIONS */
    // // DB_STATE
    DBC.DB_STATE = new __WEBPACK_IMPORTED_MODULE_1__DBC_Plan__["a" /* DBC_Plan */](DBC.DATABASE_TABLE_STATE, [
        "_id",
        "option",
        "value",
        "timestamp"
    ], [
        "INTEGER",
        "VARCHAR",
        "VARCHAR",
        "TIMESTAMP"
    ], [
        "PRIMARY KEY AUTOINCREMENT",
        "(64) NOT NULL",
        "(256) NOT NULL",
        "NOT NULL DEFAULT CURRENT_TIMESTAMP"
    ]);
    // //DB_TASK
    DBC.DB_TASK = new __WEBPACK_IMPORTED_MODULE_1__DBC_Plan__["a" /* DBC_Plan */](DBC.DATABASE_TABLE_TASK, [
        "_id",
        "user_id",
        "public",
        "lat",
        "lon",
        "title",
        "description",
        "image",
        "solution_type",
        "solution",
        "hint1",
        "hint2",
        "hint3",
        "assistive_equipment",
        "author",
        "mail",
        "grade",
        "tags",
        "timestamp",
        "solutionsample",
        "attr",
        "create_date",
        "lang_code",
        "visible",
        "task_id",
        "position"
    ], [
        "INTEGER",
        "INTEGER",
        "VARCHAR",
        "VARCHAR",
        "VARCHAR",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "VARCHAR",
        "TEXT",
        "TIMESTAMP",
        "TEXT",
        "TEXT",
        "TIMESTAMP",
        "VARCHAR",
        "INTEGER",
        "INTEGER",
        "INTEGER"
    ], [
        "PRIMARY KEY AUTOINCREMENT",
        "NOT NULL",
        "(1) NOT NULL",
        "(64) NOT NULL",
        "(64) NOT NULL",
        "NOT NULL",
        "NOT NULL",
        "",
        "NOT NULL",
        "NOT NULL",
        "",
        "",
        "",
        "",
        "",
        "",
        "(2) NOT NULL DEFAULT '13'",
        "",
        "NOT NULL DEFAULT CURRENT_TIMESTAMP",
        "NOT NULL",
        "",
        "NOT NULL",
        "(2)",
        "(1) NOT NULL DEFAULT 1",
        "",
        ""
    ]);
    // DB_ROUTE
    DBC.DB_ROUTE = new __WEBPACK_IMPORTED_MODULE_1__DBC_Plan__["a" /* DBC_Plan */](DBC.DATABASE_TABLE_ROUTE, [
        "_id",
        "user_id",
        "public",
        "title",
        "country_code",
        "city",
        "image",
        "code",
        "grade",
        "tags",
        "duration",
        "length",
        "bounding_box",
        "center",
        "timestamp",
        "description",
        "create_date",
        "attr",
        "lang_code",
        "map_version",
        "map_filename",
        "map_date",
        "path_geojson",
        "path_info",
        "min_zoom"
    ], [
        "INTEGER",
        "INTEGER",
        "VARCHAR",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "VARCHAR",
        "TEXT",
        "VARCHAR",
        "VARCHAR",
        "VARCHAR",
        "TEXT",
        "TEXT",
        "TIMESTAMP",
        "TEXT",
        "TIMESTAMP",
        "TEXT",
        "VARCHAR",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "TEXT",
        "INTEGER"
    ], [
        "PRIMARY KEY AUTOINCREMENT",
        "NOT NULL",
        "(1) NOT NULL",
        "NOT NULL",
        "NOT NULL",
        "NOT NULL",
        "",
        "(64)",
        "(64)",
        "",
        "(64)",
        "(64)",
        "",
        "",
        "NOT NULL DEFAULT CURRENT_TIMESTAMP",
        "",
        "NOT NULL",
        "",
        "(2)",
        "",
        "",
        "",
        "",
        "",
        ""
    ]);
    // // DB_RELROUTETASK
    DBC.DB_RELROUTETASK = new __WEBPACK_IMPORTED_MODULE_1__DBC_Plan__["a" /* DBC_Plan */](DBC.DATABASE_TABLE_REL_ROUTE_TASK, [
        "_id",
        "route_id",
        "task_id",
        "timestamp"
    ], [
        "INTEGER",
        "INTEGER",
        "INTEGER",
        "TIMESTAMP"
    ], [
        "PRIMARY KEY AUTOINCREMENT",
        "(64) NOT NULL",
        "(64) NOT NULL",
        "NOT NULL DEFAULT CURRENT_TIMESTAMP"
    ]);
    // // DB_USERS
    DBC.DB_USERS = new __WEBPACK_IMPORTED_MODULE_1__DBC_Plan__["a" /* DBC_Plan */](DBC.DATABASE_TABLE_USERS, [
        "_id",
        "name",
        "create_date"
    ], [
        "INTEGER",
        "VARCHAR",
        "TIMESTAMP"
    ], [
        "PRIMARY KEY AUTOINCREMENT",
        "(32) NOT NULL",
        "NOT NULL DEFAULT CURRENT_TIMESTAMP"
    ]);
    // // DB_SCORE
    DBC.DB_SCORE = new __WEBPACK_IMPORTED_MODULE_1__DBC_Plan__["a" /* DBC_Plan */](DBC.DATABASE_TABLE_SCORE, [
        "_id",
        "user_id",
        "route_id",
        "score",
        "tasks_solved",
        "tasks_solved_low",
        "task_details",
        "time",
        "distance"
    ], [
        "INTEGER",
        "INTEGER",
        "INTEGER",
        "INTEGER",
        "TEXT",
        "TEXT",
        "TEXT",
        "INTEGER",
        "INTEGER",
    ], [
        "PRIMARY KEY AUTOINCREMENT",
        "(64) NOT NULL",
        "(64) NOT NULL",
        "(64) NOT NULL",
        "",
        "",
        "",
        "(64)",
        "(64)"
    ]);
    /*
    DB MAP: Tablename -> DB Instance
     */
    DBC.MAP_DB = null;
    return DBC;
}());

DBC.initialize();
//# sourceMappingURL=DBC.js.map

/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMDownloadProgressPopupComponent; });
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


var MCMDownloadProgressPopupComponent = /** @class */ (function () {
    function MCMDownloadProgressPopupComponent(viewCtrl, changeDetectorRef) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.changeDetectorRef = changeDetectorRef;
        this.data = null;
        this.progress = 0;
        this.data = viewCtrl.data;
        this.data.updateView = function () {
            // make sure that angular detects changes
            changeDetectorRef.detectChanges();
            _this.progress = _this.data.currentProgress == 0 ? 0 :
                Math.round((100 / _this.data.total) * _this.data.currentProgress);
        };
    }
    MCMDownloadProgressPopupComponent.prototype.onCancelClick = function () {
        if (this.viewCtrl.data.cancelCallback) {
            this.viewCtrl.data.cancelCallback();
        }
    };
    MCMDownloadProgressPopupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-download-progress-popup',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-download-progress-popup/mcm-download-progress-popup.component.html"*/'<div class="modal card has-button-on-the-edge">\n    <div class="head">\n        <h2>{{data.titleKey | translate}}</h2>\n    </div>\n\n    <div class="modal-content">\n        <ion-grid no-padding>\n            <ion-row>\n                <ion-col>\n                    <!--<div class="container progress-vertical download">-->\n                        <!--<div class="bar" [ngStyle]="{\'width\': ((100/data.total)*data.currentProgress) +\'%\'}"></div>-->\n                    <!--</div>-->\n                    <progress-bar [progress]="progress" [color]="\'#036d99\'"></progress-bar>\n                </ion-col>\n            </ion-row>\n            <!--<ion-row>-->\n                <!--<ion-col col-6>-->\n                    <!--<p *ngIf="data.total != 0">{{((100/data.total)*data.currentProgress).toFixed(0)}}%</p>-->\n                <!--</ion-col>-->\n                <!--<ion-col col-6 text-right>-->\n                    <!--<p class="progress-files">{{ data.currentProgress }} / {{ data.total }}</p>-->\n                <!--</ion-col>-->\n            <!--</ion-row>-->\n        </ion-grid>\n    </div>\n    <div class="on-the-edge-container">\n        <button ion-button small round color="danger" (click)="onCancelClick()">{{ "a_alert_cancel" | translate }}</button>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/components/mcm-download-progress-popup/mcm-download-progress-popup.component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], MCMDownloadProgressPopupComponent);
    return MCMDownloadProgressPopupComponent;
}());

//# sourceMappingURL=mcm-download-progress-popup.component.js.map

/***/ }),

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouteInfo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__ = __webpack_require__(35);
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






var RouteInfo = /** @class */ (function () {
    function RouteInfo(navParams, ormService, viewCtrl, alertCtrl, navCtrl, translateService) {
        this.navParams = navParams;
        this.ormService = ormService;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.translateService = translateService;
        this.currentProgress = 0;
    }
    RouteInfo.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var routeId, _a, _b, _c, score, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        routeId = this.navParams.get('routeId');
                        _a = this;
                        _b = this.viewCtrl.data;
                        return [4 /*yield*/, this.ormService.findRouteById(routeId)];
                    case 1:
                        _a.route = _b.route = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this.route.getTaskCount()];
                    case 2:
                        _c.totalTasks = _f.sent();
                        _e = (_d = this.route).getScoreForUser;
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 3:
                        score = _e.apply(_d, [_f.sent()]);
                        this.currentProgress = score.getTasksSolved().length + score.getTasksSolvedLow().length + score.getTasksFailed().length;
                        eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
                        return [2 /*return*/];
                }
            });
        });
    };
    RouteInfo.prototype.doDownload = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var modalsService;
            return __generator(this, function (_a) {
                modalsService = this.viewCtrl.data.modalsService;
                modalsService.doDownload(route);
                return [2 /*return*/];
            });
        });
    };
    RouteInfo.prototype.showRoute = function (route) {
        if (route.downloaded) {
            this.viewCtrl.dismiss({ showRoute: true, route: route });
        }
    };
    RouteInfo.prototype.removeRoute = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormService.removeDownloadedRoute(this.route, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RouteInfo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'route-info',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/RouteInfo/RouteInfo.html"*/'<mcm-header transparent></mcm-header>\n<ion-content class="has-header transparent">\n    <div class="card title" *ngIf="route">\n        <p>{{ route.city }}, {{ route.countryCode }}</p>\n        <h1>{{ route.title }}</h1>\n    </div>\n\n    <div class="image-box" *ngIf="route">\n        <ion-grid>\n            <ion-row align-items-center>\n                <ion-col col-4 class="button-container">\n                    <button ion-button icon-only small round *ngIf="!route.downloaded" (click)="doDownload(route)">\n                        <img src="./assets/icons/download.svg"/>\n                    </button>\n                    <button color="danger" ion-button icon-only small round *ngIf="route.downloaded" (click)="removeRoute(route)">\n                        <img src="./assets/icons/delete.svg"/>\n                    </button>\n                </ion-col>\n                <ion-col class="image-container" lazy-load-images [ngClass]="route.getNarrativeName()">\n                    <div class="cover">\n                        <img class="thumb lazy" [attr.data-async-src]="route.getImageURL()" onerror="this.style.opacity=\'0\'" />\n                    </div>\n                    <div class="indicator" *ngIf="route.isNarrativeEnabled()">\n                        <h3 no-margin>{{\'p_narrative_names_\' + route.getNarrativeName() | translate}}</h3>\n                        <img class="background" src="./assets/images/{{route.getNarrativeName()}}/indicator-label.svg" />\n                    </div>\n                </ion-col>\n\n                <!--TODO Sharing coming soon near your area-->\n                <ion-col col-4 class="button-container">\n                    <!--<button ion-button icon-only small round (click)="share(route)">-->\n                        <!--<img src="./assets/icons/share.svg"/>-->\n                    <!--</button>-->\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n\n    <div class="card text-center basic-info">\n        <ion-grid no-padding>\n            <ion-row align-items-center>\n                <ion-col>\n                    <div class="info-item">\n                        <ion-label>{{ "a_t_grade" | translate }}</ion-label>\n                        <span *ngIf="route">{{ route.grade }}</span>\n                    </div>\n                    <div class="info-item border">\n                        <ion-label>{{ "a_t_distance" | translate }}</ion-label>\n                        <span *ngIf="route"> {{route.getDistance() | distance: \'m\'}} </span>\n                    </div>\n                </ion-col>\n\n                <ion-col>\n                    <div class="info-item">\n                        <ion-label>{{ "p_r_duration" | translate }}</ion-label>\n                        <span *ngIf="route">{{ route.duration }}</span>\n                    </div>\n                </ion-col>\n\n                <ion-col>\n                    <div class="info-item">\n                        <ion-label>{{ "p_tb_tasks" | translate }}</ion-label>\n                        <span>{{ totalTasks }}</span>\n                    </div>\n                    <div class="info-item border">\n                        <ion-label>{{ "a_r_length" | translate }}</ion-label>\n                        <span *ngIf="route">{{ route.length }}</span>\n                    </div>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n\n    <div class="card">\n        <ion-label>{{\'current_progress\' | translate}}</ion-label>\n        <mcm-progress-bar *ngIf="route && !route.completed" [route]="route"></mcm-progress-bar>\n        <div class="evaluation" *ngIf="route?.completed && route?.scores.length > 0">\n            <span class="icon finished">{{route.completedDate}}</span>\n            <div *ngIf="route.isAnswerFeedbackEnabled()" class="ratings">\n                <div class="rating perfect"><p>{{route.scores[0].getTasksSolved().length}}</p></div>\n                <div class="rating good"><p>{{route.scores[0].getTasksSolvedLow().length}}</p></div>\n                <div class="rating failed"><p>{{route.scores[0].getTasksFailed().length}}</p></div>\n            </div>\n            <div *ngIf="!route.isAnswerFeedbackEnabled()" class="ratings">\n                <div class="rating saved"><p>{{route.scores[0].getTasksSaved().length}}</p></div>\n            </div>\n        </div>\n    </div>\n\n    <div class="card">\n        <ion-label>{{ \'p_r_about\' | translate }}</ion-label>\n        <p *ngIf="route">{{ route.description }}</p>\n\n        <ion-label>{{ \'a_action_settings\' | translate }}</ion-label>\n        <p *ngIf="route">\n            <ion-row *ngIf="route.code">{{\'a_trailcode\' | translate}}: {{ route.code }}</ion-row>\n            <ion-row>{{ \'p_session_sorting_score\' | translate }}: {{route.getSettingStringValue("gamification", translateService)}}</ion-row>\n            <ion-row>{{ \'t_samplesolution\' | translate }}: {{route.getSettingStringValue("sampleSolution", translateService)}}</ion-row>\n            <ion-row>{{ \'a_hints\' | translate }}: {{route.getSettingStringValue("hints", translateService)}}</ion-row>\n            <ion-row>{{ \'p_r_validation\' | translate }}: {{route.getSettingStringValue("answerValidation", translateService)}}</ion-row>\n            <ion-row>{{ \'p_r_feedback\' | translate }}: {{route.getSettingStringValue("answerFeedback", translateService)}}</ion-row>\n            <ion-row *ngIf="route.isNarrativeEnabled()">{{ \'p_narrative\' | translate }}: {{ \'p_narrative_names_\' + route.getNarrativeName() | translate }}</ion-row>\n            <ion-row *ngIf="!route.isNarrativeEnabled()">{{ \'p_narrative\' | translate }}: {{ \'p_narrative_names_none\' | translate }}</ion-row>\n        </p>\n\n        <div>\n            <ion-label>{{ \'a_r_equip\' | translate }}</ion-label>\n            <p *ngIf="route">{{route.getAssistiveEquipment(translateService)}}</p>\n        </div>\n\n        <div class="path-info" *ngIf="route && route.getPathInfo()">\n            <ion-label>{{ \'a_r_path\' | translate }}</ion-label>\n            <ion-row>\n                <ion-col class="walk">\n                    <ion-icon name="md-walk"></ion-icon>\n                    {{route.getPathInfo()[\'path_walk\'][\'lengthText\']}}\n                </ion-col>\n                <ion-col class="bike">\n                    <ion-icon name="md-bicycle" color="green"></ion-icon>\n                    {{route.getPathInfo()[\'path_bike\'][\'lengthText\']}}\n                </ion-col>\n                <ion-col class="car">\n                    <ion-icon name="md-car" color="red"></ion-icon>\n                    {{route.getPathInfo()[\'path_car\'][\'lengthText\']}}\n                </ion-col>\n                <ion-col class="public">\n                    <ion-icon name="md-train" color="yellow"></ion-icon>\n                    {{route.getPathInfo()[\'path_public\'][\'lengthText\']}}\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col class="sum-label">{{\'a_r_path_sum\' | translate}}</ion-col>\n                <ion-col class="sum-data">{{route.getPathInfo()[\'path_sum\'][\'lengthText\']}}</ion-col>\n            </ion-row>\n        </div>\n\n        <ion-label>{{ \'a_r_tags\' | translate }}</ion-label>\n        <p *ngIf="route">{{ route.tags }}</p>\n    </div>\n\n</ion-content>\n\n<ion-footer>\n    <button class="play" ion-button full block no-margin no-padding large\n            *ngIf="route && (!route.scores || route.scores.length === 0)"\n            [disabled]="!route.downloaded" (click)="showRoute(route)">\n        <img content src="./assets/icons/play.svg"> {{ \'a_r_start\' | translate }}\n    </button>\n    <button class="play" ion-button full block no-margin no-padding large\n            *ngIf="route && (route.scores && route.scores.length > 0)"\n            [disabled]="!route.downloaded" (click)="showRoute(route)">\n        <img content src="./assets/icons/play.svg"> {{ \'a_r_continue\' | translate }}\n    </button>\n</ion-footer>\n\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/RouteInfo/RouteInfo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular_navigation_nav_controller__["a" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], RouteInfo);
    return RouteInfo;
}());

//# sourceMappingURL=RouteInfo.js.map

/***/ }),

/***/ 589:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CenteredTask; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
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



/**
 * Generated class for the RouteInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CenteredTask = /** @class */ (function () {
    // public mustBeColored: boolean;
    function CenteredTask(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.tasks = [];
    }
    CenteredTask.prototype.showRoute = function (route, selectedTask) {
        this.viewCtrl.dismiss({ route: route, selectedTask: selectedTask });
    };
    CenteredTask.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.route = this.navParams.get('route');
                        this.score = this.navParams.get('score');
                        //this.state = this.navParams.get('state');
                        _a = this;
                        return [4 /*yield*/, this.route.getTasks()];
                    case 1:
                        //this.state = this.navParams.get('state');
                        _a.tasks = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CenteredTask.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    CenteredTask = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'centered-task',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/CenteredTask/CenteredTask.html"*/'<div class="modal card task-select has-button-on-the-edge">\n\n    <div class="modal-content">\n        <h2 *ngIf="route">{{route.title}}</h2>\n        <p *ngIf="route"><b>{{ \'a_startAt\' | translate}}</b></p>\n        <div tappable class="dotted-border-bottom"\n             *ngFor="let item of tasks" (click) = "showRoute(route, item)">\n            <!--#{{item.position}} {{item.title}}-->\n            <!--&lt;!&ndash; green &ndash;&gt;<span *ngIf="score.getTasksSolved().indexOf(item.id) > -1" style="color: #4CAF50">#{{item.position}} {{item.title}}</span>-->\n            <!--&lt;!&ndash; red &ndash;&gt;<span *ngIf="score.getTasksFailed().indexOf(item.id) > -1" style="color: #E62B25">#{{item.position}} {{item.title}}</span>-->\n            <!--&lt;!&ndash; yellow &ndash;&gt;<span *ngIf="score.getTasksSolvedLow().indexOf(item.id) > -1" style="color: #F3B100">#{{item.position}} {{item.title}}</span>-->\n            <!--&lt;!&ndash;alles andere&ndash;&gt;<span *ngIf="!(score.getTasksSolved().indexOf(item.id) > -1) && !(score.getTasksFailed().indexOf(item.id) > -1) && !(score.getTasksSolvedLow().indexOf(item.id) > -1)" style="color: black">#{{item.position}} {{item.title}}</span>-->\n            <!-- grau für skipped fehlt noch -->\n            <span\n                    [class.perfect]="(score.getTasksSolved().indexOf(item.id) > -1)"\n                    [class.failed]="(score.getTasksFailed().indexOf(item.id) > -1)"\n                    [class.good]="(score.getTasksSolvedLow().indexOf(item.id) > -1)">\n                    <!--[class.tasksSkippedColor]="(state.skippedTaskIds.indexOf(item.id) > -1)"-->\n                #{{item.position}} {{item.title}}\n            </span>\n        </div>\n    </div>\n\n    <div class="on-the-edge-container">\n        <button ion-button small round (click)="cancel()">{{ "a_alert_cancel" | translate }}</button>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/CenteredTask/CenteredTask.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_view_controller__["a" /* ViewController */]])
    ], CenteredTask);
    return CenteredTask;
}());

//# sourceMappingURL=CenteredTask.js.map

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMTermsAndConditionsModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MCMJoinSessionModal_MCMJoinSessionModal__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(140);
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





var MCMTermsAndConditionsModal = /** @class */ (function () {
    function MCMTermsAndConditionsModal(navParams, modalCtrl, viewCtrl, inAppBrowser) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.inAppBrowser = inAppBrowser;
        this.tacCheckbox = false;
        this.session = this.navParams.data.session;
        this.navCtrl = this.navParams.data.navCtrl;
    }
    MCMTermsAndConditionsModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    MCMTermsAndConditionsModal.prototype.addJoinSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__MCMJoinSessionModal_MCMJoinSessionModal__["a" /* MCMJoinSessionModal */], { session: this.session, navCtrl: this.navCtrl });
                this.cancel();
                modal.present();
                return [2 /*return*/];
            });
        });
    };
    MCMTermsAndConditionsModal.prototype.openTermsAndConditions = function () {
        this.inAppBrowser.create("https://mathcitymap.eu/de/datenschutzerklaerung/", "_blank");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'),
        __metadata("design:type", Object)
    ], MCMTermsAndConditionsModal.prototype, "input", void 0);
    MCMTermsAndConditionsModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-terms-and-conditions-modal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMTermsAndConditionsModal/MCMTermsAndConditionsModal.html"*/'<div class="modal card has-button-on-the-edge">\n    <div class="modal-content">\n        <h2>{{ \'a_terms_and_conditions_title\' | translate }}</h2>\n        <p class="terms" [innerHTML]="\'a_terms_and_conditions_text\' | translate" (click)="openTermsAndConditions()"></p>\n        <ion-item>\n            <ion-label>{{ \'a_terms_and_conditions_checkbox\' | translate }}</ion-label>\n            <ion-checkbox [(ngModel)]="tacCheckbox"></ion-checkbox>\n        </ion-item>\n        <span *ngIf="showError">\n            {{ \'a_private_route_failed\' | translate }}\n        </span>\n    </div>\n\n    <div class="on-the-edge-container">\n        <button ion-button small round color="danger" (click)="cancel()">{{ "a_alert_cancel" | translate }}</button>\n        <button ion-button small round [disabled]="!tacCheckbox" (click)="addJoinSession()" >{{ "a_terms_and_conditions_continue" | translate }}</button>\n    </div>\n</div>'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMTermsAndConditionsModal/MCMTermsAndConditionsModal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
    ], MCMTermsAndConditionsModal);
    return MCMTermsAndConditionsModal;
}());

//# sourceMappingURL=MCMTermsAndConditionsModal.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMJoinSessionModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_modals_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_chat_and_session_service__ = __webpack_require__(113);
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






var MCMJoinSessionModal = /** @class */ (function () {
    function MCMJoinSessionModal(viewCtrl, navParams, ormService, modalsService, sessionService) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.ormService = ormService;
        this.modalsService = modalsService;
        this.sessionService = sessionService;
        this.teamMemberArray = [];
        this.codeInput = false;
        this.session = navParams.data.session;
        this.navCtrl = navParams.data.navCtrl;
    }
    MCMJoinSessionModal.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.input.setFocus();
        }, 150);
    };
    MCMJoinSessionModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    MCMJoinSessionModal.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var route, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.teamMemberNames != null && this.teamMemberNames != "") {
                            this.teamMemberArray.push(this.teamMemberNames);
                            this.teamMemberNames = "";
                        }
                        return [4 /*yield*/, this.ormService.findRouteById(this.session.trail_id)];
                    case 1:
                        route = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.sessionService.setActiveSession(this.session, this.teamName, this.teamMemberArray)];
                    case 3:
                        _a.sent();
                        this.cancel();
                        return [4 /*yield*/, this.ormService.unlockRoute(route)];
                    case 4:
                        _a.sent();
                        this.modalsService.showRoute(route, this.navCtrl);
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.cancel();
                        this.modalsService.showDialog('a_session_not_available_yet', 'a_session_not_available_yet_text', 'a_g_ok', function () { });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MCMJoinSessionModal.prototype.checkInputField = function () {
        if (this.teamName != "" && this.teamName != null) {
            if (this.teamMemberNames != "" && this.teamMemberNames != null) {
                this.codeInput = true;
            }
            else if (this.teamMemberArray.length != 0) {
                this.codeInput = true;
            }
            else {
                this.codeInput = false;
            }
        }
        else {
            this.codeInput = false;
        }
        return this.codeInput;
    };
    MCMJoinSessionModal.prototype.addTeamMemberName = function (name) {
        if (this.teamMemberNames != "" && this.teamMemberNames != null) {
            this.teamMemberArray.push(name);
            this.teamMemberNames = '';
        }
    };
    MCMJoinSessionModal.prototype.removeTeamMemberName = function (index) {
        this.teamMemberArray.splice(index, 1);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'),
        __metadata("design:type", Object)
    ], MCMJoinSessionModal.prototype, "input", void 0);
    MCMJoinSessionModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-join-session-modal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMJoinSessionModal/MCMJoinSessionModal.html"*/'<div class="modal icon card has-button-on-the-edge">\n    <div class="modal-content">\n        <img class="head-icon" src="./assets/icons/modal-session-join.svg"/>\n        <h2>"{{session.name}}"</h2>\n        <p class="main-text">{{session.welcome_message}}</p>\n\n            <ion-label>{{ "a_team_name" | translate }}</ion-label>\n            <ion-item>\n                <ion-input #input type="text" [(ngModel)]="teamName"></ion-input>\n            </ion-item>\n\n            <div class="input-container">\n                <ion-label>{{ "a_team_members" | translate }}</ion-label>\n                <div class="input-secondary" *ngFor="let teamMember of teamMemberArray; let i = index;">\n                    <ion-item>\n                        <ion-input [disabled]="true" value="{{ teamMember }}"></ion-input>\n                    </ion-item>\n                    <img class="" src="./assets/icons/remove.svg" (click)="removeTeamMemberName(i)"/>\n                </div>\n                <div class="input-main">\n                    <ion-item>\n                        <ion-input #input type="text" [(ngModel)]="teamMemberNames"></ion-input>\n                    </ion-item>\n                    <img class="" src="./assets/icons/add.svg" (click)="addTeamMemberName(teamMemberNames)" />\n                </div>\n            </div>\n\n        <span *ngIf="showError">\n            {{ \'a_private_route_failed\' | translate }}\n        </span>\n    </div>\n\n    <div class="on-the-edge-container">\n        <button ion-button small round color="danger" (click)="cancel()">{{ "a_alert_cancel" | translate }}</button>\n        <button ion-button small round (click)="start()" [disabled]="!checkInputField()">{{ "a_session_enter" | translate }}</button>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMJoinSessionModal/MCMJoinSessionModal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_4__services_modals_service__["a" /* ModalsService */], __WEBPACK_IMPORTED_MODULE_5__services_chat_and_session_service__["a" /* ChatAndSessionService */]])
    ], MCMJoinSessionModal);
    return MCMJoinSessionModal;
}());

//# sourceMappingURL=MCMJoinSessionModal.js.map

/***/ }),

/***/ 634:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export win */
/* unused harmony export YT */
/* unused harmony export Player */
/* unused harmony export defaultSizes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YoutubePlayerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


function win() {
    return window;
}
function YT() {
    return win()['YT'];
}
function Player() {
    return YT().Player;
}
var defaultSizes = {
    height: 270,
    width: 367
};
var YoutubePlayerService = /** @class */ (function () {
    function YoutubePlayerService(zone) {
        this.zone = zone;
        this.ytApiLoaded = false;
        this.createApi();
    }
    YoutubePlayerService.prototype.loadPlayerApi = function (options) {
        var doc = win().document;
        if (!this.ytApiLoaded) {
            this.ytApiLoaded = true;
            var playerApiScript = doc.createElement("script");
            playerApiScript.type = "text/javascript";
            playerApiScript.src = options.protocol + "://www.youtube.com/iframe_api";
            doc.body.appendChild(playerApiScript);
        }
    };
    YoutubePlayerService.prototype.setupPlayer = function (elementId, outputs, sizes, videoId, playerVars) {
        var _this = this;
        if (videoId === void 0) { videoId = ''; }
        var createPlayer = function () {
            if (Player) {
                _this.createPlayer(elementId, outputs, sizes, videoId, playerVars);
            }
        };
        this.api.subscribe(createPlayer);
    };
    YoutubePlayerService.prototype.play = function (player) {
        player.playVideo();
    };
    YoutubePlayerService.prototype.pause = function (player) {
        player.pauseVideo();
    };
    YoutubePlayerService.prototype.playVideo = function (media, player) {
        var id = media.id.videoId ? media.id.videoId : media.id;
        player.loadVideoById(id);
        this.play(player);
    };
    YoutubePlayerService.prototype.isPlaying = function (player) {
        // because YT is not loaded yet 1 is used - YT.PlayerState.PLAYING
        var isPlayerReady = player && player.getPlayerState;
        var playerState = isPlayerReady ? player.getPlayerState() : {};
        var isPlayerPlaying = isPlayerReady
            ? playerState !== YT().PlayerState.ENDED && playerState !== YT().PlayerState.PAUSED
            : false;
        return isPlayerPlaying;
    };
    YoutubePlayerService.prototype.createPlayer = function (elementId, outputs, sizes, videoId, playerVars) {
        var _this = this;
        if (videoId === void 0) { videoId = ''; }
        if (playerVars === void 0) { playerVars = {}; }
        var playerSize = {
            height: sizes.height || defaultSizes.height,
            width: sizes.width || defaultSizes.width
        };
        var ytPlayer = Player();
        return new ytPlayer(elementId, __assign({}, playerSize, { events: {
                onReady: function (ev) {
                    _this.zone.run(function () { return outputs.ready && outputs.ready.next(ev.target); });
                },
                onStateChange: function (ev) {
                    _this.zone.run(function () { return outputs.change && outputs.change.next(ev); });
                }
            }, playerVars: playerVars,
            videoId: videoId }));
    };
    YoutubePlayerService.prototype.toggleFullScreen = function (player, isFullScreen) {
        var height = defaultSizes.height, width = defaultSizes.width;
        if (!isFullScreen) {
            height = window.innerHeight;
            width = window.innerWidth;
        }
        player.setSize(width, height);
    };
    // adpoted from uid
    YoutubePlayerService.prototype.generateUniqueId = function () {
        var len = 7;
        return Math.random().toString(35).substr(2, len);
    };
    YoutubePlayerService.prototype.createApi = function () {
        var _this = this;
        this.api = new __WEBPACK_IMPORTED_MODULE_1_rxjs_ReplaySubject__["ReplaySubject"](1);
        var onYouTubeIframeAPIReady = function () {
            if (win()) {
                _this.api.next(YT());
            }
        };
        win()['onYouTubeIframeAPIReady'] = onYouTubeIframeAPIReady;
    };
    YoutubePlayerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], YoutubePlayerService);
    return YoutubePlayerService;
}());

//# sourceMappingURL=youtube-player.service.js.map

/***/ }),

/***/ 635:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMIconModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_component__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_images_service__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MCMIconModal = /** @class */ (function () {
    function MCMIconModal(params, viewCtrl, platform, imagesService) {
        this.viewCtrl = viewCtrl;
        this.imagesService = imagesService;
        this.gamificationEnabled = false;
        this.narrativeEnabled = false;
        this.windowWith = platform.width();
        this.videoWith = this.windowWith - 80;
        this.videoHeight = this.videoWith * 0.7476923077;
        if (!params.data.modalType) {
            console.warn("Please provide the modalType!");
        }
        else {
            this.modalType = params.data.modalType;
            this.buttons = params.data.buttons;
            if (params.data.title) {
                if (params.data.title === 'hide') {
                    this.title = undefined;
                }
                else {
                    this.title = params.data.title;
                }
            }
            else {
                switch (this.modalType) {
                    case __WEBPACK_IMPORTED_MODULE_2__app_app_component__["a" /* MCMModalType */].hint:
                        this.title = "a_btn_hint1";
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__app_app_component__["a" /* MCMModalType */].error:
                        this.title = "a_alert_false_answer_title";
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__app_app_component__["a" /* MCMModalType */].solved:
                        this.title = "a_alert_right_answer_title";
                        break;
                    case __WEBPACK_IMPORTED_MODULE_2__app_app_component__["a" /* MCMModalType */].solvedLow:
                        this.title = "a_alert_right_answer_title_low";
                        break;
                }
            }
            this.taskDescription = params.data.taskDescription;
            this.message = params.data.message;
            this.messages = params.data.messages;
            this.imageUrl = params.data.imageUrl;
            this.type = params.data.type;
            if (this.type == 'video' && this.message) {
                var parts = this.message.split('v=');
                if (parts.length == 2) {
                    this.videoId = parts[1];
                }
            }
        }
        if (params.data.param) {
            this.param = params.data.param;
        }
        if (params.data.solution) {
            var sol = params.data.solution;
            // let L: any; let K: any; let J: any; let H: any;
            var variables = ["L", "K", "J", "H"];
            if (!this.param) {
                this.param = {};
            }
            for (var i = 0; i < sol.length; i++) {
                var currVar = variables[i];
                this.param[currVar] = params.data.solution[i];
            }
        }
        if (params.data.gamificationEnabled) {
            this.gamificationEnabled = params.data.gamificationEnabled;
        }
        if (params.data.narrativeEnabled) {
            this.narrativeEnabled = params.data.narrativeEnabled;
        }
        if (params.data.narrative) {
            this.narrative = params.data.narrative;
            switch (this.narrative) {
                case 'pirates':
                    this.iconPath = 'pirates/';
                    break;
                default:
                    this.iconPath = '';
            }
        }
        else {
            this.iconPath = '';
        }
        if (params.data.score) {
            this.score = params.data.score;
        }
        this.linkyOptions = {
            replaceFn: function (match) {
                console.log("href = ", match.getAnchorHref());
                console.log("text = ", match.getAnchorText());
                return '<a href="' + match.getAnchorHref() + '">' + match.getAnchorText() + '</a>';
            }
        };
        // replace the ###KEY### in titles and messages
        if (this.narrativeEnabled) {
            for (var key in this.param) {
                this.title = this.title.replace("###" + key + "###", this.param[key]);
                this.message = this.message.replace("###" + key + "###", this.param[key]);
            }
        }
    }
    MCMIconModal.prototype.ionViewDidEnter = function () {
        eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
    };
    MCMIconModal.prototype.dismiss = function (backToMap) {
        if (backToMap) {
            this.viewCtrl.dismiss({ showMap: true });
        }
        else {
            this.viewCtrl.dismiss();
        }
    };
    MCMIconModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-icon-modal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMIconModal/MCMIconModal.html"*/'<div class="modal card icon has-button-on-the-edge" [ngClass]="{\'no-icon\': type != \'image\', \'no-icon\' : modalType == 4 || modalType == 8, \'hint\': modalType == 1,\'failed\': modalType == 2, \'perfect\': modalType == 3, \'good\': modalType == 5}">\n\n     <div class="modal-content" *ngIf="modalType != 4">\n        <img class="head-icon" *ngIf="modalType == 1 && type != \'image\' && type != \'video\'" src="./assets/icons/{{iconPath}}modal-hint.svg"/>\n        <img class="head-icon" *ngIf="modalType == 2" src="./assets/icons/{{iconPath}}modal-rating-failed.svg"/>\n        <img class="head-icon" *ngIf="modalType == 3" src="./assets/icons/{{iconPath}}modal-rating-perfect.svg"/>\n        <img class="head-icon" *ngIf="modalType == 5" src="./assets/icons/{{iconPath}}modal-rating-good.svg"/>\n        <img class="head-icon" *ngIf="modalType == 6" src="./assets/icons/{{iconPath}}modal-rating-saved.svg"/>\n        <img class="head-icon" *ngIf="modalType == 7" src="./assets/icons/{{iconPath}}modal-subtask-info.svg" />\n        <h2>{{title | translate}}</h2>\n\n        <!-- image hint -->\n        <mcm-image *ngIf=" type == \'image\' " [src]="message" [offline]="true" [fullWidth]="true" [photoViewer]="true"></mcm-image>\n\n        <!-- video hint -->\n        <youtube-player *ngIf="modalType == 1 && videoId" [videoId]="videoId" [width]="videoWith" [height]="videoHeight"></youtube-player>\n\n         <h3 class="in-icon-modal score" *ngIf="gamificationEnabled && score && score != \'0\'" [linkedInnerHtml]=" score | translate: param | linky: linkyOptions "></h3>\n\n        <!-- text hint -->\n        <p text-center *ngIf="modalType == 1 && type == \'text\' ||  modalType == 2 ||  modalType == 3 ||  modalType == 5 || modalType == 6 || modalType == 7" [linkedInnerHtml]=" message | translate: param | linky: linkyOptions "></p>\n\n    </div>\n    <div class="modal-content" *ngIf="modalType == 4">\n        <img class="head-icon" *ngIf="!imageUrl && modalType != 4" src="./assets/icons/modal-rating-perfect.svg"/>\n        <h2>{{title | translate}}</h2>\n\n        <!-- image hint -->\n        <mcm-image class="full-width" *ngIf="imageUrl" [src]="imageUrl" [offline]="true" [fullWidth]="true" [photoViewer]="true"></mcm-image>\n\n        <!-- text hint --><p *ngFor="let message of messages" [linkedInnerHtml]=" message | translate: param | linky: linkyOptions"></p>\n\n    </div>\n\n    <div class="on-the-edge-container">\n        <button *ngFor="let button of buttons" [ngClass]="{\'col-33\': buttons.length > 2}" ion-button small round (click)="button.callback()">{{ button.title | translate }}</button>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMIconModal/MCMIconModal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__["a" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular_navigation_view_controller__["a" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__services_images_service__["a" /* ImagesService */]])
    ], MCMIconModal);
    return MCMIconModal;
}());

//# sourceMappingURL=MCMIconModal.js.map

/***/ }),

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tilesDb; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_images_service__ = __webpack_require__(45);
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


var storageInstance;
var tilesDb = {
    storage: null,
    initialize: function () {
        if (storageInstance) {
            this.storage = storageInstance;
        }
        else {
            this.storage = storageInstance = new __WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]({ name: "mapboxTilesStorage" });
        }
        return this.storage.ready();
    },
    getItem: function (key) {
        return Promise.resolve(null);
    },
    saveTiles: function (tileUrls, progressCallback) {
        var urlToKey = {};
        tileUrls.map(function (element) { return urlToKey[element.url] = element.key; });
        return __WEBPACK_IMPORTED_MODULE_1__services_images_service__["a" /* ImagesService */].INSTANCE.downloadURLs(tileUrls.map(function (element) { return element.url; }), false, function (done, total, url) {
            // tilesDb._saveTile(urlToKey[url]);
            return progressCallback(done, total);
        }, true);
    },
    clear: function () {
        return this.storage.clear();
    },
    _saveTile: function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(key)];
                    case 1:
                        count = _a.sent();
                        if (!count) {
                            count = 1;
                        }
                        else {
                            count++;
                        }
                        return [4 /*yield*/, this.storage.set(key, count)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    removeItems: function (keys) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var promises, _i, keys_1, key;
            return __generator(this, function (_a) {
                promises = [];
                for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    key = keys_1[_i];
                    promises.push(this.storage.get(key));
                }
                Promise.all(promises).then(function (counts) {
                    var urlsToRemove = [];
                    for (var i = 0; i < counts.length; i++) {
                        var count = counts[i];
                        var key = keys[i];
                        if (count > 1) {
                            _this.storage.set(key, count - 1);
                        }
                        else if (count === 1) {
                            _this.storage.remove(key);
                            urlsToRemove.push(key);
                        }
                    }
                    __WEBPACK_IMPORTED_MODULE_1__services_images_service__["a" /* ImagesService */].INSTANCE.removeDownloadedURLs(urlsToRemove, false);
                });
                return [2 /*return*/];
            });
        });
    }
};
//# sourceMappingURL=tilesDb.js.map

/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_chat_and_session_service__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_media__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__ = __webpack_require__(953);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_spinner_dialog__ = __webpack_require__(74);
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










var ChatPage = /** @class */ (function () {
    function ChatPage(navParams, file, media, platform, chatService, events, changeDetector, chatAndSessionService, camera, photoViewer, spinnerDialog) {
        var _this = this;
        this.file = file;
        this.media = media;
        this.platform = platform;
        this.chatService = chatService;
        this.events = events;
        this.changeDetector = changeDetector;
        this.chatAndSessionService = chatAndSessionService;
        this.camera = camera;
        this.photoViewer = photoViewer;
        this.spinnerDialog = spinnerDialog;
        this.msgList = [];
        this.editorMsg = '';
        this.editorImg = null;
        this.showEmojiPicker = false;
        this.isScrolledToBottom = true;
        this.localPath = null;
        this.audioFilePath = null;
        this.fileDirectory = null;
        this.audioIndex = null;
        this.canPlayback = true;
        this.showTextArea = true;
        this.audioPlaying = false;
        this.showAudioButtons = true;
        this.showPictureButtons = true;
        this.startAudioRecord = 0;
        this.startAudioPlaying = 0;
        this.audioDuration = 0;
        this.currentPosition = 0;
        this.timeZoneOpposite = 0;
        this.recordState = __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Idle;
        this.chatService.getUserInfo()
            .then(function (res) {
            _this.user = res;
        });
        // TODO Does chat.ts need access to all session objects? refactor!
        this.chatService.getActiveSession().then(function (res) {
            _this.sessionUser = res.sessionUser;
            _this.session = res.session;
            _this.sessionInfo = res;
            // TODO sender, receiver(s) is handlet automaticly from session parameters.
            // teams, which are *not* admin of a session, get as receiver the admin
            // the admin of a sessionget as recivers *all* users from a session
            // TODO gui should have an option to select a team as active receiver.
            var defaultReceiver = _this.chatService.getReceivers()[0];
            _this.toUser = {
                id: defaultReceiver.id,
                name: defaultReceiver.team_name,
                token: defaultReceiver.token
            };
        });
    }
    ChatPage.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var details;
            return __generator(this, function (_a) {
                // unsubscribe
                this.events.unsubscribe('chat:received');
                if (this.scrollEndSubscription) {
                    this.scrollEndSubscription.unsubscribe();
                    this.scrollEndSubscription = null;
                }
                this.chatService.setUserSeesNewMessages(false);
                if (this.sessionInfo != null) {
                    details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_trail_chat_close", details, "0");
                }
                return [2 /*return*/];
            });
        });
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var timezoneOffset = new Date().getTimezoneOffset();
        this.timeZoneOpposite = (timezoneOffset * 60000);
        //get message list
        this.getMsg();
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', function (msg) {
            _this.pushNewMsg(msg);
        });
        this.scrollEndSubscription = this.content.ionScrollEnd.subscribe(function (event) {
            if (!event || !event.scrollElement)
                return;
            var height = event.scrollElement.children[0].scrollHeight;
            var scrolledToBottom = height - event.scrollHeight - event.scrollTop < 0;
            if (_this.isScrolledToBottom != scrolledToBottom) {
                console.debug("isScrolledToBottom: " + scrolledToBottom);
                _this.chatService.setUserSeesNewMessages(scrolledToBottom);
            }
            _this.isScrolledToBottom = scrolledToBottom;
        });
        this.chatService.setUserSeesNewMessages(true);
        this.chatAndSessionService.setNewMsgNumber(0);
    };
    ChatPage.prototype.onFocus = function () {
        this.showEmojiPicker = false;
        this.content.resize();
    };
    ChatPage.prototype.switchEmojiPicker = function () {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        }
        else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    };
    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    ChatPage.prototype.getMsg = function () {
        var _this = this;
        var chatMsgs = [];
        this.chatService.getReceivers().forEach(function (receiver) {
            chatMsgs.push(_this.chatService
                .getMsgList(_this.sessionInfo, receiver.token).toPromise()
                .then(function (res) {
                _this.msgList = res;
                _this.scrollToBottom();
            }));
        });
        Promise.all(chatMsgs).then(function () {
            console.debug('received all messages!');
        });
    };
    /**
     * @name sendMsg
     */
    ChatPage.prototype.sendMsg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var timezoneOffset, newMsg, blob, myFormData, resultPath, details, audioType_1, details;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setInputWrapButtons(true);
                        //does not allow sending empty messages
                        if (this.editorMsg.trim() == '' && !this.editorImg && this.recordState != __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Stop)
                            return [2 /*return*/];
                        //failsafe to stop you from seding more than 1 time of message
                        if ((this.editorMsg && this.editorImg) ||
                            (this.editorMsg && this.recordState == __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Stop) ||
                            (this.editorImg && this.recordState == __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Stop))
                            return [2 /*return*/];
                        timezoneOffset = new Date().getTimezoneOffset();
                        newMsg = {
                            messageId: null,
                            userId: this.user.token,
                            userName: this.user.name,
                            userAvatar: this.user.avatar,
                            toUserId: this.toUser.token,
                            time: Date.now() + (timezoneOffset * 60000),
                            message: this.editorMsg,
                            media: [],
                            status: 'pending'
                        };
                        this.editorMsg = '';
                        if (!this.editorImg) return [3 /*break*/, 2];
                        this.localPath = null;
                        blob = new Blob([this.editorImg], { type: 'image/jpeg' });
                        myFormData = new FormData();
                        myFormData.append('media', blob, 'image.jpeg');
                        return [4 /*yield*/, this.chatAndSessionService.postMedia(myFormData, this.sessionInfo)];
                    case 1:
                        resultPath = _a.sent();
                        this.editorImg = null;
                        if (resultPath) {
                            newMsg.media.push(resultPath);
                            details = JSON.stringify({ 'message': resultPath });
                            this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
                        }
                        else {
                            console.log("ERROR: unable to send media");
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.recordState == __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Stop)) return [3 /*break*/, 4];
                        if (!this.canPlayback) {
                            this.pauseAudio();
                        }
                        this.recordState = __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Idle;
                        audioType_1 = 'aac';
                        return [4 /*yield*/, this.file.readAsArrayBuffer(this.fileDirectory, 'audioFile.aac').then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                var blob, myFormData, resultPath, details;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            blob = new Blob([data], { type: 'audio/' + audioType_1 });
                                            myFormData = new FormData();
                                            myFormData.append('media', blob, 'audio.' + audioType_1);
                                            myFormData.append('mediaDuration', this.audioDuration.toString());
                                            newMsg.audioDuration = this.audioDuration;
                                            this.audioDuration = 0;
                                            return [4 /*yield*/, this.chatAndSessionService.postMedia(myFormData, this.sessionInfo)];
                                        case 1:
                                            resultPath = _a.sent();
                                            //newMsg.isAudio = true;
                                            this.audio = null;
                                            if (resultPath) {
                                                newMsg.media.push(resultPath);
                                                details = JSON.stringify({ 'message': resultPath });
                                                this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
                                            }
                                            else {
                                                console.log("ERROR: unnable to send media");
                                                return [2 /*return*/];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (err) {
                                console.log("ERROR: ", err);
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ 'message': newMsg.message });
                            this.chatAndSessionService.addUserEvent("event_trail_chat_msg_send", details, "0");
                        }
                        _a.label = 5;
                    case 5:
                        if (!this.showEmojiPicker) {
                            this.focus();
                        }
                        return [4 /*yield*/, this.chatService.checkForNewMessages(this.sessionInfo)];
                    case 6:
                        _a.sent();
                        this.chatService.sendMsg(newMsg, this.sessionInfo)
                            .then(function (msgs) {
                            msgs.forEach(function (msg) {
                                var index = _this.getMsgIndexById(msg.messageId);
                                if (msg.messageId && index !== -1) {
                                    _this.msgList[index].status = 'success';
                                }
                                else {
                                    msg.status = 'success';
                                    _this.isScrolledToBottom = true;
                                    _this.pushNewMsg(msg);
                                }
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @name imageChat
     */
    ChatPage.prototype.getImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var options;
            return __generator(this, function (_a) {
                this.setInputWrapButtons(false);
                options = {
                    quality: 100,
                    targetHeight: 512,
                    targetWidth: 512,
                    destinationType: this.camera.DestinationType.DATA_URL,
                    encodingType: this.camera.EncodingType.JPEG,
                    mediaType: this.camera.MediaType.PICTURE,
                    correctOrientation: true,
                    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true
                };
                this.camera.getPicture(options).then(function (imageData) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        this.editorImg = imageData;
                        this.localPath = 'data:image/jpeg;base64,' + imageData;
                        return [2 /*return*/];
                    });
                }); }, function (err) {
                    console.log("ERROR#####: ", err);
                    _this.setInputWrapButtons(true);
                    // Handle error
                });
                return [2 /*return*/];
            });
        });
    };
    ChatPage.prototype.openCamera = function () {
        var _this = this;
        this.setInputWrapButtons(false);
        var options = {
            quality: 100,
            targetHeight: 512,
            targetWidth: 512,
            correctOrientation: true,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
        };
        this.camera.getPicture(options).then(function (imageData) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.editorImg = imageData;
                this.localPath = 'data:image/jpeg;base64,' + imageData;
                return [2 /*return*/];
            });
        }); }, function (err) {
            // Handle error
            console.log("Camera issue:" + err);
            _this.setInputWrapButtons(true);
        });
    };
    ChatPage.prototype.removeImage = function () {
        this.localPath = null;
        this.editorImg = null;
        this.setInputWrapButtons(true);
    };
    /**
     * @name pushNewMsg
     * @param msg
     */
    ChatPage.prototype.pushNewMsg = function (msg) {
        var userId = this.user.token;
        // check if msg already displayed
        if (this.getMsgIndexById(msg.messageId) >= 0) {
            return;
        }
        // Verify user relationships
        if (!(msg.userId === userId || msg.toUserId === userId)) {
            return;
        }
        console.log('pushed new message');
        this.msgList.push(msg);
        this.changeDetector.detectChanges();
        if (this.isScrolledToBottom) {
            this.scrollToBottom();
        }
    };
    ChatPage.prototype.getMsgIndexById = function (id) {
        return this.msgList.findIndex(function (e) { return e.messageId === id; });
    };
    ChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content && _this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 200);
    };
    ChatPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    ChatPage.prototype.setTextareaScroll = function () {
        var textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    };
    ChatPage.prototype.micButtonClick = function () {
        this.showTextArea = false;
        this.showPictureButtons = false;
        switch (this.recordState) {
            case __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Record:
                this.recordState = __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Stop;
                this.stopRecording();
                break;
            case __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Stop:
                this.recordState = __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Idle;
                this.showTextArea = true;
                this.showPictureButtons = true;
                this.pauseAudio();
                break;
            default:
                this.recordState = __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Record;
                this.startRecording();
                break;
        }
    };
    ChatPage.prototype.updateAudioDuration = function () {
        var now = new Date().getTime();
        this.audioDuration = now - this.startAudioRecord;
    };
    ChatPage.prototype.updateAudioPosition = function (message) {
        var _this = this;
        var now = new Date().getTime();
        if (message) {
            if ((now - this.startAudioPlaying) < message.audioDuration) {
                message.currentPosition = now - this.startAudioPlaying;
            }
            else {
                message.currentPosition = message.audioDuration;
                setTimeout(function () {
                    _this.clearPositionInterval(message);
                }, 1000);
            }
        }
        else {
            if ((now - this.startAudioPlaying) < this.audioDuration) {
                this.currentPosition = now - this.startAudioPlaying;
            }
            else {
                this.currentPosition = this.audioDuration;
                setTimeout(function () {
                    _this.clearPositionInterval();
                }, 1000);
            }
        }
    };
    ChatPage.prototype.startRecording = function () {
        var _this = this;
        console.log('start recording');
        this.pauseAudio();
        if (this.platform.is('android')) {
            this.fileDirectory = this.file.externalDataDirectory;
        }
        else if (this.platform.is('ios')) {
            this.fileDirectory = this.file.documentsDirectory;
        }
        this.file.createFile(this.fileDirectory, 'audioFile.aac', true).then(function (filePath) {
            _this.audio = _this.media.create(_this.fileDirectory.replace(/^file:\/\//, '') + 'audioFile.aac');
            //this.audio.release();
            _this.startAudioRecord = new Date().getTime();
            _this.audio.startRecord();
            _this.updateAudioDuration();
            _this.durationInterval = window.setInterval(function () {
                _this.updateAudioDuration();
            }, 1000);
            _this.audioFilePath = filePath.toInternalURL();
        }).catch(function (err) { console.log("creation file error:", err); });
        // Stop Recording after 1 minute
        setTimeout(function () {
            if (_this.recordState != __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Idle) {
                _this.recordState = __WEBPACK_IMPORTED_MODULE_6__recordStateEnum__["a" /* RecordStateEnum */].Stop;
                _this.stopRecording();
            }
        }, 60000);
    };
    ChatPage.prototype.stopRecording = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.audio.stopRecord();
                        if (this.durationInterval) {
                            clearInterval(this.durationInterval);
                            this.durationInterval = null;
                        }
                        if (!this.platform.is('ios')) return [3 /*break*/, 2];
                        this.audio.setVolume(0);
                        this.audio.play();
                        _a = this;
                        return [4 /*yield*/, this.getAudioDuration()];
                    case 1:
                        _a.audioDuration = _c.sent();
                        this.audio.pause();
                        this.audio.setVolume(1);
                        this.audio.seekTo(0);
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this;
                        return [4 /*yield*/, this.getAudioDuration()];
                    case 3:
                        _b.audioDuration = _c.sent();
                        _c.label = 4;
                    case 4:
                        this.startAudioRecord = 0;
                        this.canPlayback = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    ChatPage.prototype.getAudioDuration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.durCheckInterval = window.setInterval(function () {
                            console.log("Looking for File Duration");
                            if (_this.audio.getDuration() != -1) {
                                // this.currentAudioFile.setVolume(1.0);
                                _this.clearAudioDurationInterval();
                                resolve(_this.audio.getDuration() * 1000);
                            }
                        }, 1000);
                    })];
            });
        });
    };
    ChatPage.prototype.clearAudioDurationInterval = function () {
        if (this.durCheckInterval) {
            clearInterval(this.durCheckInterval);
            this.durCheckInterval = null;
        }
    };
    ChatPage.prototype.playAudio = function (message, index) {
        var _this = this;
        if (this.audioPlaying) {
            this.pauseAudio();
        }
        var filePath = null;
        if (message)
            filePath = message.media[0];
        if (filePath)
            this.audioIndex = index;
        else {
            this.canPlayback = false;
            filePath = this.audioFilePath;
        }
        this.audio = this.media.create(filePath);
        this.audio.play();
        this.startAudioPlaying = new Date().getTime();
        this.positionInterval = window.setInterval(function () {
            _this.updateAudioPosition(message);
        }, 10);
        this.audio.setVolume(0.8);
        this.audio.onStatusUpdate.subscribe(function (status) {
            switch (status) {
                case 2:// Running
                    _this.audioPlaying = true;
                    break;
                case 3: // Paused
                case 4:// Finished/Stopped
                    if (!isNaN(index))
                        _this.audioIndex = null;
                    else
                        _this.canPlayback = true;
                    _this.audio.release();
                    _this.audioPlaying = false;
                    _this.clearPositionInterval(message);
                    break;
            }
        });
    };
    ChatPage.prototype.clearPositionInterval = function (message) {
        if (this.positionInterval) {
            if (message) {
                message.currentPosition = 0;
            }
            else {
                this.currentPosition = 0;
            }
            clearInterval(this.positionInterval);
            this.positionInterval = null;
        }
    };
    ChatPage.prototype.pauseAudio = function (message) {
        this.clearPositionInterval(message);
        if (this.audio) {
            this.audio.pause();
        }
    };
    ChatPage.prototype.isAudio = function (path) {
        return (path.substring(path.lastIndexOf('.')) == '.aac');
    };
    ChatPage.prototype.changeButtonsStatus = function () {
        if (this.editorMsg.length == 0) {
            this.setInputWrapButtons(true);
        }
        else {
            this.showAudioButtons = false;
            this.showPictureButtons = false;
        }
    };
    ChatPage.prototype.setInputWrapButtons = function (setValue) {
        this.showTextArea = setValue;
        this.showAudioButtons = setValue;
        this.showPictureButtons = setValue;
    };
    ChatPage.prototype.openInPhotoviewer = function (image) {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_8__classes_Helper__["b" /* Helper */].isPluginAvailable(__WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__["a" /* PhotoViewer */])) {
            this.spinnerDialog.show();
            setTimeout(function () {
                // use short timeout to let spinner dialog appear
                _this.photoViewer.show(image);
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
    ], ChatPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat_input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ChatPage.prototype, "messageInput", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-chat',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/chat/chat.html"*/'<mcm-header></mcm-header>\n\n<ion-content class="has-header">\n    <div class="message-wrap">\n        <div *ngFor="let msg of msgList; let i = index"\n             class="message"\n             [class.left]=" msg.userId === toUser.token "\n             [class.right]=" msg.userId === user.token ">\n            <!--TODO Remove user-image from data-->\n            <!--<img class="user-img" [src]="msg.userAvatar" alt="" src="">-->\n            <ion-spinner name="dots" *ngIf="msg.status === \'pending\' && (msg.media.length==0 || !isAudio(msg.media[0]))"></ion-spinner>\n            <!-- Non-audio Message -->\n            <div class="msg-detail">\n                <div class="msg-content" [ngClass]="{\'audio\': msg.media.length>0 && isAudio(msg.media[0])}">\n\n                    <!-- Text Message -->\n                    <p *ngIf="msg.message" class="line-breaker ">{{msg.message}}</p>\n\n                    <!-- Image Message -->\n                    <img *ngIf="msg.media.length>0 && !isAudio(msg.media[0])" (click)="openInPhotoviewer(msg.media[0])" src="{{msg.media[0]}}">\n\n                    <!-- Audio Message -->\n                    <div *ngIf="msg.media.length>0 && isAudio(msg.media[0])" >\n                        <button ion-button clear item-end large *ngIf="audioIndex == null" (click)="playAudio(msg, i)"><ion-icon name="md-play"></ion-icon></button>\n                        <button ion-button clear item-end large *ngIf="audioIndex == i" (click)="pauseAudio(msg)"><ion-icon name="md-square"></ion-icon></button>\n                        <mcm-progress-bar [currentProgress]="msg.currentPosition" [total]="msg.audioDuration" [isAudio]="true" [isAudioPlaying]="audioIndex == i"></mcm-progress-bar>\n                    </div>\n\n                </div>\n                <div class="msg-info">\n                    <p>\n                        <!--TODO Remove user from data-->\n                        <!--{{msg.userName}}&nbsp;&nbsp;-->\n                        <!-- TODO Time Format -->\n                        &nbsp;{{msg.time + timeZoneOpposite | localizedDate:\'medium\' }}</p>\n                </div>\n            </div>\n        </div>\n\n    </div>\n</ion-content>\n<ion-footer no-border class="input">\n    <div class="input-wrap">\n        <!-- ######### TEXT ######### -->\n        <textarea *ngIf="showTextArea"\n                  autoresize\n                  id="textarea"\n                  #chat_input\n                  [placeholder]="\'a_chat_type_message\' | translate"\n                  [(ngModel)]="editorMsg"\n                  (keyup.enter)="sendMsg()"\n                  (input)="changeButtonsStatus()"\n                  (focusin)="onFocus()">\n        </textarea>\n\n        <!-- ######### AUDIO ########## -->\n        <div class="message-input-buttons audio" *ngIf="showAudioButtons" [ngClass]="{\'active\': recordState == 2 || recordState == 3}">\n            <!-- Playback for Local Audio -->\n            <div *ngIf="recordState == 3">\n                <button ion-button clear icon-only round start *ngIf="canPlayback" (click)="playAudio()">\n                    <ion-icon name="md-play"></ion-icon>\n                </button>\n                <button ion-button clear icon-only round start *ngIf="!canPlayback" (click)="pauseAudio()">\n                    <ion-icon name="md-pause"></ion-icon>\n                </button>\n            </div>\n\n            <button ion-button clear icon-only round end (click)="micButtonClick()" [ngClass]="{\'recording\': recordState == 2}">\n                <ion-icon *ngIf="recordState == 1" name="md-mic"></ion-icon>\n                <ion-icon *ngIf="recordState == 2" name="md-mic"></ion-icon>\n                <ion-icon *ngIf="recordState == 3" name="md-trash"></ion-icon>\n            </button>\n            <p no-margin *ngIf="recordState == 2">{{ \'a_chat_recording_message\' | translate }} {{audioDuration | date : \'mm:ss\'}}</p>\n            <mcm-progress-bar *ngIf="recordState == 3" [currentProgress]="currentPosition" [total]="audioDuration" [isAudio]="true" [isAudioPlaying]="!canPlayback"></mcm-progress-bar>\n        </div>\n\n        <!-- ######### PICTURES ######## -->\n        <div class="message-input-buttons" *ngIf="showPictureButtons">\n            <button ion-button clear icon-only round end (click)="getImage()">\n                <ion-icon name="md-image"></ion-icon>\n            </button>\n            <button ion-button clear icon-only round end (click)="openCamera()">\n                <ion-icon name="md-camera"></ion-icon>\n            </button>\n        </div>\n\n        <div class="image-previewer" *ngIf="localPath">\n            <img class="msg-image" src="{{localPath}}">\n            <button class="msg-close-button" ion-button icon-only clear round end (click)="removeImage()">\n                <ion-icon name="md-trash"></ion-icon>\n            </button>\n        </div>\n    </div>\n    <button class="send" no-padding ion-button round item-right (click)="sendMsg()" *ngIf="recordState != 2">\n        <img src="./assets/icons/send.svg"/>\n    </button>\n</ion-footer>\n\n\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/chat/chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_media__["a" /* Media */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_2__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_spinner_dialog__["a" /* SpinnerDialog */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_Helper__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, keys, term) {
        if (!term)
            return value;
        var result = (value || []).filter(function (item) { return keys.split(',').some(function (key) { return item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key]); }); });
        __WEBPACK_IMPORTED_MODULE_1__classes_Helper__["b" /* Helper */].searchResults = result.length;
        console.log("searchResults", __WEBPACK_IMPORTED_MODULE_1__classes_Helper__["b" /* Helper */].searchResults);
        return result;
    };
    SearchPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'search'
        })
    ], SearchPipe);
    return SearchPipe;
}());

//# sourceMappingURL=search.pipe.js.map

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_controller__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_gps_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_promise_timeout__ = __webpack_require__(642);
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

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutesMapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_DB_Updater__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_modals_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_spinner_dialog__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_gps_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_filter__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_language_service__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_mapbox_gl_dist_mapbox_gl_js__ = __webpack_require__(1111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_mapbox_gl_dist_mapbox_gl_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_mapbox_gl_dist_mapbox_gl_js__);
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




//import 'leaflet-offline';











// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import 'mapbox-gl-leaflet/leaflet-mapbox-gl.js';
var RoutesMapPage = /** @class */ (function () {
    function RoutesMapPage(updater, ormService, modalsService, navCtrl, spinner, translateService, gpsService, helper, navParams, languageService) {
        var _this = this;
        this.updater = updater;
        this.ormService = ormService;
        this.modalsService = modalsService;
        this.navCtrl = navCtrl;
        this.spinner = spinner;
        this.translateService = translateService;
        this.gpsService = gpsService;
        this.helper = helper;
        this.navParams = navParams;
        this.languageService = languageService;
        this.markerGroup = null;
        this.merkerMapBoxGroup = null;
        this.eventSubscription = this.ormService.eventEmitter.subscribe(function (event) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.map && this.map.getLayer('unclustered-point'))) return [3 /*break*/, 3];
                        if (!!this.showAllRoutes) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes()];
                    case 1:
                        _a.routes = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.redrawMapBoxMarker();
                        console.log("REDRAWED");
                        this.routeDetails = null;
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }
    RoutesMapPage.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("ionViewWillEnter:");
                        this.gpsService.isLocationOn();
                        if (!(this.map && this.map.getLayer('unclustered-point'))) return [3 /*break*/, 5];
                        if (!this.showAllRoutes) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.ormService.getVisibleRoutes()];
                    case 1:
                        _a.routes = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this;
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes()];
                    case 3:
                        _b.routes = _c.sent();
                        _c.label = 4;
                    case 4:
                        this.redrawMapBoxMarker();
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RoutesMapPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.isFilePluginAvailable = Object(__WEBPACK_IMPORTED_MODULE_4__ionic_native_core__["i" /* checkAvailability */])(__WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */].getPluginRef(), null, __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */].getPluginName()) === true;
                if (this.navParams.data && this.navParams.data.showAllRoutes != null) {
                    if (this.navParams.data.showAllRoutes)
                        this.showAllRoutes = true;
                    else
                        this.showAllRoutes = false;
                }
                this.languageService.initialize().then(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                //this.loadMap();
                                this.loadMapBox();
                                return [4 /*yield*/, this.initializeMap()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    RoutesMapPage.prototype.ngOnDestroy = function () {
        this.navCtrl.setRoot('RoutesListPage', { showAllRoutes: this.showAllRoutes });
        if (this.eventSubscription) {
            this.eventSubscription.unsubscribe();
            this.eventSubscription = null;
        }
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
    };
    RoutesMapPage.prototype.initializeMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var activeUser, online, e_1, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 1:
                        activeUser = _c.sent();
                        if (!!activeUser) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.modalsService.showNoInternetModalIfOffline()];
                    case 2:
                        online = _c.sent();
                        if (!online) return [3 /*break*/, 6];
                        this.spinner.show(null, this.translateService.instant('a_toast_update_start'), true);
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.updater.checkForUpdates()];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        console.error('caught error while checking for updates:');
                        console.error(e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        if (!this.showAllRoutes) return [3 /*break*/, 8];
                        _a = this;
                        return [4 /*yield*/, this.ormService.getVisibleRoutes()];
                    case 7:
                        _a.routes = _c.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        _b = this;
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes()];
                    case 9:
                        _b.routes = _c.sent();
                        _c.label = 10;
                    case 10:
                        this.map.on('load', function () {
                            var waiting = function () {
                                if (!_this.map.isStyleLoaded()) {
                                    setTimeout(waiting, 200);
                                }
                                else {
                                    _this.redrawMapBoxMarker();
                                }
                            };
                            waiting();
                        });
                        this.spinner.hide();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesMapPage.prototype.redrawMapBoxMarker = function () {
        var map = this.map;
        //clean layers to be redrawn
        if (this.map.getLayer('unclustered-point')) {
            console.log("###removing unclustered points layer");
            this.map.removeLayer('unclustered-point');
            this.markerGroup = null;
        }
        if (this.map.getLayer('clusters')) {
            console.log("###removing unclustered points layer");
            this.map.removeLayer('clusters');
            this.markerGroup = null;
        }
        if (this.map.getLayer('cluster-count')) {
            console.log("###removing unclustered points layer");
            this.map.removeLayer('cluster-count');
            this.markerGroup = null;
        }
        var GeoJson = {
            "type": "FeatureCollection",
            "features": []
        };
        for (var route in this.routes) {
            var icon = void 0;
            if (this.routes[route].downloaded) {
                if (this.routes[route].completed) {
                    icon = 'completed-route';
                }
                else {
                    icon = 'downloaded-route';
                }
            }
            else if (this.routes[route].public == "1") {
                icon = 'public-route';
            }
            else {
                icon = 'private-route';
            }
            var routeCenter = this.routes[route].getCenterLatLng();
            var data = {
                "type": "Feature",
                "properties": {
                    'routeIndex': route,
                    'icon': icon
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        routeCenter.lng,
                        routeCenter.lat
                    ]
                }
            };
            GeoJson.features.push(data);
        }
        if (this.map.getSource("routes"))
            this.map.getSource('routes').setData(GeoJson);
        else {
            this.map.addSource("routes", {
                type: "geojson",
                data: GeoJson,
                cluster: true,
                clusterRadius: 30
            });
        }
        this.map.addLayer({
            id: "clusters",
            type: "circle",
            source: "routes",
            filter: ["has", "point_count"],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 20
            }
        });
        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'routes',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 15
            }
        });
        map.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'routes',
            filter: ['!', ['has', 'point_count']],
            layout: {
                'icon-size': 0.23,
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true
            }
        });
    };
    RoutesMapPage.prototype.loadMapBox = function () {
        var _this = this;
        var isLoadedViaHttp = window.location.href.indexOf('http') === 0;
        var keepPositionBecauseOfReload = false;
        __WEBPACK_IMPORTED_MODULE_14_mapbox_gl_dist_mapbox_gl_js___default.a.accessToken = __WEBPACK_IMPORTED_MODULE_6__classes_Helper__["b" /* Helper */].accessToken;
        //Either draws the map for all routes or for downloaded ones only
        if (this.showAllRoutes) {
            this.map = new __WEBPACK_IMPORTED_MODULE_14_mapbox_gl_dist_mapbox_gl_js___default.a.Map({
                style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
                center: [8.66158515, 50.1208566],
                zoom: 16,
                container: 'map',
                trackResize: false
            });
        }
        else {
            this.map = new __WEBPACK_IMPORTED_MODULE_14_mapbox_gl_dist_mapbox_gl_js___default.a.Map({
                style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
                center: [8.66158515, 50.1208566],
                zoom: 16,
                container: 'mapDownloaded',
                trackResize: false
            });
        }
        this.loadImagesToMap();
        this.map.touchZoomRotate.disableRotation();
        //removes labels for points of interest
        this.map.on('load', function () {
            _this.map.style.stylesheet.layers.forEach(function (layer) {
                if (layer.id === "poi-label") {
                    _this.map.removeLayer(layer.id);
                }
            });
        });
        if (isLoadedViaHttp && window.location.search && window.location.search.indexOf('pos=') > -1) {
            keepPositionBecauseOfReload = true;
            var startIndex = window.location.search.indexOf('pos=') + 4;
            var bboxString = window.location.search.substring(startIndex).split("&|/")[0]
                .replace(/LngLat\(/g, '')
                .replace(/%20/g, ' ')
                .replace(/\)/g, '');
            console.log("BBOX: ", bboxString);
            var coords = bboxString.split(",").map(parseFloat);
            var bounds = [[coords[0], coords[1]], [coords[2], coords[3]]];
            console.log("BOUNDS: ", bounds);
            this.map.fitBounds(bounds);
        }
        this.map.on('click', function (e) {
            //check if details open and reset content. for now just reset content
            _this.routeDetails = null;
            console.log('cleared route details');
        });
        var that = this;
        //Zoom clusters
        that.map.on('click', 'clusters', function (e) {
            var features = that.map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });
            var clusterId = features[0].properties.cluster_id;
            that.map.getSource('routes').getClusterExpansionZoom(clusterId, function (err, zoom) {
                if (err)
                    return;
                that.map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            });
        });
        that.map.on('click', 'unclustered-point', function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var features, index, route, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            features = that.map.queryRenderedFeatures(e.point, {
                                layers: ['unclustered-point']
                            });
                            index = features[0].properties.routeIndex;
                            route = that.routes[index];
                            if (!(that.routeDetails == route)) return [3 /*break*/, 1];
                            that.modalsService.showRoute(route, that.navCtrl);
                            return [3 /*break*/, 5];
                        case 1:
                            if (!route.downloaded) return [3 /*break*/, 3];
                            that.isRouteDownloaded = 'downloaded';
                            console.log("THIS.ROUTE: ", route);
                            _a = that;
                            return [4 /*yield*/, that.ormService.findRouteByCode(route.code)];
                        case 2:
                            _a.routeDetails = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            that.routeDetails = route;
                            that.isRouteDownloaded = null;
                            _b.label = 4;
                        case 4:
                            that.map.panTo(features[0].geometry.coordinates);
                            _b.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        });
        if (isLoadedViaHttp) {
            // when loaded via http (for development), keep track of map position
            this.map.on('moveend', function (event) {
                var bounds = _this.map.getBounds();
                var boundsString = bounds.toString();
                boundsString = boundsString.substring(13, boundsString.length - 1);
                window.history.replaceState({}, "", window.location.origin + "?pos=" + boundsString + "/" + window.location.hash);
            });
        }
        this.gpsService.getCurrentPosition()
            .then(function (resp) {
            if (resp && resp.coords) {
                console.warn('found you');
                // let markerGroup = L.featureGroup();
                var el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = "url(assets/icons/mapposition.png)";
                el.style.backgroundSize = 'cover';
                el.style.width = 100 + 'px';
                el.style.height = 100 + 'px';
                el.addEventListener('click', function () {
                    //window.alert(marker.properties.message);
                    console.log("HEY clicked");
                });
                _this.mapBoxUserMarker = new __WEBPACK_IMPORTED_MODULE_14_mapbox_gl_dist_mapbox_gl_js___default.a.Marker(el)
                    .setLngLat([resp.coords.longitude, resp.coords.latitude])
                    .addTo(_this.map);
                if (!keepPositionBecauseOfReload) {
                    _this.map.panTo([resp.coords.longitude, resp.coords.latitude]);
                }
                if (_this.watchSubscription) {
                    _this.watchSubscription.unsubscribe();
                }
                _this.watchSubscription = _this.gpsService.watchPosition().subscribe(function (resp) {
                    if (resp && resp.coords) {
                        var lnglat = [resp.coords.longitude, resp.coords.latitude];
                        _this.mapBoxUserMarker.setLngLat(lnglat);
                        //Rotate the user marker
                        if (_this.prevPos != null) {
                            var angle = __WEBPACK_IMPORTED_MODULE_6__classes_Helper__["b" /* Helper */].getAngle(_this.prevPos, resp.coords);
                            _this.mapBoxUserMarker.setRotation(angle);
                        }
                        _this.prevPos = resp.coords;
                    }
                });
            }
        })
            .catch(function (error) {
            console.log("error: ", error);
            console.error("Location error: " + JSON.stringify(error));
        });
    };
    RoutesMapPage.prototype.doDownload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalsService.doDownload(this.routeDetails)];
                    case 1:
                        _a.sent();
                        console.log("DID DOWNLOAD");
                        this.redrawMapBoxMarker();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesMapPage.prototype.presentRouteInfoModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.modalsService.presentRouteInfoModal(this.routeDetails, this.navCtrl)];
                    case 1:
                        _a.routeDetails = _b.sent();
                        this.redrawMapBoxMarker();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesMapPage.prototype.showRouteDetail = function (item) {
        var _this = this;
        console.log("##### ROUTE: ", item);
        this.modalsService.showRoute(item, this.navCtrl).then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.reactOnRemovedRoute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    RoutesMapPage.prototype.switchToList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.navCtrl.setRoot('RoutesListPage', { showAllRoutes: this.showAllRoutes });
                return [2 /*return*/];
            });
        });
    };
    RoutesMapPage.prototype.reactOnRemovedRoute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.showAllRoutes) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.ormService.getVisibleRoutes()];
                    case 1:
                        _a.routes = _c.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _b = this;
                        return [4 /*yield*/, this.ormService.getDownloadedRoutes()];
                    case 3:
                        _b.routes = _c.sent();
                        _c.label = 4;
                    case 4:
                        this.redrawMapBoxMarker();
                        return [2 /*return*/];
                }
            });
        });
    };
    RoutesMapPage.prototype.loadImagesToMap = function () {
        var map = this.map;
        map.loadImage('assets/icons/marker-route-private.png', function (error, image) {
            map.addImage('private-route', image);
        });
        map.loadImage('assets/icons/marker-route-public.png', function (error, image) {
            map.addImage('public-route', image);
        });
        map.loadImage('assets/icons/marker-route-downloaded.png', function (error, image) {
            map.addImage('downloaded-route', image);
        });
        map.loadImage('assets/icons/marker-route-done.png', function (error, image) {
            map.addImage('completed-route', image);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], RoutesMapPage.prototype, "mapContainer", void 0);
    RoutesMapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'routes-map',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/tabs/RoutesMap/RoutesMap.html"*/'<ion-content class="map routes" no-bounce>\n    <div ion-fixed>\n\n        <div *ngIf="showAllRoutes" id="map" class="map-view"></div>\n        <div *ngIf="!showAllRoutes" id="mapDownloaded" class="map-view"></div>\n\n        <div id="details" class="detail-box" [ngClass]="{\'open\': routeDetails != null}" lazy-load-images image-size="s">\n            <ion-fab right top>\n                <button ion-fab color="primary" (click)="switchToList()"><img src="assets/icons/list.svg"/></button>\n            </ion-fab>\n\n            <route-teaser *ngIf="routeDetails" [class]="isRouteDownloaded" [route]="routeDetails"\n                          [isOnline]="helper.isOnline" tappable (click)="showRouteDetail(routeDetails)"\n            ></route-teaser>\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/tabs/RoutesMap/RoutesMap.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__classes_DB_Updater__["a" /* DB_Updater */],
            __WEBPACK_IMPORTED_MODULE_7__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_8__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_11__services_gps_service__["a" /* GpsService */],
            __WEBPACK_IMPORTED_MODULE_6__classes_Helper__["b" /* Helper */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_13__services_language_service__["a" /* LanguageService */]])
    ], RoutesMapPage);
    return RoutesMapPage;
}());

//# sourceMappingURL=RoutesMap.js.map

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_Helper__ = __webpack_require__(19);
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
 * Generated class for the PortalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PortalPage = /** @class */ (function () {
    function PortalPage(navCtrl, navParams, iab, translateService, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iab = iab;
        this.translateService = translateService;
        this.sanitizer = sanitizer;
        this.languageUrl = {
            de: 'portal',
            en: 'portal-en',
            es: 'portal-es',
            pt: 'portal-pt',
            fr: 'portail',
            it: 'portale',
            sk: 'portal-sk',
            id: 'portal-id',
            tr: 'portal-tr',
            el: 'πύλη',
            zh: '入口'
        };
        this.currentLang = this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(__WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].WEBSERVER_URL + "en/" + this.languageUrl[this.currentLang]);
    }
    PortalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-portal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/portal/portal.html"*/'<ion-content class="fullscreen">\n    <iframe ion-fixed *ngIf="currentLang" allow="geolocation" [src]="sanitizedUrl">\n    </iframe>\n</ion-content>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/portal/portal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */]])
    ], PortalPage);
    return PortalPage;
}());

//# sourceMappingURL=portal.js.map

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMIntroModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MCMIntroModal = /** @class */ (function () {
    function MCMIntroModal(params) {
        this.buttons = params.data.buttons;
        this.narrative = params.data.narrative;
        this.title = params.data.title;
        this.message = params.data.message;
        this.routeTitle = params.data.routeTitle;
    }
    MCMIntroModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-intro-modal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMIntroModal/MCMIntroModal.html"*/'<div class="modal card icon intro has-button-on-the-edge">\n    <div class="modal-content">\n        <img class="head-icon" src="./assets/icons/{{narrative}}/modal-intro.svg"/>\n        <h2>{{ title | translate}}</h2>\n        <p [innerHtml]=" message | translate : {TITLE: routeTitle} "></p>\n    </div>\n\n    <div class="on-the-edge-container">\n        <button *ngFor="let button of buttons" ion-button small round (click)="button.callback()">{{ button.title | translate }}</button>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMIntroModal/MCMIntroModal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_nav_params__["a" /* NavParams */]])
    ], MCMIntroModal);
    return MCMIntroModal;
}());

//# sourceMappingURL=MCMIntroModal.js.map

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMSessionFinishedModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MCMSessionFinishedModal = /** @class */ (function () {
    function MCMSessionFinishedModal(viewCtrl, navCtrl, appCtrl, navParams) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.navParams = navParams;
        this.session = navParams.data.session;
        this.score = navParams.data.score;
        this.tasks = navParams.data.tasks;
        this.numberOfSolvedTasks = 0;
        var solvedTasks = this.score.getTasksSolved();
        var solvedLowTasks = this.score.getTasksSolvedLow();
        var savedTasks = this.score.getTasksSaved();
        this.tasks.map(function (task) {
            if (savedTasks.indexOf(task.id) >= 0 || solvedTasks.indexOf(task.id) >= 0 || solvedLowTasks.indexOf(task.id) >= 0) {
                _this.numberOfSolvedTasks++;
            }
        });
        if (navParams.data.narrative) {
            this.narrative = navParams.data.narrative;
            switch (this.narrative) {
                case 'pirates':
                    this.iconPath = 'pirates/';
                    break;
                default:
                    this.iconPath = '';
            }
        }
        else {
            this.iconPath = '';
        }
    }
    // ionViewDidEnter() {
    //     setTimeout(() => {
    //         this.input.setFocus();
    //     }, 150);
    // }
    MCMSessionFinishedModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    MCMSessionFinishedModal.prototype.backToStart = function () {
        this.appCtrl.getRootNav().popToRoot(__WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */]);
        this.cancel();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'),
        __metadata("design:type", Object)
    ], MCMSessionFinishedModal.prototype, "input", void 0);
    MCMSessionFinishedModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-session-finished-modal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMSessionFinishedModal/MCMSessionFinishedModal.html"*/'<div class="modal card icon has-button-on-the-edge">\n\n    <div class="modal-content">\n        <img class="head-icon" src="./assets/icons/{{iconPath}}modal-session-finished.svg"/>\n        <h2>{{\'a_private_session_finished_title\' | translate}}</h2>\n        <p class="main-text">{{session.goodbye_message}}</p>\n        <ion-grid no-padding class="table">\n            <ion-row *ngIf="score.score && score.score != 0" class="finish">\n                <ion-col>\n                    <ion-label>{{\'a_private_session_earned_points\' | translate}}</ion-label>\n                </ion-col>\n                <ion-col col-auto>\n                    <ion-label class="score">{{score.score}}</ion-label>\n                </ion-col>\n            </ion-row>\n            <ion-row class="finish">\n                <ion-col>\n                    <ion-label>{{\'a_private_session_finished_tasks\' | translate}}</ion-label>\n                </ion-col>\n                <ion-col col-auto>\n                    <ion-label>{{numberOfSolvedTasks}} / {{tasks.length}}</ion-label>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n\n    <div class="on-the-edge-container">\n        <button ion-button small round (click)="backToStart()">{{ "a_g_ok" | translate }}</button>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMSessionFinishedModal/MCMSessionFinishedModal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
    ], MCMSessionFinishedModal);
    return MCMSessionFinishedModal;
}());

//# sourceMappingURL=MCMSessionFinishedModal.js.map

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMTrailFinishedModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MCMTrailFinishedModal = /** @class */ (function () {
    function MCMTrailFinishedModal(viewCtrl, navCtrl, appCtrl, navParams) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.appCtrl = appCtrl;
        this.navParams = navParams;
        this.score = navParams.data.score;
        this.tasks = navParams.data.tasks;
        this.callback = navParams.data.callback;
        this.numberOfSolvedTasks = 0;
        var solvedTasks = this.score.getTasksSolved();
        var solvedLowTasks = this.score.getTasksSolvedLow();
        var savedTasks = this.score.getTasksSaved();
        this.tasks.map(function (task) {
            if (savedTasks.indexOf(task.id) >= 0 || solvedTasks.indexOf(task.id) >= 0 || solvedLowTasks.indexOf(task.id) >= 0) {
                _this.numberOfSolvedTasks++;
            }
        });
        if (navParams.data.narrative) {
            this.narrative = navParams.data.narrative;
            switch (this.narrative) {
                case 'pirates':
                    this.iconPath = 'pirates/';
                    break;
                default:
                    this.iconPath = '';
            }
        }
        else {
            this.iconPath = '';
        }
    }
    // ionViewDidEnter() {
    //     setTimeout(() => {
    //         this.input.setFocus();
    //     }, 150);
    // }
    MCMTrailFinishedModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    MCMTrailFinishedModal.prototype.backToStart = function () {
        this.appCtrl.getRootNav().popToRoot(__WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */]);
        this.cancel();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'),
        __metadata("design:type", Object)
    ], MCMTrailFinishedModal.prototype, "input", void 0);
    MCMTrailFinishedModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-trail-finished-modal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMTrailFinishedModal/MCMTrailFinishedModal.html"*/'<div class="modal card icon has-button-on-the-edge">\n\n    <div class="modal-content">\n        <img class="head-icon" src="./assets/icons/{{iconPath}}modal-trail-finished.svg"/>\n        <h2>{{\'a_trail_finished_title\' | translate }}</h2>\n        <ion-grid no-padding class="table">\n            <ion-row *ngIf="score.score && score.score != 0" class="finish">\n                <ion-col>\n                    <ion-label>{{\'a_private_session_earned_points\' | translate}}</ion-label>\n                </ion-col>\n                <ion-col col-auto>\n                    <ion-label class="score">{{score.score}}</ion-label>\n                </ion-col>\n            </ion-row>\n            <ion-row class="finish">\n                <ion-col>\n                    <ion-label>{{\'a_private_session_finished_tasks\' | translate}}</ion-label>\n                </ion-col>\n                <ion-col col-auto>\n                    <ion-label>{{numberOfSolvedTasks}} / {{tasks.length}}</ion-label>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n\n    <div class="on-the-edge-container">\n        <button ion-button small round (click)="callback()">{{ "a_g_ok" | translate }}</button>\n    </div>\n</div>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMTrailFinishedModal/MCMTrailFinishedModal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavParams */]])
    ], MCMTrailFinishedModal);
    return MCMTrailFinishedModal;
}());

//# sourceMappingURL=MCMTrailFinishedModal.js.map

/***/ }),

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MCMRouteByCodeModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_modal_modal_controller__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__MCMTermsAndConditionsModal_MCMTermsAndConditionsModal__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_api_services_session_service__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(12);
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







var MCMRouteByCodeModal = /** @class */ (function () {
    function MCMRouteByCodeModal(ormService, modalCtrl, viewCtrl, sessionService, navParams) {
        this.ormService = ormService;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.sessionService = sessionService;
        this.navParams = navParams;
        this.code = '';
        this.codeInput = false;
        this.navCtrl = navParams.data.navCtrl;
    }
    MCMRouteByCodeModal_1 = MCMRouteByCodeModal;
    MCMRouteByCodeModal.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.input.setFocus();
        }, 150);
    };
    MCMRouteByCodeModal.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    MCMRouteByCodeModal.prototype.checkInputField = function () {
        if (this.code.length >= 4) {
            return this.codeInput = true;
        }
        else {
            return this.codeInput = false;
        }
    };
    MCMRouteByCodeModal.prototype.addTrailOrSessionByCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var route, session, e_1, modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormService.findRouteByCode(this.code)];
                    case 1:
                        route = _a.sent();
                        if (!!route) return [3 /*break*/, 6];
                        session = void 0;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.sessionService.getSessionByCode(this.code).toPromise()];
                    case 3:
                        session = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        if (session) {
                            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__MCMTermsAndConditionsModal_MCMTermsAndConditionsModal__["a" /* MCMTermsAndConditionsModal */], {
                                session: session,
                                navCtrl: this.navCtrl
                            });
                            this.cancel();
                            modal.present();
                        }
                        else {
                            this.showError = true;
                        }
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.ormService.unlockRoute(route)];
                    case 7:
                        _a.sent();
                        this.viewCtrl.dismiss(route);
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    MCMRouteByCodeModal.show = function (navCtrl, modalCtrl, translateService, modalsService) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (success) {
                        var modal = modalCtrl.create(MCMRouteByCodeModal_1, { navCtrl: navCtrl });
                        modal.onDidDismiss(function (route) {
                            if (route) {
                                modalsService.showDialog(null, translateService.instant('a_private_route_added', { 'T': route.title }), translateService.instant('a_g_ok'), function () {
                                    modalsService.presentRouteInfoModal(route, navCtrl);
                                });
                            }
                            success(route);
                        });
                        modal.present();
                    })];
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('input'),
        __metadata("design:type", Object)
    ], MCMRouteByCodeModal.prototype, "input", void 0);
    MCMRouteByCodeModal = MCMRouteByCodeModal_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mcm-route-by-code-modal',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMRouteByCodeModal/MCMRouteByCodeModal.html"*/'<!--<div class="modal card has-button-on-the-edge">-->\n    <!--<h2>{{\'a_private_route_add_title\' | translate}}</h2>-->\n\n    <!--<div class="modal-content">-->\n        <!--<p>{{\'a_add_private_route_placeholder\' | translate}}</p>-->\n        <!--<ion-item>-->\n            <!--<ion-input #input type="text" [(ngModel)]="code"></ion-input>-->\n        <!--</ion-item>-->\n        <!--<span *ngIf="showError">-->\n            <!--{{ \'a_private_route_failed\' | translate }}-->\n        <!--</span>-->\n    <!--</div>-->\n\n    <!--<div class="on-the-edge-container">-->\n        <!--<button ion-button small round color="danger" (click)="cancel()">{{ "a_alert_cancel" | translate }}</button>-->\n        <!--<button ion-button small round (click)="addRouteByCode()">{{ "a_private_route_add" | translate }}</button>-->\n    <!--</div>-->\n<!--</div>-->\n\n<div class="modal card has-button-on-the-edge">\n    <div class="modal-content">\n        <h2>{{\'a_private_trail_or_session_add_title\' | translate}}</h2>\n        <p>{{\'a_add_private_route_or_session_placeholder\' | translate}}</p>\n        <ion-item>\n            <ion-input #input\n                       type="text"\n                       [(ngModel)]="code">\n            </ion-input>\n        </ion-item>\n        <span *ngIf="showError">\n            {{ \'a_private_route_failed\' | translate }}\n        </span>\n    </div>\n\n    <div class="on-the-edge-container">\n        <button ion-button small round color="danger" (click)="cancel()">{{ "a_alert_cancel" | translate }}</button>\n        <button ion-button small round (click)="addTrailOrSessionByCode()" [disabled]="!checkInputField()">{{ "a_private_trail_or_session_add" | translate }}</button>\n    </div>\n</div>'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/modals/MCMRouteByCodeModal/MCMRouteByCodeModal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_orm_service__["a" /* OrmService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_components_modal_modal_controller__["a" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular_navigation_view_controller__["a" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__app_api_services_session_service__["a" /* SessionService */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavParams */]])
    ], MCMRouteByCodeModal);
    return MCMRouteByCodeModal;
    var MCMRouteByCodeModal_1;
}());

//# sourceMappingURL=MCMRouteByCodeModal.js.map

/***/ }),

/***/ 650:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(655);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__classes_DB_Updater__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_spinner_dialog__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_diagnostic__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_modals_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_language_service__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_globalization__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_customKeyBoard_custom_keyboard__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__app_component__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_common_http__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_translate_loader__ = __webpack_require__(1129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_images_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__modals_RouteInfo_RouteInfo__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angular_linky__ = __webpack_require__(1132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angular_linky___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_angular_linky__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_mcm_download_progress_popup_mcm_download_progress_popup_component__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services_broadcast_service__ = __webpack_require__(1134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__modals_MCMIconModal_MCMIconModal__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__modals_MCMIntroModal_MCMIntroModal__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__modals_MCMRouteByCodeModal_MCMRouteByCodeModal__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__modals_MCMTermsAndConditionsModal_MCMTermsAndConditionsModal__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__modals_MCMJoinSessionModal_MCMJoinSessionModal__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__modals_CenteredTask_CenteredTask__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__services_gps_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_location_accuracy__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__components_ngx_youtube_player_modules_ngx_youtube_player_module__ = __webpack_require__(1135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__components_components_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__directives_autoresize__ = __webpack_require__(1137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__api_api_module__ = __webpack_require__(1138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__services_chat_and_session_service__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_chat_chat_module__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_local_notifications__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__ionic_native_in_app_browser__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_app_version__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_media__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_angular_progress_bar__ = __webpack_require__(1140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_screen_orientation__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__modals_MCMTrailFinishedModal_MCMTrailFinishedModal__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__directives_directives_module__ = __webpack_require__(1143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















/* Translation */

































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_20__app_component__["b" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_26__modals_RouteInfo_RouteInfo__["a" /* RouteInfo */],
                __WEBPACK_IMPORTED_MODULE_28__components_mcm_download_progress_popup_mcm_download_progress_popup_component__["a" /* MCMDownloadProgressPopupComponent */],
                __WEBPACK_IMPORTED_MODULE_30__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], __WEBPACK_IMPORTED_MODULE_32__modals_MCMRouteByCodeModal_MCMRouteByCodeModal__["a" /* MCMRouteByCodeModal */], __WEBPACK_IMPORTED_MODULE_33__modals_MCMTermsAndConditionsModal_MCMTermsAndConditionsModal__["a" /* MCMTermsAndConditionsModal */], __WEBPACK_IMPORTED_MODULE_34__modals_MCMJoinSessionModal_MCMJoinSessionModal__["a" /* MCMJoinSessionModal */], __WEBPACK_IMPORTED_MODULE_35__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], __WEBPACK_IMPORTED_MODULE_31__modals_MCMIntroModal_MCMIntroModal__["a" /* MCMIntroModal */], __WEBPACK_IMPORTED_MODULE_52__modals_MCMTrailFinishedModal_MCMTrailFinishedModal__["a" /* MCMTrailFinishedModal */],
                __WEBPACK_IMPORTED_MODULE_36__modals_CenteredTask_CenteredTask__["a" /* CenteredTask */],
                __WEBPACK_IMPORTED_MODULE_42__directives_autoresize__["a" /* Autoresize */],
                __WEBPACK_IMPORTED_MODULE_18__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_21__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_20__app_component__["b" /* MyApp */], {
                    tabsHideOnSubPages: true,
                    swipeBackEnabled: false
                }, {
                    links: [
                        { loadChildren: '../pages/chat/chat.module#ChatPageModule', name: 'ChatPage', segment: 'chat', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/tabs/TasksMap/TasksMap.module#TasksMapPageModule', name: 'TasksMap', segment: 'TasksMap/:routeId', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/tabs/RoutesList/RoutesList.module#RoutesListPageModule', name: 'RoutesListPage', segment: 'RoutesList', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/tabs/RoutesMap/RoutesMap.module#RoutesMapPageModule', name: 'RoutesMapPage', segment: 'RoutesMap', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/info/info.module#InfoPageModule', name: 'InfoPage', segment: 'info', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/portal/portal.module#PortalPageModule', name: 'PortalPage', segment: 'portal', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/onboarding/onboarding.module#OnboardingPageModule', name: 'OnboardingPage', segment: 'onboarding', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/task-detail/task-detail.module#TaskDetailPageModule', name: 'TaskDetail', segment: ':routeId/TasksDetail/:taskId', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_23__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_23__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (__WEBPACK_IMPORTED_MODULE_22__providers_translate_loader__["a" /* createTranslateLoader */]),
                        deps: [__WEBPACK_IMPORTED_MODULE_21__angular_common_http__["a" /* HttpClient */]],
                    }, useDefaultLang: true
                }),
                __WEBPACK_IMPORTED_MODULE_40__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_27_angular_linky__["LinkyModule"],
                __WEBPACK_IMPORTED_MODULE_39__components_ngx_youtube_player_modules_ngx_youtube_player_module__["a" /* YoutubePlayerModule */],
                __WEBPACK_IMPORTED_MODULE_43__api_api_module__["a" /* ApiModule */],
                __WEBPACK_IMPORTED_MODULE_45__pages_chat_chat_module__["ChatPageModule"],
                __WEBPACK_IMPORTED_MODULE_50_angular_progress_bar__["a" /* ProgressBarModule */],
                __WEBPACK_IMPORTED_MODULE_53__directives_directives_module__["a" /* DirectivesModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_20__app_component__["b" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_26__modals_RouteInfo_RouteInfo__["a" /* RouteInfo */],
                __WEBPACK_IMPORTED_MODULE_28__components_mcm_download_progress_popup_mcm_download_progress_popup_component__["a" /* MCMDownloadProgressPopupComponent */],
                __WEBPACK_IMPORTED_MODULE_30__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], __WEBPACK_IMPORTED_MODULE_32__modals_MCMRouteByCodeModal_MCMRouteByCodeModal__["a" /* MCMRouteByCodeModal */], __WEBPACK_IMPORTED_MODULE_33__modals_MCMTermsAndConditionsModal_MCMTermsAndConditionsModal__["a" /* MCMTermsAndConditionsModal */], __WEBPACK_IMPORTED_MODULE_34__modals_MCMJoinSessionModal_MCMJoinSessionModal__["a" /* MCMJoinSessionModal */], __WEBPACK_IMPORTED_MODULE_35__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], __WEBPACK_IMPORTED_MODULE_31__modals_MCMIntroModal_MCMIntroModal__["a" /* MCMIntroModal */], __WEBPACK_IMPORTED_MODULE_52__modals_MCMTrailFinishedModal_MCMTrailFinishedModal__["a" /* MCMTrailFinishedModal */],
                __WEBPACK_IMPORTED_MODULE_36__modals_CenteredTask_CenteredTask__["a" /* CenteredTask */],
                __WEBPACK_IMPORTED_MODULE_18__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_9__classes_DB_Updater__["a" /* DB_Updater */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
                __WEBPACK_IMPORTED_MODULE_24__services_orm_service__["a" /* OrmService */],
                __WEBPACK_IMPORTED_MODULE_25__services_images_service__["a" /* ImagesService */],
                __WEBPACK_IMPORTED_MODULE_29__services_broadcast_service__["a" /* BroadcastService */],
                __WEBPACK_IMPORTED_MODULE_15__services_modals_service__["a" /* ModalsService */],
                __WEBPACK_IMPORTED_MODULE_37__services_gps_service__["a" /* GpsService */],
                __WEBPACK_IMPORTED_MODULE_16__services_language_service__["a" /* LanguageService */],
                __WEBPACK_IMPORTED_MODULE_41__classes_Helper__["b" /* Helper */],
                __WEBPACK_IMPORTED_MODULE_44__services_chat_and_session_service__["a" /* ChatAndSessionService */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_local_notifications__["b" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_47__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_app_version__["a" /* AppVersion */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_globalization__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_49__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiConfiguration; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */

/**
 * Contains global configuration for API services
 */
var ApiConfiguration = /** @class */ (function () {
    function ApiConfiguration() {
        this.rootUrl = "https://api.mathcitymap.eu/public/index.php"; // http://localhost/;
        // rootUrl: string = "https://api-dev.mathcitymap.eu/public/index.php";
    }
    ApiConfiguration = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ApiConfiguration);
    return ApiConfiguration;
}());

//# sourceMappingURL=api-configuration.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_modal_modal_controller__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_deep_linker__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_mcm_download_progress_popup_mcm_download_progress_popup_component__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_RouteInfo_RouteInfo__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modals_CenteredTask_CenteredTask__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_spinner_dialog__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__classes_DB_Updater__ = __webpack_require__(115);
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












var ModalsService = /** @class */ (function () {
    function ModalsService(modalCtrl, ormService, alertCtrl, deepLinker, translateService, spinner, dbUpdater, helper) {
        this.modalCtrl = modalCtrl;
        this.ormService = ormService;
        this.alertCtrl = alertCtrl;
        this.deepLinker = deepLinker;
        this.translateService = translateService;
        this.spinner = spinner;
        this.dbUpdater = dbUpdater;
        this.helper = helper;
    }
    ModalsService.prototype.doDownload = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var cancelHasBeenClicked, data, downloadModal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.showNoInternetModalIfOffline()];
                    case 1:
                        if (!(_a.sent())) {
                            return [2 /*return*/];
                        }
                        console.log("doDownload " + JSON.stringify(route.id));
                        cancelHasBeenClicked = false;
                        data = {
                            total: 0,
                            currentProgress: 0,
                            cancelCallback: function () {
                                console.log("cancel has been clicked");
                                cancelHasBeenClicked = true;
                            },
                            titleKey: 'a_rdl_title_map'
                        };
                        downloadModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_mcm_download_progress_popup_mcm_download_progress_popup_component__["a" /* MCMDownloadProgressPopupComponent */], data, {
                            showBackdrop: true,
                            enableBackdropDismiss: false
                        });
                        downloadModal.present();
                        return [4 /*yield*/, this.ormService.downloadRoute(route, function (doneDownload, totalDownload, titleKey) {
                                data.total = totalDownload;
                                data.currentProgress = doneDownload;
                                if (titleKey) {
                                    data.titleKey = titleKey;
                                }
                                if (data.updateView) {
                                    data.updateView();
                                }
                                // make sure that updated values are bound to DOM
                                return cancelHasBeenClicked;
                            }, this.dbUpdater)];
                    case 2:
                        _a.sent();
                        downloadModal.dismiss();
                        return [2 /*return*/, !cancelHasBeenClicked];
                }
            });
        });
    };
    ModalsService.prototype.showRoute = function (route, navCtrl, startRoute, selectedTask) {
        if (startRoute === void 0) { startRoute = false; }
        if (selectedTask === void 0) { selectedTask = null; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!route.downloaded) return [3 /*break*/, 2];
                        // 15.05.18 - Perform dataset refresh of related tasks of the route if online
                        return [4 /*yield*/, this.dbUpdater.updateRouteTasksData(route, this.translateService.instant("a_language_code"))];
                    case 1:
                        // 15.05.18 - Perform dataset refresh of related tasks of the route if online
                        _a.sent();
                        if (startRoute) {
                            this.navigateToRoute(route, navCtrl, null);
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.presentRouteInfoModal(route, navCtrl)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ModalsService.prototype.showDialog = function (titleKey, messageKey, button1Key, button1Handler, button2Key, button2Handler, narrative) {
        if (narrative === void 0) { narrative = 'default'; }
        return __awaiter(this, void 0, void 0, function () {
            var buttons, confirm;
            return __generator(this, function (_a) {
                button1Key = button1Key || 'a_g_ok';
                buttons = [{
                        text: this.translateService.instant(button1Key),
                        handler: button1Handler
                    }];
                if (button2Key && button2Handler) {
                    buttons.push({
                        text: this.translateService.instant(button2Key),
                        handler: button2Handler
                    });
                }
                confirm = this.alertCtrl.create({
                    title: titleKey ? this.translateService.instant(titleKey) : null,
                    message: messageKey ? this.translateService.instant(messageKey) : null,
                    buttons: buttons,
                    cssClass: narrative
                });
                confirm.present();
                return [2 /*return*/, confirm];
            });
        });
    };
    ModalsService.prototype.showYesNoDialog = function (titleKey, messageKey, yesKey, noKey) {
        var _this = this;
        yesKey = yesKey || 'yes';
        noKey = noKey || 'no';
        return new Promise(function (resolve, reject) {
            _this.showDialog(titleKey, messageKey, yesKey, function () { return resolve(true); }, noKey, function () { return resolve(false); });
        });
    };
    ModalsService.prototype.navigateToRoute = function (route, navCtrl, selectedTask) {
        var _this = this;
        if (selectedTask === void 0) { selectedTask = null; }
        this.spinner.show(null, null, false);
        setTimeout(function () {
            if (navCtrl.parent && navCtrl.parent.parent) {
                navCtrl.parent.parent.push('TasksMap', {
                    routeId: route.id,
                    headerTitle: route.title,
                    selectedTask: selectedTask
                }, {}, function () {
                    // necessary because of bug which does not update URL
                    _this.deepLinker.navChange('forward');
                });
            }
            else if (navCtrl.parent == null) {
                navCtrl.push('TasksMap', {
                    routeId: route.id,
                    headerTitle: route.title,
                    selectedTask: selectedTask
                }, {}, function () {
                    // necessary because of bug which does not update URL
                    _this.deepLinker.navChange('forward');
                });
            }
        }, 10);
    };
    ModalsService.prototype.presentRouteInfoModal = function (route, navCtrl) {
        var _this = this;
        var self = this;
        return new Promise(function (success) {
            //Passing navCtrl to prevent issues of dismissing 2 modals and having no navCtrl to use for showRoute.
            var data = {
                routeId: route.id,
                modalsService: _this,
                route: null
            };
            var routeInfoModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_RouteInfo_RouteInfo__["a" /* RouteInfo */], data);
            routeInfoModal.onDidDismiss(function (result) {
                if (result && result.showRoute) {
                    //will probably never showRoute;
                    self.showRoute(result.route, navCtrl, true);
                    success(result.route);
                }
                else {
                    // route is set by RouteInfo
                    success(data.route);
                }
            });
            routeInfoModal.present();
        });
    };
    ModalsService.prototype.presentTaskListModal = function (route, score, state, narrative, navCtrl, callback) {
        if (narrative === void 0) { narrative = 'default'; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var testModal, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = this.modalCtrl).create;
                        _c = [__WEBPACK_IMPORTED_MODULE_6__modals_CenteredTask_CenteredTask__["a" /* CenteredTask */]];
                        _d = {
                            route: route,
                            score: score,
                            state: state
                        };
                        return [4 /*yield*/, route.getTasks()];
                    case 1:
                        testModal = _b.apply(_a, _c.concat([(_d.tasks = _e.sent(),
                                _d.modalsService = this,
                                _d), { cssClass: narrative }]));
                        testModal.onDidDismiss(function (data) {
                            /* coming from List/Map View */
                            if (data && data.route != null && navCtrl != null && !callback)
                                _this.navigateToRoute(data.route, navCtrl, data.selectedTask);
                            else if (data && data.selectedTask != null && navCtrl != null && callback)
                                callback(data.selectedTask);
                            /*          else if(data && data.route != null && navCtrl != null && fromTaskMap) console.log('You wanna see the marker now?'); */
                        });
                        testModal.present();
                        return [2 /*return*/, testModal];
                }
            });
        });
    };
    ModalsService.prototype.showNoInternetModalIfOffline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var quality;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.helper.isOnline) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.helper.checkConnection()];
                    case 1:
                        quality = _a.sent();
                        if (!(quality == __WEBPACK_IMPORTED_MODULE_10__classes_Helper__["a" /* ConnectionQuality */].FAST)) return [3 /*break*/, 2];
                        return [2 /*return*/, true];
                    case 2: return [4 /*yield*/, this.showYesNoDialog('a_slow_connection_title', 'a_slow_connection', 'a_alert_continue', 'a_alert_cancel')];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.showDialog(null, 'a_toast_need_internet_for_update')];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ModalsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular_components_modal_modal_controller__["a" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1__orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular_navigation_deep_linker__["a" /* DeepLinker */],
            __WEBPACK_IMPORTED_MODULE_8__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_11__classes_DB_Updater__["a" /* DB_Updater */],
            __WEBPACK_IMPORTED_MODULE_10__classes_Helper__["b" /* Helper */]])
    ], ModalsService);
    return ModalsService;
}());

//# sourceMappingURL=modals-service.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GpsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_diagnostic__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(404);
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








var GpsService = /** @class */ (function () {
    function GpsService(diagnostic, alertCtrl, platform, locationAcc, geolocation) {
        var _this = this;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.locationAcc = locationAcc;
        this.geolocation = geolocation;
        this.subject = new CustomReplaySubject(1);
        GpsService_1.INSTANCE = this;
        this.subject.emptyCallback = function () {
            if (_this.geolocationSubscription) {
                // no more observers left -> unsubscribe
                _this.geolocationSubscription.unsubscribe();
                _this.geolocationSubscription = null;
                console.log("unsubscribing from geolocation.watchPosition()");
            }
        };
    }
    GpsService_1 = GpsService;
    GpsService.prototype.isLocationOn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.platform.ready()];
                    case 1:
                        _a.sent();
                        console.log("platform: " + this.platform.platforms());
                        //if the platform is not browser
                        if (this.platform.is("android") &&
                            Object(__WEBPACK_IMPORTED_MODULE_4__ionic_native_core__["i" /* checkAvailability */])(__WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__["a" /* LocationAccuracy */].getPluginRef(), null, __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__["a" /* LocationAccuracy */].getPluginName()) === true)
                            this.diagnostic.isLocationEnabled().then(function (enabled) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            //if the location is off
                                            console.log("LOCATION##: ", enabled);
                                            if (!!enabled) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.turnLocationOn()];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    GpsService.prototype.locationAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var confirm;
            return __generator(this, function (_a) {
                confirm = this.alertCtrl.create({
                    title: 'Location Off',
                    message: 'Do you want to turn on your device location?',
                    buttons: [
                        {
                            text: 'NO',
                            handler: function () {
                                console.log('Disagree clicked');
                            }
                        },
                        {
                            text: 'YES',
                            handler: function () {
                                _this.turnLocationOn();
                            }
                        }
                    ]
                });
                confirm.present();
                return [2 /*return*/];
            });
        });
    };
    GpsService.prototype.turnLocationOn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.locationAcc.canRequest().then(function (can) {
                    if (can)
                        _this.locationAcc.request(_this.locationAcc.REQUEST_PRIORITY_HIGH_ACCURACY).then(function (suc) {
                            console.log("Device Location is now turned ON");
                        }, function (rip) {
                            console.log("Device Location is still OFF ");
                        });
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Watch the current device's position.  Clear the watch by unsubscribing from
     * Observable changes.
     *
     * ```typescript
     * const subscription = this.geolocation.watchPosition()
     *                               .filter((p) => p.coords !== undefined) //Filter Out Errors
     *                               .subscribe(position => {
     *   console.log(position.coords.longitude + ' ' + position.coords.latitude);
     * });
     *
     * // To stop notifications
     * subscription.unsubscribe();
     * ```
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Observable<Geoposition>} Returns an Observable that notifies with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or errors.
     */
    GpsService.prototype.watchPosition = function (options) {
        var _this = this;
        if (!this.geolocationSubscription) {
            console.log("subscribing to geolocation.watchPosition()");
            if (!options) {
                options = {
                    enableHighAccuracy: true
                };
            }
            this.geolocationSubscription = this.geolocation.watchPosition(options).subscribe(function (next) {
                _this.subject.next(next);
                if (next && next.coords) {
                    console.debug("watchPosition: " + next.coords.latitude + ", " + next.coords.longitude);
                    _this.lastPosition = next;
                }
            });
        }
        return this.subject;
    };
    /**
     * Get the device's current position.
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Promise<Geoposition>} Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
     */
    GpsService.prototype.getCurrentPosition = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var position, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            options = {
                                enableHighAccuracy: true
                            };
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.geolocation.getCurrentPosition(options)];
                    case 2:
                        position = _a.sent();
                        this.subject.next(position);
                        if (position && position.coords) {
                            console.debug("getCurrentPosition: " + position.coords.latitude + ", " + position.coords.longitude);
                            this.lastPosition = position;
                        }
                        return [2 /*return*/, position];
                    case 3:
                        e_1 = _a.sent();
                        console.log('gps-service.ts: getCurrentPosition() caught exception', e_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GpsService.prototype.getLastPosition = function () {
        return this.lastPosition;
    };
    GpsService = GpsService_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */]])
    ], GpsService);
    return GpsService;
    var GpsService_1;
}());

var CustomReplaySubject = /** @class */ (function (_super) {
    __extends(CustomReplaySubject, _super);
    function CustomReplaySubject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomReplaySubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var result = _super.prototype._subscribe.call(this, subscriber);
        var originalUnsubscribe = result.unsubscribe;
        result.unsubscribe = function () {
            originalUnsubscribe.apply(result);
            if (!_this.hasObservers() && _this.emptyCallback) {
                _this.emptyCallback();
            }
        };
        return result;
    };
    CustomReplaySubject.prototype.hasObservers = function () {
        return this.observers.length > 0;
    };
    return CustomReplaySubject;
}(__WEBPACK_IMPORTED_MODULE_5_rxjs_ReplaySubject__["ReplaySubject"]));
//# sourceMappingURL=gps-service.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseService; });
/**
 * Base class for API services
 */
var BaseService = /** @class */ (function () {
    function BaseService(config, http) {
        this.config = config;
        this.http = http;
    }
    Object.defineProperty(BaseService.prototype, "rootUrl", {
        /**
         * Returns the root url for API operations. If not set directly in this
         * service, will fallback to ApiConfiguration.rootUrl.
         */
        get: function () {
            return this._rootUrl || this.config.rootUrl;
        },
        /**
         * Sets the root URL for API operations in this service.
         */
        set: function (rootUrl) {
            this._rootUrl = rootUrl;
        },
        enumerable: true,
        configurable: true
    });
    return BaseService;
}());

//# sourceMappingURL=base-service.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Route; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_typeorm__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Score__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Task2Route__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_gps_service__ = __webpack_require__(76);
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







var Route = /** @class */ (function () {
    function Route() {
        // CREATE TABLE IF NOT EXISTS mcm_route (_id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,public VARCHAR (1) NOT NULL,title TEXT NOT NULL,country_code TEXT NOT NULL,city TEXT NOT NULL,image TEXT ,code VARCHAR (64),
        // grade TEXT (64),tags VARCHAR ,duration VARCHAR (64),length VARCHAR (64),bounding_box TEXT ,center TEXT ,timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,description TEXT ,create_date TIMESTAMP NOT NULL,attr TEXT TEXT)");
        this.narrativeStrings = [];
        this.matchingStrings = {
            "a_alert_welcome": "welcome",
            "a_alert_welcome_msg": "welcomeMessage",
            "a_alert_congrats_msg": "ending",
            "a_did_you_know": "aboutObject",
            "a_alert_right_answer_title": "wellDone",
            "a_alert_right_answer_title_low": "notPerfect",
            "a_alert_right_answer_1": "firstGo",
            "a_alert_false_answer_title": "wrongAnswer",
            "a_alert_false_answer_1": "tryAgain",
            "a_alert_false_answer_2": "takeHint",
            "a_skipTask_confirm": "skipTask",
            "a_alert_congrats": "congratulations",
            "good_luck_next_time": "goodLuck"
        };
        this.boundingBoxLatLng = null;
        this.viewBoundingBoxLatLng = null;
        this.centerLatLng = null;
        this.distance = null;
    }
    Route.prototype.getTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.tasks) {
                            return [2 /*return*/, this.tasks];
                        }
                        if (!this.task2Routes) return [3 /*break*/, 2];
                        this.task2Routes.sort(function (a, b) { return a.id - b.id; });
                        _a = this;
                        return [4 /*yield*/, Promise.all(this.task2Routes.map(function (value, index) { return __awaiter(_this, void 0, void 0, function () {
                                var task;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, value.getTaskWithSubtasks()];
                                        case 1:
                                            task = _a.sent();
                                            task.position = index + 1;
                                            return [2 /*return*/, Promise.resolve(task)];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.tasks = _c.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        // relation was not loaded yet -> reload route to get tasks
                        _b = this;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_5__services_orm_service__["a" /* OrmService */].INSTANCE.findRouteById(this.id)];
                    case 3: return [4 /*yield*/, (_c.sent()).getTasks()];
                    case 4:
                        // relation was not loaded yet -> reload route to get tasks
                        _b.tasks = _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/, this.tasks];
                }
            });
        });
    };
    Route.prototype.getTaskCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tasks)
                            return [2 /*return*/, this.tasks.length];
                        if (!this.task2Routes) return [3 /*break*/, 1];
                        return [2 /*return*/, this.task2Routes.length];
                    case 1: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_5__services_orm_service__["a" /* OrmService */].INSTANCE.findRouteById(this.id)];
                    case 2: 
                    // relation was not loaded yet -> reload route to get tasks
                    return [4 /*yield*/, (_a.sent()).getTaskCount()];
                    case 3:
                        // relation was not loaded yet -> reload route to get tasks
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Route.prototype.getScoreForUser = function (user) {
        var userScore = this.scores.filter(function (value) { return value.userId == user.id; });
        var score = userScore.length > 0 ? userScore[0] : new __WEBPACK_IMPORTED_MODULE_3__Score__["a" /* Score */]();
        score.userId = user.id;
        score.route = this;
        return score;
    };
    Route.prototype.getImageURL = function () {
        return this.image;
    };
    Route.prototype.calcBoundingBoxAndCenter = function () {
        var padding = 0.0015;
        var jsonBB = JSON.parse(this.boundingBox);
        var jsonCenter = JSON.parse(this.center);
        if (!jsonBB) {
            return;
        }
        var northWest = jsonBB[0];
        var southEast = jsonBB[1];
        var south = southEast[0] - padding;
        var north = northWest[0] + padding;
        var west = northWest[1] - padding;
        var east = southEast[1] + padding;
        this.viewBoundingBoxLatLng = new __WEBPACK_IMPORTED_MODULE_2_leaflet__["LatLngBounds"]([northWest[0], southEast[1]], [southEast[0], northWest[1]]);
        this.boundingBoxLatLng = new __WEBPACK_IMPORTED_MODULE_2_leaflet__["LatLngBounds"]([[north, east], [south, west]]);
        this.centerLatLng = new __WEBPACK_IMPORTED_MODULE_2_leaflet__["LatLng"](jsonCenter[0], jsonCenter[1]);
    };
    Route.prototype.getAssistiveEquipment = function (translateService) {
        var equipment = "";
        if (this.tasks) {
            for (var i = 0; i < this.tasks.length; i++) {
                var equipmentArray = this.tasks[i].getAssistiveEquipment();
                for (var j = 0; j < equipmentArray.length; j++) {
                    var translation = translateService.instant(equipmentArray[j]);
                    if (equipment.indexOf(translation) == -1) {
                        if (equipment != "") {
                            equipment = equipment + ", ";
                        }
                        equipment = equipment + translation;
                    }
                }
            }
        }
        return equipment;
    };
    Route.prototype.getSettingValue = function (key) {
        if (this.isSettingAvailable(key)) {
            var attr = this.getAttributes();
            return attr[key] === "true" || attr[key] === "1";
        }
        else
            return null;
    };
    Route.prototype.getSettingStringValue = function (key, translateService) {
        var value = this.getSettingValue(key);
        if (value !== null) {
            return value ? translateService.instant('a_settings_active') : translateService.instant('a_settings_inactive');
        }
        else {
            return "";
        }
    };
    /*
    Checks if setting with given key is available
    @param key string
    @return boolean
     */
    Route.prototype.isSettingAvailable = function (key) {
        var attr = this.getAttributes();
        // fix missing values
        if (!attr.sampleSolution) {
            attr.sampleSolution = "true";
        }
        if (!attr.hints) {
            attr.hints = "true";
        }
        if (!attr.answerValidation) {
            attr.answerValidation = "true";
        }
        if (!attr.answerFeedback) {
            attr.answerFeedback = "true";
        }
        this.attr = JSON.stringify(attr);
        return attr.hasOwnProperty(key);
    };
    Route.prototype.getBoundingBoxLatLng = function () {
        if (!this.boundingBoxLatLng) {
            this.calcBoundingBoxAndCenter();
        }
        return this.boundingBoxLatLng;
    };
    Route.prototype.getViewBoundingBoxLatLng = function () {
        if (!this.viewBoundingBoxLatLng) {
            this.calcBoundingBoxAndCenter();
        }
        return this.viewBoundingBoxLatLng;
    };
    Route.prototype.getCenterLatLng = function () {
        if (!this.centerLatLng) {
            this.calcBoundingBoxAndCenter();
        }
        return this.centerLatLng;
    };
    Route.prototype.getDistance = function () {
        if (__WEBPACK_IMPORTED_MODULE_6__services_gps_service__["a" /* GpsService */].INSTANCE.getLastPosition() && this.distance == null) {
            this.distance = __WEBPACK_IMPORTED_MODULE_1__classes_Helper__["b" /* Helper */].INSTANCE.getDistanceToCenterByLatLng(this.getCenterLatLng());
        }
        return this.distance;
    };
    Route.prototype.getAttributes = function () {
        if (!this.attr) {
            return {};
        }
        return __WEBPACK_IMPORTED_MODULE_1__classes_Helper__["b" /* Helper */].safeJsonDecode(this.attr);
    };
    Route.prototype.getNarrativeName = function () {
        //return string for testing with a specific narrative on all routes (works best together with isNarrativeEnabled true);
        //return 'pirates';
        var name = this.getAttributes().narrativeName;
        if (name) {
            return name.toLowerCase();
        }
        else {
            return "";
        }
    };
    Route.prototype.getTilesMap = function (narrative) {
        if (this.getAttributes().tilesUrl) {
            return this.getAttributes().tilesUrl;
        }
        else {
            switch (narrative) {
                case 'pirates':
                    // return 'mapbox://styles/igurjanow/ck0ezs4vd02ou1co75ep12pyz';
                    return 'https://{s}.api.mapbox.com/styles/v1/tempgeocent/cj2qe6qid003a2rmrquvqgbcx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGVtcGdlb2NlbnQiLCJhIjoiY2l1YTNmenEyMDAwdDJ6cWZxbG55Yjg4OSJ9.QRTz4Pi3096MtXKc_QgpWQ';
                default:
                    // return 'mapbox://styles/mapbox/outdoors-v11';
                    return __WEBPACK_IMPORTED_MODULE_1__classes_Helper__["b" /* Helper */].mapquestUrl;
            }
        }
    };
    Route.prototype.getTilesServerSubdomains = function (narrative) {
        if (this.getAttributes().tilesSubdomains) {
            return this.getAttributes().tilesSubdomains;
        }
        else {
            switch (narrative) {
                case 'pirates':
                    return ['a', 'b'];
                default:
                    return __WEBPACK_IMPORTED_MODULE_1__classes_Helper__["b" /* Helper */].subDomains;
            }
        }
    };
    Route.prototype.isGamificationDisabled = function () {
        if (this.getAttributes().gamification) {
            return this.getAttributes().gamification === "false";
        }
        else {
            return false;
        }
    };
    Route.prototype.isSampleSolutionEnabled = function () {
        if (this.getAttributes().sampleSolution) {
            return this.getAttributes().sampleSolution === "true";
        }
        else {
            return true;
        }
    };
    Route.prototype.isHintsEnabled = function () {
        if (this.getAttributes().hints) {
            return this.getAttributes().hints === "true";
        }
        else {
            return true;
        }
    };
    Route.prototype.isAnswerValidationEnabled = function () {
        if (this.getAttributes().answerValidation) {
            return this.getAttributes().answerValidation === "true";
        }
        else {
            return true;
        }
    };
    Route.prototype.isAnswerFeedbackEnabled = function () {
        if (this.getAttributes().answerFeedback) {
            return this.getAttributes().answerFeedback === "true";
        }
        else {
            return true;
        }
    };
    Route.prototype.isNarrativeEnabled = function () {
        // return true for testing with narrative enabled for all routes
        //return true
        return !!(this.getAttributes().narrativeName);
    };
    Route.prototype.setNarrativeStrings = function () {
        var strings = this.getAttributes().narrativeStrings;
        if (strings != null) {
            this.narrativeStrings = JSON.parse(strings);
        }
    };
    Route.prototype.hasNarrativeString = function ($mcmKey) {
        if (this.narrativeStrings == null || this.narrativeStrings.length == 0) {
            this.setNarrativeStrings();
        }
        var key = this.matchingStrings[$mcmKey];
        var newString = this.narrativeStrings[key];
        return newString ? true : false;
    };
    Route.prototype.getNarrativeString = function ($mcmKey) {
        if (this.narrativeStrings == null || this.narrativeStrings.length == 0) {
            this.setNarrativeStrings();
        }
        var key = this.matchingStrings[$mcmKey];
        var newString = this.narrativeStrings[key];
        if (newString && $mcmKey === 'a_alert_welcome_msg') {
            newString = newString.replace('###TITLE###', this.title);
        }
        return newString ? newString : $mcmKey;
    };
    //TODO Move this to individual tasks
    Route.prototype.isSubtaskRequired = function () {
        return this.getAttributes().useSubtasks === "true";
    };
    Route.prototype.getPathGeoJson = function () {
        if (this.pathGeojson && this.pathInfo !== 'undefined') {
            return JSON.parse(this.pathGeojson);
        }
        return null;
    };
    Route.prototype.getPathInfo = function () {
        if (this.pathInfo && this.pathInfo !== 'undefined') {
            return JSON.parse(this.pathInfo);
        }
        return null;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["h" /* PrimaryGeneratedColumn */])({ name: '_id' }),
        __metadata("design:type", Number)
    ], Route.prototype, "id", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'user_id' }),
        __metadata("design:type", Number)
    ], Route.prototype, "userId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 1 }),
        __metadata("design:type", String)
    ], Route.prototype, "public", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'country_code' }),
        __metadata("design:type", String)
    ], Route.prototype, "countryCode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "city", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "image", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 64 }),
        __metadata("design:type", String)
    ], Route.prototype, "code", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 64 }),
        __metadata("design:type", String)
    ], Route.prototype, "grade", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "tags", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "length", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ length: 64 }),
        __metadata("design:type", String)
    ], Route.prototype, "duration", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'bounding_box' }),
        __metadata("design:type", String)
    ], Route.prototype, "boundingBox", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "center", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "description", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'create_date' }),
        __metadata("design:type", String)
    ], Route.prototype, "createDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "timestamp", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])(),
        __metadata("design:type", String)
    ], Route.prototype, "attr", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'map_version' }),
        __metadata("design:type", String)
    ], Route.prototype, "mapVersion", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'map_filename' }),
        __metadata("design:type", String)
    ], Route.prototype, "mapFileName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'map_date' }),
        __metadata("design:type", String)
    ], Route.prototype, "mapDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'path_geojson' }),
        __metadata("design:type", String)
    ], Route.prototype, "pathGeojson", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'path_info' }),
        __metadata("design:type", String)
    ], Route.prototype, "pathInfo", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'lang_code' }),
        __metadata("design:type", String)
    ], Route.prototype, "langCode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["g" /* OneToMany */])(function (type) { return __WEBPACK_IMPORTED_MODULE_4__Task2Route__["a" /* Task2Route */]; }, function (task2Route) { return task2Route.route; }, { eager: true }),
        __metadata("design:type", Array)
    ], Route.prototype, "task2Routes", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'downloaded' }),
        __metadata("design:type", Boolean)
    ], Route.prototype, "downloaded", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'downloadedDate' }),
        __metadata("design:type", String)
    ], Route.prototype, "downloadedDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'completedDate' }),
        __metadata("design:type", String)
    ], Route.prototype, "completedDate", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'unlocked' }),
        __metadata("design:type", Boolean)
    ], Route.prototype, "unlocked", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'completed' }),
        __metadata("design:type", Boolean)
    ], Route.prototype, "completed", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["g" /* OneToMany */])(function (type) { return __WEBPACK_IMPORTED_MODULE_3__Score__["a" /* Score */]; }, function (score) { return score.route; }, { eager: true }),
        __metadata("design:type", Array)
    ], Route.prototype, "scores", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["a" /* Column */])({ name: 'min_zoom' }),
        __metadata("design:type", Number)
    ], Route.prototype, "min_zoom", void 0);
    Route = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0_typeorm__["b" /* Entity */])('mcm_route')
    ], Route);
    return Route;
}());

//# sourceMappingURL=Route.js.map

/***/ }),

/***/ 950:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsAddRequest; });
var EventsAddRequest = /** @class */ (function () {
    function EventsAddRequest() {
    }
    return EventsAddRequest;
}());

//# sourceMappingURL=events-add-request.js.map

/***/ }),

/***/ 951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventAddRequest; });
/* tslint:disable */
var EventAddRequest = /** @class */ (function () {
    function EventAddRequest() {
    }
    return EventAddRequest;
}());

//# sourceMappingURL=event-add-request.js.map

/***/ }),

/***/ 952:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 414,
	"./af.js": 414,
	"./ar": 415,
	"./ar-dz": 416,
	"./ar-dz.js": 416,
	"./ar-kw": 417,
	"./ar-kw.js": 417,
	"./ar-ly": 418,
	"./ar-ly.js": 418,
	"./ar-ma": 419,
	"./ar-ma.js": 419,
	"./ar-sa": 420,
	"./ar-sa.js": 420,
	"./ar-tn": 421,
	"./ar-tn.js": 421,
	"./ar.js": 415,
	"./az": 422,
	"./az.js": 422,
	"./be": 423,
	"./be.js": 423,
	"./bg": 424,
	"./bg.js": 424,
	"./bm": 425,
	"./bm.js": 425,
	"./bn": 426,
	"./bn-bd": 427,
	"./bn-bd.js": 427,
	"./bn.js": 426,
	"./bo": 428,
	"./bo.js": 428,
	"./br": 429,
	"./br.js": 429,
	"./bs": 430,
	"./bs.js": 430,
	"./ca": 431,
	"./ca.js": 431,
	"./cs": 432,
	"./cs.js": 432,
	"./cv": 433,
	"./cv.js": 433,
	"./cy": 434,
	"./cy.js": 434,
	"./da": 435,
	"./da.js": 435,
	"./de": 436,
	"./de-at": 437,
	"./de-at.js": 437,
	"./de-ch": 438,
	"./de-ch.js": 438,
	"./de.js": 436,
	"./dv": 439,
	"./dv.js": 439,
	"./el": 440,
	"./el.js": 440,
	"./en-au": 441,
	"./en-au.js": 441,
	"./en-ca": 442,
	"./en-ca.js": 442,
	"./en-gb": 443,
	"./en-gb.js": 443,
	"./en-ie": 444,
	"./en-ie.js": 444,
	"./en-il": 445,
	"./en-il.js": 445,
	"./en-in": 446,
	"./en-in.js": 446,
	"./en-nz": 447,
	"./en-nz.js": 447,
	"./en-sg": 448,
	"./en-sg.js": 448,
	"./eo": 449,
	"./eo.js": 449,
	"./es": 450,
	"./es-do": 451,
	"./es-do.js": 451,
	"./es-mx": 452,
	"./es-mx.js": 452,
	"./es-us": 453,
	"./es-us.js": 453,
	"./es.js": 450,
	"./et": 454,
	"./et.js": 454,
	"./eu": 455,
	"./eu.js": 455,
	"./fa": 456,
	"./fa.js": 456,
	"./fi": 457,
	"./fi.js": 457,
	"./fil": 458,
	"./fil.js": 458,
	"./fo": 459,
	"./fo.js": 459,
	"./fr": 460,
	"./fr-ca": 461,
	"./fr-ca.js": 461,
	"./fr-ch": 462,
	"./fr-ch.js": 462,
	"./fr.js": 460,
	"./fy": 463,
	"./fy.js": 463,
	"./ga": 464,
	"./ga.js": 464,
	"./gd": 465,
	"./gd.js": 465,
	"./gl": 466,
	"./gl.js": 466,
	"./gom-deva": 467,
	"./gom-deva.js": 467,
	"./gom-latn": 468,
	"./gom-latn.js": 468,
	"./gu": 469,
	"./gu.js": 469,
	"./he": 470,
	"./he.js": 470,
	"./hi": 471,
	"./hi.js": 471,
	"./hr": 472,
	"./hr.js": 472,
	"./hu": 473,
	"./hu.js": 473,
	"./hy-am": 474,
	"./hy-am.js": 474,
	"./id": 475,
	"./id.js": 475,
	"./is": 476,
	"./is.js": 476,
	"./it": 477,
	"./it-ch": 478,
	"./it-ch.js": 478,
	"./it.js": 477,
	"./ja": 479,
	"./ja.js": 479,
	"./jv": 480,
	"./jv.js": 480,
	"./ka": 481,
	"./ka.js": 481,
	"./kk": 482,
	"./kk.js": 482,
	"./km": 483,
	"./km.js": 483,
	"./kn": 484,
	"./kn.js": 484,
	"./ko": 485,
	"./ko.js": 485,
	"./ku": 486,
	"./ku.js": 486,
	"./ky": 487,
	"./ky.js": 487,
	"./lb": 488,
	"./lb.js": 488,
	"./lo": 489,
	"./lo.js": 489,
	"./lt": 490,
	"./lt.js": 490,
	"./lv": 491,
	"./lv.js": 491,
	"./me": 492,
	"./me.js": 492,
	"./mi": 493,
	"./mi.js": 493,
	"./mk": 494,
	"./mk.js": 494,
	"./ml": 495,
	"./ml.js": 495,
	"./mn": 496,
	"./mn.js": 496,
	"./mr": 497,
	"./mr.js": 497,
	"./ms": 498,
	"./ms-my": 499,
	"./ms-my.js": 499,
	"./ms.js": 498,
	"./mt": 500,
	"./mt.js": 500,
	"./my": 501,
	"./my.js": 501,
	"./nb": 502,
	"./nb.js": 502,
	"./ne": 503,
	"./ne.js": 503,
	"./nl": 504,
	"./nl-be": 505,
	"./nl-be.js": 505,
	"./nl.js": 504,
	"./nn": 506,
	"./nn.js": 506,
	"./oc-lnc": 507,
	"./oc-lnc.js": 507,
	"./pa-in": 508,
	"./pa-in.js": 508,
	"./pl": 509,
	"./pl.js": 509,
	"./pt": 510,
	"./pt-br": 511,
	"./pt-br.js": 511,
	"./pt.js": 510,
	"./ro": 512,
	"./ro.js": 512,
	"./ru": 513,
	"./ru.js": 513,
	"./sd": 514,
	"./sd.js": 514,
	"./se": 515,
	"./se.js": 515,
	"./si": 516,
	"./si.js": 516,
	"./sk": 517,
	"./sk.js": 517,
	"./sl": 518,
	"./sl.js": 518,
	"./sq": 519,
	"./sq.js": 519,
	"./sr": 520,
	"./sr-cyrl": 521,
	"./sr-cyrl.js": 521,
	"./sr.js": 520,
	"./ss": 522,
	"./ss.js": 522,
	"./sv": 523,
	"./sv.js": 523,
	"./sw": 524,
	"./sw.js": 524,
	"./ta": 525,
	"./ta.js": 525,
	"./te": 526,
	"./te.js": 526,
	"./tet": 527,
	"./tet.js": 527,
	"./tg": 528,
	"./tg.js": 528,
	"./th": 529,
	"./th.js": 529,
	"./tk": 530,
	"./tk.js": 530,
	"./tl-ph": 531,
	"./tl-ph.js": 531,
	"./tlh": 532,
	"./tlh.js": 532,
	"./tr": 533,
	"./tr.js": 533,
	"./tzl": 534,
	"./tzl.js": 534,
	"./tzm": 535,
	"./tzm-latn": 536,
	"./tzm-latn.js": 536,
	"./tzm.js": 535,
	"./ug-cn": 537,
	"./ug-cn.js": 537,
	"./uk": 538,
	"./uk.js": 538,
	"./ur": 539,
	"./ur.js": 539,
	"./uz": 540,
	"./uz-latn": 541,
	"./uz-latn.js": 541,
	"./uz.js": 540,
	"./vi": 542,
	"./vi.js": 542,
	"./x-pseudo": 543,
	"./x-pseudo.js": 543,
	"./yo": 544,
	"./yo.js": 544,
	"./zh-cn": 545,
	"./zh-cn.js": 545,
	"./zh-hk": 546,
	"./zh-hk.js": 546,
	"./zh-mo": 547,
	"./zh-mo.js": 547,
	"./zh-tw": 548,
	"./zh-tw.js": 548
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 952;

/***/ }),

/***/ 953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecordStateEnum; });
var RecordStateEnum;
(function (RecordStateEnum) {
    RecordStateEnum[RecordStateEnum["Idle"] = 1] = "Idle";
    RecordStateEnum[RecordStateEnum["Record"] = 2] = "Record";
    RecordStateEnum[RecordStateEnum["Stop"] = 3] = "Stop";
})(RecordStateEnum || (RecordStateEnum = {}));
//# sourceMappingURL=recordStateEnum.js.map

/***/ })

},[650]);
//# sourceMappingURL=main.js.map