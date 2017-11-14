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
  grade: number
}

@Component({
  selector: 'page-routes-list',
  templateUrl: 'RoutesList.html'
})
export class RoutesListPage {
  public items: Array<RouteItem> = new Array<RouteItem>();

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    this.getItems().then(items => this.items = items);
  }

  async getItems(): Promise<Array<RouteItem>> {
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
    let db = dbh.getWritableDatabase();
    let fileManager = new File();
    db.executeSql(sqlQry, []).then(result => {

      for (var i = 0; i < result.rows.length; i++) {
        let row = result.rows.item(i);
        let imageFileName = row.image.replace(Helper.REPLACE_ROUTE_IMAGE_PATH, "");
        let routeItem: RouteItem = {
          id: new Number(row._id).valueOf(),
          public: new Number(row.public).valueOf(),
          title: row.title,
          country_code: row.country_code,
          city: row.city,
          image: '', // TODO: empty image handler
          grade: new Number(row.grade).valueOf()
        };
        
        items.push(routeItem);
        fileManager.readAsDataURL(fileManager.dataDirectory, imageFileName)
          .then(imageData => {
            routeItem.image = imageData;
            console.log(`Assigning image ${JSON.stringify(routeItem.title)}`);
          }, error => {
            console.error(`Error getting image ${JSON.stringify(error)}`);
          })
          .catch(error => {
            console.error(`Error getting image ${JSON.stringify(error)}`);
          })
      }

    });

    return items;
  }
}
