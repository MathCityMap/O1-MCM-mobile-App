import { Point, MapTile } from './Helper'
import { MyMath } from './MyMath'
import { MathRoute } from './MathRoute'
import * as L from 'leaflet';

export class CacheManagerMCM {
  constructor(private mapView: any, private route: MathRoute) { }

  //   public int possibleTilesInArea(final BoundingBox pBB, final int pZoomMin, final int pZoomMax) {
  //     return getTilesCoverage(pBB, pZoomMin, pZoomMax).size();
  // }
  possibleTilesInArea(pBB: L.latLngBounds, pZoomMin: number, pZoomMax: number): number {
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
  static getTilesCoverageMinMaxZoom(pBB: L.latLngBounds, pZoomMin: number, pZoomMax: number): Array<MapTile> {
    let result = new Array<MapTile>()
    for (let zoomLevel = pZoomMin; zoomLevel <= pZoomMax; zoomLevel++) {
      let resultForZoom = CacheManagerMCM.getTilesCoverageZoom(pBB, zoomLevel)
      result.concat(resultForZoom)
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
  static getTilesCoverageZoom(pBB: L.latLngBounds, pZoomLevel: number): Array<MapTile> {
    let result = new Array<MapTile>()
    let mapTileUpperBound = 1 << pZoomLevel
    const lowerRight = CacheManagerMCM.getMapTileFromCoordinates(pBB.getSouth(), pBB.getEast(), pZoomLevel)
    const upperLeft = CacheManagerMCM.getMapTileFromCoordinates(pBB.geNorth(), pBB.getWest(), pZoomLevel)
    
    let width = lowerRight.x - upperLeft.x + 1
    if (width <= 0) {
      width += mapTileUpperBound
    }

    let height = lowerRight.y - upperLeft.y + 1
    if (height <= 0) {
      height += mapTileUpperBound
    }

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const x = MyMath.mod(upperLeft.x + i, mapTileUpperBound)
        const y = MyMath.mod(upperLeft.y + j, mapTileUpperBound)
        result.push(new MapTile(pZoomLevel, x, y))
      }
    }

    return result
  }

//   public static Point getMapTileFromCoordinates(final double aLat, final double aLon, final int zoom) {
//     final int y = (int) Math.floor((1 - Math.log(Math.tan(aLat * Math.PI / 180) + 1 / Math.cos(aLat * Math.PI / 180)) / Math.PI) / 2 * (1 << zoom));
//     final int x = (int) Math.floor((aLon + 180) / 360 * (1 << zoom));
//     return new Point(x, y);
// }
  static getMapTileFromCoordinates(aLat: number, aLon: number, zoom: number): L.point {
    const z = 1 << zoom
    const y: number = Math.floor((1 - Math.log(Math.tan(aLat * Math.PI / 180) + 1 / Math.cos(aLat * Math.PI / 180)) / Math.PI) / 2 * z)
    const x: number = Math.floor((aLon + 180) / 360 * z)

    return L.point(x, y)
  }
}