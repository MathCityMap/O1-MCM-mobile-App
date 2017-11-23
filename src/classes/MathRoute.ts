import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-offline';
import * as Collections from 'typescript-collections'
import { MathTask } from './MathTask'
import { DB_Handler } from './DB_Handler'
import { Helper } from './Helper';

export class MathRoute {

//     protected String title;
//     protected int id;
//     // Information about the route: Klassenstufe, Aufgabentyp, Umfang, Dauer etc.
//     protected Map<String, String> info = new HashMap<String, String>();
  // protected title: string
  protected id: number
  protected info: Collections.Dictionary<string, string>

//     protected ArrayList<MathTask> tasks = new ArrayList<MathTask>();
//     protected BoundingBox boundingBox = null;
//     protected BoundingBox viewBoundingBox = null;
//     protected GeoPoint center = null;
//     protected boolean ready = false;
//     public boolean downloaded = false;
  protected tasks: Array<MathTask> = new Array<MathTask>()
  protected boundingBox: any = null
  protected viewBoundingBox: any = null
  protected center: any = null
  protected ready: boolean = false
  downloaded: boolean = false

//     public MathRoute(String _name) {
//         this.title = _name;
//     }
  constructor(protected title: string) {}

//     // Gebe jeder Aufgabe eindeutige Position mit
//     public void assignPositionToTasks(){
//         for(int i = 1; i <= tasks.size(); i++){
//             tasks.get(i-1).putInfo("position", Integer.toString(i));
//         }
//     }
  assignPositionToTasks() {
    for (let i = 1; i <= this.tasks.length; i++) {
      this.tasks[i - 1].putInfo("position", i.toString())
    }
  }

//     public int getGamification(){
//         String attrRaw = getInfo("attr");
//         int gamification = 0;
//         if(attrRaw != null){
//             try{
//                 JSONObject attr = new JSONObject(attrRaw);
//                 gamification = attr.getInt("gamification");
//             }
//             catch (Exception e){
//                 e.printStackTrace();
//             }
//         }
//         return  gamification;
//     }
  getGamification() {
    const attrRaw = this.getInfo("attr")
    let gamification: number = 0
    if (attrRaw != null) {
      const attr = JSON.parse(attrRaw)
      gamification = +attr.gamification
    }

    return gamification
  }

//     /*
//     Calculate the boundingBox and Center of this taskSet
//     POINT A: MAX LAT, MAX LON (NORTH EAST)
//     POINT B: MIN LAT, MIN LON (SOUTH WEST)
//      */
//     protected void calcBoundingBoxAndCenter() {
//         // 0.001 entspricht etwa einem Padding von 150m
//         double padding = 0.0015;
//         JSONArray jsonBB = Helper.getJSONArray(getInfo("bounding_box"));
//         JSONArray jsonCenter = Helper.getJSONArray(getInfo("center"));
//         try {
//             JSONArray northWest = jsonBB.getJSONArray(0);
//             JSONArray southEast = jsonBB.getJSONArray(1);

//             // North east
//             double south = southEast.getDouble(0) - padding;
//             double north = northWest.getDouble(0) + padding;

//             //South west
//             double west = northWest.getDouble(1) - padding;
//             double east = southEast.getDouble(1) + padding;

//             this.viewBoundingBox = new BoundingBox(northWest.getDouble(0), southEast.getDouble(1), southEast.getDouble(0), northWest.getDouble(1));
//             this.boundingBox = new BoundingBox(north, east, south, west);
//             this.center = new GeoPoint(jsonCenter.getDouble(0), jsonCenter.getDouble(1));
//         } catch (JSONException e) {
//             e.printStackTrace();
//         }
//     }


//     // Get Calculated Boundingbox / Center
//     public BoundingBox getBoundingBox() {
//         return this.boundingBox;
//     }
  get BoundingBox(): any {
    return this.boundingBox
  }

//     public BoundingBox getViewBoundingBox() {
//         return this.viewBoundingBox;
//     }
  get ViewBoundingBox(): any {
    return this.viewBoundingBox
  }

//     public GeoPoint getCenter() {
//         return this.center;
//     }
  get Center(): any {
    return this.center
  }

//     public Bitmap getFullwidthImg(final Context context){
//         Activity a = (Activity) context;
//         // Set Icon if available
//         // Prepare Image
//         Bitmap image = null;
//         String imgPath = getInfo("image");
//         // Check if image exists
//         if (!imgPath.equals("")) {
//             String imgName = imgPath.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "");
//             File file = context.getFileStreamPath(imgName);
//             if (file.exists()) {
//                 // Get scaled version of image to save memory and performance
//                 Display display = a.getWindowManager().getDefaultDisplay();
//                 Point size = new Point();
//                 display.getSize(size);
//                 int width = size.x;
//                 int height = (int) size.y / 3;
//                 image = Helper.decodeSampledBitmapFromFile(file, width, 500);
//             }
//         }
//         return image;
//     }

//     public void initTasks(Context context){
//         if(tasks.size() == 0){
//             DB_Handler dbh = DB_Handler.getInstance(context);
//             ArrayList<String> taskIds = dbh.getRouteTaskIds(Integer.toString(getId()));
//             for(String taskId : taskIds){
//                 addTask(dbh.getMathTaskById(Integer.valueOf(taskId)));
//             }
//         }
//     }
// initTasks() {
//   if (this.tasks.length == 0) {
//     const dbh: DB_Handler = DB_Handler.getInstance()
//     let taskIds = dbh.getRouteTaskIds(this.Id.toString())
//   }
// }

//     public String getDetailsAsString(final Context context){
//         // If tasks have not been initialized yet
//         initTasks(context);
//         // Prepare Route Information as HTML
//         String detailsHtml =
//                 "<html><head><meta charset='UTF-8' /></head><body style='font-size:smaller'><h3>###HEADLINE###</h3>" +
//                         "<b>###PLACE###</b><br />" +
//                         "###PLACE_INFO###<hr />" +
//                         "<b>###TASKCOUNT###</b><br />" +
//                         "###TASKCOUNT_INFO###<hr />" +
//                         "<b>###DURATION###</b><br />" +
//                         "###DURATION_INFO###<hr />" +
//                         "<b>###LENGTH###</b><br />" +
//                         "###LENGTH_INFO###<hr />" +
//                         "<b>###GRADE###</b><br />" +
//                         "###GRADE_INFO###<hr />" +
//                         "<b>###EQUIP###</b><br />" +
//                         "###EQUIP_INFO###<hr/>" +
//                         "<b>###TAGS###</b><br />" +
//                         "###TAGS_INFO###" +
//                         "</body></html>";

//         // Replace with real info
//         detailsHtml = detailsHtml.replace("###HEADLINE###", context.getText(R.string.r_about));
//         detailsHtml = detailsHtml.replace("###PLACE###", context.getText(R.string.r_place));
//         detailsHtml = detailsHtml.replace("###TASKCOUNT###", context.getText(R.string.r_taskcount));
//         detailsHtml = detailsHtml.replace("###GRADE###", context.getText(R.string.r_level));
//         detailsHtml = detailsHtml.replace("###DURATION###", context.getText(R.string.r_duration));
//         detailsHtml = detailsHtml.replace("###LENGTH###", context.getText(R.string.r_length));
//         detailsHtml = detailsHtml.replace("###EQUIP###", context.getText(R.string.r_equip));
//         detailsHtml = detailsHtml.replace("###TAGS###", context.getText(R.string.r_tags));

//         detailsHtml = detailsHtml.replace("###PLACE_INFO###", getInfo("country_code") + ", " + getInfo("city"));
//         detailsHtml = detailsHtml.replace("###TASKCOUNT_INFO###", getInfo("taskCount") + "");
//         detailsHtml = detailsHtml.replace("###DURATION_INFO###", getInfo("duration"));
//         detailsHtml = detailsHtml.replace("###LENGTH_INFO###", getInfo("length"));
//         detailsHtml = detailsHtml.replace("###GRADE_INFO###", getInfo("grade"));
//         detailsHtml = detailsHtml.replace("###TAGS_INFO###", getInfo("tags"));

//         // Gather required equipment
//         ArrayList<String> equipmentList = new ArrayList<String>();
//         for (MathTask task : getTasks()) {
//             // Deserialize Equipment php array and add to array
//             try {
//                 JSONArray equip = Helper.getJSONArray(task.getInfo("assistive_equipment"));
//                 if (equip == null) {
//                     continue;
//                 }
//                 for (int i = 0; i < equip.length(); i++) {
//                     String item = equip.getString(i);
//                     if (item.endsWith("\"")) {
//                         item = item.substring(0, item.length() - 1);
//                     }
//                     if (!equipmentList.contains(item)) {
//                         equipmentList.add(item);
//                     }
//                 }
//             } catch (Exception e) {
//                 e.printStackTrace();
//             }
//         }

//         String equipHtml = "<ul>";
//         for (String item : equipmentList) {
//             equipHtml += "<li>" + item + "</li>";
//         }
//         equipHtml += "</ul>";

//         detailsHtml = detailsHtml.replace("###EQUIP_INFO###", equipHtml);

//         return detailsHtml;
//     }

//     public void showRouteDetails(final Context context) {
//         initTasks(context);
//         Activity a = (Activity) context;
//         // Prepare AlertDialog
//         AlertDialog.Builder builder = new AlertDialog.Builder(context);
//         builder.setTitle(getInfo("title"));

//         LayoutInflater inflater = (LayoutInflater) context
//                 .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
//         RelativeLayout rl = (RelativeLayout) inflater.inflate(R.layout.content_route_detail, null, false);

//         // Get the Views
//         final WebView wv_details = (WebView) rl.findViewById(R.id.wv_route_details);
//         ImageView iv_icon = (ImageView) rl.findViewById(R.id.iv_routeIcon);

//         // Set Icon if available
//         // Check if image exists
//         Bitmap titleImage = getFullwidthImg(context);
//         if(titleImage != null){
//             iv_icon.setImageBitmap(titleImage);
//         }


//         // Set to webview

//         wv_details.loadDataWithBaseURL(null, getDetailsAsString(context), "text/html", "UTF-8", null);

//         builder.setView(rl);
//         final boolean downloaded = isDownloaded();
//         int positiveButtonRes = R.string.btn_dl;

//         if (downloaded) {
//             positiveButtonRes = R.string.btn_show;
//         }

//         /*
//         Button: Route downloaden oder anzeigen
//          */
//         builder.setPositiveButton(positiveButtonRes, new DialogInterface.OnClickListener() {
//             public void onClick(DialogInterface dialog, int id) {
//                 if (downloaded) {
//                     setActiveRoute();
//                     start(context);
//                 } else {
//                     downloadMap(context);
//                 }
//             }
//         });
//         /*
//         Button: Routendaten entfernen
//          */
//         if (downloaded) {
//             builder.setNeutralButton(R.string.r_remove,
//                     new DialogInterface.OnClickListener() {
//                         public void onClick(DialogInterface dialog, int id) {
//                             deleteRouteCache(context);
//                             dialog.cancel();
//                         }
//                     });

//         }
//         /*
//         Button Details schließen
//          */
//         builder.setNegativeButton(R.string.alert_close, new DialogInterface.OnClickListener() {
//             @Override
//             public void onClick(DialogInterface dialog, int which) {
//                 dialog.cancel();
//             }
//         });
//         AlertDialog dialog = builder.create();
//         dialog.show();
//     }

