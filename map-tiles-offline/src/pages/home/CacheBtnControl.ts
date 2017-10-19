import { OfflineLayer } from './OfflineLayer';
import L from "leaflet";

// An example of control that can be used for saving tiles
export class CacheBtnControl extends L.Control {
    cacheButton: any;
    cacheTo17Button: any;
    clearButton: any;

    constructor(private offlineLayer: OfflineLayer) {
        super();
    }

    onAdd(map) {
        var controls;
        controls = L.DomUtil.create('div', 'control-button', super._container);
        this.cacheButton = L.DomUtil.create('input', 'cache-button', controls);
        this.cacheButton.setAttribute('type', "button");
        this.cacheButton.setAttribute('id', "Btn1");
        this.cacheButton.setAttribute('value', "Cache");
        L.DomEvent.addListener(this.cacheButton, 'click', this.onCacheClick, this);
        L.DomEvent.disableClickPropagation(this.cacheButton);
        this.cacheTo17Button = L.DomUtil.create('input', 'cache-up-to-button', controls);
        this.cacheTo17Button.setAttribute('type', "button");
        this.cacheTo17Button.setAttribute('id', "Btn1");
        this.cacheTo17Button.setAttribute('value', "Cache up to 17");
        L.DomEvent.addListener(this.cacheTo17Button, 'click', this.onCacheUpToClick, this);
        L.DomEvent.disableClickPropagation(this.cacheTo17Button);
        this.clearButton = L.DomUtil.create('input', 'offlinemap-controls-clear-button', controls);
        this.clearButton.setAttribute('type', "button");
        this.clearButton.setAttribute('id', "clearBtn");
        this.clearButton.setAttribute('value', "Clear DB");
        L.DomEvent.addListener(this.clearButton, 'click', this.onClearClick, this);
        L.DomEvent.disableClickPropagation(this.clearButton);
        return controls;
    }

    onClearClick() {
        this._setBusyState();
        this.offlineLayer.clearTiles(() => {
            this._setIdleState();
        }, (error) => {
            this._setIdleState();
        });
    }

    onCacheClick() {
        var nbTiles;
        // Might be a good idea to put a limit on the number of tiles that can would be saved
        // calculateNbTiles includes potentially already saved tiles.
        nbTiles = this.offlineLayer.calculateNbTiles(17);
        if (nbTiles === -1) {
            return;
        }
        if (nbTiles < 10000) {
            console.log("Will be saving: " + nbTiles + " tiles");
            this._setBusyState();
            return this.offlineLayer.saveTiles(17, () => {
                return null;
            }, () => {
                return this._setIdleState();
            }, (error) => {
                console.log(error);
                return this._setIdleState();
            });
        } else {
            return alert("You are trying to save " + nbTiles + " tiles. There is currently a limit of 10,000 tiles.");
        }
    }

    onCacheUpToClick() {
        var nbTiles;
        nbTiles = this.offlineLayer.calculateNbTiles(17);
        if (nbTiles < 10000) {
            console.log("Will be saving: " + nbTiles + " tiles");
            this._setBusyState();
            return this.offlineLayer.saveTiles(17, () => {
                return null;
            }, () => {
                return this._setIdleState();
            }, (error) => {
                console.log(error);
                return this._setIdleState();
            });
        } else {
            return alert("You are trying to save " + nbTiles + " tiles. There is currently a limit of 10,000 tiles.");
        }
    }

    _setBusyState() {
        this.cacheTo17Button.setAttribute('disabled', true);
        this.cacheButton.setAttribute('disabled', true);
        return this.clearButton.setAttribute('disabled', true);
    }

    _setIdleState() {
        this.cacheTo17Button.removeAttribute('disabled');
        this.cacheButton.removeAttribute('disabled');
        return this.clearButton.removeAttribute('disabled');
    }

}