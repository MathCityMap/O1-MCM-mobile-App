webpackJsonp([0],{

/***/ 1154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskDetailPageModule", function() { return TaskDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_detail__ = __webpack_require__(1165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__ = __webpack_require__(145);
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
                __WEBPACK_IMPORTED_MODULE_3__task_detail__["a" /* TaskDetail */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__task_detail__["a" /* TaskDetail */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__["a" /* PhotoViewer */]]
        })
    ], TaskDetailPageModule);
    return TaskDetailPageModule;
}());

//# sourceMappingURL=task-detail.module.js.map

/***/ }),

/***/ 1155:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1156), __webpack_require__(1157)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('./TileLayer.Offline'), require('./Control.Offline'));
    }
}(function (TileLayerOffline, ControlOffline) {
}));


/***/ }),

/***/ 1156:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory, window) {

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(112)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else if (typeof window !== 'undefined') {
        if (typeof window.L === 'undefined') {
            throw 'Leaflet must be loaded first!';
        }
        factory(window.L);
    }
}(function (L) {

    /**
     * The Offline Layer should work in the same way as the Tile Layer does
     * when there are no offline tile images saved.
     */
    L.TileLayer.Offline = L.TileLayer.extend({

        /**
         * Constructor of the layer.
         * 
         * @param {String} url URL of the tile map provider.
         * @param {Object} tilesDb An object that implements a certain interface
         * so it's able to serve as the database layer to save and remove the tiles.
         * @param {Object} options This is the same options parameter as the Leaflet
         * Tile Layer, there are no additional parameters. Check their documentation
         * for up-to-date information.
         */
        initialize: function (url, tilesDb, options) {
            this._url = url;
            this._tilesDb = tilesDb;

            options = L.Util.setOptions(this, options);

            if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {
                options.tileSize = Math.floor(options.tileSize / 2);

                if (!options.zoomReverse) {
                    options.zoomOffset++;
                    options.maxZoom--;
                } else {
                    options.zoomOffset--;
                    options.minZoom++;
                }

                options.minZoom = Math.max(0, options.minZoom);
            }

            if (typeof options.subdomains === 'string') {
                options.subdomains = options.subdomains.split('');
            }

            if (!L.Browser.android) {
                this.on('tileunload', this._onTileRemove);
            }
        },

        /**
         * Overrides the method from the Tile Layer. Loads a tile given its
         * coordinates.
         * 
         * @param {Object} coords Coordinates of the tile.
         * @param {Function} done A callback to be called when the tile has been
         * loaded.
         * @returns {HTMLElement} An <img> HTML element with the appropriate
         * image URL.
         */
        createTile: function (coords, done) {
            var tile = document.createElement('img');

            L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
            L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

            if (this.options.crossOrigin) {
                tile.crossOrigin = '';
            }

            tile.alt = '';

            tile.setAttribute('role', 'presentation');

            this.getTileUrl(coords).then(function (url) {
                tile.src = url;
            }).catch(function (err) {
                throw err;
            });

            return tile;
        },

        /**
         * Overrides the method from the Tile Layer. Returns the URL for a tile
         * given its coordinates. It tries to get the tile image offline first,
         * then if it fails, it falls back to the original Tile Layer
         * implementation.
         * 
         * @param {Object} coords Coordinates of the tile.
         * @returns {String} The URL for a tile image.
         */
        getTileUrl: function (coords) {
            var url = L.TileLayer.prototype.getTileUrl.call(this, coords);
            var dbStorageKey = this._getStorageKey(url);

            var resultPromise = this._tilesDb.getItem(dbStorageKey).then(function (data) {
                if (data && typeof data === 'object') {
                    return URL.createObjectURL(data);
                }
                return url;
            }).catch(function (err) {
                throw err;
            });

            return resultPromise;
        },

        /**
         * Gets the URLs for all the tiles that are inside the given bounds.
         * Every element of the result array is in this format:
         * {key: <String>, url: <String>}. The key is the key used on the
         * database layer to find the tile image offline. The URL is the
         * location from where the tile image will be downloaded.
         * 
         * @param {Object} bounds The bounding box of the tiles.
         * @param {Number} zoom The zoom level of the bounding box.
         * @returns {Array} An array containing all the URLs inside the given
         * bounds.
         */
        getTileUrls: function (bounds, zoom) {
            var tiles = [];
            var originalurl = this._url;

            this.setUrl(this._url.replace('{z}', zoom), true);

            var tileBounds = L.bounds(
                bounds.min.divideBy(this.getTileSize().x).floor(),
                bounds.max.divideBy(this.getTileSize().x).floor()
            );

            for (var i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
                for (var j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
                    var tilePoint = new L.Point(i, j);
                    var url = L.TileLayer.prototype.getTileUrl.call(this, tilePoint);

                    tiles.push({
                        'key': this._getStorageKey(url),
                        'url': url,
                    });
                }
            }

            this.setUrl(originalurl, true);

            return tiles;
        },

        /**
         * Determines the key that will be used on the database layer given
         * a URL.
         * 
         * @param {String} url The URL of a tile image.
         * @returns {String} The key that will be used on the database layer
         * to find a tile image.
         */
        _getStorageKey: function (url) {
            var key = null;

            if (url.indexOf('{s}')) {
                var regexstring = new RegExp('[' + this.options.subdomains.join('|') + ']\.');
                key = url.replace(regexstring, this.options.subdomains['0'] + '.');
            }

            return key || url;
        },
    });

    /**
     * Factory function as suggested by the Leaflet team.
     * 
     * @param {String} url URL of the tile map provider.
     * @param {Object} tilesDb An object that implements a certain interface
     * so it's able to serve as the database layer to save and remove the tiles.
     * @param {Object} options This is the same options parameter as the Leaflet
     * Tile Layer, there are no additional parameters. Check their documentation
     * for up-to-date information.
     */
    L.tileLayer.offline = function (url, tilesDb, options) {
        return new L.TileLayer.Offline(url, tilesDb, options);
    };
}, window));


/***/ }),

/***/ 1157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory, window) {

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(112)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else if (typeof window !== 'undefined') {
        if (typeof window.L === 'undefined') {
            throw 'Leaflet must be loaded first!';
        }
        factory(window.L);
    }
}(function (L) {

    /**
     * The Offline Control to be used together with the Offline Layer.
     */
    L.Control.Offline = L.Control.extend({
        options: {
            position: 'topleft',
            saveButtonHtml: 'S',
            saveButtonTitle: 'Save tiles',
            removeButtonHtml: 'R',
            removeButtonTitle: 'Remove tiles',
            minZoom: 0,
            maxZoom: 19,
            confirmSavingCallback: null,
            confirmRemovalCallback: null
        },

        /**
         * Constructor of the control.
         * 
         * @param {Object} baseLayer The Offline Layer to work together with the
         * control.
         * @param {Object} tilesDb An object that implements a certain interface
         * so it's able to serve as the database layer to save and remove the tiles.
         * @param {Object} options This is the same parameter as the Leaflet
         * Control, but it has some additions. Check the README for more.
         */
        initialize: function (baseLayer, tilesDb, options) {
            this._baseLayer = baseLayer;
            this._tilesDb = tilesDb;

            L.Util.setOptions(this, options);
        },

        /**
         * Creates the container DOM element for the control and add listeners
         * on relevant map events.
         * 
         * @param {Object} map The Leaflet map.
         * @returns {HTMLElement} The DOM element for the control.
         */
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control-offline leaflet-bar');

            this._createButton(this.options.saveButtonHtml, this.options.saveButtonTitle, 'save-tiles-button', container, this._saveTiles);
            this._createButton(this.options.removeButtonHtml, this.options.removeButtonTitle, 'remove-tiles-button', container, this._removeTiles);

            return container;
        },

        /**
         * Auxiliary method that creates a button DOM element.
         * 
         * @param {String} html The HTML that will be used inside the button
         * DOM element.
         * @param {String} title The title of the button DOM element.
         * @param {String} className The class name for the button DOM element.
         * @param {HTMLElement} container The container DOM element for the
         * buttons.
         * @param {Function} fn A function that will be executed when the button
         * is clicked.
         * @returns {HTMLElement} A button DOM element.
         */
        _createButton: function (html, title, className, container, fn) {
            var link = L.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L.DomEvent.disableClickPropagation(link);
            L.DomEvent.on(link, 'click', L.DomEvent.stop);
            L.DomEvent.on(link, 'click', fn, this);
            L.DomEvent.on(link, 'click', this._refocusOnMap, this);

            return link;
        },

        /**
         * The function executed when the button to save tiles is clicked.
         */
        _saveTiles: function () {
            var self = this;

            var bounds = null;
            var zoomLevels = [];
            var tileUrls = [];
            var currentZoom = this._map.getZoom();
            var latlngBounds = this._map.getBounds();

            if (currentZoom < this.options.minZoom) {
                self._baseLayer.fire('offline:below-min-zoom-error');

                return;
            }

            for (var zoom = currentZoom; zoom <= this.options.maxZoom; zoom++) {
                zoomLevels.push(zoom);
            }

            for (var i = 0; i < zoomLevels.length; i++) {
                bounds = L.bounds(this._map.project(latlngBounds.getNorthWest(), zoomLevels[i]),
                    this._map.project(latlngBounds.getSouthEast(), zoomLevels[i]));
                tileUrls = tileUrls.concat(this._baseLayer.getTileUrls(bounds, zoomLevels[i]));
            }

            var continueSaveTiles = function () {
                self._baseLayer.fire('offline:save-start', {
                    nTilesToSave: tileUrls.length
                });

                self._tilesDb.saveTiles(tileUrls).then(function () {
                    self._baseLayer.fire('offline:save-end');
                }).catch(function (err) {
                    self._baseLayer.fire('offline:save-error', {
                        error: err
                    });
                });
            };

            if (this.options.confirmSavingCallback) {
                this.options.confirmSavingCallback(tileUrls.length, continueSaveTiles);
            } else {
                continueSaveTiles();
            }
        },

        /**
         * The function executed when the button to remove tiles is clicked.
         */
        _removeTiles: function () {
            var self = this;

            var continueRemoveTiles = function () {
                self._baseLayer.fire('offline:remove-start');

                self._tilesDb.clear().then(function () {
                    self._baseLayer.fire('offline:remove-end');
                }).catch(function (err) {
                    self._baseLayer.fire('offline:remove-error', {
                        error: err
                    });
                });
            };

            if (self.options.confirmRemovalCallback) {
                self.options.confirmRemovalCallback(continueRemoveTiles);
            } else {
                continueRemoveTiles();
            }
        }
    });

    /**
     * Factory function as suggested by the Leaflet team.
     * 
     * @param {Object} baseLayer The Offline Layer to work together with the
     * control.
     * @param {Object} tilesDb An object that implements a certain interface
     * so it's able to serve as the database layer to save and remove the tiles.
     * @param {Object} options This is the same parameter as the Leaflet
     * Control, but it has some additions. Check the README for more.
     */
    L.control.offline = function (baseLayer, tilesDb, options) {
        return new L.Control.Offline(baseLayer, tilesDb, options);
    };
}, window));


/***/ }),

