webpackJsonp([1],{

/***/ 1154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksMapPageModule", function() { return TasksMapPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TasksMap__ = __webpack_require__(1166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(236);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TasksMapPageModule = /** @class */ (function () {
    function TasksMapPageModule() {
    }
    TasksMapPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__TasksMap__["a" /* TasksMap */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__TasksMap__["a" /* TasksMap */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], TasksMapPageModule);
    return TasksMapPageModule;
}());

//# sourceMappingURL=TasksMap.module.js.map

/***/ }),

/***/ 1159:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1160), __webpack_require__(1161)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('./TileLayer.Offline'), require('./Control.Offline'));
    }
}(function (TileLayerOffline, ControlOffline) {
}));


/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory, window) {

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(115)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory, window) {

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(115)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
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

/***/ 1162:
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

/***/ 1166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_offline__ = __webpack_require__(1159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_offline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_leaflet_offline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_Helper__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__ = __webpack_require__(635);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_orm_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entity_Score__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_navigation_deep_linker__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_gps_service__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_modals_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet_rotatedmarker__ = __webpack_require__(1162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet_rotatedmarker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_leaflet_rotatedmarker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_conic_gradient__ = __webpack_require__(1167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_conic_gradient___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_conic_gradient__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_images_service__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_app_component__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modals_MCMIconModal_MCMIconModal__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__modals_MCMIntroModal_MCMIntroModal__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ionic_angular_components_modal_modal_controller__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__chat_chat__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_chat_and_session_service__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__modals_MCMTrailFinishedModal_MCMTrailFinishedModal__ = __webpack_require__(649);
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



























var TasksMap = /** @class */ (function () {
    function TasksMap(navCtrl, navParams, events, ormService, deepLinker, gpsService, modalsService, imagesService, storage, spinner, modalCtrl, chatAndSessionService, app, helper) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.ormService = ormService;
        this.deepLinker = deepLinker;
        this.gpsService = gpsService;
        this.modalsService = modalsService;
        this.imagesService = imagesService;
        this.storage = storage;
        this.spinner = spinner;
        this.modalCtrl = modalCtrl;
        this.chatAndSessionService = chatAndSessionService;
        this.app = app;
        this.helper = helper;
        this.state = {
            selectedTask: null,
            isShowingAllTasks: false,
            visibleTasks: {},
            skippedTaskIds: [],
            selectedStartTask: false,
            showIntroModal: false,
            showGuidedTrailModal: false
        };
        this.stateKey = "savedMapStateByRoute";
        this.taskToSkip = null;
        this.gamificationIsDisabled = false;
        this.isUserInsideMap = true;
        this.user = null;
        this.countdownBeforeSession = false;
        this.startInterval = false;
        this.showCountdownOrTimer = false;
        //private refreshIntervalId: any = null;
        this.showSessionEnds = false;
        this.taskBlocked = false;
        this.sessionTimeTimer = __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs__["Observable"].interval(TasksMap_1.UPDATE_SESSION_TIME_INTERVAL_IN_SECS * 1000);
        this.redrawingMarkers = false;
        this.markerGroup = null;
        this.pathGroup = null;
        /*this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [100, 100], iconAnchor: [50, 50], className:'marker userPosition'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
        this.taskOpenIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-open.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskOpenIcon.clusterColor = '#036D99';
        this.taskSkippedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-skipped.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskSkippedIcon.clusterColor = '#B2B2B2';
        this.taskDoneIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskDoneIcon.clusterColor = '#F3B100';
        this.taskDonePerfectIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done-perfect.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskDonePerfectIcon.clusterColor = '#4CAF50';
        this.taskFailedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-failed.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskFailedIcon.clusterColor = '#E62B25';*/
        this.chatAndSessionService.init();
        this.events.subscribe('user:kicked', function (user) {
            if (user == 'self') {
                console.log("userKicked");
                _this.sessionKicked();
                _this.events.unsubscribe('user:kicked', null);
            }
            else {
                console.log("Someone else was kicked.");
            }
        });
        this.events.subscribe('session:updated', function (sessionInfo) {
            console.log('Session has been updated');
            _this.updateSession(sessionInfo);
        });
        this.events.subscribe('user:assigned_task', function (taskId) {
            console.log('User has been assigned task with id: ' + taskId);
            _this.sessionInfo.sessionUser.assigned_task_id = taskId;
            _this.forceStartFromTask(taskId).then(function () {
                _this.redrawMarker();
            });
        });
    }
    TasksMap_1 = TasksMap;
    TasksMap.prototype.isTrailCompleted = function () {
        if (this.route.isAnswerFeedbackEnabled()) {
            return (this.taskList && this.score.getTasksSolved().length + this.score.getTasksSolvedLow().length + this.score.getTasksFailed().length == this.taskList.length);
        }
        else {
            return this.score.getTasksSaved() && this.score.getTasksSaved().length == this.taskList.length;
        }
    };
    TasksMap.prototype.showTrailCompletedAlert = function () {
        var that = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_26__modals_MCMTrailFinishedModal_MCMTrailFinishedModal__["a" /* MCMTrailFinishedModal */], {
            score: this.score,
            tasks: this.taskList,
            narrative: this.app.activeNarrative,
            callback: function () {
                modal.dismiss().then(function () {
                    that.route.completed = true;
                    that.route.completedDate = new Date().toDateString().split(' ').slice(1).join(' ');
                    that.ormService.saveAndFireChangedEvent(that.route);
                });
            }
        }, { cssClass: this.app.activeNarrative });
        modal.present();
        // let that = this;
        // let title = 'a_alert_congrats';
        // let message = 'a_alert_congrats_msg';
        // if (this.route.isNarrativeEnabled()) {
        //   title = this.route.getNarrativeString(title);
        //   message = this.route.getNarrativeString(message);
        // }
        // let modal = this.modalCtrl.create(MCMIconModal,  {
        //     title: title,
        //     message: message,
        //     modalType: MCMModalType.solved,
        //     param: {TITLE: this.route.title},
        //     narrativeEnabled: this.route.isNarrativeEnabled(),
        //     narrative: this.app.activeNarrative,
        //     buttons: [
        //         {
        //             title: 'a_alert_close',
        //             callback: function(){
        //                 modal.dismiss().then(() => {
        //                     that.route.completed = true;
        //                     that.route.completedDate = new Date().toDateString().split(' ').slice(1).join(' ');
        //                     that.ormService.saveAndFireChangedEvent(that.route);
        //                 });
        //             }
        //         }
        //     ]}, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
        // modal.present();
    };
    TasksMap.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, sessionInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('TasksMap ionViewWillEnter()');
                        console.log(this.navCtrl);
                        this.routeId = this.navParams.get('routeId');
                        console.log(this.routeId);
                        _a = this;
                        return [4 /*yield*/, this.ormService.findRouteById(this.routeId)];
                    case 1:
                        _a.route = _c.sent();
                        this.gamificationIsDisabled = this.route.isGamificationDisabled();
                        _b = this;
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 2:
                        _b.user = _c.sent();
                        this.score = this.route.getScoreForUser(this.user);
                        sessionInfo = this.chatAndSessionService.getSessionInfo();
                        this.updateSession(sessionInfo);
                        this.events.publish('narrativeChange', this.route.getNarrativeName());
                        this.updateIcons();
                        return [4 /*yield*/, this.loadMap()];
                    case 3:
                        _c.sent();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // adding markers immediately after map initialization caused marker cluster problems -> use timeout
                                    return [4 /*yield*/, this.initializeMap()];
                                    case 1:
                                        // adding markers immediately after map initialization caused marker cluster problems -> use timeout
                                        _a.sent();
                                        this.spinner.hide();
                                        if (this.isTrailCompleted() && !this.route.completed) {
                                            this.showTrailCompletedAlert();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 100);
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMap.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var details, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('TasksMap ionViewDidEnter()');
                        if (!(this.sessionInfo != null)) return [3 /*break*/, 7];
                        details = JSON.stringify({});
                        this.chatAndSessionService.addUserEvent("event_trail_opened", details, "0");
                        if (!(this.sessionInfo.started === false)) return [3 /*break*/, 7];
                        this.showAllTasks();
                        this.resetTasks();
                        if (!(this.sessionInfo.sessionUser.assigned_task_id != 0)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, this.route.getTasks()];
                    case 1:
                        _a.taskList = _c.sent();
                        return [4 /*yield*/, this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id)];
                    case 2:
                        _c.sent();
                        if (this.route.isNarrativeEnabled()) {
                            this.showIntroModal().then(function () {
                                _this.state.showIntroModal = false;
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.route.isNarrativeEnabled()) {
                            this.showIntroModal().then(function () {
                                _this.state.showIntroModal = false;
                                _this.showGuidedTrailModalWithDelay(500);
                            });
                        }
                        _c.label = 4;
                    case 4:
                        this.saveMapStateToLocalStorage();
                        this.sessionInfo.started = true;
                        return [4 /*yield*/, this.chatAndSessionService.updateSession(this.sessionInfo)];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, this.redrawMarker()];
                    case 6:
                        _c.sent();
                        return [2 /*return*/];
                    case 7:
                        if (!this.navParams.data.tasksMapState) return [3 /*break*/, 8];
                        console.log("3");
                        this.state = this.navParams.data.tasksMapState;
                        if (this.taskToSkip || (this.state.selectedStartTask && (this.score.getTasksSolved().indexOf(this.state.selectedTask.id) > -1 || this.score.getTasksSolvedLow().indexOf(this.state.selectedTask.id) > -1))) {
                            this.goToNextTask(this.state.selectedTask, true);
                        }
                        return [3 /*break*/, 10];
                    case 8:
                        _b = this;
                        return [4 /*yield*/, this.getMapStateFromLocalStorage()];
                    case 9:
                        _b.state = _c.sent();
                        console.log(this.state);
                        if (this.taskToSkip) {
                            this.goToNextTask(this.taskToSkip, true);
                            this.taskToSkip = null;
                        }
                        if (!this.state) {
                            // attach state to navParams so that state is restored when moving back in history (from task detail view)
                            this.state = this.navParams.data.tasksMapState = {
                                selectedTask: this.navParams.get("selectedTask"),
                                isShowingAllTasks: false,
                                visibleTasks: {},
                                skippedTaskIds: [],
                                selectedStartTask: false,
                                showIntroModal: false,
                                showGuidedTrailModal: false // GuidedTrail Modal will be displayed on first start anyway
                            };
                            this.state.isShowingAllTasks = !this.state.selectedTask;
                            if (this.state.selectedTask) {
                                this.state.visibleTasks[this.state.selectedTask.position] = true;
                            }
                            else if (this.route.isNarrativeEnabled()) {
                                this.showIntroModal().then(function () {
                                    _this.showGuidedTrailModalWithDelay(500);
                                });
                            }
                            else {
                                this.showGuidedTrailModalWithDelay(500);
                            }
                        }
                        else {
                            if (this.state.showIntroModal && this.route.isNarrativeEnabled()) {
                                this.showIntroModal().then(function () {
                                    var that = _this;
                                    that.state.showIntroModal = false;
                                    _this.saveMapStateToLocalStorage();
                                    if (_this.state.showGuidedTrailModal) {
                                        _this.showGuidedTrailModalWithDelay(500);
                                    }
                                });
                            }
                            else if (this.state.showGuidedTrailModal) {
                                this.showGuidedTrailModalWithDelay(500);
                            }
                        }
                        _c.label = 10;
                    case 10: return [4 /*yield*/, this.redrawMarker()];
                    case 11:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMap.prototype.showGuidedTrailModalWithDelay = function (delay) {
        var that = this;
        this.state.showGuidedTrailModal = false;
        setTimeout(function () {
            var _this = this;
            that.modalsService.showDialog('a_guided_trail_title', 'a_guided_trail', 'no', function () {
            }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    that.selectStartPoint();
                    that.state.selectedStartTask = true;
                    return [2 /*return*/];
                });
            }); }, that.app.activeNarrative);
        }, delay);
    };
    TasksMap.prototype.forceStartFromTask = function (taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedTask;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!this.taskList || this.taskList.length === 0)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.route.getTasks()];
                    case 1:
                        _a.taskList = _b.sent();
                        _b.label = 2;
                    case 2:
                        console.log('Force Start From Task', this.taskList);
                        selectedTask = this.taskList.filter(function (x) { return x.id == taskId; }).pop();
                        this.state.selectedTask = selectedTask;
                        console.debug("forceStartFromTask");
                        this.state.visibleTasks = {};
                        this.state.visibleTasks[selectedTask.position] = true;
                        this.state.isShowingAllTasks = false;
                        this.state.showGuidedTrailModal = false;
                        this.centerSelectedTask();
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMap.prototype.ngOnInit = function () {
        // this.sessionSubscription = this.chatAndSessionService.getSubject().subscribe(this.updateSession);
    };
    TasksMap.prototype.ngOnDestroy = function () {
        if (this.sessionSubscription) {
            this.sessionSubscription.unsubscribe();
            this.sessionSubscription = null;
        }
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
        // Unsubscribe events:
        this.events.unsubscribe('user:kicked');
        this.events.unsubscribe('session:updated');
        this.events.unsubscribe('user:assigned_task');
        this.events.publish('narrativeChange', 'default');
    };
    TasksMap.prototype.initializeMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.currentScore = this.score.score;
                // await this.redrawMarker();
                this.gpsService.isLocationOn();
                // This should fix the gray tiles and missing marker issue on android
                if (this.map != null) {
                    this.map.invalidateSize();
                }
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.updateSession = function (sessionInfo) {
        var _this = this;
        console.log(this.routeId);
        console.log(sessionInfo);
        if (sessionInfo && sessionInfo.session) {
            if (this.routeId != sessionInfo.session.trail_id) {
                console.log("active session belongs to different trail");
                this.sessionInfo = null;
            }
            else {
                this.sessionInfo = sessionInfo;
                console.log('active session: ' + sessionInfo.session.code);
                if (this.sessionTimeSubscription) {
                    this.sessionTimeSubscription.unsubscribe();
                }
                this.sessionTime();
                this.sessionTimeSubscription = this.sessionTimeTimer.subscribe(function (tick) {
                    _this.sessionTime();
                });
            }
        }
        else {
            console.log('no active session');
            this.sessionInfo = null;
        }
    };
    TasksMap.prototype.getMapStateFromLocalStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mapState, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.stateKey)];
                    case 1:
                        mapState = _a.sent();
                        if (mapState && mapState[this.routeId]) {
                            state = mapState[this.routeId];
                            console.log(this.navParams);
                            state.selectedTask = this.navParams.get("selectedTask");
                            return [2 /*return*/, state];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    TasksMap.prototype.saveMapStateToLocalStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mapState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.stateKey)];
                    case 1:
                        mapState = _a.sent();
                        if (!mapState) {
                            mapState = {};
                        }
                        mapState[this.routeId] = this.state;
                        return [2 /*return*/, this.storage.set(this.stateKey, mapState)];
                }
            });
        });
    };
    TasksMap.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.saveMapStateToLocalStorage();
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.assignedTask = function () {
        if (this.sessionInfo == null) {
            return false;
        }
        else {
            return this.sessionInfo.session.assign_tasks;
        }
    };
    TasksMap.prototype.redrawMarker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _i, _a, layer, markerGroup, _b, geoJSON, pathGroup, _loop_1, this_1, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.redrawingMarkers) {
                            return [2 /*return*/];
                        }
                        this.redrawingMarkers = true;
                        if (!this.map) {
                            return [2 /*return*/];
                        }
                        if (this.markerGroup != null) {
                            console.warn('removing markerGroup');
                            this.map.removeLayer(this.markerGroup);
                            this.markerGroup = null;
                        }
                        if (this.pathGroup != null) {
                            console.warn('removing pathGroup');
                            for (_i = 0, _a = this.pathGroup; _i < _a.length; _i++) {
                                layer = _a[_i];
                                this.map.removeLayer(layer);
                            }
                            this.pathGroup = null;
                        }
                        markerGroup = __WEBPACK_IMPORTED_MODULE_2_leaflet__["markerClusterGroup"]({
                            maxClusterRadius: 30,
                            iconCreateFunction: function (cluster) {
                                var childCount = cluster.getChildCount();
                                var markers = cluster.getAllChildMarkers();
                                var className = 'marker-cluster marker-cluster-';
                                if (childCount < 10) {
                                    className += 'small';
                                }
                                else if (childCount < 100) {
                                    className += 'medium';
                                }
                                else {
                                    className += 'large';
                                }
                                var colorOccurrences = {};
                                var numberOfColoredMarkers = 0;
                                markers.map(function (marker) {
                                    if (marker.options.icon.clusterColor) {
                                        numberOfColoredMarkers++;
                                        if (colorOccurrences[marker.options.icon.clusterColor]) {
                                            colorOccurrences[marker.options.icon.clusterColor] += 1;
                                        }
                                        else {
                                            colorOccurrences[marker.options.icon.clusterColor] = 1;
                                        }
                                    }
                                });
                                var style = '';
                                var img = '';
                                var colors = Object.keys(colorOccurrences);
                                if (colors.length == 1) {
                                    style = "background-color: " + colors[0];
                                }
                                else {
                                    var stops_1 = '';
                                    var alreadyFilledPercentage_1 = 0;
                                    colors.map(function (color) {
                                        var n = colorOccurrences[color];
                                        var percentage = Math.round(n / numberOfColoredMarkers * 100);
                                        if (alreadyFilledPercentage_1 > 0) {
                                            stops_1 += ', ';
                                        }
                                        alreadyFilledPercentage_1 += percentage;
                                        stops_1 += color + " 0 " + alreadyFilledPercentage_1 + "%";
                                    });
                                    var gradient = new ConicGradient({
                                        stops: stops_1,
                                        size: 24
                                    });
                                    img = "<img src=\"" + gradient.png + "\"></img>";
                                }
                                return new __WEBPACK_IMPORTED_MODULE_2_leaflet__["DivIcon"]({
                                    html: "<div style=\"" + style + "\">" + img + "<span>" + childCount + "</span></div>",
                                    className: className,
                                    iconSize: new __WEBPACK_IMPORTED_MODULE_2_leaflet__["Point"](40, 40)
                                });
                            },
                        });
                        _b = this;
                        return [4 /*yield*/, this.route.getTasks()];
                    case 1:
                        _b.taskList = _c.sent();
                        geoJSON = this.route.getPathGeoJson();
                        pathGroup = [];
                        _loop_1 = function (i) {
                            var task = this_1.taskList[i];
                            if (!this_1.state.isShowingAllTasks && !this_1.state.visibleTasks[task.position]) {
                                return "continue";
                            }
                            var icon = this_1.taskOpenIcon;
                            var removeTaskFromSkippedArray = true;
                            if (this_1.score.getTasksSaved().indexOf(task.id) > -1) {
                                icon = this_1.taskSavedIcon;
                            }
                            else if (this_1.score.getTasksSolved().indexOf(task.id) > -1) {
                                icon = this_1.taskDonePerfectIcon;
                            }
                            else if (this_1.score.getTasksSolvedLow().indexOf(task.id) > -1) {
                                icon = this_1.taskDoneIcon;
                            }
                            else if (this_1.score.getTasksFailed().indexOf(task.id) > -1) {
                                icon = this_1.taskFailedIcon;
                            }
                            else if (this_1.state.skippedTaskIds.indexOf(task.id) > -1) {
                                icon = this_1.taskSkippedIcon;
                                removeTaskFromSkippedArray = false;
                            }
                            if (removeTaskFromSkippedArray && this_1.state.skippedTaskIds.indexOf(task.id) > -1) {
                                // remove task from skipped array
                                this_1.state.skippedTaskIds.splice(this_1.state.skippedTaskIds.indexOf(task.id), 1);
                            }
                            if (geoJSON) {
                                var taskGeoJsons = geoJSON.data.features.filter(function (data) {
                                    //don't match types because some are string and some are numbers for some reason
                                    return data.properties.task_id == task.id;
                                });
                                console.log("GEO JSON", taskGeoJsons, task);
                                if (taskGeoJsons) {
                                    for (var _i = 0, taskGeoJsons_1 = taskGeoJsons; _i < taskGeoJsons_1.length; _i++) {
                                        var taskGeoJson = taskGeoJsons_1[_i];
                                        // for (let coordinateArray of taskGeoJson.geometry.coordinates) {
                                        //     coordinateArray = coordinateArray.reverse();
                                        // }
                                        var GeoJsonLayer = __WEBPACK_IMPORTED_MODULE_2_leaflet__["geoJSON"](taskGeoJson, {
                                            style: function (feature) {
                                                return { color: feature.properties.color, dashArray: "10 10" };
                                            }
                                        });
                                        // let polyline = new L.Polyline(taskGeoJson.geometry.coordinates, {
                                        //     color: taskGeoJson.properties.color,
                                        //     dashArray: "10 10"
                                        // });
                                        this_1.map.addLayer(GeoJsonLayer);
                                        pathGroup.push(GeoJsonLayer);
                                    }
                                }
                            }
                            markerGroup.addLayer(__WEBPACK_IMPORTED_MODULE_2_leaflet__["marker"]([task.lat, task.lon], { icon: icon }).on('click', function () {
                                if (_this.state.selectedTask == task) {
                                    _this.gototask(task.id, task.title);
                                }
                                else {
                                    // Add event of user entering trail when session active
                                    if (_this.sessionInfo != null) {
                                        var details = JSON.stringify({});
                                        _this.chatAndSessionService.addUserEvent("event_task_previewed", details, task.id.toString());
                                    }
                                    _this.state.selectedTask = task;
                                    _this.map.panTo([task.lat, task.lon]);
                                }
                            }));
                        };
                        this_1 = this;
                        for (i = 0; i < this.taskList.length; i++) {
                            _loop_1(i);
                        }
                        // this.map.addLayer(pathGroup);
                        this.map.addLayer(markerGroup);
                        console.log("MAP AFTER UPDATE", this.map);
                        this.markerGroup = markerGroup;
                        this.pathGroup = pathGroup;
                        this.redrawingMarkers = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMap.prototype.loadMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var mapquestUrl, subDomains, map, zoomLevels, offlineLayer, tiles_1, resolveOfflineURLsAsTiles_1, that_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mapquestUrl = this.route.getTilesMap(this.app.activeNarrative);
                        subDomains = this.route.getTilesServerSubdomains(this.app.activeNarrative);
                        if (!(this.map == null)) return [3 /*break*/, 2];
                        this.map = __WEBPACK_IMPORTED_MODULE_2_leaflet__["map"]('tasks-map', {
                            attributionControl: false,
                            zoom: 18,
                            trackResize: false,
                            maxBounds: this.route.getBoundingBoxLatLng()
                        });
                        // TODO: Replace leaflet-mapbox-gl Bridge with native MapboxGl JS implementation
                        // (<any>L).mapboxGL({
                        //     accessToken: "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww",
                        //     style: mapquestUrl,
                        //     updateInterval: 0,
                        // }).addTo(this.map);
                        __WEBPACK_IMPORTED_MODULE_2_leaflet__["control"].attribution({ position: 'bottomleft', prefix: 'Leaflet' }).addTo(this.map);
                        this.map.fitBounds(this.route.getViewBoundingBoxLatLng());
                        // this.map.setZoom(18);
                        this.map.on('click', function (e) {
                            //check if details open and reset content. for now just reset content
                            // this.routeDetails = null;
                            _this.state.selectedTask = null;
                        });
                        map = this.map;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */].initialize()];
                    case 1:
                        _a.sent();
                        zoomLevels = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].calculateZoom(this.route.getViewBoundingBoxLatLng());
                        offlineLayer = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].offline(mapquestUrl, __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */], {
                            attribution: '&copy; mapbox.com',
                            subdomains: subDomains,
                            minZoom: zoomLevels.min_zoom,
                            maxZoom: zoomLevels.max_zoom,
                            tileSize: 256,
                            crossOrigin: true,
                            detectRetina: true,
                            bounds: this.route.getBoundingBoxLatLng()
                        });
                        this.gpsService.getCurrentPosition()
                            .then(function (resp) {
                            if (resp && resp.coords) {
                                console.debug('found you');
                                // let markerGroup = L.featureGroup();
                                _this.userMarker = __WEBPACK_IMPORTED_MODULE_2_leaflet__["marker"]([resp.coords.latitude, resp.coords.longitude], { icon: _this.userPositionIcon }).on('click', function () {
                                    // alert('Marker clicked');
                                });
                                _this.userMarker.setRotationOrigin('center center');
                                _this.userMarker.addTo(_this.map);
                                if (_this.watchSubscription) {
                                    _this.watchSubscription.unsubscribe();
                                }
                                _this.watchSubscription = _this.gpsService.watchPosition().subscribe(function (resp) {
                                    if (resp && resp.coords) {
                                        var lanlng = new __WEBPACK_IMPORTED_MODULE_2_leaflet__["LatLng"](resp.coords.latitude, resp.coords.longitude);
                                        var bBox = _this.map.getBounds();
                                        if (bBox.contains(lanlng)) {
                                            // User entered visible map bounding box -> Change Icon
                                            if (!_this.isUserInsideMap) {
                                                _this.userMarker.setIcon(_this.userPositionIcon);
                                            }
                                            _this.userMarker.setLatLng(lanlng);
                                            //Rotate the user marker
                                            if (_this.prevPos != null) {
                                                var angle = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].getAngle(_this.prevPos, resp.coords);
                                                _this.userMarker.setRotationAngle(angle);
                                            }
                                            _this.isUserInsideMap = true;
                                        }
                                        else {
                                            // User left visible map bounding box -> Change icon to arrow
                                            if (_this.isUserInsideMap) {
                                                _this.userMarker.setIcon(_this.userPositionArrow);
                                            }
                                            _this.updateUserLocationArrow(lanlng);
                                            _this.isUserInsideMap = false;
                                        }
                                        _this.prevPos = resp.coords;
                                    }
                                });
                                // Add map listener events
                                _this.map.on('moveend', function (e) {
                                    if (!_this.isUserInsideMap) {
                                        _this.updateUserLocationArrow(new __WEBPACK_IMPORTED_MODULE_2_leaflet__["LatLng"](_this.prevPos.latitude, _this.prevPos.longitude));
                                    }
                                });
                            }
                        })
                            .catch(function (error) {
                            console.error("Location error: " + JSON.stringify(error));
                        });
                        tiles_1 = this.ormService.getTileURLsAsObject(this.route);
                        resolveOfflineURLsAsTiles_1 = !this.route.isNarrativeEnabled();
                        that_1 = this;
                        offlineLayer.getTileUrl = function (coords) {
                            var url = __WEBPACK_IMPORTED_MODULE_2_leaflet__["TileLayer"].prototype.getTileUrl.call(this, coords);
                            var dbStorageKey = this._getStorageKey(url);
                            if (tiles_1[dbStorageKey]) {
                                return Promise.resolve(that_1.imagesService.getOfflineURL(dbStorageKey, false, resolveOfflineURLsAsTiles_1));
                            }
                            return Promise.resolve(url);
                        };
                        offlineLayer.addTo(map);
                        this.map.fitBounds(this.route.getViewBoundingBoxLatLng());
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
                        //centers map in the selected task
                        if (this.state.selectedTask != null) {
                            this.centerSelectedTask();
                            /* todo: show only selectedTask */
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /*
    @description: Shows direction arrow pointing towards users geolocation if he isn't inside the current boundaries
    @param userLatLng array - [lat, lng]
     */
    TasksMap.prototype.updateUserLocationArrow = function (userLatLng) {
        if (!userLatLng) {
            return;
        }
        var bBox = this.map.getBounds();
        var alpha = __WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].bearing(this.map.getCenter(), userLatLng);
        var beta = __WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].bearing(this.map.getCenter(), bBox.getNorthEast());
        var dx2 = (__WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].length([bBox.getNorthWest(), bBox.getNorthEast()])) / 2;
        var dy2 = (__WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].length([bBox.getSouthWest(), bBox.getNorthWest()])) / 2;
        var length = 0;
        // fix negative alpha values
        if (alpha < 0) {
            alpha = alpha + 360;
        }
        // Calculate length to bounding box in direction of own position
        if ((alpha >= beta && alpha <= (180 - beta)) ||
            (alpha >= (180 + beta) && alpha <= (360 - beta))) {
            length = Math.abs(dx2 / Math.sin(alpha * (Math.PI / 180)));
        }
        else {
            length = Math.abs(dy2 / Math.cos(alpha * (Math.PI / 180)));
        }
        var closestPoint = __WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].destination(this.map.getCenter(), alpha, 0.90 * length);
        this.userMarker.setLatLng(closestPoint);
        this.userMarker.setRotationAngle(alpha);
    };
    TasksMap.prototype.centerSelectedTask = function () {
        this.map.panTo([this.state.selectedTask.lat, this.state.selectedTask.lon]);
    };
    TasksMap.prototype.goToNextTaskById = function (taskId, skip) {
        var _this = this;
        this.taskList.forEach(function (task) {
            if (task.id == taskId) {
                _this.goToNextTask(task, skip);
                return;
            }
        });
    };
    TasksMap.prototype.goToNextTask = function (task, skip) {
        //  setTimeout(async () => {
        if (skip) {
            this.state.skippedTaskIds.push(task.id);
        }
        console.debug("goToNextTask");
        // task.position == index + 1
        this.state.selectedTask = this.taskList[task.position % this.taskList.length];
        this.state.visibleTasks[this.state.selectedTask.position] = true;
        //this.redrawMarker();
        this.centerSelectedTask();
        this.saveMapStateToLocalStorage();
        // }, 200);
    };
    TasksMap.prototype.selectStartPoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                that = this;
                console.log('Active Narrative is: ' + this.app.activeNarrative);
                return [2 /*return*/, this.modalsService.presentTaskListModal(this.route, this.score, this.state, this.app.activeNarrative, this.navCtrl, function (selectedTask) {
                        console.debug("back in tasksMap");
                        that.state.selectedTask = selectedTask;
                        that.state.visibleTasks = {};
                        that.state.visibleTasks[selectedTask.position] = true;
                        that.state.isShowingAllTasks = false;
                        that.centerSelectedTask();
                        that.redrawMarker();
                        if (that.sessionInfo != null) {
                            var details = JSON.stringify({ title: that.state.selectedTask.title });
                            that.chatAndSessionService.addUserEvent("event_trail_start_from_task", details, that.state.selectedTask.id.toString());
                        }
                    })];
            });
        });
    };
    TasksMap.prototype.showAllTasks = function () {
        this.state.isShowingAllTasks = true;
        this.redrawMarker();
    };
    TasksMap.prototype.displayResetTasksModal = function () {
        var _this = this;
        this.modalsService.showDialog('a_route_detail_settings_resetTasks', 'a_route_detail_settings_resetTasks_msg', 'no', function () { }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resetTasks()];
                    case 1:
                        _a.sent();
                        this.showGuidedTrailModalWithDelay(50);
                        return [2 /*return*/];
                }
            });
        }); }, this.app.activeNarrative);
    };
    TasksMap.prototype.resetTasks = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.ormService.deleteUserScore(_this.score).then(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.score = new __WEBPACK_IMPORTED_MODULE_8__entity_Score__["a" /* Score */]();
                            this.state = this.navParams.data.tasksMapState = {
                                selectedTask: null,
                                isShowingAllTasks: true,
                                visibleTasks: {},
                                skippedTaskIds: [],
                                selectedStartTask: false,
                                showIntroModal: true,
                                showGuidedTrailModal: true
                            };
                            if (!!this.taskList) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, this.route.getTasks()];
                        case 1:
                            _a.taskList = _b.sent();
                            _b.label = 2;
                        case 2:
                            if (!(this.sessionInfo != null && this.sessionInfo.sessionUser.assigned_task_id != 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            this.route.completed = false;
                            this.route.completedDate = null;
                            return [4 /*yield*/, this.saveMapStateToLocalStorage()];
                        case 5:
                            _b.sent();
                            return [4 /*yield*/, this.ormService.saveAndFireChangedEvent(this.route)];
                        case 6:
                            _b.sent();
                            return [4 /*yield*/, this.redrawMarker()];
                        case 7:
                            _b.sent();
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    TasksMap.prototype.sessionFinished = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.modalsService.showDialog('a_private_session_quit', 'a_private_session_quit_text', 'no', function () { }, 'yes', function () {
                    var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], {
                        session: _this.sessionInfo.session,
                        score: _this.score,
                        tasks: _this.taskList,
                        narrative: _this.app.activeNarrative
                    }, { cssClass: _this.app.activeNarrative });
                    modal.present();
                    if (_this.sessionInfo != null) {
                        var details = JSON.stringify({});
                        _this.chatAndSessionService.addUserEvent("event_session_leave", details, "0");
                    }
                    _this.chatAndSessionService.exitActiveSession();
                    if (_this.sessionTimeSubscription) {
                        _this.sessionTimeSubscription.unsubscribe();
                    }
                }, this.app.activeNarrative);
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.sessionKicked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that, modal;
            return __generator(this, function (_a) {
                that = this;
                modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_18__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                    title: 'a_private_session_kicked',
                    message: 'a_private_session_kicked_text',
                    modalType: __WEBPACK_IMPORTED_MODULE_17__app_app_component__["a" /* MCMModalType */].hint,
                    type: 'text',
                    gamificationEnabled: false,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: [
                        {
                            title: 'a_g_ok',
                            callback: function () {
                                modal.dismiss();
                                var finishedModal = that.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], {
                                    session: that.sessionInfo.session,
                                    score: that.score,
                                    tasks: that.taskList,
                                    narrative: this.app.activeNarrative
                                }, {
                                    showBackdrop: true,
                                    enableBackdropDismiss: false
                                });
                                if (that.sessionInfo != null) {
                                    that.chatAndSessionService.exitActiveSession();
                                }
                                if (that.sessionTimeSubscription) {
                                    that.sessionTimeSubscription.unsubscribe();
                                }
                                finishedModal.present();
                            }
                        },
                    ]
                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                modal.present();
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.gototask = function (taskId, taskName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var that;
            return __generator(this, function (_a) {
                if (this.taskBlocked) {
                    console.log('session in preparation.');
                    return [2 /*return*/];
                }
                console.debug('taskId', taskId);
                that = this;
                this.navCtrl.push('TaskDetail', { taskId: taskId, headerTitle: taskName, routeId: this.routeId, goToNextTaskById: function (taskIdToSkip, skip) {
                        that.goToNextTaskById(taskIdToSkip, skip);
                    } }, {}, function () {
                    // necessary because of bug which does not update URL
                    _this.deepLinker.navChange('forward');
                });
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.navigateToChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var details;
            return __generator(this, function (_a) {
                console.debug('showChat');
                if (this.sessionInfo != null) {
                    details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_trail_chat_open", details, "0");
                }
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_22__chat_chat__["a" /* ChatPage */], {
                    val: 'chatseite',
                    headerTitle: this.sessionInfo.session.name
                });
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.sessionTime = function () {
        if (this.sessionInfo == null) {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            return;
        }
        var session = this.sessionInfo.session;
        var currentTimeUnix = __WEBPACK_IMPORTED_MODULE_24_moment__().unix();
        var startTimeInUnix = __WEBPACK_IMPORTED_MODULE_24_moment__(session.starts_at).unix();
        var endTimeInUnix = __WEBPACK_IMPORTED_MODULE_24_moment__(session.ends_at).unix();
        var countdown = startTimeInUnix - currentTimeUnix;
        var countdownInMin = Math.floor(countdown / 60);
        var timerInMin = Math.floor((endTimeInUnix - currentTimeUnix) / 60);
        if (currentTimeUnix > (startTimeInUnix - 3600) && currentTimeUnix < endTimeInUnix) {
            this.startInterval = true;
            if (currentTimeUnix < startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownBeforeSession = true;
                this.countdownOrTimerForSession = countdownInMin;
                this.taskBlocked = true;
            }
            if (currentTimeUnix > startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownOrTimerForSession = timerInMin;
                this.countdownBeforeSession = false;
                this.taskBlocked = false;
            }
        }
        else {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            this.showSessionEnds = true;
            this.taskBlocked = false;
            // Leave session
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], {
                session: this.sessionInfo.session,
                score: this.score,
                tasks: this.taskList,
                narrative: this.app.activeNarrative
            }, { cssClass: this.app.activeNarrative });
            modal.present();
            return;
        }
    };
    TasksMap.prototype.showIntroModal = function () {
        var _this = this;
        return new Promise(function (success) {
            var title = 'a_alert_welcome';
            var message = 'a_alert_welcome_msg';
            if (_this.route.isNarrativeEnabled()) {
                title = _this.route.getNarrativeString(title);
                message = _this.route.getNarrativeString(message);
            }
            var introModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_19__modals_MCMIntroModal_MCMIntroModal__["a" /* MCMIntroModal */], {
                title: title,
                message: message,
                modalType: __WEBPACK_IMPORTED_MODULE_17__app_app_component__["a" /* MCMModalType */].hint,
                narrative: _this.app.activeNarrative,
                routeTitle: _this.route.title,
                buttons: [
                    {
                        title: 'a_alert_close',
                        callback: function () {
                            introModal.dismiss();
                            success();
                        }
                    }
                ]
            }, { cssClass: _this.app.activeNarrative });
            introModal.present();
        });
    };
    TasksMap.prototype.updateIcons = function () {
        switch (this.app.activeNarrative) {
            case 'pirates':
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/mapposition.png", iconSize: [100, 100], iconAnchor: [50, 50], className: 'marker userPosition' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.userPositionArrow = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/userDirection.png", iconSize: [36, 36], iconAnchor: [18, 18], className: 'marker userArrow' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.taskOpenIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-open.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskSkippedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-skipped.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskSavedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-saved.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskDoneIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-good.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskDonePerfectIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-perfect.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskFailedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-failed.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskOpenIcon.clusterColor = '#AA2000';
                this.taskSkippedIcon.clusterColor = '#b2b2b2';
                this.taskSavedIcon.clusterColor = '#6E38B9';
                this.taskDoneIcon.clusterColor = '#FFC033';
                this.taskDonePerfectIcon.clusterColor = '#33CC00';
                this.taskFailedIcon.clusterColor = '#333333';
                break;
            default:
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/mapposition.png", iconSize: [100, 100], iconAnchor: [50, 50], className: 'marker userPosition' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.userPositionArrow = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/userDirection.png", iconSize: [36, 36], iconAnchor: [18, 18], className: 'marker userArrow' });
                this.taskOpenIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-open.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskSkippedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-skipped.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskSavedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-saved.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskDoneIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-good.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskDonePerfectIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-perfect.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskFailedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-failed.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskOpenIcon.clusterColor = '#036D99';
                this.taskSkippedIcon.clusterColor = '#B2B2B2';
                this.taskSavedIcon.clusterColor = '#6E38B9';
                this.taskDoneIcon.clusterColor = '#F3B100';
                this.taskDonePerfectIcon.clusterColor = '#4CAF50';
                this.taskFailedIcon.clusterColor = '#E62B25';
                break;
        }
    };
    TasksMap.UPDATE_SESSION_TIME_INTERVAL_IN_SECS = 15;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tasks-map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TasksMap.prototype, "mapContainer", void 0);
    TasksMap = TasksMap_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tasks-map',template:/*ion-inline-start:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/home/tabs/TasksMap/TasksMap.html"*/'<mcm-header></mcm-header>\n<ion-content class="has-header map tasks">\n    <div ion-fixed>\n        <div id="tasks-map" class="map-view"></div>\n\n        <div id="ranking" class="detail-box" *ngIf="(!gamificationIsDisabled && currentScore && currentScore > 0) || (sessionInfo != null && this.showCountdownOrTimer)">\n            <ion-grid class="table">\n                <ion-row class="session" *ngIf="sessionInfo != null && this.showCountdownOrTimer">\n                    <ion-col col class="countdown">\n                        <img class="icon countdown" src="./assets/icons/countdown.svg"/>\n                    </ion-col>\n                    <ion-col>\n                        <ion-label *ngIf="this.countdownBeforeSession">{{\'a_private_session_countdown\' | translate}}</ion-label>\n                        <ion-label *ngIf="this.countdownBeforeSession == false">{{\'a_private_session_timer\' | translate}}</ion-label>\n                        <ion-label *ngIf="this.showSessionEnds">{{\'a_private_session_ends\' | translate}}</ion-label>\n                    </ion-col>\n                    <ion-col>\n                        <ion-label>{{ countdownOrTimerForSession }} Min</ion-label>\n                    </ion-col>\n                </ion-row>\n                <ion-row class="current" *ngIf="this.route.isAnswerFeedbackEnabled() && !gamificationIsDisabled && currentScore && currentScore > 0 && (sessionInfo==null || !sessionInfo.session.has_leaderboard)">\n                    <ion-col>\n                        <ion-label *ngIf="!sessionInfo">{{user.name}}</ion-label>\n                        <ion-label *ngIf="sessionInfo">{{sessionInfo.sessionUser.team_name}}</ion-label>\n                    </ion-col>\n                    <ion-col>\n                        <ion-label class="score">{{currentScore}}</ion-label>\n                    </ion-col>\n                </ion-row>\n                <div *ngIf="sessionInfo !=null && sessionInfo.session.has_leaderboard && this.route.isAnswerFeedbackEnabled()">\n                    <ion-row [ngClass]="{\'self\' : user.self}"\n                             *ngFor="let user of chatAndSessionService.getLeaderboard(); let i = index">\n                        <ion-col class="chart">\n                            <img class="icon arrow" src="./assets/icons/up.svg"\n                                 *ngIf="chatAndSessionService.getLeaderboard().length > 1 && i == 0 && !user.self"/>\n                            <img class="icon arrow" src="./assets/icons/down.svg"\n                                 *ngIf="chatAndSessionService.getLeaderboard().length > 1 && i != 0 && !user.self"/>\n                        </ion-col>\n\n                        <ion-col>\n                            <ion-label>{{user.team_name}}</ion-label>\n                        </ion-col>\n                        <ion-col>\n                            <ion-label class="score">{{user.score}}</ion-label>\n                        </ion-col>\n                    </ion-row>\n                </div>\n            </ion-grid>\n        </div>\n\n        <div id="details" class="detail-box" [ngClass]="{\'open\': state.selectedTask}">\n\n            <ion-fab right top>\n                <button ion-fab color="primary" (click)="fabListOpen = !fabListOpen"><ion-icon name="more"></ion-icon></button>\n                <ion-fab-list side="top">\n                    <button [hidden]="sessionInfo != null" color="danger" ion-fab (click)="displayResetTasksModal()" *ngIf="sessionInfo == null">\n                        <ion-icon name="icon-restart"></ion-icon>\n                    </button>\n                    <button color="primary" [hidden]="!state.isShowingAllTasks || assignedTask()" ion-fab (click)="selectStartPoint()">\n                        <ion-icon name="icon-starting-point"></ion-icon>\n                    </button>\n                    <button color="danger" [hidden]="state.isShowingAllTasks || assignedTask()" ion-fab (click)="showAllTasks()">\n                        <ion-icon name="icon-visibility"></ion-icon>\n                    </button>\n                    <button color="danger" ion-fab (click)="sessionFinished()" *ngIf="sessionInfo != null">\n                        <ion-icon name="icon-exit"></ion-icon>\n                    </button>\n                    <button ion-fab color="primary" (click)="navigateToChat()" *ngIf="sessionInfo != null">\n                        <ion-icon name="icon-chat"></ion-icon>\n                    </button>\n                    <span [ngClass]="{\'badge-no-show\': chatAndSessionService.getNewMsgNumber() == 0}" class="badge-top-right" *ngIf="sessionInfo != null && fabListOpen">{{chatAndSessionService.getNewMsgNumber()}}</span>\n                </ion-fab-list>\n                <span [ngClass]="{\'badge-no-show\': chatAndSessionService.getNewMsgNumber() == 0}" class="badge-top-right" *ngIf="sessionInfo != null && !fabListOpen">{{chatAndSessionService.getNewMsgNumber()}}</span>\n            </ion-fab>\n\n            <div tappable class="image-container" *ngIf="state.selectedTask" (click)="gototask(state.selectedTask.id, state.selectedTask.title)">\n                <div class="cover">\n                    <img class="thumb" [src]="state.selectedTask.getImageURL()" />\n                </div>\n            </div>\n            <div class="text-container" *ngIf="state.selectedTask">\n                <div class="segmented-box">\n                    <div class="title segement">\n                        <span tappable (click)="gototask(state.selectedTask.id, state.selectedTask.title)">#{{state.selectedTask.position}}</span>\n                        <h2 tappable (click)="gototask(state.selectedTask.id, state.selectedTask.title)">{{state.selectedTask.title}}</h2>\n                    </div>\n                </div>\n                <div class="segmented-box bottom">\n                    <!--TODO FUTUTRE GAMIFICATION INTEGRATION-->\n                    <!--<span class="segement">??? {{ "a_g_max_points" | translate }}</span>-->\n                    <div class="segement buttons">\n                        <div class="text-right">\n                            <button ion-button small round (click)="gototask(state.selectedTask.id, state.selectedTask.title)">{{ \'a_alert_show_task\' | translate }}</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/damianscheerer/Documents/Projects/O1-MCM-mobile-App/src/pages/home/tabs/TasksMap/TasksMap.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular_navigation_deep_linker__["a" /* DeepLinker */],
            __WEBPACK_IMPORTED_MODULE_10__services_gps_service__["a" /* GpsService */],
            __WEBPACK_IMPORTED_MODULE_11__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_14__services_images_service__["a" /* ImagesService */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_20_ionic_angular_components_modal_modal_controller__["a" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_23__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_17__app_app_component__["b" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */]])
    ], TasksMap);
    return TasksMap;
    var TasksMap_1;
}());

