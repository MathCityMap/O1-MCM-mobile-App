import * as Collections from 'typescript-collections'

// let Dictionary = Collections.Dictionary

export class MathTask {
    // // Location
    // protected double lat;
    // protected double lon;
    // protected int id;
    // // Information about the task: Aufgabenstellung, Hinweise, Lösung etc.
    // protected Map<String, String> info = new HashMap<String, String>();
    // protected boolean solved = false;
    // protected boolean solved_low = false;
    // protected ArrayList<Integer> displayedHints = new ArrayList<Integer>();
    // protected JSONObject flags = new JSONObject();

  protected id: number
  protected info: Collections.Dictionary<string, string> = new Collections.Dictionary<string, string>()
  protected solved: boolean = false
  protected solved_low: boolean = false
  protected displayedHints: Array<number> = new Array<number>()
  protected flags: Collections.Dictionary<string, string> = new Collections.Dictionary<string, string>()

  constructor(protected lat: number, protected lon: number) {}

    // public MathTask( double _lat, double _lon ){
    //     this.lat = _lat;
    //     this.lon = _lon;
    // }

    // /*
    // In den Flags werden Zustände für eine Aufgabe gespeichert.
    // Bspw. ob Hinweise aufgerufen wurden etc.
    // Die Klasse 'Score' verwaltet für einen Trail alle Aufgaben-Flags
    //  */
    // public void initFlags(){
    //     // Default flags, use if no flags saved
    //     try{
    //         flags.put("solved", "0");
    //         flags.put("solved_low", "0");
    //         flags.put("hint1", "0");
    //         flags.put("hint2", "0");
    //         flags.put("hint3", "0");
    //         flags.put("tries", "0");
    //         flags.put("answer", "");
    //         flags.put("time_first_open", "");
    //         flags.put("time_solved", "");
    //         flags.put("score", "0");
    //         flags.put("penalty", "0");
    //         flags.put("gpsFeedback", "");
    //         flags.put("gpsPoints", "");
    //     }catch (Exception e){e.printStackTrace();}
    // }
    initFlags() {
      this.flags = new Collections.Dictionary<string, string>()
      this.flags.setValue("solved", "0")
      this.flags.setValue("solved_low", "0")
      this.flags.setValue("hint1", "0")
      this.flags.setValue("hint2", "0")
      this.flags.setValue("hint3", "0")
      this.flags.setValue("tries", "0")
      this.flags.setValue("answer", "")
      this.flags.setValue("time_first_open", "")
      this.flags.setValue("time_solved", "")
      this.flags.setValue("score", "0")
      this.flags.setValue("penalty", "0")
      this.flags.setValue("gpsFeedback", "")
      this.flags.setValue("gpsPoints", "")
    }

    // public JSONObject getFlags(){
    //     return flags;
    // }
    getFlags(): Collections.Dictionary<string, string> {
      return this.flags
    }

    // public void setFlags(JSONObject flags){
    //     this.flags = flags;
    // }
    setFlasgs(flags: Collections.Dictionary<string, string>) {
      this.flags = flags
    }

    // public String getFlag(String key){
    //     try{
    //         return flags.getString(key);
    //     }catch (Exception e){e.printStackTrace(); return null;}
    // }
    getFlag(key: string): string {
      const value = this.flags.getValue(key)
      if (value == undefined) {
        return null
      }

      return value
    }

    // public boolean isFlagSet(String key){
    //     try{
    //         if(flags.has(key)){
    //             if(flags.getString(key).equals("1")){
    //                 return true;
    //             }
    //             else{
    //                 return false;
    //             }
    //         }
    //         else{
    //             return false;
    //         }
    //     }catch (Exception e){e.printStackTrace(); return false;}
    // }
    isFlagSet(key: string): boolean {
      if (this.flags.containsKey(key)) {
        return this.flags.getValue(key) == "1"
      } else {
        return false
      }
    }

    // public void setFlag(String key, String value){
    //     try{
    //         flags.put(key, value);
    //     }catch (Exception e){e.printStackTrace();}
    // }
    setFlag(key: string, value: string) {
      this.flags.setValue(key, value)
    }

    // public void addPointToFlags(GeoPoint point, String title){
    //     try{
    //         JSONObject pointsObject;
    //         if(getFlag("gpsPoints").equals("")){
    //             pointsObject = new JSONObject();
    //         }
    //         else{
    //             pointsObject = new JSONObject(getFlag("gpsPoints"));
    //         }
    //         JSONArray pointCoordinates = new JSONArray();
    //         pointCoordinates.put(point.getLatitude());
    //         pointCoordinates.put(point.getLongitude());
    //         pointsObject.put(title, pointCoordinates);
    //         setFlag("gpsPoints", pointsObject.toString());
    //     }
    //     catch (Exception e){
    //         e.printStackTrace();
    //     }
    // }
    addPointToFlags(point: any, title: string) {
      let pointsObject
      const gpsPoints = this.getFlag("gpsPoints")

      if (gpsPoints == "") {
        pointsObject = {}
      } else {
        pointsObject = JSON.parse(gpsPoints)
      }

      const pointCoordinates = [point.latitude, point.longitude]
      pointsObject[title] = pointCoordinates
      this.setFlag("gpsPoints", JSON.stringify(pointsObject))
    }

