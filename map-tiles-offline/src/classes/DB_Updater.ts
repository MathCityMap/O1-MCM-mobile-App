import { Helper } from './Helper'
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/toPromise'

export class DB_Updater {
  constructor(private http: Http) {}
  onPreExecute() {
    console.log("onPreExecute ran");
  }

  onPostExecute(result?: string) {
    console.log("onPostExecute")
    if (result) {
      console.log(result);
    }
  }

  async runInBackground(queryAction: string, table: string, action: string): Promise<any> {
    console.log("async runInBackground")
    
    let headers = new Headers({
      'Content-Type' : 'application/json'
    })
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify({
      pass: Helper.REQUEST_PASS,
      action: queryAction
    })

    return new Promise<any>((resolve, reject) => {
      this.http.post(Helper.API_URL, data, options)
        .toPromise()
        .then((response) => {
          console.log('API response: ', response.json())
          this.onPostExecute()
          resolve(response.json())
        })
        .catch((error) => {
          console.error('API error(status): ', error.status)
          console.error('API error: ', JSON.stringify(error))
          reject(error.json())
        })
    })
  }


  // @Override
  // protected String doInBackground(String... arg0) {
  //     String queryAction = arg0[0];
  //     String table = arg0[1];
  //     String action = arg0[2];
  //     OutputStreamWriter wr = null;
  //     BufferedReader reader = null;
  //     try {
  //                 /*
  //                 * POST METHOD
  //                 * */
  //         // pass
  //         String data = URLEncoder.encode("pass", "UTF-8") + "=" + URLEncoder.encode(Helper.REQUEST_PASS, "UTF-8");
  //         // action (wurde über parameter übergeben
  //         data += "&" + URLEncoder.encode("action", "UTF-8") + "=" + URLEncoder.encode(queryAction, "UTF-8");


  //         URL url = new URL(Helper.API_URL);
  //         URLConnection conn = url.openConnection();

  //         // Timeout, falls Verbindung zu schlecht ist
  //         conn.setConnectTimeout(30000);
  //         conn.setReadTimeout(30000);

  //         conn.setDoOutput(true);
  //         wr = new OutputStreamWriter(conn.getOutputStream());

  //         wr.write(data);
  //         wr.flush();
  //         reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));

  //         StringBuilder sb = new StringBuilder();
  //         String line = null;

  //         // Read Server Response
  //         while ((line = reader.readLine()) != null) {
  //             sb.append(line);
  //             break;
  //         }
  //         String json_string = sb.toString();

  //         // Convert json_string to array and pass to insert function if action == update
  //         if (!json_string.equals("") && json_string != null) {
  //             JSONArray tableRows = new JSONArray(json_string);

  //             if (action.equals("update")) {
  //                 insertJSONinSQLiteDB(tableRows, DBC.MAP_DB.get(table));
  //             }
  //             if (action.equals("checkForUpdates")) {
  //                 checkForUpdates(tableRows, DBC.MAP_DB.get(table));
  //             }
  //         }
  //         return json_string;
  //     } catch (Exception e) {
  //         // Starte ImageDownloaderRoutes, damit die Listenelemente angezeigt werden
  //         // Sonst stürzt ab app
  //         parent.runOnUiThread(new Runnable() {
  //             @Override
  //             public void run() {
  //                 new ImageDownloaderRoutes(context, false).execute();
  //             }
  //         });
  //         e.printStackTrace();
  //         dialog.dismiss();
  //         Toast.makeText(context, "Error: Could not finish database update.", Toast.LENGTH_LONG).show();
  //         return new String("Exception: " + e.getMessage());
  //     }
  //     finally {
  //         // Close writer + reader
  //         if(wr != null){
  //             try{
  //                 wr.close();
  //             }
  //             catch (Exception e){
  //                 e.printStackTrace();
  //             }
  //         }
  //         if(reader != null){
  //             try{
  //                 reader.close();
  //             }
  //             catch (Exception e){
  //                 e.printStackTrace();
  //             }
  //         }
  //     }
  // }

}