/***/ 1158:
/***/ (function(module, exports) {

(function() {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom' ;
        this.options.rotationAngle = this.options.rotationAngle || 0;

        // Ensure marker keeps rotated during dragging
        this.on('drag', function(e) { e.target._applyRotation(); });
    });

    L.Marker.include({
        _initIcon: function() {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if(this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;

                if(oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function(angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function(origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();


/***/ }),

/***/ 1165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_orm_service__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_modal_modal_controller__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_component__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task_detail_map__ = __webpack_require__(1166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_leaflet_geometryutil__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_leaflet_geometryutil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_leaflet_geometryutil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_modals_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_gps_service__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_chat_and_session_service__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_viewer__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_images_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_js_levenshtein__ = __webpack_require__(1167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_js_levenshtein___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_js_levenshtein__);
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




















var trim = __WEBPACK_IMPORTED_MODULE_8_leaflet__["Util"].trim;
/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TaskDetail = /** @class */ (function () {
    function TaskDetail(navCtrl, navParams, ormService, modalCtrl, deepLinker, modalsService, gpsService, chatAndSessionService, app, photoViewer, spinnerDialog, imageService, cdRef) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ormService = ormService;
        this.modalCtrl = modalCtrl;
        this.deepLinker = deepLinker;
        this.modalsService = modalsService;
        this.gpsService = gpsService;
        this.chatAndSessionService = chatAndSessionService;
        this.app = app;
        this.photoViewer = photoViewer;
        this.spinnerDialog = spinnerDialog;
        this.imageService = imageService;
        this.cdRef = cdRef;
        this.solvedSubtasks = [];
        this.activeAccordions = [];
        this.subTaskScore = 0;
        this.lastSubtaskBonus = 0;
        this.gamificationIsDisabled = false;
        this.answerIndex = null;
        this.blankRegex = /\*\*([^*]+)\*\*/g;
        this.multipleChoiceList = [];
        this.gpsTaskButtonLabels = [];
        this.shownHints = [];
        this.subTaskModalShown = false;
        this.keyboardSubscriptions = new __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__["Subscription"]();
    }
    TaskDetail_1 = TaskDetail;
    /*
      Custom Keyboard subscribe
    */
    TaskDetail.prototype.subscribeCKEvents = function () {
        var _this = this;
        // Initialize a new Keyboard subscription in case the old one was unsubscribed
        this.keyboardSubscriptions = new __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__["Subscription"]();
        // Subscribe to the click event observable
        // Here we add the clicked key value to the string
        this.keyboardSubscriptions.add(__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].onCKClick.subscribe(function (key) {
            if ((_this.taskDetails.timeSolved == 0 && !_this.taskDetails.failed) || !_this.route.isAnswerFeedbackEnabled()) {
                if (key === "C") {
                    if (_this.answerIndex != null) {
                        _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer = "";
                    }
                    else {
                        _this.taskDetails.answer = "";
                    }
                }
                else if (key === "✔") {
                    _this.checkResult();
                }
                else {
                    if (_this.answerIndex != null) {
                        _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer += key;
                    }
                    else {
                        _this.taskDetails.answer += key;
                    }
                }
            }
        }, function (err) { console.log(err); }, function () { console.log('onCKClick subscribed.'); }));
        // Subscribe to the delete event observable
        // Here we delete the last character of the string
        this.keyboardSubscriptions.add(__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].onDeleteClick.subscribe(function () {
            if (_this.answerIndex != null) {
                _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer = _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer.slice(0, _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer.length - 1);
            }
            else {
                _this.taskDetails.answer = _this.taskDetails.answer.slice(0, _this.taskDetails.answer.length - 1);
            }
        }, function (err) { console.log(err); }, function () { console.log('onDeleteClick subscribed.'); }));
        this.keyboardSubscriptions.add(__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].onCKHide.subscribe(function () {
            _this.setKeyboardOn(false);
        }, function (err) { console.log(err); }, function () { console.log('onCKHide subscribed.'); }));
    };
    /*
    Custom Keyboard unsubscribe
     */
    TaskDetail.prototype.unsubscribeCKEvents = function () {
        this.keyboardSubscriptions.unsubscribe();
    };
    TaskDetail.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('TasksMap ionViewDidEnter()');
                eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
                return [2 /*return*/];
            });
        });
    };
    TaskDetail.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _i, _f, task, subtaskDetails, subtaskModal_1, subtaskModal_2, blankMatch_1, blankText, placeholderCount_1, savedAnswer, blankContainer, inputs, answers, _g, _h, input, _loop_1, _j, _k, input, answerArray, i, component, answerArray, i, _l, details, scorableTaskCount, _m, _o, task, scorableTaskCount, _p, _q, task, gpsType, points, buttonCount, startCharCode, i;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        console.log('TasksMap ionViewWillEnter()');
                        this.routeId = this.navParams.get('routeId');
                        _a = this;
                        return [4 /*yield*/, this.ormService.findRouteById(this.routeId)];
                    case 1:
                        _a.route = _r.sent();
                        this.taskId = this.navParams.get('taskId');
                        this.subTaskIndex = this.navParams.get('subTaskIndex');
                        _b = this;
                        return [4 /*yield*/, this.ormService.findTaskById(this.taskId)];
                    case 2:
                        _b.task = _r.sent();
                        if (this.subTaskIndex || this.subTaskIndex === 0) {
                            this.rootTask = this.task;
                            this.task = this.rootTask.getSubtasksInOrder()[this.subTaskIndex];
                        }
                        this.subTasksRequired = (this.task.isSubtaskRequired() || this.route.isSubtaskRequired());
                        console.log("Opened Task: ", this.task);
                        this.isSpecialTaskType = (this.task.solutionType === 'multiple_choice' || this.task.solutionType === 'gps' || this.task.solutionType === 'vector_values' || this.task.solutionType === 'vector_intervals' || this.task.solutionType === 'set' || this.task.solutionType === 'blanks');
                        _c = this;
                        _e = (_d = this.route).getScoreForUser;
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 3:
                        _c.score = _e.apply(_d, [_r.sent()]);
                        this.taskDetails = this.score.getTaskStateForTask(this.task.id);
                        if (this.task.subtasks && this.task.subtasks.length > 0) {
                            this.solvedSubtasks = [];
                            for (_i = 0, _f = this.task.getSubtasksInOrder(); _i < _f.length; _i++) {
                                task = _f[_i];
                                subtaskDetails = this.score.getTaskStateForTask(task.id);
                                if (subtaskDetails.solved || subtaskDetails.failed || subtaskDetails.solvedLow || subtaskDetails.saved || subtaskDetails.skipped) {
                                    this.solvedSubtasks.push(subtaskDetails);
                                }
                            }
                            if (this.subTasksRequired && !this.subTaskModalShown && this.solvedSubtasks.length !== this.task.subtasks.length) {
                                subtaskModal_1 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                                    type: 'text',
                                    message: this.solvedSubtasks.length == 0 ? 'a_subtaskinfo_required_message' : 'a_subtaskinfo_required_progress_message',
                                    modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].subtask,
                                    narrativeEnabled: this.route.isNarrativeEnabled(),
                                    narrative: this.app.activeNarrative,
                                    buttons: [
                                        {
                                            title: 'a_subtaskinfo_required_letsgo',
                                            callback: function () {
                                                subtaskModal_1.dismiss();
                                            }
                                        }
                                    ]
                                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                                subtaskModal_1.present();
                                this.subTaskModalShown = true;
                            }
                            else if (this.taskDetails.timeFirstOpen === 0) {
                                subtaskModal_2 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                                    title: 'a_subtaskinfo_title',
                                    type: 'text',
                                    message: 'a_subtaskinfo_message',
                                    modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].subtask,
                                    narrativeEnabled: this.route.isNarrativeEnabled(),
                                    narrative: this.app.activeNarrative,
                                    buttons: [
                                        {
                                            title: 'a_alert_close',
                                            callback: function () {
                                                subtaskModal_2.dismiss();
                                            }
                                        }
                                    ]
                                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                                subtaskModal_2.present();
                            }
                            //Force template to reload so blankContainer exists when it should.
                            this.cdRef.detectChanges();
                        }
                        if (this.task.solutionType === 'blanks') {
                            this.specialSolution = this.task.getSolution();
                            blankText = this.specialSolution.val;
                            placeholderCount_1 = [];
                            while ((blankMatch_1 = this.blankRegex.exec(blankText)) !== null) {
                                savedAnswer = this.taskDetails.answerMultipleChoice && this.taskDetails.answerMultipleChoice.length > 0 ? this.taskDetails.answerMultipleChoice.find(function (answer) { return answer.id === blankMatch_1[1] && answer.count == (placeholderCount_1[blankMatch_1[1]] ? placeholderCount_1[blankMatch_1[1]] : 0); }) : null;
                                blankText = blankText.replace(blankMatch_1[0], "<span id=\"" + blankMatch_1[1] + "\" data-count=\"" + (placeholderCount_1[blankMatch_1[1]] ? placeholderCount_1[blankMatch_1[1]] : '0') + "\" class=\"blankInput " + ((savedAnswer && savedAnswer.solved || (this.taskDetails && (this.taskDetails.solved || this.taskDetails.solvedLow || this.taskDetails.failed))) ? "disabled" : "") + "\" role=\"textbox\" contenteditable>" + (savedAnswer ? savedAnswer.answer : "") + "</span>");
                                if (!placeholderCount_1[blankMatch_1[1]]) {
                                    placeholderCount_1[blankMatch_1[1]] = 1;
                                }
                                else {
                                    placeholderCount_1[blankMatch_1[1]]++;
                                }
                            }
                            blankContainer = document.getElementById('blankContainer_' + this.task.id);
                            if (blankContainer) {
                                blankContainer.innerHTML = blankText;
                                inputs = blankContainer.getElementsByClassName('blankInput');
                                if (!this.taskDetails.answerMultipleChoice || this.taskDetails.answerMultipleChoice.length == 0) {
                                    answers = [];
                                    for (_g = 0, _h = Array.from(inputs); _g < _h.length; _g++) {
                                        input = _h[_g];
                                        if (input instanceof HTMLElement) {
                                            answers.push({ id: input.id, answer: "", solved: null, count: input.dataset.count });
                                        }
                                    }
                                    this.taskDetails.answerMultipleChoice = answers;
                                }
                                _loop_1 = function (input) {
                                    input.addEventListener('input', function (event) {
                                        var answerElement = _this.taskDetails.answerMultipleChoice.find(function (answer) {
                                            if (input instanceof HTMLElement) {
                                                return answer.id === input.id && answer.count == input.dataset.count;
                                            }
                                        });
                                        answerElement.answer = event.currentTarget.innerText;
                                    });
                                };
                                for (_j = 0, _k = Array.from(inputs); _j < _k.length; _j++) {
                                    input = _k[_j];
                                    _loop_1(input);
                                }
                            }
                        }
                        if (this.task.solutionType === 'vector_values' || this.task.solutionType === 'vector_intervals') {
                            this.specialSolution = this.task.getSolution();
                            if (!this.taskDetails.answerMultipleChoice || this.taskDetails.answerMultipleChoice.length == 0) {
                                answerArray = [];
                                for (i = 0; i < this.specialSolution.components.length; i++) {
                                    component = this.specialSolution.components[i];
                                    answerArray.push({ name: component.name, answer: '', solved: null });
                                }
                                this.taskDetails.answerMultipleChoice = answerArray;
                            }
                        }
                        else if (this.task.solutionType === 'set') {
                            this.specialSolution = this.task.getSolution();
                            if (!this.taskDetails.answerMultipleChoice || this.taskDetails.answerMultipleChoice.length == 0) {
                                answerArray = [];
                                for (i = 0; i < this.specialSolution.length; i++) {
                                    answerArray.push({ answer: '', solved: null });
                                }
                                this.taskDetails.answerMultipleChoice = answerArray;
                            }
                        }
                        _l = this;
                        return [4 /*yield*/, this.chatAndSessionService.getActiveSession()];
                    case 4:
                        _l.sessionInfo = _r.sent();
                        // Add event of user entering trail when session active
                        if (this.sessionInfo != null && !this.task) {
                            details = JSON.stringify({ title: this.task.title });
                            this.chatAndSessionService.addUserEvent("event_task_opened", details, this.task.id.toString());
                        }
                        if (this.taskDetails.timeSolved == 0 && !this.taskDetails.failed) {
                            // Do not display last entered answer
                            this.taskDetails.answer = "";
                        }
                        this.gamificationIsDisabled = this.route.isGamificationDisabled();
                        //Temporary attribution of the scores, later they should come from the server, associated with each task
                        if (!this.rootTask && this.route.isAnswerFeedbackEnabled() && this.task.solutionType != 'info') {
                            // Logic used to get different max scores for different task formats which has been sospended for now
                            // if (this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') {
                            //     this.maxScore = 40 * this.specialSolution.components.length;
                            //     if (this.maxScore > 200) {
                            //         this.maxScore = 200;
                            //     }
                            // } else if (this.task.solutionType == 'set') {
                            //     this.maxScore = 40 * this.specialSolution.length;
                            //     if (this.maxScore > 200) {
                            //         this.maxScore = 200;
                            //     }
                            // } else if (this.task.solutionType == 'blanks') {
                            //     let scorePerQuestion = this.specialSolution.settings.check_type === 'strict' ? 40 : (this.specialSolution.settings.check_type === 'normal' ? 30 : 20);
                            //     let amountOfQuestions = this.specialSolution.features.length;
                            //     this.maxScore = scorePerQuestion * amountOfQuestions;
                            //     if (this.maxScore > 200) {
                            //         this.maxScore = 200;
                            //     }
                            // } else {
                            //     this.maxScore = 100;
                            // }
                            this.maxScore = 100;
                            this.orangeScore = this.maxScore / 2;
                            this.penalty = Math.floor(this.maxScore) * 0.15;
                            this.minScore = Math.floor(this.maxScore) / 10;
                        }
                        else {
                            this.maxScore = 0;
                            this.orangeScore = 0;
                            this.penalty = 0;
                            this.minScore = 0;
                        }
                        if (this.task.subtasks && this.subTasksRequired) {
                            scorableTaskCount = this.task.solutionType === 'info' ? 0 : 1;
                            for (_m = 0, _o = this.task.subtasks; _m < _o.length; _m++) {
                                task = _o[_m];
                                if (task.solutionType != 'info') {
                                    scorableTaskCount++;
                                }
                            }
                            this.subTaskScore = Math.floor(100 / scorableTaskCount);
                            if (this.task.solutionType === 'info') {
                                this.maxScore = 0;
                                if ((this.maxScore - this.subTaskScore * scorableTaskCount) > 0) {
                                    this.lastSubtaskBonus = (this.maxScore - this.subTaskScore * scorableTaskCount);
                                }
                            }
                            else {
                                this.maxScore = this.subTaskScore + (this.maxScore - this.subTaskScore * scorableTaskCount);
                            }
                            this.penalty = Math.floor(this.maxScore) * 0.15;
                            this.minScore = Math.floor(this.maxScore) / 10;
                        }
                        if (this.rootTask && this.subTasksRequired && this.task.solutionType !== 'info') {
                            scorableTaskCount = this.rootTask.solutionType === 'info' ? 0 : 1;
                            for (_p = 0, _q = this.rootTask.subtasks; _p < _q.length; _p++) {
                                task = _q[_p];
                                if (task.solutionType != 'info') {
                                    scorableTaskCount++;
                                }
                            }
                            this.subTaskScore = Math.floor(100 / scorableTaskCount);
                            if (this.task.solutionType === 'info') {
                                this.maxScore = 0;
                            }
                            else {
                                if (this.rootTask.solutionType === 'info') {
                                    if ((100 - this.subTaskScore * scorableTaskCount) > 0) {
                                        this.lastSubtaskBonus = (100 - this.subTaskScore * scorableTaskCount);
                                    }
                                }
                                this.maxScore = this.subTaskScore + (this.subTaskIndex === this.rootTask.subtasks.length - 1 ? this.lastSubtaskBonus : 0);
                            }
                            this.orangeScore = this.maxScore / 2;
                            this.penalty = Math.floor(this.maxScore) * 0.15;
                            this.minScore = Math.floor(this.maxScore) / 10;
                        }
                        if (this.score.score == null)
                            this.score.score = 0;
                        if (this.taskDetails.timeFirstOpen == 0) {
                            this.taskDetails.timeFirstOpen = new Date().getTime();
                            this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
                        }
                        if (this.task.solutionType == 'multiple_choice') {
                            this.multipleChoiceView.changes.subscribe(function (data) {
                                console.log("MultipleChoiceChildData", data);
                                eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
                            });
                            if (this.taskDetails.solved || this.taskDetails.solvedLow) {
                                this.multipleChoiceList = this.taskDetails.answerMultipleChoice;
                            }
                            else {
                                this.multipleChoiceList = this.task.getSolutionOptionList();
                            }
                        }
                        // Init task detail map, if task is gps task
                        if (this.task.solutionType == "gps") {
                            this.taskDetailMap = new __WEBPACK_IMPORTED_MODULE_6__task_detail_map__["a" /* TaskDetailMap */](this.task, this.route, this.gpsService, this.app, this.ormService, this.imageService);
                            this.taskDetailMap.loadMap();
                            gpsType = this.task.getSolutionGpsValue("task");
                            if (gpsType != null) {
                                points = [];
                                if (gpsType == "centerTwo") {
                                    points = [
                                        this.task.getSolutionGpsValue("point1"),
                                        this.task.getSolutionGpsValue("point2")
                                    ];
                                }
                                if (gpsType == "centerThree") {
                                    points = [
                                        this.task.getSolutionGpsValue("point1"),
                                        this.task.getSolutionGpsValue("point2"),
                                        this.task.getSolutionGpsValue("point3")
                                    ];
                                }
                                if (points.length > 0) {
                                    this.taskDetailMap.insertPreDefinedPoints(points);
                                }
                                if (gpsType == "linearFx") {
                                    this.taskDetailMap.insertAxis(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"));
                                }
                            }
                            buttonCount = this.task.getSolutionGpsValue("points");
                            if (buttonCount != null) {
                                buttonCount = parseInt(buttonCount);
                            }
                            else {
                                buttonCount = 0;
                            }
                            startCharCode = "A".charCodeAt(0);
                            for (i = 0; i < buttonCount; i++) {
                                this.gpsTaskButtonLabels[i] = String.fromCharCode(startCharCode + i);
                            }
                        }
                        if (this.taskDetails.skipped) {
                            this.taskDetails.newTries = 0;
                        }
                        if (this.task.solutionType == 'range' || this.task.solutionType == 'value' || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals' || this.task.solutionType === 'set') {
                            this.subscribeCKEvents();
                        }
                        eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskDetail.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var goToNextTaskById;
            return __generator(this, function (_a) {
                // Hide keyboard if still visible
                if (__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].isVisible()) {
                    __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].hide();
                }
                if (this.task.solutionType == 'range' || this.task.solutionType == 'value' || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals' || this.task.solutionType === 'set') {
                    this.unsubscribeCKEvents();
                }
                if (this.taskDetails.solved || this.taskDetails.solvedLow || this.taskDetails.failed) {
                    //This guaratees that the state is updated before the map opens and gets the information.
                    if (this.navParams.get('goToNextTaskById')) {
                        goToNextTaskById = this.navParams.get('goToNextTaskById');
                        goToNextTaskById(this.task.id, false);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // Show keyboard
    TaskDetail.prototype.setKeyboardOn = function (state, answerIndex) {
        if (answerIndex === void 0) { answerIndex = null; }
        var that = this;
        this.answerIndex = answerIndex;
        if (state && this.task.solutionType != "gps") {
            __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].show(function () {
                // Scroll input field into view (may happen that the field is hidden by keyboard)
                if (!that.rootTask) {
                    that.content.scrollTo(0, document.getElementById('keyboard-anchor').offsetTop);
                }
                else {
                    that.content.scrollTo(0, document.getElementById('snd-keyboard-anchor').offsetTop);
                }
            });
        }
    };
    TaskDetail.prototype.hideKeyboard = function () {
        if (__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].isVisible()) {
            __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].hide();
        }
    };
    TaskDetail.prototype.keyboardVisible = function () {
        return __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].isVisible();
    };
    /*
    Checks if entered answer is valid decimal number
     */
    TaskDetail.prototype.isDecimal = function (s) {
        var match = s.match(/^-?(0(([.,])[0-9]+)?|[1-9]{1}[0-9]*(([.,])[0-9]+)?)/g);
        return match !== null ? match[0] === s : false;
    };
    TaskDetail.prototype.showHint = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var needUpdate, title, type, message, details, details, details, hintModal;
            return __generator(this, function (_a) {
                needUpdate = false;
                title = "";
                type = this.task.getHint(index).type;
                message = this.task.getHint(index).value;
                if (this.shownHints.indexOf(index) == -1) {
                    this.shownHints.push(index);
                }
                switch (index) {
                    case 1:
                        if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                            //only update if task is not solved
                            this.taskDetails.hint1 = true;
                            needUpdate = true;
                        }
                        title = 'a_btn_hint1';
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({});
                            this.chatAndSessionService.addUserEvent("event_took_hint1", details, this.task.id.toString());
                        }
                        break;
                    case 2:
                        if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                            //only update if task is not solved
                            this.taskDetails.hint2 = true;
                            needUpdate = true;
                        }
                        title = 'a_btn_hint2';
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({});
                            this.chatAndSessionService.addUserEvent("event_took_hint2", details, this.task.id.toString());
                        }
                        break;
                    case 3:
                        if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                            //only update if task is not solved
                            this.taskDetails.hint3 = true;
                            if (this.sessionInfo != null) {
                                details = JSON.stringify({});
                                this.chatAndSessionService.addUserEvent("event_took_hint3", details, this.task.id.toString());
                            }
                            needUpdate = true;
                        }
                        title = 'a_btn_hint3';
                        break;
                }
                if (needUpdate) {
                    this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
                }
                hintModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                    title: title,
                    type: type,
                    message: message,
                    modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].hint,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: [
                        {
                            title: 'a_alert_close',
                            callback: function () {
                                hintModal.dismiss();
                            }
                        }
                    ]
                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                hintModal.onDidDismiss(function (click) {
                    if (_this.sessionInfo != null) {
                        var details = JSON.stringify({});
                        _this.chatAndSessionService.addUserEvent("event_hint_closed", details, _this.task.id.toString());
                    }
                });
                hintModal.present();
                return [2 /*return*/];
            });
        });
    };
    TaskDetail.prototype.checkResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var solution, answer, details, f_answer, f_solution, taskSuccess, checkedByUser, i, item, solution_1, solutionList, von, bis, answer_1, solution_2, vonLow, bisLow, solution_3, gpsType, answers, solutions, solvedTask, detailSolutions, solutionText, i, answer_2, checkAnswer, solution_4, answers, solutions, solvedTask, detailSolutions, solutionText, i, answer_3, checkAnswer, solution_5, answers, index, answer_4, solutions, solvedTask, detailSolutions, solutionText, solutionsUsed, i, answer_5, checkAnswer, originalAnswer, solutionIndex, solutions, precision, solvedTask, detailSolutions, blankText, _loop_2, _i, _a, answer_6;
            return __generator(this, function (_b) {
                if ((this.task.solutionType == 'range' || this.task.solutionType == 'value') && !this.isDecimal(this.taskDetails.answer) || !this.isSpecialTypeAnswered()) {
                    return [2 /*return*/];
                }
                console.log(this.task.solutionType);
                solution = [this.taskDetails.answer];
                answer = this.taskDetails.answer.replace(",", ".");
                details = JSON.stringify({ solution: solution, solutionType: this.task.solutionType });
                if (this.task.solutionType == "value") {
                    f_answer = parseFloat(answer);
                    f_solution = parseFloat(this.task.getSolution());
                    if (f_answer.toString() == f_solution.toString()) {
                        this.CalculateScore("value", "solved");
                        this.taskSolved('solved', solution);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', solution);
                    }
                }
                else if (this.task.solutionType == "multiple_choice") {
                    console.log(this.multipleChoiceList);
                    taskSuccess = true;
                    checkedByUser = this.multipleChoiceList.filter(function (item) {
                        return item.userChecked == true;
                    });
                    checkedByUser = checkedByUser.map(function (item) { return item.value; });
                    for (i = 0; i < this.multipleChoiceList.length; i++) {
                        item = this.multipleChoiceList[i];
                        console.log(item);
                        console.log(item.userChecked != item.rightAnswer);
                        if (item.userChecked != item.rightAnswer) {
                            taskSuccess = false;
                            console.log('found wrong answer');
                            break;
                        }
                    }
                    this.taskDetails.answerMultipleChoice = this.multipleChoiceList;
                    console.log(taskSuccess);
                    solution_1 = [this.task.getSolution()];
                    if (taskSuccess) {
                        this.CalculateScore("multiple_choice", "solved");
                        this.taskSolved('solved', solution_1);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: checkedByUser, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', ['']);
                    }
                }
                else if (this.task.solutionType == "range") {
                    solutionList = this.task.getSolutionList();
                    von = solutionList[0];
                    bis = solutionList[1];
                    answer_1 = +this.taskDetails.answer.replace(",", ".");
                    solution_2 = [this.taskDetails.answer];
                    if (answer_1 >= von && answer_1 <= bis) {
                        this.CalculateScore("range", "solved");
                        //DEBUG:LOG PAREI AQUI
                        this.taskSolved('solved', solution_2);
                    }
                    else {
                        if (solutionList.length == 4) {
                            vonLow = solutionList[2];
                            bisLow = solutionList[3];
                            solution_3 = [this.taskDetails.answer];
                            if (answer_1 >= vonLow && answer_1 <= bisLow) {
                                this.CalculateScore("range", "solved_low");
                                this.taskSolved('solved_low', solution_3);
                            }
                            else {
                                if (this.sessionInfo != null) {
                                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                                }
                                this.taskSolved('', ['']);
                            }
                        }
                        else {
                            if (this.sessionInfo != null) {
                                this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                            }
                            this.taskSolved('', ['']);
                        }
                    }
                }
                else if (this.task.solutionType == "gps") {
                    gpsType = this.task.getSolutionGpsValue("task");
                    console.log(gpsType);
                    switch (gpsType) {
                        case "lineNoDirection":
                            this.CalculateLine(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], +this.task.getSolutionGpsValue("length"));
                            break;
                        case "line":
                            this.CalculateLineDirection(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], +this.task.getSolutionGpsValue("length"), +this.task.getSolutionGpsValue("direction"));
                            break;
                        case "triangle":
                            this.CalculateTriangle(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], this.taskDetailMap.pointMarkers[2], +this.task.getSolutionGpsValue("length"));
                            break;
                        case "square":
                            this.CalculateSquare(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], this.taskDetailMap.pointMarkers[2], this.taskDetailMap.pointMarkers[3], +this.task.getSolutionGpsValue("length"));
                            break;
                        case "centerTwo":
                            this.CalculateCenterTwoP(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.taskDetailMap.pointMarkers[0]);
                            break;
                        case "centerThree":
                            this.CalculateCenterThreeP(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.task.getSolutionGpsValue("point3"), this.taskDetailMap.pointMarkers[0]);
                            break;
                        case "linearFx":
                            this.CalculateLinearFx(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.taskDetailMap.pointMarkers[0].getLatLng(), this.taskDetailMap.pointMarkers[1].getLatLng(), this.task.getSolutionGpsValue("slope"), this.task.getSolutionGpsValue("y"));
                        default:
                            // code...
                            break;
                    }
                }
                else if (this.task.solutionType == "vector_values") {
                    answers = this.taskDetails.answerMultipleChoice;
                    solutions = this.specialSolution.components;
                    solvedTask = true;
                    detailSolutions = [];
                    solutionText = "<table class='solutionTable'>";
                    for (i = 0; i < answers.length; i++) {
                        answer_2 = answers[i];
                        checkAnswer = parseFloat(answer_2.answer.replace(",", "."));
                        solution_4 = solutions[i];
                        detailSolutions.push({ name: solution_4.name, answer: answer_2.answer });
                        answer_2.solved = checkAnswer > +solution_4.val - 0.0001 && checkAnswer < +solution_4.val + 0.0001;
                        if (!answer_2.solved) {
                            solvedTask = false;
                        }
                        solutionText += "<tr><td>" + answer_2.name + ":</td> <td class=\"" + (answer_2.solved ? 'correct' : 'false') + "\">" + answer_2.answer + "</td></tr>";
                    }
                    solutionText += "</table>";
                    if (solvedTask) {
                        this.CalculateScore("vector_values", "solved");
                        this.taskSolved('solved', [solutionText]);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: detailSolutions, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', [solutionText]);
                    }
                }
                else if (this.task.solutionType == "vector_intervals") {
                    answers = this.taskDetails.answerMultipleChoice;
                    solutions = this.specialSolution.components;
                    solvedTask = true;
                    detailSolutions = [];
                    solutionText = "<table class='solutionTable'>";
                    for (i = 0; i < answers.length; i++) {
                        answer_3 = answers[i];
                        checkAnswer = parseFloat(answer_3.answer.replace(",", "."));
                        solution_5 = solutions[i];
                        detailSolutions.push({ name: solution_5.name, answer: answer_3.answer });
                        answer_3.solved = checkAnswer >= +solution_5.low && checkAnswer <= +solution_5.high;
                        if (!answer_3.solved) {
                            solvedTask = false;
                        }
                        solutionText += "<tr><td>" + answer_3.name + ":</td> <td class=\"" + (answer_3.solved ? 'correct' : 'false') + "\">" + answer_3.answer + "</td></tr>";
                    }
                    solutionText += "</table>";
                    if (solvedTask) {
                        this.CalculateScore("vector_intervals", "solved");
                        this.taskSolved('solved', [solutionText]);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: detailSolutions, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', [solutionText]);
                    }
                }
                else if (this.task.solutionType === "set") {
                    answers = [];
                    for (index in this.taskDetails.answerMultipleChoice) {
                        answer_4 = { answer: this.taskDetails.answerMultipleChoice[index].answer, originalIndex: index };
                        answers.push(answer_4);
                    }
                    answers.sort(function (a, b) {
                        if (parseFloat(a.answer) > parseFloat(b.answer)) {
                            return 1;
                        }
                        else if (parseFloat(a.answer) === parseFloat(b.answer)) {
                            return 0;
                        }
                        else {
                            return -1;
                        }
                    });
                    solutions = this.specialSolution.sort(function (a, b) {
                        if (parseFloat(a) > parseFloat(b)) {
                            return 1;
                        }
                        else if (parseFloat(a) === parseFloat(b)) {
                            return 0;
                        }
                        else {
                            return -1;
                        }
                    });
                    solvedTask = true;
                    detailSolutions = [];
                    solutionText = "<table class='solutionTable'>";
                    solutionsUsed = [];
                    for (i = 0; i < answers.length; i++) {
                        answer_5 = answers[i];
                        checkAnswer = parseFloat(answer_5.answer.replace(",", "."));
                        originalAnswer = this.taskDetails.answerMultipleChoice[answer_5.originalIndex];
                        for (solutionIndex in solutions) {
                            if (solutionsUsed.indexOf(solutionIndex) === -1) {
                                solution = solutions[solutionIndex];
                                if (checkAnswer > +solution - 0.0001 && checkAnswer < +solution + 0.0001) {
                                    solutionsUsed.push(solutionIndex);
                                    originalAnswer.solved = true;
                                    break;
                                }
                                else {
                                    originalAnswer.solved = false;
                                }
                            }
                        }
                        detailSolutions.push(answer_5.answer);
                        if (!originalAnswer.solved) {
                            solvedTask = false;
                        }
                        solutionText += "<tr><td class=\"" + (originalAnswer.solved ? 'correct' : 'false') + "\">" + answer_5.answer + "</td></tr>";
                    }
                    solutionText += "</table>";
                    if (solvedTask) {
                        this.CalculateScore("set", "solved");
                        this.taskSolved('solved', [solutionText]);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: detailSolutions, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', [solutionText]);
                    }
                }
                else if (this.task.solutionType === "blanks") {
                    solutions = this.specialSolution.features;
                    precision = this.specialSolution.settings.check_type === 'strict' ? 0 : (this.specialSolution.settings.check_type === 'normal' ? 0.2 : 0.4);
                    solvedTask = true;
                    detailSolutions = [];
                    blankText = this.specialSolution.val;
                    _loop_2 = function (answer_6) {
                        var solutionObject = solutions.find(function (sol) {
                            return sol.blank === '**' + answer_6.id + '**';
                        });
                        var answerPrecision = 1;
                        for (var _i = 0, _a = solutionObject.answers; _i < _a.length; _i++) {
                            var solution_6 = _a[_i];
                            answer_6.answer = trim(answer_6.answer);
                            var absoluteDistance = __WEBPACK_IMPORTED_MODULE_18_js_levenshtein__(solution_6.toLowerCase(), answer_6.answer.toLowerCase());
                            var relativeDistance = absoluteDistance / solution_6.length;
                            if (relativeDistance < answerPrecision) {
                                answerPrecision = relativeDistance;
                            }
                        }
                        answer_6.solved = answerPrecision <= precision;
                        if (!answer_6.solved) {
                            solvedTask = false;
                        }
                        else {
                            var htmlElement = document.getElementById(answer_6.id);
                            htmlElement.classList.add('disabled');
                        }
                        var regex = new RegExp('\\*\\*' + answer_6.id.replace(/\//g, '\\/') + '\\*\\*');
                        var blankMatch = regex.exec(blankText);
                        blankText = blankText.replace(blankMatch[0], "<span class=\"blank " + (answer_6.solved ? 'correct' : 'false') + "\">" + answer_6.answer + "</span>");
                        detailSolutions.push(answer_6.answer);
                    };
                    for (_i = 0, _a = this.taskDetails.answerMultipleChoice; _i < _a.length; _i++) {
                        answer_6 = _a[_i];
                        _loop_2(answer_6);
                    }
                    if (solvedTask) {
                        this.CalculateScore("blanks", "solved");
                        this.taskSolved('solved', [blankText]);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: detailSolutions, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', [blankText]);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /*
    This function is called when in trail settings the automatic validation of answers is disabled
    It allows users to complete a task, when they think that they are finished and mark it accordingly so
    In session mode where the users are force assigned a task, it allows to continue with the next task
     */
    TaskDetail.prototype.completeTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.task.solutionType === 'info' && this.task.subtasks && this.task.subtasks.length > 0) {
                    this.CalculateScore('info', 'solved');
                }
                else {
                    this.taskDetails.score = this.maxScore;
                    if (!this.rootTask) {
                        this.score.score += this.taskDetails.score;
                    }
                }
                this.taskSolved("solved", [""]);
                return [2 /*return*/];
            });
        });
    };
    TaskDetail.prototype.showSolutionSample = function (nextSubtaskOnClose) {
        var _this = this;
        if (nextSubtaskOnClose === void 0) { nextSubtaskOnClose = false; }
        if (!this.taskDetails.solved && !this.taskDetails.solvedLow) {
            if (!this.rootTask) {
                this.score.addFailedTask(this.task.id);
            }
            this.taskDetails.score = 0;
            this.taskDetails.failed = true;
            this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
        }
        var solutionSample = this.task.getSolutionSample();
        var solutionSrc = this.task.getSolutionSampleImgSrc();
        var messages = [];
        if ((!solutionSample || solutionSample.length == 0) && (!solutionSrc || solutionSrc.length == 0)) {
            messages = [
                'a_msg_no_solutionsample',
                'p_t_solution',
                this.task.getSolution()
            ];
        }
        else {
            messages.push(solutionSample);
        }
        var that = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
            title: 't_samplesolution',
            imageUrl: this.task.getSolutionSampleImgSrc(),
            messages: messages,
            modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].sampleSolution,
            narrativeEnabled: this.route.isNarrativeEnabled(),
            narrative: this.app.activeNarrative,
            buttons: [
                {
                    title: 'a_alert_close',
                    callback: function () {
                        modal.dismiss();
                        if (that.rootTask && nextSubtaskOnClose) {
                            that.goToNextSubtask();
                        }
                    }
                }
            ]
        }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
        modal.onDidDismiss(function (data) {
            if (_this.sessionInfo != null) {
                var details = JSON.stringify({});
                _this.chatAndSessionService.addUserEvent("event_viewed_sample_solution", details, _this.task.id.toString());
            }
        });
        modal.present();
    };
    TaskDetail.prototype.closeDetails = function (skip) {
        return __awaiter(this, void 0, void 0, function () {
            var goToNextTaskById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.rootTask) return [3 /*break*/, 2];
                        if (!skip) return [3 /*break*/, 2];
                        this.taskDetails.skipped = true;
                        return [4 /*yield*/, this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.goToNextSubtask()];
                    case 2:
                        if (!this.navParams.get('goToNextTaskById')) return [3 /*break*/, 4];
                        goToNextTaskById = this.navParams.get('goToNextTaskById');
                        if (!skip) return [3 /*break*/, 4];
                        this.taskDetails.skipped = true;
                        return [4 /*yield*/, this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails)];
                    case 3:
                        _a.sent();
                        goToNextTaskById(this.task.id, skip);
                        _a.label = 4;
                    case 4:
                        // necessary because of bug which does not update URL
                        this.deepLinker.navChange('back');
                        this.navCtrl.pop({}, function () {
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskDetail.prototype.confirmSkippingTask = function () {
        var _this = this;
        var skipText = 'a_skipTask_confirm';
        if (this.route.isNarrativeEnabled()) {
            skipText = this.route.getNarrativeString(skipText);
        }
        this.modalsService.showDialog('a_skipTask', skipText, 'no', function () {
        }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
            var details;
            return __generator(this, function (_a) {
                if (this.sessionInfo != null) {
                    details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_task_skipped", details, this.task.id.toString());
                }
                this.closeDetails(true);
                return [2 /*return*/];
            });
        }); }, this.app.activeNarrative);
    };
    TaskDetail.prototype.getNextAvailableHint = function () {
        if (this.shownHints.indexOf(1) == -1 && this.task.hasHintMessage(1) || !this.task.hasHintMessage(2)) {
            return 1;
        }
        else if (this.shownHints.indexOf(2) == -1 && this.task.hasHintMessage(2) || !this.task.hasHintMessage(3)) {
            return 2;
        }
        else if (this.shownHints.indexOf(3) == -1 && this.task.hasHintMessage(3)) {
            return 3;
        }
        return 4;
    };
    TaskDetail.prototype.taskSolved = function (solved, solution) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var that, message, title, that_1, bSampleSolution, subTaskOkay, bNextTask, modal_1, data, details, message, buttons, tries_1, bShowHint, thiss_1, bShowSubtask, bClose, bSampleSolution, bSkipTask, bFailTask, title, modal_2, data, bNextTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        that = this;
                        // Add event of user entering trail when session active
                        if (!this.route.isAnswerFeedbackEnabled()) {
                            this.taskDetails.saved = true;
                            if (!this.rootTask) {
                                this.score.addSavedTask(this.task.id);
                            }
                        }
                        if (solved == 'solved' || solved == 'solved_low') {
                            this.taskDetails.skipped = false;
                            message = "";
                            title = "";
                            if (solved == 'solved') {
                                title = 'a_alert_right_answer_title';
                                this.taskDetails.solved = true;
                                if (!this.rootTask) {
                                    this.score.addSolvedTask(this.task.id);
                                }
                                if (this.rootTask && !this.subTasksRequired) {
                                    if (this.taskDetails.tries == 0) {
                                        if (this.task.solutionType == "gps")
                                            message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                        else if (this.task.solutionType == "info")
                                            message = "a_info_task_finished_message";
                                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                            message = 'a_alert_set_right_answer_1';
                                        else
                                            message = 'a_alert_subtask_right_answer_flawless';
                                    }
                                    else {
                                        message = 'a_alert_subtask_right_answer';
                                    }
                                }
                                else {
                                    switch (this.taskDetails.tries) {
                                        case 0:
                                            if (this.task.solutionType == "gps")
                                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                            else if (this.task.solutionType == "info")
                                                message = "a_info_task_finished_message";
                                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                                message = 'a_alert_set_right_answer_1';
                                            else
                                                message = 'a_alert_right_answer_1';
                                            break;
                                        case 1:
                                        case 2:
                                        case 3:
                                        case 4:
                                            if (this.task.solutionType == "gps")
                                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                            else if (this.task.solutionType == "info")
                                                message = "";
                                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                                message = 'a_alert_set_right_answer_2';
                                            else
                                                message = 'a_alert_right_answer_2';
                                            break;
                                        case 5:
                                            if (this.task.solutionType == "gps")
                                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                            else if (this.task.solutionType == "info")
                                                message = "";
                                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                                message = 'a_alert_set_right_answer_3';
                                            else
                                                message = 'a_alert_right_answer_3';
                                            break;
                                    }
                                }
                            }
                            if (solved == 'solved_low') {
                                title = 'a_alert_right_answer_title_low';
                                this.taskDetails.solvedLow = true;
                                if (!this.rootTask) {
                                    this.score.addSolvedTaskLow(this.task.id);
                                }
                                if (this.rootTask && !this.subTasksRequired) {
                                    if (this.taskDetails.tries == 0) {
                                        if (this.task.solutionType == "gps")
                                            message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                            message = 'a_alert_set_right_answer_1_low';
                                        else
                                            message = 'a_alert_right_answer_1_low';
                                    }
                                    else {
                                        message = 'a_alert_subtask_right_answer_low';
                                    }
                                }
                                else {
                                    switch (this.taskDetails.tries) {
                                        case 0:
                                            if (this.task.solutionType == "gps")
                                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                                message = 'a_alert_set_right_answer_1_low';
                                            else
                                                message = 'a_alert_right_answer_1_low';
                                            break;
                                        case 1:
                                        case 2:
                                        case 3:
                                        case 4:
                                            if (this.task.solutionType == "gps")
                                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                                message = 'a_alert_set_right_answer_2_low';
                                            else
                                                message = 'a_alert_right_answer_2_low';
                                            break;
                                        case 5:
                                            if (this.task.solutionType == "gps")
                                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                                message = 'a_alert_set_right_answer_3_low';
                                            else
                                                message = 'a_alert_right_answer_3_low';
                                            break;
                                    }
                                }
                            }
                            that_1 = this;
                            bSampleSolution = {
                                title: 't_samplesolution',
                                callback: function () {
                                    modal_1.dismiss().then(function () {
                                        that_1.showSolutionSample(true);
                                    });
                                }
                            };
                            subTaskOkay = {
                                title: 'okay',
                                callback: function () {
                                    modal_1.dismiss().then(function () {
                                        that_1.goToNextSubtask();
                                    });
                                }
                            };
                            bNextTask = {
                                title: 'pdf_next_task',
                                callback: function () {
                                    modal_1.dismiss().then(function () {
                                        that_1.closeDetails(false);
                                    });
                                }
                            };
                            if (this.route.isNarrativeEnabled()) {
                                title = this.route.getNarrativeString(title);
                                message = this.route.getNarrativeString(message);
                            }
                            if (this.route.isAnswerFeedbackEnabled()) {
                                data = {
                                    title: this.task.solutionType === 'info' ? 'hide' : title,
                                    message: message,
                                    solution: this.task.solutionType === 'info' ? undefined : solution,
                                    modalType: solved == 'solved_low' ? __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].solvedLow : __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].solved,
                                    gamificationEnabled: !this.gamificationIsDisabled,
                                    narrativeEnabled: this.route.isNarrativeEnabled(),
                                    narrative: this.app.activeNarrative,
                                    param: { tries: this.taskDetails.tries + 1 },
                                    buttons: this.rootTask ? [subTaskOkay] : (this.route.isSampleSolutionEnabled() && this.task.solutionType !== 'info' ? [bSampleSolution, bNextTask] : [bNextTask])
                                };
                                if ((this.task.solutionType !== 'info' && (!this.task.subtasks || !(this.task.subtasks.length > 0))) && (!this.rootTask || (this.rootTask && this.subTasksRequired))) {
                                    data['score'] = '+' + this.taskDetails.score + 'MP/' + this.bestPossibleScore() + 'MP<span class="subscore">' + this.generateSubtaskScoreCalculationString(solved) + '</span>';
                                }
                                console.log(data);
                                modal_1 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], data, {
                                    showBackdrop: true,
                                    enableBackdropDismiss: true,
                                    cssClass: this.app.activeNarrative
                                });
                            }
                            else {
                                modal_1 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                                    title: 'a_alert_saved_answer_title',
                                    message: 'a_alert_saved_answer_message',
                                    modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].saved,
                                    gamificationEnabled: !this.gamificationIsDisabled,
                                    narrativeEnabled: this.route.isNarrativeEnabled(),
                                    narrative: this.app.activeNarrative,
                                    buttons: this.rootTask ? [subTaskOkay] : [bNextTask],
                                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                            }
                            modal_1.onDidDismiss(function (data) {
                                console.log(data);
                                if (data && data.showMap) {
                                    /*                 let currentTaskIndex = this.route.tasks.indexOf(this.task); */
                                    _this.navCtrl.pop();
                                }
                            });
                            modal_1.present();
                            if (this.sessionInfo != null) {
                                details = JSON.stringify({ score: this.taskDetails.score, solution: solution, quality: solved });
                                this.chatAndSessionService.addUserEvent("event_task_completed", details, this.task.id.toString());
                            }
                            this.taskDetails.timeSolved = new Date().getTime();
                        }
                        else {
                            message = "";
                            buttons = void 0;
                            tries_1 = this.taskDetails.tries;
                            if (this.taskDetails.skipped) {
                                tries_1 = this.taskDetails.newTries;
                            }
                            switch (tries_1) {
                                case 0:
                                case 1:
                                    if (!(this.task.solutionType === 'multiple_choice' && this.multipleChoiceList.length - 2 === tries_1)) {
                                        if (this.task.solutionType == "gps")
                                            message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                        else if (this.task.solutionType == "blanks")
                                            message = 'a_alert_blanks_false_answer_1';
                                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                            message = 'a_alert_set_false_answer_1';
                                        else
                                            message = 'a_alert_false_answer_1';
                                        buttons = [
                                            {
                                                title: 'a_alert_close',
                                                callback: function () {
                                                    modal_2.dismiss();
                                                }
                                            }
                                        ];
                                        break;
                                    }
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                    if (!(this.task.solutionType === 'multiple_choice' && this.multipleChoiceList.length - 2 === tries_1)) {
                                        if (this.task.solutionType == "gps")
                                            message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                        else if (this.task.solutionType == "blanks")
                                            message = 'a_alert_blanks_false_answer_2';
                                        else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                            message = 'a_alert_set_false_answer_2';
                                        else
                                            message = 'a_alert_false_answer_2';
                                        if (!this.route.isHintsEnabled() || this.rootTask) {
                                            if (this.task.solutionType == "blanks")
                                                message = 'a_alert_blanks_false_answer_1';
                                            else if (this.task.solutionType == "set" || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals')
                                                message = 'a_alert_set_false_answer_1';
                                            else
                                                message = 'a_alert_false_answer_1';
                                        }
                                        bShowHint = {
                                            title: 'a_t_show_hint',
                                            callback: function () {
                                                modal_2.dismiss().then(function () {
                                                    var index = 1;
                                                    //number of tries already increased
                                                    if (tries_1 == 3) {
                                                        var temp = that.getNextAvailableHint();
                                                        if (temp < 2)
                                                            index = temp;
                                                        else
                                                            index = 2;
                                                    }
                                                    else if (tries_1 == 4) {
                                                        var temp = that.getNextAvailableHint();
                                                        if (temp < 3)
                                                            index = temp;
                                                        else
                                                            index = 3;
                                                    }
                                                    that.showHint(index);
                                                });
                                            }
                                        };
                                        thiss_1 = this;
                                        bShowSubtask = {
                                            title: 'a_t_show_subtask',
                                            callback: function () {
                                                modal_2.dismiss().then(function () {
                                                    thiss_1.openSubtask();
                                                });
                                            }
                                        };
                                        bClose = {
                                            title: 'a_alert_close',
                                            callback: function () {
                                                modal_2.dismiss();
                                            }
                                        };
                                        if (this.route.isHintsEnabled() && (this.task.subtasks && this.task.subtasks.length > 0 && this.task.subtasks.length !== this.solvedSubtasks.length)) {
                                            buttons = [bShowSubtask, bShowHint, bClose];
                                        }
                                        else if (this.route.isHintsEnabled() && !this.rootTask) {
                                            buttons = [bShowHint, bClose];
                                        }
                                        else if ((this.task.subtasks && this.task.subtasks.length > 0 && this.task.subtasks.length !== this.solvedSubtasks.length)) {
                                            buttons = [bShowSubtask, bClose];
                                        }
                                        else {
                                            buttons = [bClose];
                                        }
                                        break;
                                    }
                                default:
                                    message = 'a_t_skip_msg';
                                    bSampleSolution = {
                                        title: 't_samplesolution',
                                        callback: function () {
                                            modal_2.dismiss().then(function () {
                                                if (that.sessionInfo != null) {
                                                    var details = JSON.stringify({});
                                                    that.chatAndSessionService.addUserEvent("event_task_failed", details, that.task.id.toString());
                                                }
                                                that.showSolutionSample(true);
                                            });
                                        }
                                    };
                                    bSkipTask = {
                                        title: 'a_skipTask',
                                        callback: function () {
                                            modal_2.dismiss().then(function () {
                                                if (that.sessionInfo != null) {
                                                    var details = JSON.stringify({});
                                                    that.chatAndSessionService.addUserEvent("event_task_skipped", details, that.task.id.toString());
                                                }
                                                that.closeDetails(true);
                                            });
                                        }
                                    };
                                    bFailTask = {
                                        title: 'okay',
                                        callback: function () {
                                            modal_2.dismiss().then(function () {
                                                if (that.sessionInfo != null) {
                                                    var details = JSON.stringify({});
                                                    that.chatAndSessionService.addUserEvent("event_task_failed", details, that.task.id.toString());
                                                }
                                                that.taskDetails.failed = true;
                                                that.ormService.insertOrUpdateTaskState(that.score, that.taskDetails).then(function () {
                                                    if (!that.rootTask) {
                                                        that.closeDetails();
                                                    }
                                                    else {
                                                        that.goToNextSubtask();
                                                    }
                                                });
                                            });
                                        }
                                    };
                                    if (this.rootTask && this.route.isSampleSolutionEnabled()) {
                                        buttons = [bSampleSolution, bFailTask];
                                    }
                                    else if (this.rootTask) {
                                        buttons = [bFailTask];
                                    }
                                    else if (this.route.isSampleSolutionEnabled()) {
                                        buttons = [bSampleSolution, bSkipTask];
                                    }
                                    else {
                                        buttons = [bSkipTask];
                                    }
                                    break;
                            }
                            this.taskDetails.tries++;
                            if (this.taskDetails.skipped) {
                                this.taskDetails.newTries++;
                            }
                            title = "a_alert_false_answer_title";
                            if (this.route.isNarrativeEnabled()) {
                                title = this.route.getNarrativeString(title);
                                message = this.route.getNarrativeString(message);
                            }
                            if (this.route.isAnswerFeedbackEnabled()) {
                                data = {
                                    title: title,
                                    message: message,
                                    solution: solution,
                                    modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].error,
                                    gamificationEnabled: !this.gamificationIsDisabled,
                                    narrativeEnabled: this.route.isNarrativeEnabled(),
                                    narrative: this.app.activeNarrative,
                                    buttons: buttons
                                };
                                if (!this.rootTask || (this.rootTask && this.subTasksRequired) && !(this.task.solutionType === 'multiple_choice' && this.multipleChoiceList.length - 1 === tries_1)) {
                                    data['score'] = this.taskDetails.tries > 1 ? '-' + this.penalty : '0';
                                }
                                modal_2 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], data, {
                                    showBackdrop: true,
                                    enableBackdropDismiss: true,
                                    cssClass: this.app.activeNarrative
                                });
                            }
                            else {
                                bNextTask = {
                                    title: 'pdf_next_task',
                                    callback: function () {
                                        modal_2.dismiss().then(function () {
                                            that.closeDetails(false);
                                        });
                                    }
                                };
                                modal_2 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                                    title: 'a_alert_saved_answer_title',
                                    message: 'a_alert_saved_answer_message',
                                    modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].saved,
                                    gamificationEnabled: !this.gamificationIsDisabled,
                                    narrativeEnabled: this.route.isNarrativeEnabled(),
                                    narrative: this.app.activeNarrative,
                                    buttons: [bNextTask],
                                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                            }
                            modal_2.present();
                        }
                        return [4 /*yield*/, this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskDetail.prototype.CalculateScore = function (solutionType, solved) {
        if (solutionType == "value") {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
            else {
                this.taskDetails.score = this.maxScore;
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
        }
        if (solutionType == "multiple_choice") {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
            else {
                this.taskDetails.score = this.maxScore;
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
        }
        if (solutionType == "range") {
            if (solved == "solved") {
                if (this.taskDetails.tries > 0) {
                    var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                    this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                    if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                        this.score.score += this.taskDetails.score;
                    }
                }
                else {
                    this.taskDetails.score = this.maxScore;
                    if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                        this.score.score += this.taskDetails.score;
                    }
                }
            }
            else if (solved == "solved_low") {
                var solutionList = this.task.getSolutionList();
                //if the orange interval is below the green
                var dotAnswer = parseFloat(this.taskDetails.answer.replace(",", ".")); // Fix ',' decimals by converting to '.' decimals
                if (dotAnswer < solutionList[0]) {
                    if (this.taskDetails.tries > 0) {
                        var tempScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    }
                    else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    }
                }
                else {
                    if (this.taskDetails.tries > 0) {
                        var tempScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    }
                    else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore);
                        if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                            this.score.score += this.taskDetails.score;
                        }
                    }
                }
            }
        }
        if (solutionType == 'vector_values' || solutionType == 'vector_intervals' || solutionType == 'set' || solutionType === 'blanks') {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
            else {
                this.taskDetails.score = this.maxScore;
                if (!this.rootTask && !(this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0)) {
                    this.score.score += this.taskDetails.score;
                }
            }
        }
        if (solutionType === 'info') {
            this.taskDetails.score = 0;
        }
        if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
            var tempScore = this.taskDetails.score;
            for (var _i = 0, _a = this.solvedSubtasks; _i < _a.length; _i++) {
                var task = _a[_i];
                tempScore += task.score;
            }
            this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
        }
        console.log("FinalScore: " + this.score.score);
    };
    TaskDetail.prototype.CalculateOrangeScore = function (borderLeft, borderRight, value, possibleScore) {
        var intervalLenght = Math.abs(borderRight - borderLeft);
        console.log("borderRight " + borderRight + "  BorderLeft " + borderLeft);
        var xVal = (Math.abs(value - borderLeft) / intervalLenght) * possibleScore;
        var score = Math.round(xVal);
        if (score < this.minScore)
            return this.minScore;
        else
            return score;
    };
    TaskDetail.prototype.bestPossibleScore = function () {
        if (this.rootTask && this.subTasksRequired) {
            return this.maxScore;
        }
        return 100;
    };
    TaskDetail.prototype.possibleScore = function () {
        if (this.taskDetails) {
            if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
                var tempScore = 0;
                for (var _i = 0, _a = this.solvedSubtasks; _i < _a.length; _i++) {
                    var task = _a[_i];
                    tempScore += task.score;
                }
                if (this.taskDetails.tries == 0) {
                    tempScore += this.maxScore;
                }
                else {
                    tempScore += this.maxScore - (this.taskDetails.tries - 1) * this.penalty > this.minScore ? this.maxScore - (this.taskDetails.tries - 1) * this.penalty : this.minScore;
                }
                if (this.solvedSubtasks.length < this.task.subtasks.length) {
                    var subtaskCount = 0;
                    for (var _b = 0, _c = this.task.subtasks; _b < _c.length; _b++) {
                        var subtask = _c[_b];
                        if (subtask.solutionType !== 'info') {
                            subtaskCount++;
                        }
                    }
                    var solvedSubtaskCount = 0;
                    var _loop_3 = function (subtask) {
                        var actualTask = this_1.task.subtasks.find(function (task) { return task.id === subtask.taskId; });
                        if (actualTask.solutionType !== 'info') {
                            solvedSubtaskCount++;
                        }
                    };
                    var this_1 = this;
                    for (var _d = 0, _e = this.solvedSubtasks; _d < _e.length; _d++) {
                        var subtask = _e[_d];
                        _loop_3(subtask);
                    }
                    for (var i = 0; i < subtaskCount - solvedSubtaskCount; i++) {
                        tempScore += this.subTaskScore;
                    }
                }
                return tempScore;
            }
            if (this.taskDetails.tries == 0) {
                return this.maxScore;
            }
            else {
                return this.maxScore - (this.taskDetails.tries - 1) * this.penalty > this.minScore ? this.maxScore - (this.taskDetails.tries - 1) * this.penalty : this.minScore;
            }
        }
        else {
            return this.maxScore;
        }
    };
    //TODO: Confirm if there are information that needs to be stored or displayed (like distance walked).
    //      Check if there is the need to put tries on these tasks
    TaskDetail.prototype.CalculateLine = function (pointA, pointB, distance) {
        var currDistance = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]);
        var solution = [Math.round(currDistance).toString()];
        var tempGreen = 10;
        var tempOrange = 20;
        if (currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else {
            this.taskSolved('', solution);
        }
    };
    TaskDetail.prototype.CalculateLineDirection = function (pointA, pointB, distance, angle) {
        var tempGreen = 10;
        var tempOrange = 20;
        var lenghtSolution = 0;
        var bearingSolution = 0;
        var currDistance = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]);
        var currBearing = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].bearing(pointA.getLatLng(), pointB.getLatLng());
        if (currBearing < 0)
            currBearing += 360;
        //Check Distance
        if (currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)) {
            lenghtSolution = 2;
        }
        else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)) {
            lenghtSolution = 1;
        }
        else {
            lenghtSolution = 0;
        }
        //Check Direction
        //The threshold for the green and orange angles is given by the tempAngGreen
        //and tempAngOrange values for the right side, and for the left side its calculated like this:
        var reverse = false;
        var leftGreen = angle - tempGreen;
        var leftOrange = angle - tempOrange;
        if (leftGreen < 0) {
            leftGreen += 360;
            reverse = true;
        }
        if (leftOrange) {
            leftOrange += 360;
            reverse = true;
        }
        if (!reverse) {
            if (currBearing > leftGreen && currBearing < (angle + tempGreen))
                bearingSolution = 2;
            else if (currBearing > leftOrange && currBearing < (angle + tempOrange))
                bearingSolution = 1;
            else
                bearingSolution = 0;
        }
        else {
            if (currBearing > leftGreen || currBearing < (angle + tempGreen))
                bearingSolution = 2;
            else if (currBearing > leftOrange || currBearing < (angle + tempOrange))
                bearingSolution = 1;
            else
                bearingSolution = 0;
        }
        var solution = [Math.round(currDistance).toString(), Math.round(currBearing - angle).toString()];
        if (bearingSolution == 2 && lenghtSolution == 2) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (bearingSolution > 0 && lenghtSolution > 0) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else {
            this.taskSolved('', solution);
        }
    };
    TaskDetail.prototype.CalculateTriangle = function (pointA, pointB, pointC, distance) {
        var edgesLength = [__WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB.getLatLng(), pointC.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointC.getLatLng(), pointA.getLatLng()])];
        var tempGreen = 10;
        var tempOrange = 20;
        var allGreen = true;
        var allOrange = true;
        for (var i = 0; i < edgesLength.length; i++) {
            var lenght = edgesLength[i];
            if (lenght > distance - tempGreen && lenght < distance + tempGreen) {
            }
            else if (lenght > distance - tempOrange && lenght < +tempOrange)
                allGreen = false;
            else {
                allOrange = false;
                allGreen = false;
            }
        }
        var solution = [Math.round(edgesLength[0]).toString(), Math.round(edgesLength[1]).toString(), Math.round(edgesLength[2]).toString()];
        //check conditions
        if (allGreen) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (allOrange) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateSquare = function (pointA, pointB, pointC, pointD, distance) {
        var edgesLength = [__WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB.getLatLng(), pointC.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointC.getLatLng(), pointD.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointD.getLatLng(), pointA.getLatLng()])];
        var diag1 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointC.getLatLng()]);
        var diag2 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB.getLatLng(), pointD.getLatLng()]);
        var tempGreen = 10;
        var tempOrange = 20;
        var allGreen = true;
        var allOrange = true;
        var diagonalSolution = 0;
        //check square sides lenght
        for (var i = 0; i < edgesLength.length; i++) {
            var lenght = edgesLength[i];
            if (lenght > distance - tempGreen && lenght < distance + tempGreen) {
            }
            else if (lenght > distance - tempOrange && lenght < +tempOrange)
                allGreen = false;
            else {
                allOrange = false;
                allGreen = false;
            }
        }
        //check square diagonals
        if (Math.abs(diag1 - diag2) < tempGreen)
            diagonalSolution = 2;
        else if (Math.abs(diag1 - diag2) < tempOrange)
            diagonalSolution = 1;
        else
            diagonalSolution = 0;
        var solution = [Math.round(edgesLength[0]).toString(), Math.round(edgesLength[1]).toString(),
            Math.round(edgesLength[2]).toString(), Math.round(edgesLength[3]).toString()];
        //check conditions
        if (allGreen && diagonalSolution == 2) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (allOrange && diagonalSolution > 0) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateCenterTwoP = function (pointA, pointB, currPosition) {
        pointA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointA[0], pointA[1]);
        pointB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointB[0], pointB[1]);
        console.log(currPosition.getLatLng());
        var distanceA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA, currPosition.getLatLng()]);
        var distanceB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB, currPosition.getLatLng()]);
        var delta = Math.abs(distanceA - distanceB);
        var tempGreen = 5;
        var tempOrange = 10;
        var solution = [Math.round(distanceA).toString(), Math.round(distanceB).toString()];
        if (delta < tempGreen) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (delta < tempOrange) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateCenterThreeP = function (pointA, pointB, pointC, currPosition) {
        pointA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointA[0], pointA[1]);
        pointB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointB[0], pointB[1]);
        pointC = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointC[0], pointC[1]);
        var distanceA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA, currPosition.getLatLng()]);
        var distanceB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB, currPosition.getLatLng()]);
        var distanceC = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointC, currPosition.getLatLng()]);
        var deltaAB = Math.abs(distanceA - distanceB);
        var deltaBC = Math.abs(distanceB - distanceC);
        var tempGreen = 5;
        var tempOrange = 10;
        var solution = [Math.round(distanceA).toString(), Math.round(distanceB).toString(), Math.round(distanceC).toString()];
        if (deltaAB < tempGreen && deltaBC < tempGreen) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (deltaAB < tempOrange && deltaBC < tempOrange) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateLinearFx = function (c0, c1, a, b, slope, yValue) {
        c0 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](c0[0], c0[1]);
        c1 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](c1[0], c1[1]);
        var AxisLenght = 100;
        //TODO: Confirm
        if (__WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([c0, c1]) < AxisLenght)
            c1 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].destination(c0, __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].bearing(c0, c1), AxisLenght);
        var yAngle = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].bearing(c0, c1) - 90;
        if (yAngle < 0)
            yAngle += 360;
        var y = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].destination(c0, yAngle, AxisLenght);
        var aX = this.getDistanceToLine(a, c0, y);
        var bX = this.getDistanceToLine(b, c0, y);
        if (aX > bX) {
            var helperPoint = a;
            a = b;
            b = helperPoint;
        }
        var aY = this.getDistanceToLine(a, c0, c1);
        var bY = this.getDistanceToLine(b, c0, c1);
        var deltaY = bY - aY;
        var deltaX = bX - aX;
        var m = deltaY / deltaX;
        var yInMeters = aY - m * aX;
        //Verification
        var tempMGreen = 5;
        var tempMOrange = 10;
        var tempYGreen = 5;
        var tempYOrange = 10;
        var solutionSlope = 0;
        var solutionY = 0;
        var solution = [Math.round(m).toString(), Math.round(yValue).toString()];
        var solutionFail = [m.toFixed(2).toString(), Math.round(yInMeters).toString()];
        if (m > slope - tempMGreen && m < slope + tempMGreen)
            solutionSlope = 2;
        else if (m > slope - tempMOrange && m < slope + tempMOrange)
            solutionSlope = 1;
        if (yInMeters > yValue - tempYGreen && yInMeters < yValue + tempYGreen)
            solutionY = 2;
        else if (yInMeters > yValue - tempYOrange && yInMeters < yValue + tempYOrange)
            solutionY = 1;
        if (solutionSlope == 2 && solutionY == 2) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved", solution);
        }
        else if (solutionSlope > 0 && solutionY > 0) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            if (!this.rootTask) {
                this.score.score += this.taskDetails.score;
            }
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solutionFail);
    };
    //Possibly add this to the MyMath class
    TaskDetail.prototype.getDistanceToLine = function (p, start, final) {
        var map = this.taskDetailMap.getMap();
        if (map != null) {
            var closestOnLine = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].closestOnSegment(map, p, start, final);
            return __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([p, closestOnLine]);
        }
        else {
            return 0;
        }
    };
    TaskDetail.prototype.setFabColor = function (index) {
        return 'fab-color-' + (index + 1);
    };
    TaskDetail.prototype.SetMessage = function (type) {
        var result = "";
        switch (type) {
            case "lineNoDirection":
                result = "a_line_no_direction_distance";
                break;
            case "line":
                result = "a_line_direction_distance";
                break;
            case "triangle":
                result = "a_triangle_distances";
                break;
            case "square":
                result = "a_square_distances";
                break;
            case "centerTwo":
                result = "a_center_two_distances";
                break;
            case "centerThree":
                result = "a_center_three_distances";
                break;
            case "linearFx":
                result = "a_linearFx_info";
                break;
        }
        return result;
    };
    TaskDetail.prototype.openInPhotoviewer = function (useRoot) {
        var _this = this;
        if (useRoot === void 0) { useRoot = false; }
        if (__WEBPACK_IMPORTED_MODULE_15__classes_Helper__["b" /* Helper */].isPluginAvailable(__WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_viewer__["a" /* PhotoViewer */])) {
            this.spinnerDialog.show();
            setTimeout(function () {
                // use short timeout to let spinner dialog appear
                _this.photoViewer.show(useRoot ? _this.rootTask.getImageURL(true) : _this.task.getImageURL(true));
                setTimeout(function () {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    _this.spinnerDialog.hide();
                }, 1000);
            }, 100);
        }
    };
    TaskDetail.prototype.openSubtask = function (index) {
        console.log('we opening a subtask');
        var rootTask = this.rootTask ? this.rootTask : this.task;
        if (!index && index !== 0 && this.solvedSubtasks.length === rootTask.subtasks.length)
            return;
        if (!index && index !== 0) {
            index = this.solvedSubtasks.length;
        }
        return this.navCtrl.push(TaskDetail_1, { taskId: this.taskId, routeId: this.routeId, headerTitle: rootTask.getSubtasksInOrder()[index].title, subTaskIndex: index });
    };
    TaskDetail.prototype.changeSubtaskAccordionState = function (subtask) {
        var activeAccordion = this.activeAccordions.find(function (entry) { return entry === subtask; });
        if (activeAccordion) {
            this.activeAccordions = this.activeAccordions.filter(function (entry) {
                return entry != subtask;
            });
        }
        else {
            this.activeAccordions.push(subtask);
        }
        console.log("New Accordion State", this.activeAccordions);
    };
    TaskDetail.prototype.goToNextSubtask = function () {
        var _this = this;
        var index = this.navCtrl.getActive().index;
        if (this.subTaskIndex + 1 !== this.rootTask.subtasks.length) {
            this.openSubtask(this.subTaskIndex + 1).then(function () {
                _this.navCtrl.remove(index);
            });
        }
        else {
            this.closeDetails();
        }
    };
    TaskDetail.prototype.goToPreviousSubtask = function () {
        var _this = this;
        var index = this.navCtrl.getActive().index;
        if (this.subTaskIndex - 1 >= 0) {
            this.openSubtask(this.subTaskIndex - 1).then(function () {
                _this.navCtrl.remove(index);
            });
        }
        else {
            this.closeDetails();
        }
    };
    TaskDetail.prototype.isSpecialTypeAnswered = function () {
        var isAnswered = true;
        if (!this.isSpecialTaskType) {
            return isAnswered;
        }
        if (this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals' || this.task.solutionType == 'set' || this.task.solutionType == 'blanks') {
            for (var _i = 0, _a = this.taskDetails.answerMultipleChoice; _i < _a.length; _i++) {
                var answerObject = _a[_i];
                if (answerObject.answer === "") {
                    isAnswered = false;
                }
            }
        }
        return isAnswered;
    };
    TaskDetail.prototype.generateSubtaskScoreCalculationString = function (solved) {
        var taskScore;
        var solutionType = this.task.solutionType;
        if (solutionType == "value" || solutionType == "multiple_choice" || solutionType == 'vector_values' || solutionType == 'vector_intervals' || solutionType == 'set' || solutionType === 'blanks') {
            taskScore = this.maxScore;
        }
        if (solutionType == "info") {
            taskScore = 0;
        }
        if (solutionType == "range") {
            if (solved == "solved") {
                taskScore = this.maxScore;
            }
            else if (solved == "solved_low") {
                var solutionList = this.task.getSolutionList();
                //if the orange interval is below the green
                var dotAnswer = parseFloat(this.taskDetails.answer.replace(",", ".")); // Fix ',' decimals by converting to '.' decimals
                if (dotAnswer < solutionList[0]) {
                    if (this.taskDetails.tries > 0) {
                        taskScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                    }
                    else {
                        taskScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer, this.maxScore);
                    }
                }
                else {
                    if (this.taskDetails.tries > 0) {
                        taskScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore - ((this.taskDetails.tries - 1) * this.penalty));
                    }
                    else {
                        taskScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer, this.maxScore);
                    }
                }
            }
        }
        var calculation = "";
        if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
            var numbersArray = [];
            for (var _i = 0, _a = this.solvedSubtasks; _i < _a.length; _i++) {
                var task = _a[_i];
                if (!numbersArray[task.score]) {
                    numbersArray[task.score] = 1;
                }
                else {
                    numbersArray[task.score]++;
                }
            }
            if (this.taskDetails.tries <= 1) {
                if (!numbersArray[taskScore]) {
                    numbersArray[taskScore] = 1;
                }
                else {
                    numbersArray[taskScore]++;
                }
            }
            else {
                var tempScore = taskScore - (this.taskDetails.tries - 1) * this.penalty > this.minScore ? this.maxScore - (this.taskDetails.tries - 1) * this.penalty : this.minScore;
                if (!numbersArray[tempScore]) {
                    numbersArray[tempScore] = 1;
                }
                else {
                    numbersArray[tempScore]++;
                }
            }
            for (var score in numbersArray) {
                if (calculation != "") {
                    calculation += ' + ';
                }
                if (numbersArray[score] == 1 && score != "0") {
                    calculation += score + 'MP';
                }
                else if (score != "0") {
                    calculation += numbersArray[score] + ' x ' + (score ? score + 'MP' : '');
                }
            }
        }
        else {
            var orangediff = 0;
            if (this.taskDetails.tries > 1) {
                orangediff = this.maxScore - (this.taskDetails.tries - 1) * this.penalty - taskScore;
            }
            else {
                orangediff = this.maxScore - taskScore;
            }
            if (this.taskDetails.tries > 1) {
                if (this.taskDetails.tries > 2) {
                    calculation = this.maxScore + 'MP - ' + (this.taskDetails.tries - 1) + ' x ' + this.penalty + 'MP';
                }
                else {
                    calculation = this.maxScore + 'MP - ' + this.penalty + 'MP';
                }
                if (orangediff > 0) {
                    calculation += ' -' + orangediff + 'MP';
                }
            }
            else if (orangediff > 0) {
                calculation = this.maxScore + 'MP - ' + orangediff + 'MP';
            }
        }
        return calculation;
    };
    TaskDetail.prototype.displayScoreCalculation = function () {
        if (this.subTasksRequired && this.task.subtasks && this.task.subtasks.length > 0) {
            var subtaskModal_3 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                type: 'text',
                score: '(' + this.generateSubtaskScoreCalculationString('solved') + ')',
                gamificationEnabled: !this.gamificationIsDisabled,
                modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].calculation,
                narrativeEnabled: this.route.isNarrativeEnabled(),
                narrative: this.app.activeNarrative,
                buttons: [
                    {
                        title: 'a_alert_close',
                        callback: function () {
                            subtaskModal_3.dismiss();
                        }
                    }
                ]
            }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
            subtaskModal_3.present();
        }
    };
    TaskDetail.prototype.goBack = function () {
        console.log("We goin back boys");
        if (!this.rootTask) {
            this.closeDetails();
        }
        else {
            this.goToPreviousSubtask();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], TaskDetail.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('multipleChoiceAnswers'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], TaskDetail.prototype, "multipleChoiceView", void 0);
    TaskDetail = TaskDetail_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-task-detail',template:/*ion-inline-start:"/Users/marc.hofmann/workspace/O1-MCM-mobile-App/src/pages/task-detail/task-detail.html"*/'<mcm-header></mcm-header>\n<ion-content no-bounce class="has-header padding bottom" [ngClass]="keyboardVisible() ? \'mcm-keyboard-open\' : \'\'">\n    <div class="task-header" [ngClass]="{\'gps\' : task && task.solutionType==\'gps\'}">\n        <div *ngIf="task && task.solutionType==\'gps\'" id="gpsTaskMap">\n            <ion-fab bottom right *ngIf="task && task.solutionType==\'gps\'">\n                <button ion-fab *ngFor="let item of gpsTaskButtonLabels; let i = index" ion-fab [color]="setFabColor(i)" (click)="taskDetailMap.setMarker(i)">\n                    <span>{{item}}</span>\n                </button>\n            </ion-fab>\n        </div>\n        <img class="image" *ngIf="task && task.solutionType!=\'gps\' && task.image" [src]="task.getImageURL()" (click)="openInPhotoviewer()" />\n        <img class="image" *ngIf="task && !task.image && rootTask && rootTask.image && task.solutionType !=\'gps\'" [src]="rootTask.getImageURL()" (click)="openInPhotoviewer(true)" />\n    </div>\n    <div class="task-content" [ngClass]="{\'subtask\': rootTask}">\n        <div class="transition"></div>\n        <div class="card task has-button-on-the-edge">\n\n            <div class="head">\n                <ion-label *ngIf="!rootTask">{{ "a_title_activity_task_view" | translate }}</ion-label>\n                <ion-label *ngIf="rootTask">{{ "a_title_activity_subtask_view" | translate : {current: subTaskIndex + 1, count: rootTask.subtasks.length} }}</ion-label>\n                <ion-label class="tag score" *ngIf="route && route.isAnswerFeedbackEnabled() && (!rootTask || subTasksRequired) && !gamificationIsDisabled" (click)="displayScoreCalculation()">{{possibleScore() | number }}</ion-label>\n            </div>\n            <p *ngIf="task">{{task.description}}</p>\n            <div class="answer" *ngIf="task && task.solutionType != \'info\' && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                <ion-label *ngIf ="task && task.solutionType != \'gps\' && route.isAnswerValidationEnabled()">{{ "a_task_answer" | translate }}</ion-label>\n                <ion-item *ngIf="task && !isSpecialTaskType && route.isAnswerValidationEnabled() && taskDetails && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                    <!-- pattern="-?(0(([.,])[0-9]+)?|[1-9]{1}[0-9]*(([.,])[0-9]+)?)" -->\n                    <ion-input (keyup.enter)="checkResult()"\n                               [disabled]="route && route.isAnswerFeedbackEnabled() && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)"\n                               *ngIf="task.solutionType != \'text\'"\n                               type="text"\n                               (focus)="setKeyboardOn(true)"\n                               [ngModelOptions]="{standalone: true}"\n                               readonly="true"\n                               [(ngModel)]="taskDetails.answer"\n                    >\n                    </ion-input>\n                    <ion-input [disabled]="route && route.isAnswerFeedbackEnabled() && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)" *ngIf="task.solutionType == \'text\'" type="text" [(ngModel)]="taskDetails.answer"></ion-input>\n                </ion-item>\n                <ion-list class="vector-input-list" *ngIf="task && (task.solutionType === \'vector_values\' || task.solutionType === \'vector_intervals\' || task.solutionType === \'set\') && taskDetails && route.isAnswerValidationEnabled() && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                    <ion-item *ngFor="let answerField of taskDetails.answerMultipleChoice; let i = index" [ngClass]="{\'is-focused\': answerIndex == i && keyboardVisible()}">\n                        <ion-label *ngIf="task.solutionType !== \'set\'" floating>{{answerField.name}}</ion-label>\n                        <ion-label *ngIf="task.solutionType === \'set\'" floating>{{\'a_task_set_answer\' | translate : {index: i + 1} }}</ion-label>\n                        <ion-input (keyup.enter)="checkResult()"\n                                   [disabled]="answerField.solved || (taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed))"\n                                   type="text"\n                                   (focus)="setKeyboardOn(true, i)"\n                                   [ngModelOptions]="{standalone: true}"\n                                   readonly="true"\n                                   [(ngModel)]="answerField.answer"\n                        >\n                        </ion-input>\n                    </ion-item>\n                </ion-list>\n                <ion-item *ngIf="task && task.solutionType === \'blanks\' && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                    <p [ngClass]="{\'disabled\': (taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed))}" class="blankContainer" id="blankContainer_{{task.id}}"></p>\n                </ion-item>\n                <ion-list *ngIf="task && task.solutionType == \'multiple_choice\' && multipleChoiceList && route.isAnswerValidationEnabled() && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                    <ion-item #multipleChoiceAnswers *ngFor="let item of multipleChoiceList; let i = index">\n                        <ion-checkbox [disabled]="route && route.isAnswerFeedbackEnabled() && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)" [(ngModel)]="item.userChecked"></ion-checkbox>\n                        <ion-label class="multi-choice-label" text-wrap tappable>{{item.value}}</ion-label>\n                    </ion-item>\n                </ion-list>\n            </div>\n\n            <div class="on-the-edge-container" *ngIf="taskDetails">\n                <ion-grid no-padding>\n                    <ion-row>\n                        <ion-col *ngIf="route.isHintsEnabled() && task && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                            <button ion-button icon-only round color="primary" class="hint" [disabled]="false" *ngIf="task.hasHintMessage(1)" (click)="showHint(1)">\n                                <img *ngIf="!taskDetails.hint1" class="round" src="./assets/icons/icon_hint-activated.svg"/>\n                                <img *ngIf="taskDetails.hint1" class="round used" src="./assets/icons/icon_hint-activated-used.svg"/>\n                            </button>\n                            <button ion-button icon-only round color="primary" class="hint" [disabled]="!taskDetails.hint1" *ngIf="task.hasHintMessage(2)" (click)="showHint(2)">\n                                <img *ngIf="taskDetails.hint1 && !taskDetails.hint2" class="round" src="./assets/icons/icon_hint-activated.svg"/>\n                                <img *ngIf="taskDetails.hint1 && taskDetails.hint2" class="round used" src="./assets/icons/icon_hint-activated-used.svg"/>\n                                <img *ngIf="!taskDetails.hint1" class="round" src="./assets/icons/icon_hint-deactivated.svg"/>\n                            </button>\n                            <button ion-button icon-only round color="primary" class="hint" [disabled]="!taskDetails.hint2" *ngIf="task.hasHintMessage(3)" (click)="showHint(3)">\n                                <img *ngIf="taskDetails.hint1 && taskDetails.hint2 && !taskDetails.hint3" class="round" src="./assets/icons/icon_hint-activated.svg"/>\n                                <img *ngIf="taskDetails.hint1 && taskDetails.hint2 && taskDetails.hint3" class="round used" src="./assets/icons/icon_hint-activated-used.svg"/>\n                                <img *ngIf="!taskDetails.hint2" class="round" src="./assets/icons/icon_hint-deactivated.svg"/>\n                            </button>\n                        </ion-col>\n\n                        <ion-col *ngIf="(route && route.isAnswerFeedbackEnabled() && route.isAnswerValidationEnabled()) && (task && task.solutionType != \'info\')">\n                            <button ion-button small round *ngIf="task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed) && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))"\n                            [disabled]="!isDecimal(taskDetails.answer) && (task.solutionType == \'range\' || task.solutionType == \'value\')  || task.solutionType != \'multiple_choice\' && !isSpecialTypeAnswered() && !taskDetails.answer && (task.solutionType != \'gps\' || !taskDetailMap?.areAllPointsSet())" (click)="checkResult()">\n                                {{ "a_btn_check_answer" | translate }}\n                            </button>\n                        </ion-col>\n\n                        <ion-col *ngIf="(route && route.isAnswerFeedbackEnabled() && !route.isAnswerValidationEnabled()) || (task && task.solutionType == \'info\') && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                            <button ion-button small round *ngIf="task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed)"\n                                    (click)="completeTask()">\n                                {{ "a_task_complete" | translate }}\n                            </button>\n                        </ion-col>\n\n                        <ion-col *ngIf="(route && !route.isAnswerFeedbackEnabled()) && (task && task.solutionType != \'info\') && (!subTasksRequired || !task.subtasks || rootTask || (task.subtasks.length === solvedSubtasks.length))">\n                            <button ion-button small round *ngIf="task && taskDetails"\n                                    [disabled]="!isDecimal(taskDetails.answer) && (task.solutionType == \'range\' || task.solutionType == \'value\')  || task.solutionType != \'multiple_choice\' && !taskDetails.answer && (task.solutionType != \'gps\' || !taskDetailMap?.areAllPointsSet())  && !isSpecialTypeAnswered()" (click)="checkResult()">\n                                {{ "p_save" | translate }}\n                            </button>\n                        </ion-col>\n\n                        <ion-col>\n                            <button class="hint" ion-button icon-only round color="primary" (click)="showSolutionSample()"\n                            *ngIf="taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed) && route.isSampleSolutionEnabled() && route.isAnswerFeedbackEnabled() && task.solutionType !== \'info\'">\n                                <img class="round" src="./assets/icons/icon_show_sample_salution.svg"/>\n                            </button>\n                            <!-- open subtask -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="openSubtask()"\n                                    *ngIf="task.subtasks && task.subtasks.length !== solvedSubtasks.length && task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed)">\n                                <img class="round" src="./assets/icons/subtask_icon.svg"/>\n                            </button>\n                            <!-- close subtask -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="closeDetails()"\n                                    *ngIf="rootTask && task">\n                                <img class="round" src="./assets/icons/task_icon.svg"/>\n                            </button>\n                            <!-- skip task -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="confirmSkippingTask()"\n                            *ngIf="task && taskDetails && task.solutionType !== \'info\' &&(!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed) && ((!rootTask || !subTasksRequired) || (rootTask && subTasksRequired && taskDetails.tries >= 2))">\n                                <img class="round" src="./assets/icons/icon_skip.svg"/>\n                            </button>\n                            <!-- show next task -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="closeDetails(false)"\n                            *ngIf="!rootTask && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)">\n                                <img class="round" src="./assets/icons/icon_skip.svg"/>\n                            </button>\n                            <!-- show next subtask -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="goToNextSubtask()"\n                                    *ngIf="rootTask && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)">\n                                <img class="round" src="./assets/icons/icon_skip.svg"/>\n                            </button>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n\n            </div>\n        </div>\n\n        <div class="card subtasks" *ngIf="task && task.subtasks && task.subtasks.length > 0 && solvedSubtasks && solvedSubtasks.length > 0">\n            <ion-label>{{ "a_solved_subtasks" | translate }}</ion-label>\n            <div *ngFor="let subtask of solvedSubtasks; let i = index" class="accordion" [ngClass]="{\'open\': activeAccordions.indexOf(subtask.taskId) != -1}">\n                <div class="accordion_title" (click)="changeSubtaskAccordionState(subtask.taskId)">\n                    <p class="task_name">#{{i+1}} {{task.getSubtasksInOrder()[i].title}}</p>\n                    <div class="rating_container">\n                        <!--                    <div class="rating" [ngClass]="{\'perfect\': subtask.solved && route.isAnswerFeedbackEnabled(), \'good\': subtask.solvedLow && route.isAnswerFeedbackEnabled(), \'failed\': subtask.failed && route.isAnswerFeedbackEnabled(), \'saved\': !route.isAnswerFeedbackEnabled()}"></div>-->\n                    </div>\n                    <img class="accordion_arrow" src="./assets/icons/subtask_arrow.svg">\n                </div>\n                <div class="accordion_content" (click)="openSubtask(i)">\n                    <span class="description" [ngClass]="{\'compact\': subTasksRequired}">{{task.getSubtasksInOrder()[i].description}}</span>\n                    <ion-label class="answer_container">{{ "a_task_answer" | translate }}<span class="answer" [ngClass]="{\'perfect\': subtask.solved && route.isAnswerFeedbackEnabled(), \'good\': subtask.solvedLow && route.isAnswerFeedbackEnabled(), \'failed\': subtask.failed && route.isAnswerFeedbackEnabled(), \'saved\': !route.isAnswerFeedbackEnabled()}">{{subtask.answer}}</span></ion-label>\n                    <ion-label *ngIf="subTasksRequired" class="answer_container">{{ "a_task_score" | translate }}<span class="answer" [ngClass]="{\'perfect\': subtask.solved && route.isAnswerFeedbackEnabled(), \'good\': subtask.solvedLow && route.isAnswerFeedbackEnabled(), \'failed\': subtask.failed && route.isAnswerFeedbackEnabled(), \'saved\': !route.isAnswerFeedbackEnabled()}">{{subtask.score}}</span></ion-label>\n                    <img class="subtask-inner-arrow" src="./assets/icons/subtask_arrow.svg">\n                </div>\n            </div>\n        </div>\n\n       <!-- <pre>taskDetails {{ taskDetails | json }}</pre> -->\n        <div class="card evaluation" *ngIf="route && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails?.failed || taskDetails?.saved)"\n        [ngClass]="{\'saved\' : taskDetails?.saved, \'perfect\' : taskDetails?.solved && route.isAnswerFeedbackEnabled(), \'good\': taskDetails?.solvedLow && route.isAnswerFeedbackEnabled(), \'failed\' : taskDetails?.failed && route.isAnswerFeedbackEnabled() }">\n            <div class="head" *ngIf="task.solutionType !== \'info\'">\n                <div *ngIf="(taskDetails?.solved || taskDetails?.solvedLow) && route.isAnswerFeedbackEnabled() && task && task.solutionType !== \'info\'">\n                    <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;a_alert_congrats&quot;); else elseBlock">\n                        <ion-label text-wrap>{{ route.getNarrativeString("a_alert_congrats") }}</ion-label>\n                    </div>\n                    <ng-template #elseBlock>\n                        <ion-label text-wrap>{{ "a_alert_congrats" | translate }}</ion-label>\n                    </ng-template>\n                </div>\n                <div *ngIf="taskDetails?.failed && route.isAnswerFeedbackEnabled() && task && task.solutionType !== \'info\'">\n                    <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;good_luck_next_time&quot;); else elseBlock">\n                        <ion-label text-wrap>{{ route.getNarrativeString("good_luck_next_time") }}</ion-label>\n                    </div>\n                    <ng-template #elseBlock>\n                        <ion-label text-wrap>{{ "good_luck_next_time" | translate }}</ion-label>\n                    </ng-template>\n                </div>\n                <div *ngIf="taskDetails.saved && !route.isAnswerFeedbackEnabled() && task && task.solutionType !== \'info\'">\n                    <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;a_alert_congrats&quot;); else elseBlock">\n                        <ion-label text-wrap>{{ route.getNarrativeString("a_alert_congrats") }}</ion-label>\n                    </div>\n                    <ng-template #elseBlock>\n                        <ion-label text-wrap>{{ "a_alert_congrats" | translate }}</ion-label>\n                    </ng-template>\n                </div>\n                <ion-label class="tag score" *ngIf="route.isAnswerFeedbackEnabled() && !gamificationIsDisabled && taskDetails && (taskDetails.score || taskDetails.score == 0)">+ {{taskDetails.score}}</ion-label>\n            </div>\n        </div>\n\n        <div *ngIf="!rootTask" id="keyboard-anchor"></div>\n        <div *ngIf="rootTask" id="snd-keyboard-anchor"></div>\n	    <div *ngIf="taskDetails && task.hasSideFacts()" class="card secondary">\n                <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;a_did_you_know&quot;); else elseBlock">\n                    <ion-label text-wrap>{{ route.getNarrativeString("a_did_you_know") }}</ion-label>\n                </div>\n                <ng-template #elseBlock>\n                    <ion-label text-wrap>{{ "a_did_you_know" | translate }}</ion-label>\n                </ng-template>\n		    <p *ngIf="task">\n			    {{task.getSideFactsText()}}\n		    </p>\n	    </div>\n        <div *ngIf="task && task.author" class="card secondary">\n            <ion-label>{{ "author" | translate }}</ion-label>\n            <p>\n                {{task.author}}<br> {{task.mail}}\n            </p>\n        </div>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/marc.hofmann/workspace/O1-MCM-mobile-App/src/pages/task-detail/task-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_modal_modal_controller__["a" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* DeepLinker */],
            __WEBPACK_IMPORTED_MODULE_10__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_11__services_gps_service__["a" /* GpsService */],
            __WEBPACK_IMPORTED_MODULE_13__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_5__app_app_component__["b" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_17__services_images_service__["a" /* ImagesService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]])
    ], TaskDetail);
    return TaskDetail;
    var TaskDetail_1;
}());

//# sourceMappingURL=task-detail.js.map

/***/ }),

