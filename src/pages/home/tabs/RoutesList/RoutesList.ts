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
  private task: any;

  constructor(public navCtrl: NavController, private fileManager: File) {

  }

  ionViewDidEnter() {
    this.task = null;
    if (this.items.length == 0) {
      // todo smart update of items in the list
      this.getItems().then(items => {
        this.items = items;
        // alert("got the list")
      });
    }

    let self = this;
    // try format base64 for missing parts
    this.task = setInterval(async () => {
      console.warn("RUNNING TASK!")
      let cleanImages = true;
      for (let i = 0; i < self.items.length; i++) {
        if (self.items[i].image != '') {
          continue;
        } else {
          const j = i;
          const list = this.items;
          try {
            let imageData = await self.fileManager.readAsDataURL(self.fileManager.dataDirectory, self.items[j].imageFileName)
            self.items[j].image = imageData
            // .then(imageData => {
            //   self.items[j].image = imageData;
            //   console.log(`Assigning image ${JSON.stringify(self.items[j].title)}`);
            // }, error => {
            //   cleanImages = false;
            //   console.error(`1Error getting index:${j} id:${self.items[j].id} image ${JSON.stringify(error)}`);
            // })
            // .catch(error => {
            //   cleanImages = false;
            //   console.error(`2Error getting index:${j} id:${self.items[j].id} image ${JSON.stringify(error)}`);
            // })
          } catch (error) {
            cleanImages = false;
            console.error(`Error getting index:${j} id:${self.items[j].id} image ${JSON.stringify(error)}`);
          }
        }
      }
      if (cleanImages) {
        console.warn("BREAK TASK!")
        clearInterval(self.task);
      }

      console.warn("FINISHED TASK!")
    }, 2000);
  }

  ionViewWillLeave() {
    // this.items = new Array<RouteItem>()
    if (this.task !== null) {
      clearInterval(this.task);
    }
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

            items.push(routeItem);
            this.fileManager.readAsDataURL(this.fileManager.dataDirectory, imageFileName)
              .then(imageData => {
                routeItem.image = imageData;
                console.log(`Assigning image ${JSON.stringify(routeItem.title)}`);
              }, error => {
                console.error(`1Error getting index:${i} id:${routeItem.id} image ${JSON.stringify(error)}`);
              })
              .catch(error => {
                console.error(`2Error getting index:${i} id:${routeItem.id} image ${JSON.stringify(error)}`);
              })
          }

          resolve(items);
        })
      });
    });
  }
}
