import { MapTile, Helper } from './Helper'
import { MyMath } from './MyMath'
import { tilesDb } from "./tilesDb"
import { LatLngBounds, Point } from 'leaflet';
import { ImagesService } from '../services/images-service';

export class CacheManagerMCM {
    static getTilesCoverageMinMaxZoom(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number): Array<MapTile> {
        let result = new Array<MapTile>()
        for (let zoomLevel = pZoomMin; zoomLevel <= pZoomMax; zoomLevel++) {
            console.debug(`Calculating ZOOM: ${zoomLevel}`)
            let resultForZoom = CacheManagerMCM.getTilesCoverageZoom(pBB, zoomLevel)
            console.debug(`Result.size: ${resultForZoom.length}`)
            result = result.concat(resultForZoom)
            console.debug(`Result.concat.size: ${result.length}`)
        }

        return result
    }

    static getTilesCoverageZoom(pBB: LatLngBounds, pZoomLevel: number): Array<MapTile> {
        let result = new Array<MapTile>()
        let mapTileUpperBound = 1 << pZoomLevel
        console.debug(`shift attributes ${mapTileUpperBound}`)
        console.debug(`south: ${pBB.getSouth()} east: ${pBB.getEast()}`)
        console.debug(`north: ${pBB.getNorth()} west: ${pBB.getWest()}`)
        const lowerRight = CacheManagerMCM.getMapTileFromCoordinates(pBB.getSouth(), pBB.getEast(), pZoomLevel)
        const upperLeft = CacheManagerMCM.getMapTileFromCoordinates(pBB.getNorth(), pBB.getWest(), pZoomLevel)
        console.debug(`lowerRight ${lowerRight} upperLeft ${upperLeft}`)
        let width = lowerRight.x - upperLeft.x + 1
        if (width <= 0) {
            width += mapTileUpperBound
        }

        console.debug(`Width: ${width} ${typeof width}`)

        let height = lowerRight.y - upperLeft.y + 1
        if (height <= 0) {
            height += mapTileUpperBound
        }
        console.debug(`Height: ${height} ${typeof height}`)

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const x = MyMath.mod(upperLeft.x + i, mapTileUpperBound)
                const y = MyMath.mod(upperLeft.y + j, mapTileUpperBound)
                result.push(new MapTile(pZoomLevel, x, y))
            }
        }
        console.debug(`Result.length = ${result.length}`)

        return result
    }

    static getMapTileFromCoordinates(aLat: number, aLon: number, zoom: number): Point {
        const z = 1 << zoom
        const y: number = Math.floor((1 - Math.log(Math.tan(aLat * Math.PI / 180) + 1 / Math.cos(aLat * Math.PI / 180)) / Math.PI) / 2 * z)
        const x: number = Math.floor((aLon + 180) / 360 * z)
        console.debug(`aLat: ${aLat} aLon: ${aLon} zoom: ${zoom} => x: ${x} y: ${y}`)

        return new Point(x, y)
    }

    static async downloadTiles(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number, callback: any): Promise<any> {
        const tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(pBB, pZoomMin, pZoomMax);
        await tilesDb.initialize();
        let tilesUrls = tiles.map(tile => {
            let domain = Helper.subDomains[Math.floor(Math.random() * Helper.subDomains.length)];
            return Helper.mapquestUrl.replace('{s}', domain).replace('{z}', String(tile.zoomLevel)).replace('{x}', String(tile.x)).replace('{y}', String(tile.y));
        });
        try {
            await ImagesService.INSTANCE.downloadURLs(tilesUrls, false, callback, true);
        } catch (e) {
            console.debug("remove already added tiles because download failed or was aborted");
            throw e;
        }
    }

    static async removeDownloadedTiles(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number) {
        const tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(pBB, pZoomMin, pZoomMax);
        await tilesDb.initialize();
        tilesDb.removeItems(CacheManagerMCM.getTileURLs(pBB, pZoomMin, pZoomMax));
    }

    static getTileURLs(pBB: LatLngBounds, pZoomMin: number, pZoomMax: number) {
        const tiles = CacheManagerMCM.getTilesCoverageMinMaxZoom(pBB, pZoomMin, pZoomMax);
        return tiles.map(tile => Helper.mapquestUrl.replace('{s}', Helper.subDomains[0]).replace('{z}', String(tile.zoomLevel)).replace('{x}', String(tile.x)).replace('{y}', String(tile.y)));
    }
}