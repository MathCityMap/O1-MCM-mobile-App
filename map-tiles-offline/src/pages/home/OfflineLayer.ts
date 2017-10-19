import { ImageRetriever } from './ImageRetriever';
import { ImageStore } from './ImageStore';
import L from "leaflet";

export class OfflineLayer extends L.TileLayer {
  // ???????
  _alreadyReportedErrorForThisActions: boolean;
  _onReady: any;
  _onError: any;
  _tileImagesStore: ImageStore;
  _minZoomLevel: number;
  _localURL: string;
  _ownmap: any;

  constructor(url, options) {
    var err, imageRetriever, storeName;
    // L.TileLayer.prototype.initialize.call(this, url, options);
    super(url, options);
    this._localURL = url;
    this._alreadyReportedErrorForThisActions = false;
    this._onReady = options["onReady"];
    this._onError = options["onError"];
    storeName = options["storeName"] || 'OfflineLeafletTileImages';
    this._tileImagesStore = null;
    this._minZoomLevel = 12;
    if (options["minZoomLevel"] != null) {
      this._minZoomLevel = parseInt(options["minZoomLevel"]);
    }
    try {
      imageRetriever = new ImageRetriever(this);
      this._tileImagesStore = new ImageStore(this, imageRetriever);
      this._tileImagesStore.createDB(storeName, () => {
        console.log("OfflineLayer.onReady");
        this._onReady();
      }, (error) => {
        console.log("OfflineLayer.onError", error);
        this._tileImagesStore = null;
        this._reportError("COULD_NOT_CREATE_DB", error);
        setTimeout(() => {
          this._onReady();
        }, 0);
      });
    } catch (error1) {
      err = error1;
      this._tileImagesStore = null;
      this._reportError("COULD_NOT_CREATE_DB", err);
      setTimeout(() => {
        this._onReady();
      }, 0);
    }
  }

  // look at the code from L.TileLayer for more details
  _setUpTile(tile, key, value) {
    // Start loading the tile with either the cached tile image or the result of getTileUrl
    tile.src = value;
    return super.fire('tileloadstart', {
      tile: tile,
      url: tile.src
    });
  }

  _reportError(errorType, errorData = undefined) {
    if (this._onError) {
      if (!this._alreadyReportedErrorForThisActions) {
        this._alreadyReportedErrorForThisActions = true;
        return this._onError(errorType, errorData);
      }
    }
  }

  // look at the code from L.TileLayer for more details
  _loadTile(tile, tilePoint) {
    var key, onError, onSuccess;
    if (!this._tileImagesStore) {
      return L.TileLayer.prototype._loadTile.call(this, tile, tilePoint);
    }
    // Reproducing TileLayer._loadTile behavior, but the tile.src will be set later
    tile._layer = this;
    tile.onerror = super._tileOnError;
    super._adjustTilePoint(tilePoint);
    tile.onload = super._tileOnLoad;
    // Done reproducing _loadTile
    onSuccess = (dbEntry) => {
      if (dbEntry) {
        // if the tile has been cached, use the stored Base64 value
        return this._setUpTile(tile, key, dbEntry.image);
      } else {
        // query the map provider for the tile
        return this._setUpTile(tile, key, this.getTileUrl(tilePoint));
      }
    };
    onError = () => {
      // Error while getting the key from the DB
      // will get the tile from the map provider
      this._setUpTile(tile, key, this.getTileUrl(tilePoint));
      return this._reportError("DB_GET", key);
    };
    key = this._createTileKey(tilePoint.x, tilePoint.y, tilePoint.z);
    // Look for the tile in the DB
    return this._tileImagesStore.get(key, onSuccess, onError);
  }

  useDB() {
    return this._tileImagesStore !== null;
  }

  cancel() {
    if (this._tileImagesStore != null) {
      return this._tileImagesStore.cancel();
    }
    return false;
  }

  clearTiles(onSuccess, onError) {
    if (!this.useDB()) {
      this._reportError("NO_DB", "No DB available");
      onError("No DB available");
      return;
    }
    if (this.isBusy()) {
      this._reportError("SYSTEM_BUSY", "System is busy.");
      onError("System is busy.");
      return;
    }
    return this._tileImagesStore.clear(onSuccess, (error) => {
      this._reportError("COULD_NOT_CLEAR_DB", error);
      return onError(error);
    });
  }