  downloadMap() {
    if (Helper.isOnline) {
      const divElem = new HTMLDivElement()
      divElem.style.width = Helper.windowWidth.toString()
      divElem.style.height = Helper.windowHeight.toString()
      const corner1 = L.latLng(40.712, -74.227)
      const corner2 = L.latLng(40.774, -74.125)
      const bounds: L.latLngBounds = L.latLngBounds(corner1, corner2)
      let mv = L.map(divElem, {
        maxBounds: bounds
      });
    }
  }
//     public void downloadMap(final Context context) {
//         if(MCMPermission.askPermWrite(context)){
//             Helper.routeToDownload = this;
//             // Keine Berechtigungen Daten zu speichern
//         }
//         else{
//             // Berechtigungen sind vorhanden
//             if(Helper.isOnline() || Helper.isOnlineNetworkState(context)){
//                 // Create Mapview and set source
//                 MapView mv = new MapView(context);

//                 TileSourceFactory.addTileSource(Helper.mbTileSource);
//                 mv.setTileSource(Helper.mbTileSource);

//                 final BoundingBox bbox = getBoundingBox();

//                 // final RouteDownloader rdl = new RouteDownloader(mv, this);
//                 /*
//                 Geändert in 1.82 - Update von Osmdroid auf 1.6.5
//                  */
//                 final CacheManagerMCM cacheManager = new CacheManagerMCM(mv, this);
//                 final int min_zoom = 18;
//                 final int max_zoom = 19;
//                 int max_tiles = cacheManager.possibleTilesInArea(bbox, min_zoom, max_zoom);

//                 // Lade nur direkt runter, wenn Karte nicht zu groß ist, ansonsten soll der User zunächst gefragt werden.
//                 if(max_tiles < 700){
//                     cacheManager.downloadAreaAsync(context, bbox, min_zoom, max_zoom);
//                 }
//                 else{
//                     String message = context.getText(R.string.alert_bigmap_msg).toString().replace("###TILES###", Integer.toString(max_tiles));
//                     AlertDialog.Builder builder = new AlertDialog.Builder(context);
//                     builder.setTitle(R.string.alert_bigmap_title);
//                     builder.setMessage(message);
//                     builder.setPositiveButton(R.string.yes, new DialogInterface.OnClickListener() {
//                         @Override
//                         public void onClick(DialogInterface dialog, int which) {
//                             cacheManager.downloadAreaAsync(context, bbox, min_zoom, max_zoom);
//                         }
//                     });
//                     builder.setNegativeButton(R.string.no, new DialogInterface.OnClickListener() {
//                         @Override
//                         public void onClick(DialogInterface dialog, int which) {
//                             dialog.cancel();
//                         }
//                     });
//                     builder.show();
//                 }
//             }
//             else{
//                 Toast.makeText(context, context.getString(R.string.toast_need_internet), Toast.LENGTH_LONG).show();
//             }
//         }
//     }


//     public void setActiveRoute(){
//         Helper.activeRoute = this;
//     }

//     public void start(Context context) {
//         initTasks(context);
//         Helper.activeRoute = this;
//         if(!Helper.user.hasScoreForRoute(getId())){
//             Helper.user.createNewScore(context, getId());
//             Helper.user.initScores(context);
//         }
//         Activity a = (Activity) context;
//         Intent intent = new Intent(a, OsmViewActivity.class);
//         // intent.putExtra(Helper.MCM_PASS_ROUTE, this);
//         a.startActivity(intent);
//     }

//     public void deleteRouteCache(Context context) {
//         if(Helper.studie){
//             return;
//         }
//         // Delete map
//         try {
//             //System.out.println("Deleting map data");
//             MapView mapView = new MapView(context);
//             mapView.setTileSource(Helper.mbTileSource);
//             CacheManagerMCM cm = new CacheManagerMCM(mapView, this);
//             BoundingBox bbox = getBoundingBox();
//             cm.cleanAreaAsync(context, bbox, 18, 19);
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }

