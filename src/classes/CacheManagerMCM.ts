import { MapTile, Helper } from './Helper'
import { MyMath } from './MyMath'
import { MathRoute } from './MathRoute'
import * as L from 'leaflet'
import { AsyncTask } from './AsyncTask'
import { tilesDb } from "./tilesDb"
import { LatLngBounds, Point } from 'leaflet';
/**
  * Action to perform on a tile within a CacheManagerTask
  * @author F.Fontaine
  */
export interface CacheManagerAction {
  /**
   * Preconditions to check before bulk action
   * @return true if we pass the check
   */
  preCheck(): boolean

  /**
   * We will update the callbacks not for every tile, but at this rate
   */
  getProgressModulo(): number

  /**
   * The action to perform on a single tile
   * @return true if you want to increment the action counter
   */
  tileAction(pTile: MapTile): boolean

  /*
  Gets the actions type
  @return String out of [download, clean]
   */
  getActionType(): string
}

export interface CacheManagerCallback {
  /**
   * fired when the download job is done.
   */
  onTaskComplete()

  /**
   * this is fired periodically, useful for updating dialogs, progress bars, etc
   *
   * @param progress
   * @param currentZoomLevel
   * @param zoomMin
   * @param zoomMax
   */
  updateProgress(progress: number, currentZoomLevel: number, zoomMin: number, zoomMax: number)

  /**
   * as soon as the download is started, this is fired
   */
  downloadStarted()

  /**
   * this is fired right before the download starts
   *
   * @param total
   */
  setPossibleTilesInArea(total: number)

  /**
   * this is fired when the task has been completed but had at least one download error.
   * @param errors
   */
  onTaskFailed(errors: number)
}

export class CacheManagerTask extends AsyncTask<any> {
  // private final CacheManagerMCM mManager;
  // private final CacheManagerAction mAction;
  // private final List<MapTile> mTiles;
  // private final int mZoomMin;
  // private final int mZoomMax;
  // private final ArrayList<CacheManagerCallback> mCallbacks = new ArrayList<>();
  private mZoomMin: number
  private mZoomMax: number
  private mCallbacks = new Array<CacheManagerCallback>()
  private specialCount: number = 0

  // public CacheManagerTask(final CacheManagerMCM pManager, final CacheManagerAction pAction,
  //   final List<MapTile> pTiles,
  //   final int pZoomMin, final int pZoomMax) {
  //   mManager = pManager;
  //   mAction = pAction;
  //   mTiles = pTiles;
  //   mZoomMin = Math.max(pZoomMin, pManager.mMinZoomLevel);
  //   mZoomMax = Math.min(pZoomMax, pManager.mMaxZoomLevel);
  //   } 
  // public CacheManagerTask(final CacheManagerMCM pManager,  final CacheManagerAction pAction,
  //   final ArrayList<GeoPoint> pGeoPoints,
  //   final int pZoomMin, final int pZoomMax) {
  //   this(pManager, pAction, getTilesCoverage(pGeoPoints, pZoomMin, pZoomMax), pZoomMin, pZoomMax);
  //   }

  //   public CacheManagerTask(final CacheManagerMCM pManager,  final CacheManagerAction pAction,
  //       final BoundingBox pBB,
  //       final int pZoomMin, final int pZoomMax) {
  //   this(pManager, pAction, getTilesCoverage(pBB, pZoomMin, pZoomMax), pZoomMin, pZoomMax);
  //   }
  constructor(private mManager: CacheManagerMCM,
    private mAction: CacheManagerAction,
    private mTiles: Array<MapTile>,
    pZoomMin: number, pZoomMax: number) {
    super();
    this.mZoomMin = Math.max(pZoomMin, this.mManager.MinZoomLevel)
    this.mZoomMax = Math.min(pZoomMax, mManager.MaxZoomLevel)
  }

