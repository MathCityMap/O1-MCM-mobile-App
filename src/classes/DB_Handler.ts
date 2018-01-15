import { SQLite, SQLiteObject, SQLiteDatabaseConfig } from '@ionic-native/sqlite'
import { DBC } from './DBC'
import * as Collections from 'typescript-collections'
import { MathTask } from './MathTask';
import { MathRoute } from './MathRoute';
import { checkAvailability } from "@ionic-native/core";

declare var openDatabase: any;

class WebSQLObject extends SQLiteObject {
  constructor() {
    super(openDatabase('mcm', '1.0', 'MCM DB', 2 * 1024 * 1024));
  }

  executeSql(statement: string, params: any): Promise<any> {
    return new Promise<SQLiteObject>((resolve, reject) => {
      this._objectInstance.transaction(function (tx) {
        console.log(statement);
        tx.executeSql(statement, params, function (tx, results) {
          resolve(results);
        }, function (tx, error) {
          reject(error);
        });
      });
    });
  }
}

class WebSQL extends SQLite {
  create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    return new Promise<SQLiteObject>((resolve, reject) => {
      resolve(new WebSQLObject());
    });
  }
}

export class DB_Handler {
  private static mInstance: DB_Handler = null
  private mSQLite: SQLite = null
  private mDB: SQLiteObject = null
  private mReady: boolean = false
  private cache = {}


  public static getInstance(): DB_Handler {
    if (this.mInstance === null) {
      this.mInstance = new DB_Handler();
    }

    return this.mInstance
  }

  private constructor() { }

