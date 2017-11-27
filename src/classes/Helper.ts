export class MapTile {
  constructor(private pZoomLevel: number, private pX: number, private pY: number) { }

  get x(): number {
    return this.pX
  }

  get y(): number {
    return this.pY
  }

  get zoomLevel(): number {
    return this.pZoomLevel
  }
}

export class Point {
  constructor(public x: number, public y: number) { }
}

export class Helper {
  /*
    Intents #
     */
  static readonly MCM_PASS_TASK: string = "mathcitymap.showTask"
  static readonly MCM_PARENT_ROUTELIST: string = "mathcitymap.parentRouteList"
  static readonly MCM_ROUTELIST_PUBLIC: string = "mathcitymap.parentRouteListPublic"
  static readonly MCM_OSM_LASTCENTER: string = "mathcitymap.lastKnownCenterPoint"
  static readonly MCM_OSM_LASTZOOM: string = "mathcitymap.lastZoom"
  static readonly MCM_OSM_GUIDESTATE: string = "mathcitymap.osmGuideState"
  static readonly MCM_OSM_ONLINE: string = "mathcitymap.osmOnlineMap"
  /*
  INTENTS END ###
   */


  /*
  SETTINGS #
   */
  static readonly NEAREST_DEFINTION: number = 10000 // in Meters
  static readonly DISTANCE_TASK_DISPLAY: number = 50 // in Meters, the max distance to display the task
  static readonly DISTANCE_TASKS_MULTIPLE: number = 15 // in Meters, if tapped on marker, look for near markers in max 10m distance, display multiple select box
  static readonly ENABLE_DISTANCE_CHECK: boolean = false
  static taskTableUpdate: number = 0
  static routeTableUpdate: number = 0
  static relTableUpdate: number = 0
  static taskTableNeedsUpdate: number = 0
  static routeTableNeedsUpdate: number = 0
  static relTableNeedsUpdate: number = 0
  static readonly routeImageUpdate: number = 0
  static readonly gamification: number = 0 // 0 -> Keine, 1 -> Score, 2 -> Leaderbord, 3 -> Badges
  static readonly max_score: number = 100
  static readonly max_score_mc: number = 75
  static readonly max_score_l: number = 99
  static readonly min_score_l: number = 40
  static readonly min_score_cap: number = 10
  static readonly first_try_bonus: number = 10
  static readonly first_start_bonus: number = 10
  static readonly distance_bonus: number = 15
  static readonly p_second_try: number = 5
  static readonly p_third_try: number = 10
  static readonly studie: boolean = false
  static readonly updated_once: boolean = false
  /*
  SETTINGS END ###
   */


  /*
  GLOBAL VARS #
   */
  static readonly WEBSERVER_URL: string = "https://mathcitymap.eu/"
  // static readonly API_URL: string = "/mcm-api/db_query_post.php"
  static readonly API_URL: string = "http://mathcitymap.eu/db_query_post.php"
  static readonly REQUEST_PASS: string = "evilknivel2k16"
  static readonly REPLACE_TASK_IMAGE_PATH: string = "mcm_images/tasks/"
  static readonly REPLACE_ROUTE_IMAGE_PATH: string = "mcm_images/routes/"
  // public static ProgressDialog updater_dialog = null
  static readonly mapCode: string = "mapbox.streets"
  static readonly accessToken: string = "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww"
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
  // public static MathRoute activeRoute = null
  // public static MathTask activeTask = null
  // public static User user = null
  // public static Map<String, String> aiNamesMap = new HashMap<String, String>()
  // public static Map<String, ArrayList<Integer>> oldScoreMap = new HashMap<String, ArrayList<Integer>>()
  static readonly phone_id: string = ""
  static readonly phone_name: string = ""
  // public static MathRoute routeToDownload = null
  // public static Location myLocation = null
  public static myLocation: any = null;
  static readonly myAzimuth: number = 0.0
  // public static HashMap<String, int[]> routeStates = new HashMap<String, int[]>()
  // public static GoogleApiClient googleApiClient
  static readonly REQUEST_LOCATION: number = 199
  static isOnline = false
  static windowWidth: number = 0
  static windowHeight: number = 0


  public static getDistanceToCenter(lat2: number, lon2: number): number {
    let distance = -1;
    if (Helper.myLocation != null) {
      let lat1 = new Number(Helper.myLocation.coords.latitude).valueOf();
      let lon1 = new Number(Helper.myLocation.coords.longitude).valueOf();
      let R = 6371e3; // metres
      let p = Math.PI / 180;
      let φ1 = lat1 * p;
      let φ2 = lat2 * p;
      let Δφ = (lat2 - lat1) * p;
      let Δλ = (lon2 - lon1) * p;

      let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      distance = Math.round(R * c);
    }

    return distance;
  }

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
}