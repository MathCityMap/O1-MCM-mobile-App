import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DBC } from '../../../../classes/DBC';
import { DB_Handler } from '../../../../classes/DB_Handler';
import { File } from '@ionic-native/file';
import { Helper } from '../../../../classes/Helper';

interface RouteItem {
  id: number,
  public: number,
  title: string,
  country_code: string,
  city: string,
  image: string,
  grade: number,
  distance: number,
  imageFileName: string
}

@Component({
  selector: 'page-routes-list',
  templateUrl: 'RoutesList.html'
})
export class RoutesListPage {
  public items: Array<RouteItem> = new Array<RouteItem>();

  constructor(public navCtrl: NavController, private fileManager: File) { }

  ionViewDidEnter() {

    // if (this.items.length == 0) {
    //   this.getItems().then(items => {
    //     this.items = items.sort((a, b) => {
    //       if (a.distance > b.distance) {
    //         return 1;
    //       } else if (a.distance < b.distance) {
    //         return -1;
    //       }

    //       return 0;
    //     });
    //     // alert("got the list")
    //   });
    // }
  }

  getItems(): Promise<Array<RouteItem>> {
    let items = [];
    console.log("getting items for list")
    let table = DBC.DB_ROUTE;
    // 2 - public
    // 3 - title
    // 4 - country_code
    // 5 - city
    // 6 - image
    // 8 - grade
    let sqlQry = `SELECT * FROM ${table.getTableName()} WHERE ${table.fields[2]}=1;`;
    console.log(`SQL QUERY: ${sqlQry}`)
    let dbh = DB_Handler.getInstance();
    return new Promise<Array<RouteItem>>((resolve, reject) => {
      dbh.ready().then(() => {
        let db = dbh.getWritableDatabase();

        db.executeSql(sqlQry, []).then(result => {
          for (var i = 0; i < result.rows.length; i++) {
            let row = result.rows.item(i);
            let imageFileName = row.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "");
            let center = JSON.parse(row.center);
            let routeItem: RouteItem = {
              id: new Number(row._id).valueOf(),
              public: new Number(row.public).valueOf(),
              title: row.title,
              country_code: row.country_code,
              city: row.city,
              image: '', // TODO: empty image handler
              grade: new Number(row.grade).valueOf(),
              distance: Helper.getDistanceToCenter(center[0], center[1]),
              imageFileName: imageFileName
            };

            console.log("DEBUG: ", routeItem.image);

            items.push(routeItem);

            this.fileManager.resolveDirectoryUrl(this.fileManager.dataDirectory).then(resp => {
              const fileName = 'thumb_' + imageFileName
              this.fileManager.checkFile(resp.nativeURL, fileName).then(exists => {
                if (exists) {
                  console.log(`File ${fileName} exists!`);
                  routeItem.image = resp.nativeURL + fileName;
                }
              }, error => {
                console.error("File exists error:", JSON.stringify(error));
              })
                .catch(error => console.error("File exists error:", JSON.stringify(error)));

              console.warn(JSON.stringify(resp));
            })
          }

          resolve(items);
        })
      });
    });
  }
}