  // public void addCallback(final CacheManagerCallback pCallback) {
  //   if (pCallback != null) {
  //       mCallbacks.add(pCallback);
  //   }
  // }
  addCallback(pCallback: CacheManagerCallback) {
    if (pCallback != null) {
      this.mCallbacks.push(pCallback)
    }
  }

  // @Override
  // protected void onPreExecute(){
  //     final int total = mTiles.size();
  //     for (final CacheManagerCallback callback : mCallbacks) {
  //         try {
  //             callback.setPossibleTilesInArea(total);
  //             callback.downloadStarted();
  //             callback.updateProgress(0, mZoomMin, mZoomMin, mZoomMax);
  //         } catch (Throwable t) {
  //             logFaultyCallback(t);
  //         }
  //     }
  // }
  async onPreExecute() {
    let total = this.mTiles.length
    this.mCallbacks.forEach(callback => {
      callback.setPossibleTilesInArea(total)
      callback.downloadStarted()
      callback.updateProgress(0, this.mZoomMin, this.mZoomMin, this.mZoomMax)
    })
  }

  // private void logFaultyCallback(Throwable pThrowable) {
  //   Log.w(IMapView.LOGTAG, "Error caught processing cachemanager callback, your implementation is faulty", pThrowable);
  // }
  private logFaultyCallback() {
    // TODO: implement?
  }

  // @Override
  // protected void onProgressUpdate(final Integer... count) {
  //     //count[0] = tile counter, count[1] = current zoom level
  //     for (final CacheManagerCallback callback : mCallbacks) {
  //         try {
  //             callback.updateProgress(count[0], count[1], mZoomMin, mZoomMax);
  //         } catch (Throwable t) {
  //             logFaultyCallback(t);
  //         }
  //     }
  // }
  protected onProgressUpdate(count: number[]) {
    this.mCallbacks.forEach(callback => {
      callback.updateProgress(count[0], count[1], this.mZoomMin, this.mZoomMax)
    })
  }

  // @Override
  // protected void onCancelled(){
  //     mManager.mPendingTasks.remove(this);
  // }
  protected onCancelled() {
    let index = this.mManager.PendingTasks.indexOf(this)
    if (index > -1) {
      // TODO: splice edits array?
      this.mManager.PendingTasks.splice(index, 1)
    }
  }

  // @Override
  // protected void onPostExecute(final Integer specialCount) {
  //     mManager.mPendingTasks.remove(this);
  //     for (final CacheManagerCallback callback : mCallbacks) {
  //         try {
  //             if (specialCount == 0) {
  //                 callback.onTaskComplete();
  //             } else {
  //                 callback.onTaskFailed(specialCount);
  //             }
  //         } catch (Throwable t) {
  //             logFaultyCallback(t);
  //         }
  //     }
  //     /*
  //     GEÄNDERT
  //     Nach dem Kartendownload werden alle Bilder gedownloaded
  //      */
  //     if(mAction.getActionType().equals("download")){
  //         new ImageDownloader(mManager.ctx, mManager.route).execute();
  //     }
  //     if(mAction.getActionType().equals("clean")){
  //         mManager.route.deleteData(mManager.ctx);
  //     }
  // }
  async onPostExecute() {
    let index = this.mManager.PendingTasks.indexOf(this)
    this.mManager.PendingTasks.splice(index, 1)
    this.mCallbacks.forEach(callback => {
      if (this.specialCount == 0) {
        callback.onTaskComplete()
      } else {
        callback.onTaskFailed(this.specialCount)
      }
    })
    /*
      CHANGED
      After downloading the map all pictures will be downloaded
    */
    if (this.mAction.getActionType() == "download") {
      // TODO: 1
      // new ImageDownloaderRoutes(mManager.ctx, this.mManager.route).execute()
    } else if (this.mAction.getActionType() == "clean") {
      await this.mManager.route.deleteData()
    }
  }

  // @Override
  // protected Integer doInBackground(Object... params) {
  //     if (!mAction.preCheck()) {
  //         return 0;
  //     }

  //     int tileCounter = 0;
  //     int errors = 0;