  // calculateNbTiles includes potentially already saved tiles.
  calculateNbTiles(zoomLevelLimit = null) {
    var count, key, tileImagesToQuery;
    if (this._ownmap.getZoom() < this._minZoomLevel) {
      this._reportError("ZOOM_LEVEL_TOO_LOW");
      return -1;
    }
    count = 0;
    tileImagesToQuery = this._getTileImages(zoomLevelLimit);
    for (key in tileImagesToQuery) {
      count++;
    }
    return count;
  }

  isBusy() {
    if (this._tileImagesStore != null) {
      return this._tileImagesStore.isBusy();
    }
    return false;
  }

  // Returns the tiles currently displayed
  // @_tiles could return tiles that are currently loaded but not displayed
  // that is why the tiles are recalculated here.
  _getTileImages(zoomLevelLimit) {
    var arrayLength, bounds, i, j, k, l, m, map, maxX, maxY, minX, minY, point, ref, ref1, ref2, ref3, ref4, roundedTileBounds, startingZoom, tileBounds, tileImagesToQuery, tileSize, tilesInScreen, x, y;
    zoomLevelLimit = zoomLevelLimit || this._ownmap.getMaxZoom();
    tileImagesToQuery = {};
    map = this._ownmap;
    startingZoom = map.getZoom();
    bounds = map.getPixelBounds();
    // Handle both Leaflet 0.7 (_getTileSize) and 1.0
    tileSize = super._getTileSize ? super._getTileSize() : super.getTileSize().x;
    // bounds are rounded down since a tile cover all the pixels from it's rounded down value until the next tile
    roundedTileBounds = L.bounds(bounds.min.divideBy(tileSize)._floor(), bounds.max.divideBy(tileSize)._floor());
    tilesInScreen = [];
    for (j = k = ref = roundedTileBounds.min.y, ref1 = roundedTileBounds.max.y; ref <= ref1 ? k <= ref1 : k >= ref1; j = ref <= ref1 ? ++k : --k) {
      for (i = l = ref2 = roundedTileBounds.min.x, ref3 = roundedTileBounds.max.x; ref2 <= ref3 ? l <= ref3 : l >= ref3; i = ref2 <= ref3 ? ++l : --l) {
        tilesInScreen.push(new L.Point(i, j));
      }
    }
    // We will use the exact bound values to test if sub tiles are still inside these bounds.
    // The idea is to avoid caching images outside the screen.
    tileBounds = L.bounds(bounds.min.divideBy(tileSize), bounds.max.divideBy(tileSize));
    minY = tileBounds.min.y;
    maxY = tileBounds.max.y;
    minX = tileBounds.min.x;
    maxX = tileBounds.max.x;
    arrayLength = tilesInScreen.length;
    for (i = m = 0, ref4 = arrayLength; 0 <= ref4 ? m < ref4 : m > ref4; i = 0 <= ref4 ? ++m : --m) {
      point = tilesInScreen[i];
      x = point.x;
      y = point.y;
      this._getZoomedInTiles(x, y, startingZoom, zoomLevelLimit, tileImagesToQuery, minY, maxY, minX, maxX);
      this._getZoomedOutTiles(x, y, startingZoom, 0, tileImagesToQuery, minY, maxY, minX, maxX);
    }
    return tileImagesToQuery;
  }

  // saves the tiles currently on screen + lower and higher zoom levels.
  saveTiles(zoomLevelLimit, onStarted, onSuccess, onError) {
    var tileImagesToQuery;
    this._alreadyReportedErrorForThisActions = false;
    if (!this._tileImagesStore) {
      this._reportError("NO_DB", "No DB available");
      onError("No DB available");
      return;
    }
    if (this.isBusy()) {
      this._reportError("SYSTEM_BUSY", "system is busy.");
      onError("system is busy.");
      return;
    }
    if (this._ownmap.getZoom() < this._minZoomLevel) {
      this._reportError("ZOOM_LEVEL_TOO_LOW");
      onError("ZOOM_LEVEL_TOO_LOW");
      return;
    }
    //lock UI
    tileImagesToQuery = this._getTileImages(zoomLevelLimit);
    return this._tileImagesStore.saveImages(tileImagesToQuery, onStarted, onSuccess, (error) => {
      this._reportError("SAVING_TILES", error);
      return onError(error);
    });
  }