//     public void deleteData(Context context){
//         initTasks(context);
//         DB_Handler dbh = DB_Handler.getInstance(context);
//         // Delete Images belonging only to this route (only taskimages)
//         try {
//             //System.out.println("Deleting images for route " + route.getId());
//             // Collect imageFiles belonging to the route
//             final ArrayList<String> routeImageFiles = new ArrayList<String>();
//             for (MathTask t : getTasks()) {
//                 // Delete only, if the number of routes, that use this task and have been
//                 // downloaded is 1. So only this route is using it
//                 if (dbh.getTaskRels(Integer.toString(t.getId())) == 1) {
//                     String imageFile = t.getInfo("image");
//                     if (!imageFile.equals("")) {
//                         imageFile = imageFile.replace("mcm_images/tasks/", "");
//                         routeImageFiles.add(imageFile);
//                     }
//                 }
//             }
//             File dir = context.getFilesDir();
//             File[] imageFiles = dir.listFiles(new FilenameFilter() {
//                 @Override
//                 public boolean accept(File dir, String filename) {
//                     // List only files with .jpg, .png, .gif ending and those
//                     // that belong to the given route
//                     return (routeImageFiles.contains(filename));
//                 }
//             });
//             for (File f : imageFiles) {
//                 context.deleteFile(f.getName());
//             }
//         } catch (Exception e) {
//             e.printStackTrace();
//         }