  //     for (final MapTile tile : mTiles) {
  //         final int zoom = tile.getZoomLevel();
  //         if (zoom >= mZoomMin && zoom <= mZoomMax) {
  //             if (mAction.tileAction(tile)) {
  //                 errors++;
  //             }
  //         }
  //         tileCounter++;
  //         if (tileCounter % mAction.getProgressModulo() == 0) {
  //             if (isCancelled()) {
  //                 return errors;
  //             }
  //             publishProgress(tileCounter, tile.getZoomLevel());
  //         }

  //     }
  //     return errors;
  // }
  async doInBackground(params: any) {
    if (!this.mAction.preCheck()) {
      this.specialCount = 0
      return
    }

    let tileCounter: number = 0
    let errors: number = 0

    this.mTiles.forEach(tile => {
      let zoom: number = tile.zoomLevel
      if (zoom >= this.mZoomMin && zoom <= this.mZoomMax) {
        if (this.mAction.tileAction(tile)) {
          errors++
        }
      }
      tileCounter++
      if (tileCounter % this.mAction.getProgressModulo() == 0) {
        // TODO: implement async cancel
        // if (this.isCancelled()) {
        //   this.specialCount = errors
        //   return
        // }
        // TODO: implement async report progress
        // this.publishProgress(tileCounter, tile.zoomLevel)
      }
    })
    this.specialCount = errors
  }
}

export class CacheManagerMCM {
  // protected final int mMinZoomLevel;
  // protected final int mMaxZoomLevel;
  protected mMinZoomLevel: number
  get MinZoomLevel(): number {
    return this.mMinZoomLevel
  }

  protected mMaxZoomLevel: number
  get MaxZoomLevel(): number {
    return this.mMaxZoomLevel
  }

  // protected Set<CacheManagerTask> mPendingTasks = new HashSet<>();
  protected mPendingTasks: Array<CacheManagerTask> = new Array<CacheManagerTask>()
  get PendingTasks(): Array<CacheManagerTask> {
    return this.mPendingTasks
  }

  constructor(private mapView: any, public route: MathRoute) { }

  //   public int possibleTilesInArea(final BoundingBox pBB, final int pZoomMin, final int pZoomMax) {
  //     return getTilesCoverage(pBB, pZoomMin, pZoomMax).size();
  // }
  possibleTilesInArea(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number): number {
    return CacheManagerMCM.getTilesCoverageMinMaxZoom(pBB, pZoomMin, pZoomMax).length
  }

  // public static List<MapTile> getTilesCoverage(final BoundingBox pBB,
  //     final int pZoomMin, final int pZoomMax) {
  // final List<MapTile> result = new ArrayList<>();
  // for (int zoomLevel = pZoomMin; zoomLevel <= pZoomMax; zoomLevel++) {
  // final Collection<MapTile> resultForZoom = getTilesCoverage(pBB, zoomLevel);
  // result.addAll(resultForZoom);
  // }
  // return result;
  // }
  static getTilesCoverageMinMaxZoom(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number): Array<MapTile> {
    let result = new Array<MapTile>()
    for (let zoomLevel = pZoomMin; zoomLevel <= pZoomMax; zoomLevel++) {
      console.log(`Calculating ZOOM: ${zoomLevel}`)
      let resultForZoom = CacheManagerMCM.getTilesCoverageZoom(pBB, zoomLevel)
      console.log(`Result.size: ${resultForZoom.length}`)
      result = result.concat(resultForZoom)
      console.log(`Result.concat.size: ${result.length}`)
    }

    return result
  }