  // returns all the tiles with higher zoom levels
  _getZoomedInTiles(x, y, currentZ, maxZ, tileImagesToQuery, minY, maxY, minX, maxX) {
    this._getTileImage(x, y, currentZ, tileImagesToQuery, minY, maxY, minX, maxX, true);
    if (currentZ < maxZ) {
      // getting the 4 tile under the current tile
      minY *= 2;
      maxY *= 2;
      minX *= 2;
      maxX *= 2;
      this._getZoomedInTiles(x * 2, y * 2, currentZ + 1, maxZ, tileImagesToQuery, minY, maxY, minX, maxX);
      this._getZoomedInTiles(x * 2 + 1, y * 2, currentZ + 1, maxZ, tileImagesToQuery, minY, maxY, minX, maxX);
      this._getZoomedInTiles(x * 2, y * 2 + 1, currentZ + 1, maxZ, tileImagesToQuery, minY, maxY, minX, maxX);
      return this._getZoomedInTiles(x * 2 + 1, y * 2 + 1, currentZ + 1, maxZ, tileImagesToQuery, minY, maxY, minX, maxX);
    }
  }

  // returns all the tiles with lower zoom levels
  _getZoomedOutTiles(x, y, currentZ, finalZ, tileImagesToQuery, minY, maxY, minX, maxX) {
    this._getTileImage(x, y, currentZ, tileImagesToQuery, minY, maxY, minX, maxX, false);
    if (currentZ > finalZ) {
      minY /= 2;
      maxY /= 2;
      minX /= 2;
      maxX /= 2;
      // getting the zoomed out tile containing this tile
      return this._getZoomedOutTiles(Math.floor(x / 2), Math.floor(y / 2), currentZ - 1, finalZ, tileImagesToQuery, minY, maxY, minX, maxX);
    }
  }

  _getTileImage(x, y, z, tileImagesToQuery, minY, maxY, minX, maxX, wtf) {
    var key;
    // is the tile outside the bounds?
    if (x < Math.floor(minX) || x > Math.floor(maxX) || y < Math.floor(minY) || y > Math.floor(maxY)) {
      return;
    }
    // At this point, we only add the image to a "dictionary"
    // This is being done to avoid multiple requests when zooming out, since zooming int should never overlap
    key = this._createTileKey(x, y, z);
    if (!tileImagesToQuery[key]) {
      return tileImagesToQuery[key] = {
        key: key,
        x: x,
        y: y,
        z: z
      };
    }
  }

  _createNormalizedTilePoint(x, y, z) {
    var nbTilesAtZoomLevel;
    nbTilesAtZoomLevel = Math.pow(2, z);
    while (x > nbTilesAtZoomLevel) {
      x -= nbTilesAtZoomLevel;
    }
    while (x < 0) {
      x += nbTilesAtZoomLevel;
    }
    while (y > nbTilesAtZoomLevel) {
      y -= nbTilesAtZoomLevel;
    }
    while (y < 0) {
      y += nbTilesAtZoomLevel;
    }
    return {
      x: x,
      y: y,
      z: z
    };
  }

  _createURL(x, y, z) {
    var tilePoint;
    tilePoint = this._createNormalizedTilePoint(x, y, z);
    return this.getTileUrl(tilePoint);
  }

  _createTileKey(x, y, z) {
    var tilePoint;
    tilePoint = this._createNormalizedTilePoint(x, y, z);
    return tilePoint.x + ", " + tilePoint.y + ", " + tilePoint.z;
  }

  // Override
  // The parent one does not care about the z parameter being passed
  getTileUrl(coords) {
    var data, invertedY, maxY;
    data = {
      r: L.Browser.retina ? '@2x' : '',
      s: super._getSubdomain(coords),
      x: coords.x,
      y: coords.y,
      z: coords.z || super._getZoomForUrl()
    };
    
    if (this._ownmap && !this._ownmap.options.crs.infinite) {
      if (super._globalTileRange !== 'undefined' && (super.globalTileRange != null)) {
        maxY = super._globalTileRange.max.y;
      } else {
        maxY = 0;
      }
      invertedY = maxY - coords.y;
      if (super.options.tms) {
        data['y'] = invertedY;
      }
      data['-y'] = invertedY;
    }

    return L.Util.template(this._localURL, L.extend(data, super.options));
  }

  on(name, fnc, obj) {
    return super.on(name, fnc, obj);
  }

  addTo(map) {
    super.addTo(map);
    this._ownmap = map;
  }
}