//# sourceMappingURL=TasksMap.js.map

/***/ }),

/***/ 1167:
/***/ (function(module, exports) {

/**
 * CSS conic-gradient() polyfill
 * By Lea Verou — http://lea.verou.me
 * MIT license
 */

(function(){

var π = Math.PI;
var τ = 2 * π;
var ε = .00001;
var deg = π/180;

var dummy = document.createElement("div");
document.head.appendChild(dummy);

var _ = self.ConicGradient = function(o) {
	var me = this;
	_.all.push(this);

	o = o || {};

	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext("2d");

	this.repeating = !!o.repeating;

	this.size = o.size || Math.max(innerWidth, innerHeight);

	this.canvas.width = this.canvas.height = this.size;

	var stops = o.stops;

	this.stops = (stops || "").split(/\s*,(?![^(]*\))\s*/); // commas that are not followed by a ) without a ( first

	this.from = 0;

	for (var i=0; i<this.stops.length; i++) {
		if (this.stops[i]) {
			var stop = this.stops[i] = new _.ColorStop(this, this.stops[i]);

			if (stop.next) {
				this.stops.splice(i+1, 0, stop.next);
				i++;
			}
		}
		else {
			this.stops.splice(i, 1);
			i--;
		}
	}

	if (this.stops[0].color.indexOf('from') == 0) {
		this.from = this.stops[0].pos*360;
		this.stops.shift();
	}
	// Normalize stops

	// Add dummy first stop or set first stop’s position to 0 if it doesn’t have one
	if (this.stops[0].pos === undefined) {
			this.stops[0].pos = 0;
		}
	else if (this.stops[0].pos > 0) {
		var first = this.stops[0].clone();
		first.pos = 0;
		this.stops.unshift(first);
	}

	// Add dummy last stop or set first stop’s position to 100% if it doesn’t have one
	if (this.stops[this.stops.length - 1].pos === undefined) {
		this.stops[this.stops.length - 1].pos = 1;
	}
	else if (!this.repeating && this.stops[this.stops.length - 1].pos < 1) {
		var last = this.stops[this.stops.length - 1].clone();
		last.pos = 1;
		this.stops.push(last);
	}

	this.stops.forEach(function(stop, i){
		if (stop.pos === undefined) {
			// Evenly space color stops with no position
			for (var j=i+1; this[j]; j++) {
				if (this[j].pos !== undefined) {
					stop.pos = this[i-1].pos + (this[j].pos - this[i-1].pos)/(j-i+1);
					break;
				}
			}
		}
		else if (i > 0) {
			// Normalize color stops whose position is smaller than the position of the stop before them
			stop.pos = Math.max(stop.pos, this[i-1].pos);
		}
	}, this.stops);

	if (this.repeating) {
		// Repeat color stops until >= 1
		var stops = this.stops.slice();
		var lastStop = stops[stops.length-1];
		var difference = lastStop.pos - stops[0].pos;

		for (var i=0; this.stops[this.stops.length-1].pos < 1 && i<10000; i++) {
			for (var j=0; j<stops.length; j++) {
				var s = stops[j].clone();
				s.pos += (i+1)*difference;

				this.stops.push(s);
			}
		}
	}

	this.paint();
};

_.all = [];

_.prototype = {
	toString: function() {
		return "url('" + this.dataURL + "')";
	},

	get dataURL() {
		// IE/Edge only render data-URI based background-image when the image data
		// is escaped.
		// Ref: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/#comment-3
		return "data:image/svg+xml," + encodeURIComponent(this.svg);
	},

	get blobURL() {
		// Warning: Flicker when updating due to slow blob: URL resolution :(
		// TODO cache this and only update it when color stops change
		return URL.createObjectURL(new Blob([this.svg], {type: "image/svg+xml"}));
	},

	get svg() {
		return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">' +
			'<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">' +
			'<image width="100" height="100%" xlink:href="' + this.png + '" /></svg></svg>';
	},

	get png() {
		return this.canvas.toDataURL();
	},

	get r() {
		return Math.sqrt(2) * this.size / 2;
	},

	// Paint the conical gradient on the canvas
	// Algorithm inspired from http://jsdo.it/akm2/yr9B
	paint: function() {
		var c = this.context;

		var radius = this.r;
		var x = this.size / 2;

		var stopIndex = 0; // The index of the current color
		var stop = this.stops[stopIndex], prevStop;

		var diff, t;

		// Transform coordinate system so that angles start from the top left, like in CSS
		c.translate(this.size/2, this.size/2);
		c.rotate(-90*deg);
		c.rotate(this.from*deg);
		c.translate(-this.size/2, -this.size/2);

		for (var i = 0; i < 360;) {
			if (i/360 + ε >= stop.pos) {
				// Switch color stop
				do {
					prevStop = stop;

					stopIndex++;
					stop = this.stops[stopIndex];
				} while(stop && stop != prevStop && stop.pos === prevStop.pos);

				if (!stop) {
					break;
				}

				var sameColor = prevStop.color + "" === stop.color + "" && prevStop != stop;

				diff = prevStop.color.map(function(c, i){
					return stop.color[i] - c;
				});
			}

			t = (i/360 - prevStop.pos) / (stop.pos - prevStop.pos);

			var interpolated = sameColor? stop.color : diff.map(function(d,i){
				var ret = d * t + prevStop.color[i];

				return i < 3? ret & 255 : ret;
			});

			// Draw a series of arcs, 1deg each
			c.fillStyle = 'rgba(' + interpolated.join(",") + ')';
			c.beginPath();
			c.moveTo(x, x);

			if (sameColor) {
				var θ = 360 * (stop.pos - prevStop.pos);
			}
			else {
				var θ = .5;
			}

			var beginArg = i*deg;
			beginArg = Math.min(360*deg, beginArg);

			// .02: To prevent empty blank line and corresponding moire
			// only non-alpha colors are cared now
			var endArg = beginArg + θ*deg;
			endArg = Math.min(360*deg, endArg + .02);

			c.arc(x, x, radius, beginArg, endArg);

			c.closePath();
			c.fill();

			i += θ;
		}
	}
};

_.ColorStop = function(gradient, stop) {
	this.gradient = gradient;

	if (stop) {
		var parts = stop.match(/^(.+?)(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?\s*$/);

		this.color = _.ColorStop.colorToRGBA(parts[1]);

		if (parts[2]) {
			var unit = parts[3];

			if (unit == "%" || parts[2] === "0" && !unit) {
				this.pos = parts[2]/100;
			}
			else if (unit == "turn") {
				this.pos  = +parts[2];
			}
			else if (unit == "deg") {
				this.pos  = parts[2] / 360;
			}
			else if (unit == "grad") {
				this.pos  = parts[2] / 400;
			}
			else if (unit == "rad") {
				this.pos  = parts[2] / τ;
			}
		}

		if (parts[4]) {
			this.next = new _.ColorStop(gradient, parts[1] + " " + parts[4] + parts[5]);
		}
	}
}

_.ColorStop.prototype = {
	clone: function() {
		var ret = new _.ColorStop(this.gradient);
		ret.color = this.color;
		ret.pos = this.pos;

		return ret;
	},

	toString: function() {
		return "rgba(" + this.color.join(", ") + ") " + this.pos * 100 + "%";
	}
};

_.ColorStop.colorToRGBA = function(color) {
	if (!Array.isArray(color) && color.indexOf("from") == -1) {
		dummy.style.color = color;

		var rgba = getComputedStyle(dummy).color.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/);

		if (rgba) {
			rgba.shift();
			rgba = rgba.map(function(a) { return +a });
			rgba[3] = isNaN(rgba[3])? 1 : rgba[3];
		}

		return rgba || [0,0,0,0];
	}

	return color;
};

})();

if (self.StyleFix) {
	// Test if conic gradients are supported first:
	(function(){
		var dummy = document.createElement("p");
		dummy.style.backgroundImage = "conic-gradient(white, black)";
		dummy.style.backgroundImage = PrefixFree.prefix + "conic-gradient(white, black)";

		if (!dummy.style.backgroundImage) {
			// Not supported, use polyfill
			StyleFix.register(function(css, raw) {
				if (css.indexOf("conic-gradient") > -1) {
					css = css.replace(/(?:repeating-)?conic-gradient\(\s*((?:\([^()]+\)|[^;()}])+?)\)/g, function(gradient, stops) {
						return new ConicGradient({
							stops: stops,
							repeating: gradient.indexOf("repeating-") > -1
						});
					});
				}

				return css;
			});
		}
	})();
}


/***/ })

});
//# sourceMappingURL=1.js.map