  /**
     * Computes the theoretical tiles covered by the bounding box
     * @return list of tiles for that zoom level, without any specific order
     */
  //   public static Collection<MapTile> getTilesCoverage(final BoundingBox pBB, final int pZoomLevel){
  //     final Set<MapTile> result = new HashSet<>();
  //     final int mapTileUpperBound = 1 << pZoomLevel;
  //     final Point lowerRight = getMapTileFromCoordinates(
  //             pBB.getLatSouth(), pBB.getLonEast(), pZoomLevel);
  //     final Point upperLeft = getMapTileFromCoordinates(
  //             pBB.getLatNorth(), pBB.getLonWest(), pZoomLevel);
  //     int width = lowerRight.x - upperLeft.x + 1; // handling the modulo
  //     if (width <= 0) {
  //         width += mapTileUpperBound;
  //     }
  //     int height = lowerRight.y - upperLeft.y + 1; // handling the modulo
  //     if (height <= 0) {
  //         height += mapTileUpperBound;
  //     }
  //     for (int i = 0 ; i < width ; i ++) {
  //         for (int j = 0 ; j < height ; j ++) {
  //             final int x = MyMath.mod(upperLeft.x + i, mapTileUpperBound);
  //             final int y = MyMath.mod(upperLeft.y + j, mapTileUpperBound);
  //             result.add(new MapTile(pZoomLevel, x, y));
  //         }
  //     }
  //     return result;
  // }
  static getTilesCoverageZoom(pBB: LatLngBounds, pZoomLevel: number): Array<MapTile> {
    let result = new Array<MapTile>()
    let mapTileUpperBound = 1 << pZoomLevel
    console.log(`shift attributes ${mapTileUpperBound}`)
    console.log(`south: ${pBB.getSouth()} east: ${pBB.getEast()}`)
    console.log(`north: ${pBB.getNorth()} west: ${pBB.getWest()}`)
    const lowerRight = CacheManagerMCM.getMapTileFromCoordinates(pBB.getSouth(), pBB.getEast(), pZoomLevel)
    const upperLeft = CacheManagerMCM.getMapTileFromCoordinates(pBB.getNorth(), pBB.getWest(), pZoomLevel)
    console.log(`lowerRight ${lowerRight} upperLeft ${upperLeft}`)
    let width = lowerRight.x - upperLeft.x + 1
    if (width <= 0) {
      width += mapTileUpperBound
    }

    console.log(`Width: ${width} ${typeof width}`)

    let height = lowerRight.y - upperLeft.y + 1
    if (height <= 0) {
      height += mapTileUpperBound
    }
    console.log(`Height: ${height} ${typeof height}`)

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const x = MyMath.mod(upperLeft.x + i, mapTileUpperBound)
        const y = MyMath.mod(upperLeft.y + j, mapTileUpperBound)
        result.push(new MapTile(pZoomLevel, x, y))
      }
    }
    console.log(`Result.length = ${result.length}`)

    return result
  }

  //   public static Point getMapTileFromCoordinates(final double aLat, final double aLon, final int zoom) {
  //     final int y = (int) Math.floor((1 - Math.log(Math.tan(aLat * Math.PI / 180) + 1 / Math.cos(aLat * Math.PI / 180)) / Math.PI) / 2 * (1 << zoom));
  //     final int x = (int) Math.floor((aLon + 180) / 360 * (1 << zoom));
  //     return new Point(x, y);
  // }
  static getMapTileFromCoordinates(aLat: number, aLon: number, zoom: number): Point {
    const z = 1 << zoom
    const y: number = Math.floor((1 - Math.log(Math.tan(aLat * Math.PI / 180) + 1 / Math.cos(aLat * Math.PI / 180)) / Math.PI) / 2 * z)
    const x: number = Math.floor((aLon + 180) / 360 * z)
    console.log(`aLat: ${aLat} aLon: ${aLon} zoom: ${zoom} => x: ${x} y: ${y}`)

    return new Point(x, y)
  }

  /**
     * Download in background all tiles of the specified area in osmdroid cache.
     *
     * @param ctx
     * @param bb
     * @param zoomMin
     * @param zoomMax
     */
  // public CacheManagerTask downloadAreaAsync(Context ctx, BoundingBox bb, final int zoomMin, final int zoomMax) {
  //   this.ctx = ctx;
  //   final CacheManagerTask task = new CacheManagerTask(this, getDownloadingAction(), bb, zoomMin, zoomMax);
  //   task.addCallback(getDownloadingDialog(ctx, task));
  //   return execute(task);
  // }
  // downloadAreaAsync(bb: LatLngBounds, zoomMin: number, zoomMax: number) {
  //   let task = new CacheManagerTask(this, this.getDownloadingAction(), bb, zoomMax, zoomMax)
  //   //task.addCallback(getDownloadingDialog(task))
  //   this.execute(task)
  // }

  // public CacheManagerTask execute(final CacheManagerTask pTask) {
  //   pTask.execute();
  //   mPendingTasks.add(pTask);
  //   return pTask;
  // }
  execute(pTask: CacheManagerTask): void {
    // pTask.execute()
    // this.mPendingTasks.add(pTask)
    // return pTask
  }

  static async downloadTiles(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number, callback: any): Promise<any> {
    const tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(pBB, pZoomMin, pZoomMax);
    await tilesDb.initialize();
    return tilesDb.saveTiles(tiles.map(tile => {
       let domain = Helper.subDomains[Math.floor(Math.random() * Helper.subDomains.length)];
       let keyDomain = Helper.subDomains[0];
       return {
         key: Helper.mapquestUrl.replace('{s}', keyDomain).replace('{z}', String(tile.zoomLevel)).replace('{x}', String(tile.x)).replace('{y}', String(tile.y)),
         url: Helper.mapquestUrl.replace('{s}', domain).replace('{z}', String(tile.zoomLevel)).replace('{x}', String(tile.x)).replace('{y}', String(tile.y))
       }
    }), callback);
  }

  static async removeDownloadedTiles(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number) {
    const tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(pBB, pZoomMin, pZoomMax);
    await tilesDb.initialize();
    tiles.map(tile => {
        tilesDb._removeItem(Helper.mapquestUrl.replace('{s}', Helper.subDomains[0]).replace('{z}', String(tile.zoomLevel)).replace('{x}', String(tile.x)).replace('{y}', String(tile.y)))
    })
  }
  //   public CacheManagerAction getDownloadingAction() {
  //     return new CacheManagerAction() {
  //         @Override
  //         public boolean preCheck() {
  //             if (mTileProvider.getTileSource() instanceof OnlineTileSourceBase) {
  //                 return true;
  //             } else {
  //                 Log.e(IMapView.LOGTAG, "TileSource is not an online tile source");
  //                 return false;
  //             }
  //         }

  //         @Override
  //         public int getProgressModulo() {
  //             return 10;
  //         }

  //         @Override
  //         public boolean tileAction(MapTile pTile) {
  //             return !loadTile((OnlineTileSourceBase) mTileProvider.getTileSource(), pTile);
  //         }

  //         @Override
  //         public String getActionType(){
  //             return "download";
  //         }
  //     };
  // }
  // protected final MapTileProviderBase mTileProvider;
  protected mTileProvider: any

  getDownloadingAction(): CacheManagerAction {
    let self = this
    return {
      preCheck: (): boolean => {
        return true
        // TODO 2 finish this vague logic
      },
      getProgressModulo: () => {
        return 10
      },
      tileAction: (pTile: MapTile): boolean => {
        return false ; //!this.loadTile(mTileProvider.getTileSource(), pTile);
      },
      getActionType: (): string => {
        return "download"
      }
    }
  }

  /**
   * @return true if success, false if error
   */
  //   public boolean loadTile(final OnlineTileSourceBase tileSource, final MapTile tile) {
  //     //check if file is already downloaded:
  //     File file = getFileName(tileSource, tile);
  //     if (file.exists()) {
  //         return true;
  //     }
  //     //check if the destination already has the file
  //     if (mTileWriter.exists(tileSource,tile)){
  //         return true;
  //     }

  //     return forceLoadTile(tileSource, tile);
  // }
  loadTile(tileSource: any, tile: MapTile): boolean {
    // TODO: 3 integrate tilesDb.ts files DB check and download of tile if needed
      return false;
  }
}