/***/ 1166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDetailMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet_markercluster__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet_markercluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet_markercluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_offline__ = __webpack_require__(1155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_offline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_offline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_geometryutil__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_geometryutil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_leaflet_geometryutil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_Helper__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet_rotatedmarker__ = __webpack_require__(1158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet_rotatedmarker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_leaflet_rotatedmarker__);
/**
 * Created by Iwan Gurjanow on 19.02.2018.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import 'mapbox-gl-leaflet/leaflet-mapbox-gl.js';
var TaskDetailMap = /** @class */ (function () {
    function TaskDetailMap(task, route, gpsService, app, ormService, imagesService) {
        this.task = task;
        this.route = route;
        this.gpsService = gpsService;
        this.app = app;
        this.ormService = ormService;
        this.imagesService = imagesService;
        this.pointsIcons = [];
        // Markers (set by user) settings
        this.pointMarkers = [];
        this.ALLOWED_DISTANCE_TO_TASK = 300;
        // Axis setting
        this.AXIS_LENGTH = 110;
        this.ARROW_LENGTH = 6;
        this.ARROW_DEGREE = 25;
        this.MARK_DISTANCE = 10;
        this.MARK_LENGTH = 1.5;
        this.LINEAR_FX_EXTEND = 100;
        this.axisPoints = {
            origin: null,
            x: null,
            y: null
        };
        this.linearFxGraph = null;
        this.markerGroup = null;
        this.updateIcons();
        this.taskDetails = task;
        this.routeDetails = route;
        // Init Marker Array
        for (var i = 0; i < parseInt(this.task.getSolutionGpsValue("points")); i++) {
            this.pointMarkers[i] = null;
        }
    }
    TaskDetailMap.prototype.ngOnDestroy = function () {
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
    };
    TaskDetailMap.prototype.updateIcons = function () {
        switch (this.app.activeNarrative) {
            case 'pirates':
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/mapposition.png", iconSize: [100, 100], iconAnchor: [50, 50], className: 'marker userPosition' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.preDefinedPointIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-gps-0.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[0] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-1.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[1] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-2.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[2] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-3.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[3] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-4.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                break;
            default:
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/mapposition.png", iconSize: [100, 100], className: 'marker' });
                this.preDefinedPointIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-0.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[0] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-1.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[1] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-2.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[2] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-3.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[3] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-4.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                break;
        }
    };
    /*
    Place or move marker on map depending on index (button click)
     */
    TaskDetailMap.prototype.setMarker = function (index) {
        var testing = false; // Note: Change this to true locally for testing GPS tasks!
        var location;
        if (testing) {
            location = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation;
        }
        else {
            location = this.gpsService.getLastPosition();
        }
        if (location != null) {
            var locationLatLng = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](location.coords.latitude, location.coords.longitude);
            if (!this.markerCanBeSet(locationLatLng)) {
                return;
            }
            if (this.pointMarkers[index] == null) {
                var label = String.fromCharCode("A".charCodeAt(0) + index);
                var newMarker = __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](locationLatLng, { icon: this.pointsIcons[index] });
                newMarker.addTo(this.map);
                this.pointMarkers[index] = newMarker;
            }
            else {
                this.pointMarkers[index].setLatLng(locationLatLng);
            }
            if (this.taskDetails.getSolutionGpsValue("task") == "linearFx") {
                this.insertLinearFxGraph();
            }
            console.log("Marker placed");
        }
    };
    TaskDetailMap.prototype.markerCanBeSet = function (clickLatLng) {
        // Markers need to be placed within a certain radius from the task
        /*
        Note: (L as any).GeometryUtil.distance seems to return the distance in pixels? the bigger the zoom the higher the distance
        For realistic distance in meters use (L as any).GeometryUtil.length(latlng1, latlng2)
         */
        var distanceToTask = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](this.taskDetails.lat, this.taskDetails.lon), clickLatLng]);
        if (distanceToTask > this.ALLOWED_DISTANCE_TO_TASK) {
            // TODO: Display note / message why marker cannot be set
            console.log("Marker cannot be placed: Out of range.");
            return false;
        }
        else {
            if (this.taskDetails.getSolutionGpsValue("task") == "linearFx") {
                // Markers can only be placed inside drawn axis
                // Inside = the distance of the placed marker to all four "sides" of the axis must be smaller than AXIS_LENGTH
                var xy = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(this.axisPoints.x, __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].bearing(this.axisPoints.origin, this.axisPoints.y), this.AXIS_LENGTH);
                var closestOnX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.origin, this.axisPoints.x);
                var closestOnY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.origin, this.axisPoints.y);
                var closestOnXY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.x, xy);
                var closestOnYX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.y, xy);
                var distanceX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnX, clickLatLng]);
                var distanceY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnY, clickLatLng]);
                var distanceXY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnXY, clickLatLng]);
                var distanceYX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnYX, clickLatLng]);
                if (distanceX <= this.AXIS_LENGTH && // Distance to Segment origin - x
                    distanceY <= this.AXIS_LENGTH && // Distance to Segment origin - y
                    distanceXY <= this.AXIS_LENGTH && // Distance to Segment x - xy
                    distanceYX <= this.AXIS_LENGTH // Distance to Segment y - xy
                )
                    return true;
                else {
                    // TODO: Display note / message why marker cannot be set
                    console.log("Marker cannot be placed: Not in axis");
                    return false;
                }
            }
            else {
                return true;
            }
        }
    };
    /*
    Checks if user has placed all necessary points (needed for validating)
     */
    TaskDetailMap.prototype.areAllPointsSet = function () {
        var result = true;
        for (var i = 0; i < this.pointMarkers.length; i++) {
            if (this.pointMarkers[i] == null) {
                result = false;
                break;
            }
        }
        return result;
    };
    TaskDetailMap.prototype.getPoints = function () {
        if (this.areAllPointsSet()) {
            var result = [];
            for (var i = 0; i < this.pointMarkers.length; i++) {
                var marker = this.pointMarkers[i];
                result[i] = marker.getLatLng();
            }
            return result;
        }
        else {
            return null;
        }
    };
    /*
    Insert predefined points (by author) as related points for the task (centerTwo, centerThree)
     */
    TaskDetailMap.prototype.insertPreDefinedPoints = function (points) {
        for (var i = 0; i < points.length; i++) {
            var preDefinedPoint = __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](points[i][0], points[i][1]), { icon: this.preDefinedPointIcon });
            preDefinedPoint.addTo(this.map);
        }
    };
    /*
    Draws an axis (x-Axis and y-Axis) starting at origin.
    The direction for the x-Axis is defined by origin and dPoing
    The length of the axis is default to 100m, every 10m there is a short line indicating the 10 meters
     */
    TaskDetailMap.prototype.insertAxis = function (origin, dPoint) {
        // Draw axis with arrows at the end
        var aCoor = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](origin[0], origin[1]);
        var bCoor = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](dPoint[0], dPoint[1]);
        var bearingAB = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].bearing(aCoor, bCoor);
        //let disAB = (L as any).GeometryUtil.distance(this.map, aCoor, bCoor);
        bCoor = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB, this.AXIS_LENGTH); // Override bCoor with a point that is 100 meter in right direction
        /*
        if (disAB < this.AXIS_LENGTH) {
            bCoor = (L as any).GeometryUtil.destination(aCoor, bearingAB, this.AXIS_LENGTH);
        }
        */
        var yCoor = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB - 90, this.AXIS_LENGTH);
        var xArrowUp = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(bCoor, bearingAB - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        var xArrowDown = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(bCoor, bearingAB + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        var yArrowUp = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(yCoor, bearingAB - 90 - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        var yArrowDown = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(yCoor, bearingAB - 90 + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([yArrowUp, yCoor, yArrowDown, yCoor, aCoor, bCoor, xArrowUp, bCoor, xArrowDown], { color: 'red', opacity: 0.7 }).addTo(this.map);
        this.axisPoints.origin = aCoor;
        this.axisPoints.x = bCoor;
        this.axisPoints.y = yCoor;
        // Insert "X" and "Y" at end of axis
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(bCoor, bearingAB, this.MARK_LENGTH * 3), { rotationAngle: (bearingAB - 90), icon: this.getLabeledIcon("X", "axis-label", "x")
        }).addTo(this.map);
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(yCoor, bearingAB - 90, this.MARK_LENGTH * 3), { rotationAngle: (bearingAB - 90), icon: this.getLabeledIcon("Y", "axis-label", "y")
        }).addTo(this.map);
        // Draw markers every MARKER_DISTANCE meters to indicate the dimensions
        // origin marker
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB + 135, this.MARK_LENGTH), __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB - 45, this.MARK_LENGTH * 1.5)], { color: 'red', weight: 2, opacity: 0.7 }).addTo(this.map);
        // 0 m label at origin
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB + 135, this.MARK_LENGTH * 2), {
            icon: this.getLabeledIcon('0 m', "axis-label", "y"),
            rotationAngle: (bearingAB - 90)
        }).addTo(this.map);
        // Add 50m and 100m to axis
        for (var i = 1; i < (this.AXIS_LENGTH) / this.MARK_DISTANCE; i++) {
            var markerWidth = 2;
            if (i == 5 || i == 10) {
                markerWidth = 4;
            }
            var coordOnXAxis = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB, this.MARK_DISTANCE * i);
            var coordOnYAxis = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB - 90, this.MARK_DISTANCE * i);
            var innerPointX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnXAxis, bearingAB - 90, this.MARK_LENGTH);
            var outerPointX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnXAxis, bearingAB - 90, -this.MARK_LENGTH);
            var innerPointY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnYAxis, bearingAB, this.MARK_LENGTH);
            var outerPointY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnYAxis, bearingAB, -this.MARK_LENGTH);
            __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([outerPointX, innerPointX], { color: 'red', weight: markerWidth, opacity: 0.7 }).addTo(this.map);
            __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([outerPointY, innerPointY], { color: 'red', weight: markerWidth, opacity: 0.7 }).addTo(this.map);
            if (i == 5 || i == 10) {
                var xLabelCoord = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnXAxis, bearingAB + 90, this.MARK_LENGTH * 3);
                var yLabelCoord = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnYAxis, -bearingAB, this.MARK_LENGTH * 3);
                __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](xLabelCoord, {
                    icon: this.getLabeledIcon(i * 10 + ' m', "axis-label", "x"),
                    rotationAngle: (bearingAB - 90)
                }).addTo(this.map);
                __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](yLabelCoord, {
                    icon: this.getLabeledIcon(i * 10 + ' m', "axis-label", "y"),
                    rotationAngle: (bearingAB - 90)
                }).addTo(this.map);
            }
        }
    };
    TaskDetailMap.prototype.getLabeledIcon = function (labelText, labelClass, axis) {
        var iconSize /*, iconAnchor*/;
        if (axis == "x") {
            iconSize = [40, 20];
            //iconAnchor = [0, 10];
        }
        else {
            iconSize = [40, 20];
            //iconAnchor = [40, -30];
        }
        return __WEBPACK_IMPORTED_MODULE_1_leaflet__["divIcon"]({
            className: labelClass,
            html: labelText,
            iconSize: iconSize,
        });
    };
    TaskDetailMap.prototype.insertLinearFxGraph = function () {
        if (this.areAllPointsSet()) {
            var points = this.getPoints();
            if (this.linearFxGraph != null) {
                this.map.removeLayer(this.linearFxGraph);
            }
            var bearing = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].bearing(points[0], points[1]);
            var pointA = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(points[0], bearing, (-1) * this.LINEAR_FX_EXTEND);
            var pointB = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(points[1], bearing, this.LINEAR_FX_EXTEND);
            this.linearFxGraph = __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([pointA, pointB], { color: 'blue' }).addTo(this.map);
        }
    };
    TaskDetailMap.prototype.loadMap = function () {
        var _this = this;
        this.center = [this.taskDetails.lat, this.taskDetails.lon]; // Center at task's position
        var mapquestUrl = this.route.getTilesMap(this.app.activeNarrative); //Helper.mapquestUrl;
        var subDomains = this.route.getTilesServerSubdomains(this.app.activeNarrative); //Helper.subDomains;
        if (this.map == null) {
            this.map = __WEBPACK_IMPORTED_MODULE_1_leaflet__["map"]('gpsTaskMap', {
                center: this.center,
                zoom: 18,
                zoomControl: true,
                tileSize: 256,
                maxBounds: this.routeDetails.getBoundingBoxLatLng(),
                trackResize: false // if map gets resized when not visible (when keyboard shows up) it can get into undefined state
            });
            // (<any>L).mapboxGL({
            //     accessToken: "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww",
            //     style: mapquestUrl,
            //     updateInterval: 0,
            // }).addTo(this.map);
            /* For testing - sets users position to click event, comment in for local testing*/
            this.map.on('click', function (e) {
                if (__WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation == null) {
                    __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation = { coords: { latitude: null, longitude: null } };
                }
                __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation.coords.latitude = e.latlng.lat;
                __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation.coords.longitude = e.latlng.lng;
            });
            var zoomLevels_1 = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].calculateZoom(this.route.getViewBoundingBoxLatLng());
            __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */].initialize().then(function () {
                console.log("Tiles DB Initialized");
                var offlineLayer = __WEBPACK_IMPORTED_MODULE_1_leaflet__["tileLayer"].offline(mapquestUrl, __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */], {
                    attribution: '&copy; mapbox.com',
                    subdomains: subDomains,
                    minZoom: zoomLevels_1.min_zoom,
                    maxZoom: zoomLevels_1.max_zoom,
                    tileSize: 256,
                    crossOrigin: true,
                    detectRetina: true,
                    bounds: _this.route.getBoundingBoxLatLng()
                });
                var tiles = _this.ormService.getTileURLsAsObject(_this.route);
                var resolveOfflineURLsAsTiles = !_this.route.isNarrativeEnabled();
                var that = _this;
                offlineLayer.getTileUrl = function (coords) {
                    var url = __WEBPACK_IMPORTED_MODULE_1_leaflet__["TileLayer"].prototype.getTileUrl.call(this, coords);
                    var dbStorageKey = this._getStorageKey(url);
                    if (tiles[dbStorageKey]) {
                        return Promise.resolve(that.imagesService.getOfflineURL(dbStorageKey, false, resolveOfflineURLsAsTiles));
                    }
                    return Promise.resolve(url);
                };
                _this.map.fitBounds(_this.route.getViewBoundingBoxLatLng());
                offlineLayer.on('offline:below-min-zoom-error', function () {
                    alert('Can not save tiles below minimum zoom level.');
                });
                offlineLayer.on('offline:save-start', function (data) {
                    console.debug(data);
                    console.debug('Saving ' + data.nTilesToSave + ' tiles.');
                });
                offlineLayer.on('offline:save-end', function () {
                    alert('All the tiles were saved.');
                });
                offlineLayer.on('offline:save-error', function (err) {
                    console.error('Error when saving tiles: ' + err);
                });
                offlineLayer.on('offline:remove-start', function () {
                    console.debug('Removing tiles.');
                });
                offlineLayer.on('offline:remove-end', function () {
                    alert('All the tiles were removed.');
                });
                offlineLayer.on('offline:remove-error', function (err) {
                    console.error('Error when removing tiles: ' + err);
                });
                offlineLayer.addTo(_this.map);
            });
            /* User's Location */
            this.gpsService.getCurrentPosition()
                .then(function (resp) {
                if (resp && resp.coords) {
                    console.warn('found you');
                    // let markerGroup = L.featureGroup();
                    _this.userMarker = __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"]([resp.coords.latitude, resp.coords.longitude], { icon: _this.userPositionIcon }).on('click', function () {
                        //alert('Marker clicked');
                    });
                    _this.userMarker.setRotationOrigin('center center');
                    _this.userMarker.addTo(_this.map);
                    if (_this.watchSubscription) {
                        _this.watchSubscription.unsubscribe();
                    }
                    _this.watchSubscription = _this.gpsService.watchPosition().subscribe(function (resp) {
                        if (resp && resp.coords) {
                            var lanlng = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](resp.coords.latitude, resp.coords.longitude);
                            // this.map.panTo(lanlng);
                            _this.userMarker.setLatLng(lanlng);
                            //Check if it needs to move the map (in case the user is outside the threshold bounds)
                            /*let freeBounds = L.bounds(L.point(this.map.getSize().x * 0.2, this.map.getSize().y * 0.2),
                             L.point(this.map.getSize().x * 0.8, this.map.getSize().y * 0.8));
                             let newPos = Helper.followUser(freeBounds, this.map.latLngToContainerPoint(lanlng), this.map.getZoom());
                             if(newPos!= null) {
                             //this.map.panTo(this.map.containerPointToLatLng(newPos));
                             }*/
                            //Rotate the user marker
                            if (_this.prevPos != null) {
                                var angle = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].getAngle(_this.prevPos, resp.coords);
                                _this.userMarker.setRotationAngle(angle);
                            }
                            _this.prevPos = resp.coords;
                        }
                    });
                }
            })
                .catch(function (error) {
                console.error("Location error: " + JSON.stringify(error));
            });
        }
    };
    TaskDetailMap.prototype.getMap = function () {
        return this.map;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('gpsTaskMap'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TaskDetailMap.prototype, "mapContainer", void 0);
    return TaskDetailMap;
}());