//         // Delete State (reset it)
//         dbh.resetRouteDlStateById(Integer.toString(getId()));
//         dbh.deleteScore(getId());

//         RoutesOverviewActivity r = (RoutesOverviewActivity) context;
//         if (r != null) {
//             //r.refreshPage();
//             r.refreshFooter(this);
//             if(r.getCurrentTab() == 1){
//                 r.refreshList(-1);
//             }
//         }
//     }

//     public boolean isDownloaded() {
//         return downloaded;
//     }

//     public boolean isDownloaded(Context context){
//         DB_Handler dbh = DB_Handler.getInstance(context);
//         return dbh.isOptionAvailable(DBC.ON_ROUTE_DATA, String.valueOf(getId()));
//     }

//     public void refreshTasks(Context context) {
//         DB_Handler dbh = DB_Handler.getInstance(context);
//         for (int i = 0; i < tasks.size(); i++) {
//             tasks.set(i, dbh.getMathTaskById(tasks.get(i).getId()));
//         }
//     }

//     public void putInfo(String key, String value) {
//         this.info.put(key, value);
//     }

//     public String getInfo(String key) {
//         return this.info.get(key);
//     }
getInfo(key: string): string {
  return this.info.getValue(key)
}

//     public void addTask(MathTask t) {
//         this.tasks.add(t);
//     }

//     /*
//     Call this function, if all MathTasks have been added. The Boundingbox and center will be calculated and Route is set to ready
//      */
//     public void makeReady() {
//         calcBoundingBoxAndCenter();
//         setReady(true);
//     }

//     // Getter + Setter

//     public void setTasks(ArrayList<MathTask> _tasks) {
//         this.tasks = _tasks;
//         calcBoundingBoxAndCenter();
//     }

//     public ArrayList<MathTask> getTasks() {
//         return this.tasks;
//     }

//     public void setTitle(String _name) {
//         this.title = _name;
//     }

//     public String getTitle() {
//         return this.title;
//     }

//     public int getId() {
//         return id;
//     }
get Id(): number {
  return this.id
}

//     public void setId(int id) {
//         this.id = id;
//     }
set Id(id: number) {
  this.id = id
}

//     public Map<String, String> getInfoMap() {
//         return info;
//     }

//     public void setInfoMap(Map<String, String> info) {
//         this.info = info;
//     }

//     public boolean isReady() {
//         return ready;
//     }

//     public void setReady(boolean ready) {
//         this.ready = ready;
//     }

}
