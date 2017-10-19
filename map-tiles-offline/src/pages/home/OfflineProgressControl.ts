import { OfflineLayer } from './OfflineLayer';
import L from "leaflet";

export class OfflineProgressControl extends L.Control {
  _counter: any;
  _cancelButton: any;
  _evaluating: boolean;
  _nbTilesToSave: any;
  _offlineLayer: OfflineLayer;

  onAdd(map) {
    var controls;
    controls = L.DomUtil.create('div', 'offlinemap-controls', super._container);
    controls.setAttribute('id', 'offlinemap-controls');
    this._counter = L.DomUtil.create('div', 'offlinemap-controls-counter', controls);
    this._counter.setAttribute('id', 'offlinemap-controls-counter');
    this._counter.innerHTML = "Ready";
    this._cancelButton = L.DomUtil.create('input', 'offlinemap-controls-cancel-button', controls);
    this._cancelButton.setAttribute('type', "button");
    this._cancelButton.setAttribute('id', "cancelBtn");
    this._cancelButton.setAttribute('value', "Cancel");
    this._cancelButton.setAttribute('disabled', true);
    L.DomEvent.addListener(this._cancelButton, 'click', this.onCancelClick, this);
    L.DomEvent.disableClickPropagation(this._cancelButton);
    return controls;
  }

  onProgressStart() {
    // Tiles will get downloaded and probably cached while we are still looking at the result from the DB
    // To avoid any weird display, we set _evaluating to false and display nothing until the total nb tiles
    // is known.
    this._evaluating = true;
    this._counter.innerHTML = "...";
    return this._cancelButton.removeAttribute('disabled');
  }

  onProgressDone() {
    this._counter.innerHTML = "Ready";
    return this._cancelButton.removeAttribute('disabled');
  }

  updateTotalNbTilesLeftToSave(event) {
    this._evaluating = false;
    this._nbTilesToSave = event.nbTiles;
    return this.updateNbTilesLeftToSave(event);
  }

  updateNbTilesLeftToSave(event) {
    if (!this._evaluating) {
      if (this._nbTilesToSave === 0) {
        return this._counter.innerHTML = "100%";
      } else {
        return this._counter.innerHTML = Math.floor((this._nbTilesToSave - event.nbTiles) / this._nbTilesToSave * 100) + "%";
      }
    }
  }

  onCancelClick() {
    if (this._offlineLayer.cancel()) {
      this._counter.innerHTML = "Canceling...";
      return this._cancelButton.setAttribute('disabled', true);
    }
  }

  setOfflineLayer(offlineLayer) {
    this._offlineLayer = offlineLayer;
    this._offlineLayer.on('tilecachingstart', this.onProgressStart, this);
    this._offlineLayer.on('tilecachingprogressstart', this.updateTotalNbTilesLeftToSave, this);
    this._offlineLayer.on('tilecachingprogress', this.updateNbTilesLeftToSave, this);
    return this._offlineLayer.on('tilecachingprogressdone', this.onProgressDone, this);
  }

}