//# sourceMappingURL=task-detail-map.js.map

/***/ }),

/***/ 1167:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (function()
{
  function _min(d0, d1, d2, bx, ay)
  {
    return d0 < d1 || d2 < d1
        ? d0 > d2
            ? d2 + 1
            : d0 + 1
        : bx === ay
            ? d1
            : d1 + 1;
  }

  return function(a, b)
  {
    if (a === b) {
      return 0;
    }

    if (a.length > b.length) {
      var tmp = a;
      a = b;
      b = tmp;
    }

    var la = a.length;
    var lb = b.length;

    while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
      la--;
      lb--;
    }

    var offset = 0;

    while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
      offset++;
    }

    la -= offset;
    lb -= offset;

    if (la === 0 || lb < 3) {
      return lb;
    }

    var x = 0;
    var y;
    var d0;
    var d1;
    var d2;
    var d3;
    var dd;
    var dy;
    var ay;
    var bx0;
    var bx1;
    var bx2;
    var bx3;

    var vector = [];

    for (y = 0; y < la; y++) {
      vector.push(y + 1);
      vector.push(a.charCodeAt(offset + y));
    }

    var len = vector.length - 1;

    for (; x < lb - 3;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      bx1 = b.charCodeAt(offset + (d1 = x + 1));
      bx2 = b.charCodeAt(offset + (d2 = x + 2));
      bx3 = b.charCodeAt(offset + (d3 = x + 3));
      dd = (x += 4);
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        ay = vector[y + 1];
        d0 = _min(dy, d0, d1, bx0, ay);
        d1 = _min(d0, d1, d2, bx1, ay);
        d2 = _min(d1, d2, d3, bx2, ay);
        dd = _min(d2, d3, dd, bx3, ay);
        vector[y] = dd;
        d3 = d2;
        d2 = d1;
        d1 = d0;
        d0 = dy;
      }
    }

    for (; x < lb;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      dd = ++x;
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
        d0 = dy;
      }
    }

    return dd;
  };
})();



/***/ })

});
//# sourceMappingURL=0.js.map