  ready(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.mReady) {
        resolve();
      }
      this.mSQLite = checkAvailability(SQLite.getPluginRef(), null, SQLite.getPluginName()) === true ? new SQLite() : new WebSQL();
      this.mSQLite.create({
        name: 'mcm_db.sqlite3',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.mDB = db
          this.mReady = true;
          console.log('Connected to DB')
          // it's ok to always run onCreate because SQL has IF EXISTS
          this.onCreate().then(() => {
            this.mReady = true;
            resolve()
          })
        })
        .catch(e => {
          console.error('Error connecting to DB', JSON.stringify(e))
          reject(e)
        });
    })
  }

  private onCreate(): Promise<void> {
    // Create Tables
    let CREATE_STATE_TABLE: string = DBC.DB_STATE.getCreateStatement()
    let CREATE_TASK_TABLE: string = DBC.DB_TASK.getCreateStatement()
    let CREATE_ROUTE_TABLE: string = DBC.DB_ROUTE.getCreateStatement()
    let CREATE_RELROUTETASK_TABLE: string = DBC.DB_RELROUTETASK.getCreateStatement()
    let CREATE_USERS_TABLE: string = DBC.DB_USERS.getCreateStatement()
    let CREATE_SCORE_TABLE: string = DBC.DB_SCORE.getCreateStatement()

    return new Promise<void>((resolve, reject) => {
      Promise.all<void>([
        this.mDB.executeSql(CREATE_STATE_TABLE, null),
        this.mDB.executeSql(CREATE_TASK_TABLE, null),
        this.mDB.executeSql(CREATE_ROUTE_TABLE, null),
        this.mDB.executeSql(CREATE_RELROUTETASK_TABLE, null),
        this.mDB.executeSql(CREATE_USERS_TABLE, null),
        this.mDB.executeSql(CREATE_SCORE_TABLE, null)
      ]).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })


  }

  onUpgrade(oldVersion: number, newVersion: number): Promise<void> {
    this.cache = {}
    return new Promise<void>((resolve, reject) => {
      Promise.all([
        this.mDB.executeSql("DROP TABLE IF EXISTS " + DBC.DATABASE_TABLE_STATE, null),
        this.mDB.executeSql("DROP TABLE IF EXISTS " + DBC.DATABASE_TABLE_TASK, null),
        this.mDB.executeSql("DROP TABLE IF EXISTS " + DBC.DATABASE_TABLE_ROUTE, null),
        this.mDB.executeSql("DROP TABLE IF EXISTS " + DBC.DATABASE_TABLE_REL_ROUTE_TASK, null),
        this.mDB.executeSql("DROP TABLE IF EXISTS " + DBC.DATABASE_TABLE_USERS, null),
        this.mDB.executeSql("DROP TABLE IF EXISTS " + DBC.DATABASE_TABLE_SCORE, null),
      ]).then(() => {
        this.onCreate().then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      }).catch((error) => { reject(error) })
    })
  }

  protected initTableVersions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let sql = `INSERT INTO ${DBC.DATABASE_TABLE_STATE} (${DBC.DB_STATE.fields[1]},${DBC.DB_STATE.fields[2]}) VALUES (?,?)`
      Promise.all([
        this.mDB.executeSql(sql, ["version_task", "0"]),
        this.mDB.executeSql(sql, ["version_route", "0"]),
        this.mDB.executeSql(sql, ["version_rel_route_task", "0"])
      ]).then(() => {
        resolve()
      }).catch(reject)
    })
  }

  // TODO:
  /*
  Get the table versions in a hashmap
   */
  private _getTableVersions(data: any): Collections.Dictionary<string, string> {
    var result = new Collections.Dictionary<string, string>()
    for (var i = 0; i < data.rows.length; i++) {
      var row = data.rows.item(i);
      result.setValue(row.option, row.value)
    }

    return result
  }

  getDB(): SQLiteObject {
    return this.mDB;
  }

  getTableVersions(): Promise<Collections.Dictionary<string, string>> {
    return new Promise<Collections.Dictionary<string, string>>((resolve, reject) => {
      let sqlQuery = `SELECT ${DBC.DB_STATE.fields[1]},${DBC.DB_STATE.fields[2]} FROM ${DBC.DATABASE_TABLE_STATE}`

      this.mDB.executeSql(sqlQuery, [])
        .then(result => {
          console.log("TABLE VERSIONS:", result.rows.length)
          // console.log(JSON.stringify(result.rows.item(1).option))
          if (result.rows.length == 0) {
            console.warn("ZERO RESULTS: call initTableVersions")
            this.initTableVersions().then(() => {
              console.log("RECEIVED RESULTS, REPEATING SQL")
              this.mDB.executeSql(sqlQuery, []).then(result => {
                console.log("RECEIVED RESULTS", result.rows.length)
                resolve(this._getTableVersions(result))
              }).catch(reject)
            }).catch(reject)
          } else {
            // we have results
            resolve(this._getTableVersions(result))
          }
        })
        .catch(error => {
          console.error("DB_Handler.getTableVersions(): Error:", error)
          reject(error)
        })
    })
  }

  // TODO:
  /*
  Get row count of option - value from STATE (row count == 0: this option is not set, else: option is set)
  For example: isOptionAvailable(DBC.ON_ROUTE_DATA, "8") > Is the data (map, images) for route with id 8 downloaded
   */
  // public boolean isOptionAvailable(String optionName, String value){
  //  SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //  try{

  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_STATE, null, "option = ? AND value = ?", new String[]{optionName, value}, null, null, null);

  //   if (cursor.getCount() == 0){
  //    //System.out.println("Checking if option: " + optionName + " is available for value " + value + ". False");
  //    cursor.close();
  //    return false;
  //   }
  //   else{
  //    //System.out.println("Checking if option: " + optionName + " is available for value " + value + ". True");
  //    cursor.close();
  //    return true;
  //   }
  //  }
  //  catch(Exception e){
  //   e.printStackTrace();
  //  }
  //  finally {

  //  }
  //  return false;
  // }
  isOptionAvailable(optionName: string, value: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.mDB.executeSql(`SELECT * FROM ${DBC.DATABASE_TABLE_STATE} WHERE option=? AND value=?`, [optionName, value]).then(result => {
        if (result.rows.length == 0) {
          resolve(false)
        } else {
          resolve(true)
        }
      }).catch(error => reject(error))
    })
  }

  //  public String getOptionValue(String optionName){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   try{

  //    Cursor cursor = db.query(DBC.DATABASE_TABLE_STATE, null, "option = ?", new String[]{optionName}, null, null, null);

  //    if (cursor.getCount() == 0){
  //  //System.out.println("Checking if option: " + optionName + " is available for value " + value + ". False");
  //  cursor.close();
  //  return null;
  //    }
  //    else{
  //  //System.out.println("Checking if option: " + optionName + " is available for value " + value + ". True");
  //  cursor.moveToFirst();
  //  String val = cursor.getString(2);
  //  cursor.close();
  //  return val;
  //    }
  //   }
  //   catch(Exception e){
  //    e.printStackTrace();
  //   }
  //   finally {

  //   }
  //   return null;
  //  }

  //  /*
  //  Adds option to state table
  //  @param optionName - Name of the option
  //  @param value
  //   */
  //  public void setOption(String optionName, String value){
  //   if(!isOptionAvailable(optionName, value)){
  //    SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //    try{
  //  ContentValues row = new ContentValues();
  //  row.put(DBC.DB_STATE.fields[1], optionName);
  //  row.put(DBC.DB_STATE.fields[2], value);
  //  db.insert(DBC.DATABASE_TABLE_STATE, null, row);
  //  //System.out.println("Inserted option: " + optionName + " with value " + value);
  //    }
  //    catch(Exception e){
  //  e.printStackTrace();
  //    }
  //    finally {

  //    }
  //   }
  //  }

  setOption(optionName: String, value: String): void {
    this.mDB.executeSql(`INSERT INTO ${DBC.DATABASE_TABLE_STATE} (${DBC.DB_STATE.fields[1]},${DBC.DB_STATE.fields[2]}) VALUES (?,?)`, [optionName, value]).catch(error => console.error(error))
  }
  //  public void updateOption(String optionName, String newValue){
  //   String oldVal = getOptionValue(optionName);
  //   if(oldVal != null){
  //    SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //    try{
  //  ContentValues row = new ContentValues();
  //  row.put(DBC.DB_STATE.fields[1], optionName);
  //  row.put(DBC.DB_STATE.fields[2], newValue);
  //  db.update(DBC.DATABASE_TABLE_STATE, row, DBC.DB_STATE.fields[1] + " = ?", new String[]{optionName});
  //    }
  //    catch (Exception e){
  //  e.printStackTrace();
  //    }
  //   }
  //   else{
  //    setOption(optionName, newValue);
  //   }
  //  }

  //  /*
  //  Deletes all entries with option = ON_ROUTE_DATA from table State
  //  Resetting download status of a MathRoute (ListView) - enable download again
  //   */
  //  public void resetRouteDlState(){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   try{
  //    db.delete(DBC.DATABASE_TABLE_STATE, "option = ?", new String[]{DBC.ON_ROUTE_DATA});
  //   }catch(Exception e){e.printStackTrace();}
  //   finally {

  //   }
  //  }

  //  /*
  // Deletes all entries with option = ON_ROUTE_PRIVATE_ACCESS from table State
  // Resetting status of private routes - access must be gained again via code
  //  */
  //  public void resetPrivateRoutesDlState(){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   try{
  //    db.delete(DBC.DATABASE_TABLE_STATE, "option = ?", new String[]{DBC.ON_ROUTE_PRIVATE_ACCESS});
  //   }catch(Exception e){e.printStackTrace();}
  //   finally {

  //   }
  //  }

  //  /*
  //  Deletes entry with option = ON_ROUTE_DATA from table State
  //  Resetting download status of a MathRoute (ListView) - enable download again
  //   */
  //  public void resetRouteDlStateById(String id){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   try{
  //    db.delete(DBC.DATABASE_TABLE_STATE, "option = ? AND value = ?", new String[]{DBC.ON_ROUTE_DATA, id});
  //   }catch(Exception e){e.printStackTrace();}
  //   finally {

  //   }
  //  }

  resetRouteDlStateById(id: String) {
    this.mDB.executeSql(`DELETE FROM ${DBC.DATABASE_TABLE_STATE} WHERE option = ? AND value = ?`, [DBC.ON_ROUTE_DATA, id]).catch(error => console.error(error))
  }
  //  /*
  //  Check the number of routes that use the task with taskId
  //  Use: To not delete images of task, if they belong to more than one route
  //  Only if the other routes have also been downloaded
  //  @param taskId Id of task to get number of relationsships back
  //  @return int number of rels
  //   */
  //  public int getTaskRels(String taskId){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   int result = 0;
  //   try{
  //    Cursor cursor = db.query(DBC.DATABASE_TABLE_REL_ROUTE_TASK, new String[]{"route_id", "task_id"}, "task_id = ?", new String[]{taskId}, null, null, null);
  //    cursor.moveToFirst();
  //    while(!cursor.isAfterLast()){
  //  int routeId = cursor.getInt(0);
  //  // Check if data for this route has been downloaded
  //  if(isOptionAvailable(DBC.ON_ROUTE_DATA, Integer.toString(routeId))){
  //   result++;
  //  }
  //  cursor.moveToNext();
  //    }
  //    cursor.close();
  //    return result;
  //   }catch(Exception e){e.printStackTrace(); return -1;}
  //   finally {

  //   }
  //  }
  getTaskRels(taskId: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      let count: number = 0

      this.mDB.executeSql(`SELECT route_id, task_id FROM ${DBC.DATABASE_TABLE_REL_ROUTE_TASK} WHERE task_id = ?`, [taskId]).then(result => {
        let promises = []
        for (let i = 0; i < result.rows.length; i++) {
          let cursor = result.rows.item(i)
          let routeId: number = +cursor.route_id
          promises.push(this.isOptionAvailable(DBC.ON_ROUTE_DATA, routeId.toString()).then(available => {
            if (available == true) {
              count++
            }
          }))
        }
        Promise.all(promises).then(() => {
          resolve(count)
        }).catch(error => {
          console.error(`getTaskRels: Error: ${JSON.stringify(error)}`)
          reject(error)
        })
      }).catch(error => {
        console.error(`getTaskRels: Error: ${JSON.stringify(error)}`)
        reject(error)
      })
    })
  }

  //  public void resetTaskStateById(String taskId){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   try{
  //    db.delete(DBC.DATABASE_TABLE_STATE, "option IN (?, ?, ?, ?, ?) AND value = ?", new String[]{DBC.ON_TASK_HINT1_TAKEN, DBC.ON_TASK_HINT2_TAKEN, DBC.ON_TASK_HINT3_TAKEN, DBC.ON_TASK_SOLVED, DBC.ON_TASK_SOLVED_LOW, taskId});
  //    /*
  //    db.delete(DBC.DATABASE_TABLE_STATE, "option = ? AND value = ?", new String[]{DBC.ON_TASK_HINT2_TAKEN, taskId});
  //    db.delete(DBC.DATABASE_TABLE_STATE, "option = ? AND value = ?", new String[]{DBC.ON_TASK_HINT3_TAKEN, taskId});
  //    db.delete(DBC.DATABASE_TABLE_STATE, "option = ? AND value = ?", new String[]{DBC.ON_TASK_SOLVED, taskId});
  //    */
  //   }catch(Exception e){e.printStackTrace();}
  //   finally {

  //   }
  //  }

  //  /*
  //  This will delete a score for a certain user and route_id, reseting all tasks
  //   */
  //  public void deleteScore(int route_id){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   try{
  //    db.delete(DBC.DATABASE_TABLE_SCORE, "user_id = ? AND route_id = ?", new String[]{Integer.toString(Helper.user.id), Integer.toString(route_id)});
  //   }catch(Exception e){e.printStackTrace();}
  //   finally {

  //   }
  //  }

  async getMathTaskById(id: number): Promise<MathTask> {
    return new Promise<MathTask>((resolve, reject) => {
      const sqlQry = `SELECT * FROM ${DBC.DATABASE_TABLE_TASK} WHERE _id=?`
      this.mDB.executeSql(sqlQry, [id]).then(result => {
        if (result.rows.length == 0) {
          resolve(null)
        } else {
          resolve(this.getMathTask(result.rows.item(0)))
        }
      }, error => {
        console.error(`getMathTaskById ERROR:`, JSON.stringify(error))
        reject(error)
      }
      ).catch(error => {
        console.error(`getMathTaskById ERROR:`, JSON.stringify(error))
        reject(error)
      })
    })
  }

  getMathTask(dbItem: any): MathTask {
    let t = new MathTask(+dbItem.lat, +dbItem.lon)
    t.Id = +dbItem._id
    t.putInfo(DBC.DB_TASK.fields[1], dbItem.user_id)
    t.putInfo(DBC.DB_TASK.fields[2], dbItem.public)
    t.putInfo(DBC.DB_TASK.fields[5], dbItem.title)
    t.putInfo(DBC.DB_TASK.fields[6], dbItem.description)
    t.putInfo(DBC.DB_TASK.fields[7], dbItem.image)
    t.putInfo(DBC.DB_TASK.fields[8], dbItem.solution_type)
    t.putInfo(DBC.DB_TASK.fields[9], dbItem.solution)
    t.putInfo(DBC.DB_TASK.fields[10], dbItem.hint1)
    t.putInfo(DBC.DB_TASK.fields[11], dbItem.hint2)
    t.putInfo(DBC.DB_TASK.fields[12], dbItem.hint3)
    t.putInfo(DBC.DB_TASK.fields[13], dbItem.assistive_equipment)
    t.putInfo(DBC.DB_TASK.fields[14], dbItem.author)
    t.putInfo(DBC.DB_TASK.fields[15], dbItem.mail)
    t.putInfo(DBC.DB_TASK.fields[16], dbItem.grade)
    t.putInfo(DBC.DB_TASK.fields[17], dbItem.tags)
    t.putInfo(DBC.DB_TASK.fields[18], dbItem.timestamp)
    t.putInfo(DBC.DB_TASK.fields[19], dbItem.solutionsample)
    t.putInfo(DBC.DB_TASK.fields[20], dbItem.attr)
    t.putInfo(DBC.DB_TASK.fields[21], dbItem.create_date)
    t.putInfo(DBC.DB_TASK.fields[22], dbItem.lang_code)
    return t
  }
  //  public MathTask getMathTaskById(int id){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_TASK, null, "_id = ?", new String[]{Integer.toString(id)}, null, null, null, null);
  //   cursor.moveToFirst();
  //   MathTask t = null;
  //   if(cursor.getCount() == 1){
  //    int _id = cursor.getInt(0);
  //    int user_id = cursor.getInt(1);
  //    String isPublic = cursor.getString(2);
  //    double lat = Double.parseDouble(cursor.getString(3));
  //    double lon = Double.parseDouble(cursor.getString(4));
  //    String title = cursor.getString(5);
  //    String desc = cursor.getString(6);
  //    String img_path = cursor.getString(7);
  //    String solution_type = cursor.getString(8);
  //    String solution = cursor.getString(9);
  //    String hint1 = cursor.getString(10);
  //    String hint2 = cursor.getString(11);
  //    String hint3 = cursor.getString(12);
  //    String assistive_equipment = cursor.getString(13);
  //    String author = cursor.getString(14);
  //    String mail = cursor.getString(15);
  //    String grade = cursor.getString(16);
  //    String tags = cursor.getString(17);
  //    String timestamp = cursor.getString(18);
  //    String solutionsample = cursor.getString(19);
  //    String attr = cursor.getString(20);
  //    String create_date = cursor.getString(21);
  //    String lang_code = cursor.getString(22);


  //    // Create MathTask
  //    t = new MathTask(lat, lon);
  //    t.setId(_id);
  //    t.putInfo(DBC.DB_TASK.fields[1], Integer.toString(user_id));
  //    t.putInfo(DBC.DB_TASK.fields[2], isPublic);
  //    t.putInfo(DBC.DB_TASK.fields[5], title);
  //    t.putInfo(DBC.DB_TASK.fields[6], desc);
  //    t.putInfo(DBC.DB_TASK.fields[7], img_path);
  //    t.putInfo(DBC.DB_TASK.fields[8], solution_type);
  //    t.putInfo(DBC.DB_TASK.fields[9], solution);
  //    t.putInfo(DBC.DB_TASK.fields[10], hint1);
  //    t.putInfo(DBC.DB_TASK.fields[11], hint2);
  //    t.putInfo(DBC.DB_TASK.fields[12], hint3);
  //    t.putInfo(DBC.DB_TASK.fields[13], assistive_equipment);
  //    t.putInfo(DBC.DB_TASK.fields[14], author);
  //    t.putInfo(DBC.DB_TASK.fields[15], mail);
  //    t.putInfo(DBC.DB_TASK.fields[16], grade);
  //    t.putInfo(DBC.DB_TASK.fields[17], tags);
  //    t.putInfo(DBC.DB_TASK.fields[18], timestamp);
  //    t.putInfo(DBC.DB_TASK.fields[19], solutionsample);
  //    t.putInfo(DBC.DB_TASK.fields[20], attr);
  //    t.putInfo(DBC.DB_TASK.fields[21], create_date);
  //    t.putInfo(DBC.DB_TASK.fields[22], lang_code);
  //   }
  //   cursor.close();
  //   return t;
  //  }

  //  public String getTaskTitleById(String id){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   try{

  //    Cursor cursor = db.query(DBC.DATABASE_TABLE_TASK, new String[]{"title"}, "_id = ?", new String[]{id}, null, null, null);

  //    if (cursor.getCount() == 0){
  //  //System.out.println("Checking if option: " + optionName + " is available for value " + value + ". False");
  //  cursor.close();
  //  return "";
  //    }
  //    else{
  //  //System.out.println("Checking if option: " + optionName + " is available for value " + value + ". True");
  //  cursor.moveToFirst();
  //  String val = cursor.getString(0);
  //  cursor.close();
  //  return val;
  //    }
  //   }
  //   catch(Exception e){
  //    e.printStackTrace();
  //   }
  //   finally {

  //   }
  //   return null;
  //  }

  //  /*
  //   @return ArrayList<MathTask> of all available Tasks in the task table
  //   */
  //  public ArrayList<MathTask> getMathTasks(){
  //   // Select * FROM DBC_Task.TABLE_NAME
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_TASK, new String[]{"_id"}, null, null, null, null, null);

  //   ArrayList<MathTask> mt = new ArrayList<MathTask>();
  //   cursor.moveToFirst();
  //   while(cursor.isAfterLast() == false){
  //    // Read data
  //    int id = cursor.getInt(0);

  //    mt.add(getMathTaskById(id));

  //    cursor.moveToNext();
  //   }
  //   cursor.close();
  //   return mt;
  //  }
  getMathTasks(): Promise<Array<MathTask>> {
    const self = this
    return new Promise<Array<MathTask>>((resolve, reject) => {
      let mt = new Array<MathTask>()
      this.mDB.executeSql(`SELECT * FROM ${DBC.DATABASE_TABLE_TASK}`, []).then(result => {
        for (var i = 0; i < result.rows.length; i++) {
          mt.push(self.getMathTask(result.rows.item(i)))
        }
        resolve(mt);
      }).catch(error => {
        console.error(`getMathTasks Error: ${JSON.stringify(error)}`)
        reject(error)
      })
    })
  }

  //  /*
  //   @return Map<String, MathTask> of all available Tasks in the task table
  //   Mapping id (as String) -> MathTask
  //   */
  //  public Map<String, MathTask> getMathTasksAssociative(){
  //   Map<String, MathTask> result = new HashMap<String, MathTask>();
  //   ArrayList<MathTask> tasks = getMathTasks();

  //   for( MathTask task : tasks ){
  //    String id = Integer.toString(task.getId());
  //    result.put(id, task);
  //   }

  //   return result;
  //  }
  getMathTasksAssociative(): Promise<Collections.Dictionary<string, MathTask>> {
    return new Promise<Collections.Dictionary<string, MathTask>>((resolve, reject) => {
      let result = new Collections.Dictionary<string, MathTask>()
      this.getMathTasks().then(tasks => {
        tasks.forEach(task => {
          result.setValue(task.Id.toString(), task)
        })
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    })
  }

  //  /*
  //  Get MathRoute by code - only id and title
  //  @param code String
  //  @return MathRoute or null
  //   */
  //  public MathRoute getMathRouteByCode(String searchCode){
  //   MathRoute route = null;
  //   if(!searchCode.equals("")){
  //    SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //    Cursor cursor = db.query(DBC.DATABASE_TABLE_ROUTE, null, "code=?", new String[]{searchCode}, null, null, null);
  //    if(cursor.getCount() == 1){
  //  cursor.moveToFirst();
  //  // Read data
  //  route = createMathRouteFromCursor(cursor);
  //  route.makeReady();
  //  cursor.close();
  //  // Fill route with tasks
  //  ArrayList<String> taskIds = getRouteTaskIds(String.valueOf(route.getId()));
  //  for(String taskId : taskIds){
  //   try{
  //    route.addTask(getMathTaskById(Integer.decode(taskId)));
  //   }
  //   catch (Exception e){
  //    e.printStackTrace();
  //   }
  //  }
  //    }

  //   }

  //   return route;
  //  }


  //  /*
  //   @return ArrayList<MathRoute> of all available routes in route table
  //   */
  //  public ArrayList<MathRoute> getMathRoutes(){
  //   // Select * FROM DBC_Task.TABLE_NAME
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_ROUTE, null, null, null, null, null, null);

  //   ArrayList<MathRoute> mts = new ArrayList<MathRoute>();
  //   cursor.moveToFirst();
  //   while(cursor.isAfterLast() == false){
  //    MathRoute route = createMathRouteFromCursor(cursor);

  //    if(isOptionAvailable(DBC.ON_ROUTE_DATA, Integer.toString(route.getId()))){
  //  route.downloaded = true;
  //    }

  //    mts.add(route);

  //    cursor.moveToNext();
  //   }
  //   cursor.close();
  //   return mts;
  //  }
  getMathRoutes(): Promise<Array<MathRoute>> {
    let mts = new Array<MathRoute>()
    const self = this
    return new Promise<Array<MathRoute>>((resolve, reject) => {
      this.mDB.executeSql(`SELECT * FROM ${DBC.DATABASE_TABLE_ROUTE}`, []).then(result => {
        let promises = []
        for (let i = 0; i < result.rows.length; i++) {
          let route: MathRoute = self.createMathRouteFromCursor(result.rows.item(i))
          // smnbmbmsdnf route.downloaded = self.isOptionAvailable(DBC.ON_ROUTE_DATA, route.Id.toString())
          promises.push(self.isOptionAvailable(DBC.ON_ROUTE_DATA, route.Id.toString()).then(downloaded => {
            route.downloaded = downloaded
            mts.push(route)
          }).catch(error => reject(error)))
        }
        Promise.all(promises).then(() => {
          resolve(mts)
        }).catch(error => reject(error))
      }).catch(error => reject(error))
    })
  }

  getMathRouteById(routeId : number): Promise<MathRoute> {

    const self = this
    return new Promise<MathRoute>((resolve, reject) => {
      this.mDB.executeSql(`SELECT * FROM ${DBC.DATABASE_TABLE_ROUTE} WHERE _id = ${routeId}`, []).then(result => {
        let promises = []
        for (let i = 0; i < result.rows.length; i++) {
          let route: MathRoute = self.createMathRouteFromCursor(result.rows.item(i))
          // smnbmbmsdnf route.downloaded = self.isOptionAvailable(DBC.ON_ROUTE_DATA, route.Id.toString())
          promises.push(self.isOptionAvailable(DBC.ON_ROUTE_DATA, route.Id.toString()).then(downloaded => {
            route.makeReady();
            route.downloaded = downloaded
            resolve(route);
          }).catch(error => reject(error)))
        }
      }).catch(error => reject(error))
    })
  }

  private createMathRouteFromCursor(cursor: any) {
    let route = new MathRoute(cursor.title)
    route.Id = +cursor._id
    route.putInfo(DBC.DB_ROUTE.fields[1], cursor.user_id)
    route.putInfo(DBC.DB_ROUTE.fields[2], cursor.public)
    route.putInfo(DBC.DB_ROUTE.fields[3], cursor.title)
    route.putInfo(DBC.DB_ROUTE.fields[4], cursor.country_code)
    route.putInfo(DBC.DB_ROUTE.fields[5], cursor.city)
    route.putInfo(DBC.DB_ROUTE.fields[6], cursor.image)
    route.putInfo(DBC.DB_ROUTE.fields[7], cursor.code)
    route.putInfo(DBC.DB_ROUTE.fields[8], cursor.grade)
    route.putInfo(DBC.DB_ROUTE.fields[9], cursor.tags)
    route.putInfo(DBC.DB_ROUTE.fields[10], cursor.duration)
    route.putInfo(DBC.DB_ROUTE.fields[11], cursor.length)
    route.putInfo(DBC.DB_ROUTE.fields[12], cursor.bounding_box)
    route.putInfo(DBC.DB_ROUTE.fields[13], cursor.center)
    route.putInfo(DBC.DB_ROUTE.fields[14], cursor.timestamp)
    route.putInfo(DBC.DB_ROUTE.fields[15], cursor.description)
    route.putInfo(DBC.DB_ROUTE.fields[16], cursor.create_date)
    route.putInfo(DBC.DB_ROUTE.fields[17], cursor.attr)

    return route
  }
  //  private MathRoute createMathRouteFromCursor(Cursor cursor){
  //   // Read data
  //   int id = cursor.getInt(0);
  //   int user_id = cursor.getInt(1);
  //   String isPublic = cursor.getString(2);
  //   String title = cursor.getString(3);
  //   String country_code = cursor.getString(4);
  //   String city = cursor.getString(5);
  //   String image = cursor.getString(6);
  //   String code = cursor.getString(7);
  //   String grade = cursor.getString(8);
  //   String tags = cursor.getString(9);
  //   String duration = cursor.getString(10);
  //   String length = cursor.getString(11);
  //   String bounding_box = cursor.getString(12);
  //   String center = cursor.getString(13);
  //   String timestamp = cursor.getString(14);
  //   String description = cursor.getString(15);
  //   String create_date = cursor.getString(16);
  //   String attr = cursor.getString(17);

  //   // Create MathRoute
  //   MathRoute route = new MathRoute(title);
  //   route.setId(id);
  //   route.putInfo(DBC.DB_ROUTE.fields[1], Integer.toString(user_id));
  //   route.putInfo(DBC.DB_ROUTE.fields[2], isPublic);
  //   route.putInfo(DBC.DB_ROUTE.fields[3], title);
  //   route.putInfo(DBC.DB_ROUTE.fields[4], country_code);
  //   route.putInfo(DBC.DB_ROUTE.fields[5], city);
  //   route.putInfo(DBC.DB_ROUTE.fields[6], image);
  //   route.putInfo(DBC.DB_ROUTE.fields[7], code);
  //   route.putInfo(DBC.DB_ROUTE.fields[8], grade);
  //   route.putInfo(DBC.DB_ROUTE.fields[9], tags);
  //   route.putInfo(DBC.DB_ROUTE.fields[10], duration);
  //   route.putInfo(DBC.DB_ROUTE.fields[11], length);
  //   route.putInfo(DBC.DB_ROUTE.fields[12], bounding_box);
  //   route.putInfo(DBC.DB_ROUTE.fields[13], center);
  //   route.putInfo(DBC.DB_ROUTE.fields[14], timestamp);
  //   route.putInfo(DBC.DB_ROUTE.fields[15], description);
  //   route.putInfo(DBC.DB_ROUTE.fields[16], create_date);
  //   route.putInfo(DBC.DB_ROUTE.fields[17], attr);

  //   return route;
  //  }

  //  /*
  //   @return ArrayList<MathTask> of all available routes in route table
  //   */
  //  public Map<String, MathRoute> getMathRoutesAssociative(){
  //   Map<String, MathRoute> result = new HashMap<String, MathRoute>();
  //   ArrayList<MathRoute> routes = getMathRoutes();

  //   for( MathRoute mr : routes ){
  //    String id = Integer.toString(mr.getId());
  //    result.put(id, mr);
  //   }

  //   return result;
  //  }
  getMathRoutesAssociative(): Promise<Collections.Dictionary<string, MathRoute>> {
    return new Promise<Collections.Dictionary<string, MathRoute>>((resolve, reject) => {
      let result = new Collections.Dictionary<string, MathRoute>()
      this.getMathRoutes().then(routes => {
        routes.forEach(mr => {
          result.setValue(mr.Id.toString(), mr)
        })
        resolve(result)
      }).catch(error => reject(error))
    })
  }

  //  /*
  //  Wird im ImageDownloader verwendet, dieser benötigt von allen Trails die Infos public und image

  getTrailsImageInfo(): Promise<[string[]]> {
    return new Promise<[string[]]>((resolve, reject) => {
      this.mDB.executeSql(`SELECT public,image FROM ${DBC.DATABASE_TABLE_ROUTE}`, null)
        .then(result => {
          var info: [string[]] = null
          for (var i = 0; i < result.rows.length; i++) {
            let item = [result.rows.item(i).public, result.rows.item(i).image]
            if (info === null) {
              info = [item]
            } else {
              info.push(item)
            }
          }
          resolve(info)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  //   */
  //  public ArrayList<String[]> getTrailsImageInfo(){
  //   // Select * FROM DBC_Task.TABLE_NAME
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_ROUTE, new String[]{"public", "image"}, null, null, null, null, null);
  //   ArrayList<String[]> info = new ArrayList<String[]>();
  //   cursor.moveToFirst();
  //   while(cursor.isAfterLast() == false){
  //    String[] item = new String[]{cursor.getString(0), cursor.getString(1)};
  //    info.add(item);
  //    cursor.moveToNext();
  //   }
  //   cursor.close();
  //   return info;
  //  }

  //  /*
  //   @return: Map<String, ArrayList<String>> Returns the relation between tasks and routes
  //   {id_route 0 => {task_id 0, task_id 1 etc.}, id_route 1 => {task_id 1, task_id 2}}
  //   */
  //  public Map<String, ArrayList<String>> getRouteTaskRelations(){
  //   // Select * FROM DBC_Task.TABLE_NAME
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_REL_ROUTE_TASK, null, null, null, null, null, null);

  //   Map<String, ArrayList<String>> result = new HashMap<String, ArrayList<String>>();
  //   cursor.moveToFirst();
  //   while(!cursor.isAfterLast()){
  //    int route_id = cursor.getInt(1);
  //    int task_id = cursor.getInt(2);
  //    String rid = Integer.toString(route_id);
  //    String tid = Integer.toString(task_id);

  //    if(!result.containsKey(rid)){
  //  // If there is no entry of route with id rid, add to result array
  //  result.put(rid, new ArrayList<String>());
  //    }

  //    result.get(rid).add(tid);
  //    cursor.moveToNext();
  //   }
  //   cursor.close();
  //   return result;
  //  }
  getRouteTaskRelations(): Promise<Collections.Dictionary<string, Array<string>>> {
    return new Promise<Collections.Dictionary<string, Array<string>>>((resolve, reject) => {
      this.mDB.executeSql(`SELECT * FROM ${DBC.DATABASE_TABLE_REL_ROUTE_TASK}`, []).then(cursor => {
        let result = new Collections.Dictionary<string, Array<string>>()
        for (let i = 0; i < cursor.rows.length; i++) {
          const item = cursor.rows.item(i)
          let rid = item.route_id.toString()
          let tid = item.task_id.toString()
          if (!result.containsKey(rid)) {
            result.setValue(rid, new Array<string>())
          }
          let tmp = result.getValue(rid)
          tmp.push(tid)
          result.setValue(rid, tmp)
          // result.getValue(rid).push(tid)
        }

        resolve(result)
      }).catch(error => reject(error))
    })
  }

  //  public ArrayList<String>  getRouteTaskIds(String routeId){
  //   // SELECT * FROM DBC_Task.TABLE_NAME WHERE route_id = routeId
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_REL_ROUTE_TASK, null, "route_id = ?", new String[]{routeId}, null, null, null);

  //   ArrayList<String> result = new ArrayList<>();
  //   cursor.moveToFirst();
  //   while (!cursor.isAfterLast()){
  //    int task_id = cursor.getInt(2);
  //    result.add(String.valueOf(task_id));
  //    cursor.moveToNext();
  //   }
  //   cursor.close();
  //   return result;
  //  }
  async getRouteTaskIds(routeId: number): Promise<Array<string>> {
    const sqlResult = await this.mDB.executeSql(`SELECT * FROM ${DBC.DATABASE_TABLE_REL_ROUTE_TASK} WHERE route_id = ?`, [routeId])
    let result = new Array<string>()
    for (let i = 0; i < sqlResult.rows.length; i++) {
      result.push(sqlResult.rows.item(i).task_id.toString())
    }

    return result
  }

  //  /*
  //  @param publicState int - 0 privat, 1 public
  //  @return ArrayList<MathRoute>
  //   */
  //  public ArrayList<MathRoute> getReadyRoutes(int publicState){
  //   try{
  //    Map<String, MathTask> tasks = getMathTasksAssociative();
  //    Map<String, MathRoute> routes = getMathRoutesAssociative();
  //    Map<String, ArrayList<String>> rel = getRouteTaskRelations();

  //    ArrayList<MathRoute> result = new ArrayList<MathRoute>();

  //    for(String route_id : rel.keySet()){
  //      ArrayList<String> task_ids = rel.get(route_id);
  //      MathRoute r = routes.get(route_id);

  //      if( !r.getInfo("public").equals(Integer.toString(publicState))){
  //        continue;
  //      }

  //      for(String task_id : task_ids){
  //        r.addTask(tasks.get(task_id));
  //      }

  //      r.makeReady();
  //      result.add(r);
  //      }
  //    return result;
  //   }
  //   catch(Exception e){
  //    e.printStackTrace();
  //    return null;
  //   }
  //  }
  getReadyRoutes(publicState: number): Promise<Array<MathRoute>> {
    const self = this
    return new Promise<Array<MathRoute>>((resolve, reject) => {
      const cacheKey = 'getReadyRoutes' + publicState;
      if (self.cache[cacheKey]) {
        resolve(self.cache[cacheKey]);
        return;
      }
      let tasks: Collections.Dictionary<string, MathTask>
      let routes: Collections.Dictionary<string, MathRoute>
      let rel: Collections.Dictionary<string, Array<string>>
      let downloadedRouteIds: Array<String>

      let promises = [
        self.getMathTasksAssociative().then(t => {
          tasks = t
        }).catch(error => reject(error)),
        self.getMathRoutesAssociative().then(r => {
          routes = r
        }).catch(error => reject(error)),
        self.getRouteTaskRelations().then(r => {
          rel = r
        }).catch(error => reject(error)),
        self.getDownloadedRouteIds().then(r => {
          downloadedRouteIds = r
        })
      ]
      Promise.all(promises).then(() => {
        let result = Array<MathRoute>()
        rel.keys().forEach(rid => {
          const route_id: string = rid.toString()
          let task_ids: string[] = rel.getValue(route_id)
          let r: MathRoute = routes.getValue(route_id)
          r.downloaded = downloadedRouteIds.indexOf(route_id) >= 0
          if (r.getInfo("public") == publicState.toString()) {
            task_ids.forEach(task_id => {
              r.addTask(tasks.getValue(task_id.toString()))
            })

            r.makeReady()
            result.push(r)
          }
        })
        self.cache[cacheKey] = result;
        resolve(result)
      })
    })
  }

  getDownloadedRouteIds(): Promise<Array<String>> {
    return new Promise<Array<String>>((resolve, reject) => {
      this.mDB.executeSql(`SELECT DISTINCT(value) FROM ${DBC.DATABASE_TABLE_STATE} WHERE option=?`, [DBC.ON_ROUTE_DATA]).then(result => {
        const ids = [];
        for (let i = 0; i < result.rows.length; i++) {
          ids.push(result.rows.item(i).value);
        }
        resolve(ids);
      }).catch(error => reject(error))
    });
  }
  //  public ArrayList<MathRoute> getUnlockedRoutes(){
  //   try{
  //    ArrayList<MathRoute> privateRoutes = getReadyRoutes(0);
  //    ArrayList<MathRoute> unlockedRoutes = new ArrayList<MathRoute>();
  //    for(MathRoute r : privateRoutes){
  //  if(isOptionAvailable(DBC.ON_ROUTE_PRIVATE_ACCESS, Integer.toString(r.getId()))){
  //   unlockedRoutes.add(r);
  //  }
  //    }
  //    return unlockedRoutes;
  //   }catch(Exception e){e.printStackTrace();return null;}
  //  }

  //  public ArrayList<MathRoute> getVisibleRoutes(){
  //   // Select * FROM DBC_Task.TABLE_NAME
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getReadableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_ROUTE, null, null, null, null, null, null);

  //   ArrayList<MathRoute> mts = new ArrayList<MathRoute>();
  //   cursor.moveToFirst();
  //   while(cursor.isAfterLast() == false){
  //    MathRoute route = createMathRouteFromCursor(cursor);

  //    if(isOptionAvailable(DBC.ON_ROUTE_DATA, Integer.toString(route.getId()))){
  //  route.downloaded = true;
  //    }

  //    // Füge nur hinzu wenn public oder freigeschaltet
  //    if(isOptionAvailable(DBC.ON_ROUTE_PRIVATE_ACCESS, Integer.toString(route.getId())) || route.getInfo("public").equals("1")){
  //  route.makeReady();
  //  route.putInfo("taskCount", getRouteTaskIds(Integer.toString(route.getId())).size() + "");
  //  mts.add(route);
  //    }
  //    cursor.moveToNext();
  //   }
  //   cursor.close();
  //   return mts;
  //  }

  //  /*
  //  User
  //   */
  //  public boolean insertUser(String name){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();

  //   // Check if user with given name already available
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_USERS, null, "name = ?", new String[]{name}, null, null, null);
  //   if (cursor.getCount() > 0){
  //    //System.out.println("Checking if option: " + optionName + " is available for value " + value + ". False");
  //    cursor.close();
  //    return false;
  //   }
  //   cursor.close();

  //   try{
  //    ContentValues row = new ContentValues();
  //    row.put(DBC.DB_USERS.fields[1], name);
  //    db.insert(DBC.DATABASE_TABLE_USERS, null, row);
  //    //System.out.println("Inserted option: " + optionName + " with value " + value);
  //   }
  //   catch(Exception e){
  //    e.printStackTrace();
  //   }
  //   finally {

  //   }

  //   return true;
  //  }

  //  public User getUserByName(String name){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_USERS, null, "name = ?", new String[]{name}, null, null, null);
  //   if(cursor.getCount() == 0){
  //    cursor.close();
  //    return null;
  //   }
  //   else{
  //    cursor.moveToFirst();
  //    User u = new User(cursor.getInt(0), cursor.getString(1));
  //    cursor.close();
  //    return u;
  //   }
  //  }

  //  public ArrayList<String> availableUsers(){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_USERS, new String[]{"name"}, null, null, null, null, null);
  //   if(cursor.getCount() == 0){
  //    cursor.close();
  //    return null;
  //   }
  //   else{
  //    cursor.moveToFirst();
  //    ArrayList<String> userNames = new ArrayList<>();
  //    while(!cursor.isAfterLast()){
  //  userNames.add(cursor.getString(0));
  //  cursor.moveToNext();
  //    }
  //    cursor.close();
  //    return userNames;
  //   }
  //  }

  //  public User getUserById(int id){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_USERS, null, "_id = ?", new String[]{Integer.toString(id)}, null, null, null);
  //   if(cursor.getCount() == 0){
  //    cursor.close();
  //    return null;
  //   }
  //   else{
  //    cursor.moveToFirst();
  //    User u = new User(cursor.getInt(0), cursor.getString(1));
  //    cursor.close();
  //    return u;
  //   }
  //  }

  //  /*
  //  Score
  //   */
  //  public boolean insertScore(Score s){
  //   if(Helper.user == null){
  //    return false;
  //   }
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_SCORE, null, "route_id = ? AND user_id = ?", new String[]{Integer.toString(s.route_id), Integer.toString(Helper.user.id)}, null, null, null);
  //   if(cursor.getCount() > 0){
  //    cursor.close();
  //    return false;
  //   }
  //   cursor.close();

  //   try{
  //    ContentValues row = new ContentValues();
  //    row.put(DBC.DB_SCORE.fields[1], Helper.user.id);
  //    row.put(DBC.DB_SCORE.fields[2], s.route_id);
  //    row.put(DBC.DB_SCORE.fields[3], s.score);
  //    row.put(DBC.DB_SCORE.fields[4], s.tasks_solved);
  //    row.put(DBC.DB_SCORE.fields[5], s.tasks_solved_low);
  //    row.put(DBC.DB_SCORE.fields[6], s.task_details);
  //    row.put(DBC.DB_SCORE.fields[7], 0);
  //    row.put(DBC.DB_SCORE.fields[8], 0);
  //    db.insert(DBC.DATABASE_TABLE_SCORE, null, row);
  //    //System.out.println("Inserted option: " + optionName + " with value " + value);
  //   }
  //   catch(Exception e){
  //    e.printStackTrace();
  //   }
  //   finally {

  //   }

  //   return true;
  //  }

  //  public boolean updateScore(Score s){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   try{
  //    ContentValues row = new ContentValues();
  //    row.put(DBC.DB_SCORE.fields[3], s.score);
  //    row.put(DBC.DB_SCORE.fields[4], s.tasks_solved);
  //    row.put(DBC.DB_SCORE.fields[5], s.tasks_solved_low);
  //    row.put(DBC.DB_SCORE.fields[6], s.task_details);
  //    row.put(DBC.DB_SCORE.fields[7], 0);
  //    row.put(DBC.DB_SCORE.fields[8], 0);
  //    db.update(DBC.DATABASE_TABLE_SCORE, row, "_id = ?", new String[]{Integer.toString(s.id)});
  //    //System.out.println("Inserted option: " + optionName + " with value " + value);
  //    return true;
  //   }
  //   catch(Exception e){
  //    e.printStackTrace();
  //    return false;
  //   }
  //   finally {

  //   }
  //  }

  //  public HashMap<String,Score> getScoresByUserId(int user_id){
  //   SQLiteDatabase db = DB_Handler.getInstance(context).getWritableDatabase();
  //   Cursor cursor = db.query(DBC.DATABASE_TABLE_SCORE, null, "user_id = ?", new String[]{Integer.toString(Helper.user.id)}, null, null, null);
  //   HashMap<String, Score> hmScore = new HashMap<String, Score>();
  //   cursor.moveToFirst();
  //   while(!cursor.isAfterLast()){
  //    Score s = new Score(
  //   cursor.getInt(0),
  //   cursor.getInt(2),
  //   cursor.getInt(3),
  //   cursor.getString(4),
  //   cursor.getString(5),
  //   cursor.getString(6));
  //    hmScore.put(Integer.toString(s.route_id), s);
  //    cursor.moveToNext();
  //   }
  //   cursor.close();
  //   return hmScore;
  //  }
}