    // public GeoPoint getPointFromFlags(String title){
    //     try{
    //         JSONObject pointsObject;
    //         if(getFlag("gpsPoints").equals("")){
    //             return null;
    //         }
    //         else{
    //             pointsObject = new JSONObject(getFlag("gpsPoints"));
    //         }
    //         JSONArray pointCoordinates = pointsObject.getJSONArray(title);
    //         return new GeoPoint(pointCoordinates.getDouble(0), pointCoordinates.getDouble(1));
    //     }
    //     catch (Exception e){
    //         e.printStackTrace();
    //         return null;
    //     }
    // }
    getPointFromFlags(title: string): object {
      let pointsObject
      const gpsPoints = this.getFlag("gpsPoints")
      if (gpsPoints == null || gpsPoints == "") {
        return null
      } else {
        pointsObject = JSON.parse(gpsPoints)
      }

      if (pointsObject == null) {
        return null
      }

      const pointCoordinates = pointsObject[title]
      if (typeof pointCoordinates == undefined) {
        return null
      }

      return {latitude: pointCoordinates[0], longitude: pointCoordinates[1]}
    }

    // public void parseFlags(){
    //     if(isFlagSet("solved")){
    //         solved = true;
    //     }
    //     else{
    //         solved = false;
    //     }

    //     if(isFlagSet("solved_low")){
    //         solved_low = true;
    //     }
    //     else{
    //         solved_low = false;
    //     }

    //     if(isFlagSet("hint1")){
    //         addDisplayedHint(0);
    //     }
    //     if(isFlagSet("hint2")){
    //         addDisplayedHint(1);
    //     }
    //     if(isFlagSet("hint3")){
    //         addDisplayedHint(2);
    //     }
    // }
    parseFlags() {
      this.solved = this.isFlagSet("solved")
      this.solved_low = this.isFlagSet("solved_low")
      
      if (this.isFlagSet("hint1")) {
        this.addDisplayedHint(0)
      }
      if (this.isFlagSet("hint2")) {
        this.addDisplayedHint(1)
      }
      if (this.isFlagSet("hint3")) {
        this.addDisplayedHint(2)
      }
    }

    // public GeoPoint getGeoPoint(){
    //     return new GeoPoint(lat, lon);
    // }
    getGeoPoint(): object {
      return {latitude: this.lat, longitude: this.lon}
    }

    // public void putInfo( String key, String value ){
    //     this.info.put( key, value );
    // }
    putInfo(key: string, value: string) {
      this.info.setValue(key, value)
    }

    // public String getInfo( String key ){
    //     if(info.containsKey(key)){
    //         return this.info.get( key );
    //     }
    //     else{
    //         return null;
    //     }
    // }
    getInfo(key: string): string {
      if (this.info.containsKey(key)) {
        return this.info.getValue(key)
      } else {
        return null
      }
    }

    // public void removeInfo( String key ){
    //     if(info.containsKey(key)){
    //         info.remove(key);
    //     }
    // }
    removeInfo(key: string) {
      this.info.remove(key)
    }

    // public void addDisplayedHint(Integer i){
    //     this.displayedHints.add(i);
    // }
    addDisplayedHint(i: number) {
      this.displayedHints.push(i)
    }

    // /*
    // Für Aufgaben des Typs "gps", gibt diese Funktion die Details der Aufgabe zurück,
    // ansonsten null
    // @return Nullable JSONObject
    //  */
    // public JSONObject getGpsTaskDetails(){
    //     if(getInfo("solution_type").equals("gps")){
    //         try{
    //             return new JSONObject(getInfo("solution"));
    //         }
    //         catch (Exception e){
    //             e.printStackTrace();
    //             return null;
    //         }
    //     }
    //     else{
    //         return null;
    //     }
    // }
    getGpsTaskDetails(): object {
      if (this.getInfo("solution_type") == "gps") {
        return JSON.parse(this.getInfo("solution"))
      } else {
        return null
      }
    }

    // // Standard getter & setter

    // public int getId(){
    //     return id;
    // }
    get Id(): number {
      return this.id
    }

    // public void setId(int id){
    //     this.id = id;
    // }
    set Id(id: number) {
      this.id = id
    }

    // public double getLat() {
    //     return lat;
    // }
    get Lat(): number {
      return this.lat
    }

    // public void setLat(double lat) {
    //     this.lat = lat;
    // }
    set Lat(lat: number) {
      this.lat = lat
    }

    // public double getLon() {
    //     return lon;
    // }
    get Lon(): number {
      return this.lon
    }

    // public void setLon(double lon) {
    //     this.lon = lon;
    // }
    set Lon(lon: number) {
      this.lon = lon
    }

    // public Map<String, String> getInfoMap() {
    //     return info;
    // }
    get Info(): Collections.Dictionary<string, string> {
      return this.info
    }

    // public void setInfoMap(Map<String, String> info) {
    //     this.info = info;
    // }
    set Info(info: Collections.Dictionary<string,string>) {
      this.info = info
    }

    // public boolean isSolved() {
    //     return solved;
    // }
    get Solved(): boolean {
      return this.solved
    }

    // public void setSolved(boolean solved) {
    //     this.solved = solved;
    // }
    set Solved(solved: boolean) {
      this.solved = solved
    }

    // public boolean isSolvedLow() {
    //     return solved_low;
    // }
    get SolvedLow(): boolean {
      return this.solved_low
    }

    // public void setSolvedLow(boolean solvedLow) {
    //     this.solved_low = solvedLow;
    // }
    set SolvedLow(solved_low: boolean) {
      this.solved_low = solved_low
    }

    // public ArrayList<Integer> getDisplayedHints() {
    //     return displayedHints;
    // }
    get DisplayedHints(): Array<number> {
      return this.displayedHints
    }
}
