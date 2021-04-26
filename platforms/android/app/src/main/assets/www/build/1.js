webpackJsonp([1],{

/***/ 1129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasksMapPageModule", function() { return TasksMapPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TasksMap__ = __webpack_require__(1145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var TasksMapPageModule = /** @class */ (function () {
    function TasksMapPageModule() {
    }
    TasksMapPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__TasksMap__["a" /* TasksMap */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__TasksMap__["a" /* TasksMap */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */].forChild(),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], TasksMapPageModule);
    return TasksMapPageModule;
}());

//# sourceMappingURL=TasksMap.module.js.map

/***/ }),

/***/ 1134:
/***/ (function(module, exports) {

/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/
!function(e,t,i){L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(e){L.Util.setOptions(this,e),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this.options.clusterPane||(this.options.clusterPane=L.Marker.prototype.options.pane),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var t=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,t?this._withAnimation:this._noAnimation),this._markerCluster=t?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(e){if(e instanceof L.LayerGroup)return this.addLayers([e]);if(!e.getLatLng)return this._nonPointGroup.addLayer(e),this.fire("layeradd",{layer:e}),this;if(!this._map)return this._needsClustering.push(e),this.fire("layeradd",{layer:e}),this;if(this.hasLayer(e))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(e,this._maxZoom),this.fire("layeradd",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var t=e,i=this._zoom;if(e.__parent)for(;t.__parent._zoom>=i;)t=t.__parent;return this._currentShownBounds.contains(t.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(e,t):this._animationAddLayerNonAnimated(e,t)),this},removeLayer:function(e){return e instanceof L.LayerGroup?this.removeLayers([e]):e.getLatLng?this._map?e.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(e)),this._removeLayer(e,!0),this.fire("layerremove",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),e.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(e)&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,e)&&this.hasLayer(e)&&this._needsRemoving.push({layer:e,latlng:e._latlng}),this.fire("layerremove",{layer:e}),this):(this._nonPointGroup.removeLayer(e),this.fire("layerremove",{layer:e}),this)},addLayers:function(e,t){if(!L.Util.isArray(e))return this.addLayer(e);var i,n=this._featureGroup,r=this._nonPointGroup,s=this.options.chunkedLoading,o=this.options.chunkInterval,a=this.options.chunkProgress,h=e.length,l=0,u=!0;if(this._map){var _=(new Date).getTime(),d=L.bind(function(){for(var c=(new Date).getTime();h>l;l++){if(s&&0===l%200){var p=(new Date).getTime()-c;if(p>o)break}if(i=e[l],i instanceof L.LayerGroup)u&&(e=e.slice(),u=!1),this._extractNonGroupLayers(i,e),h=e.length;else if(i.getLatLng){if(!this.hasLayer(i)&&(this._addLayer(i,this._maxZoom),t||this.fire("layeradd",{layer:i}),i.__parent&&2===i.__parent.getChildCount())){var f=i.__parent.getAllChildMarkers(),m=f[0]===i?f[1]:f[0];n.removeLayer(m)}}else r.addLayer(i),t||this.fire("layeradd",{layer:i})}a&&a(l,h,(new Date).getTime()-_),l===h?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(d,this.options.chunkDelay)},this);d()}else for(var c=this._needsClustering;h>l;l++)i=e[l],i instanceof L.LayerGroup?(u&&(e=e.slice(),u=!1),this._extractNonGroupLayers(i,e),h=e.length):i.getLatLng?this.hasLayer(i)||c.push(i):r.addLayer(i);return this},removeLayers:function(e){var t,i,n=e.length,r=this._featureGroup,s=this._nonPointGroup,o=!0;if(!this._map){for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):(this._arraySplice(this._needsClustering,i),s.removeLayer(i),this.hasLayer(i)&&this._needsRemoving.push({layer:i,latlng:i._latlng}),this.fire("layerremove",{layer:i}));return this}if(this._unspiderfy){this._unspiderfy();var a=e.slice(),h=n;for(t=0;h>t;t++)i=a[t],i instanceof L.LayerGroup?(this._extractNonGroupLayers(i,a),h=a.length):this._unspiderfyLayer(i)}for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):i.__parent?(this._removeLayer(i,!0,!0),this.fire("layerremove",{layer:i}),r.hasLayer(i)&&(r.removeLayer(i),i.clusterShow&&i.clusterShow())):(s.removeLayer(i),this.fire("layerremove",{layer:i}));return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(e){e.off(this._childMarkerEventHandlers,this),delete e.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var e=new L.LatLngBounds;this._topClusterLevel&&e.extend(this._topClusterLevel._bounds);for(var t=this._needsClustering.length-1;t>=0;t--)e.extend(this._needsClustering[t].getLatLng());return e.extend(this._nonPointGroup.getBounds()),e},eachLayer:function(e,t){var i,n,r,s=this._needsClustering.slice(),o=this._needsRemoving;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(s),n=s.length-1;n>=0;n--){for(i=!0,r=o.length-1;r>=0;r--)if(o[r].layer===s[n]){i=!1;break}i&&e.call(t,s[n])}this._nonPointGroup.eachLayer(e,t)},getLayers:function(){var e=[];return this.eachLayer(function(t){e.push(t)}),e},getLayer:function(e){var t=null;return e=parseInt(e,10),this.eachLayer(function(i){L.stamp(i)===e&&(t=i)}),t},hasLayer:function(e){if(!e)return!1;var t,i=this._needsClustering;for(t=i.length-1;t>=0;t--)if(i[t]===e)return!0;for(i=this._needsRemoving,t=i.length-1;t>=0;t--)if(i[t].layer===e)return!1;return!(!e.__parent||e.__parent._group!==this)||this._nonPointGroup.hasLayer(e)},zoomToShowLayer:function(e,t){"function"!=typeof t&&(t=function(){});var i=function(){!e._icon&&!e.__parent._icon||this._inZoomAnimation||(this._map.off("moveend",i,this),this.off("animationend",i,this),e._icon?t():e.__parent._icon&&(this.once("spiderfied",t,this),e.__parent.spiderfy()))};e._icon&&this._map.getBounds().contains(e.getLatLng())?t():e.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",i,this),this._map.panTo(e.getLatLng())):(this._map.on("moveend",i,this),this.on("animationend",i,this),e.__parent.zoomToBounds())},onAdd:function(e){this._map=e;var t,i,n;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(e),this._nonPointGroup.addTo(e),this._gridClusters||this._generateInitialClusters(),this._maxLat=e.options.crs.projection.MAX_LATITUDE,t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],n.newlatlng=n.layer._latlng,n.layer._latlng=n.latlng;for(t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],this._removeLayer(n.layer,!0),n.layer._latlng=n.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),i=this._needsClustering,this._needsClustering=[],this.addLayers(i,!0)},onRemove:function(e){e.off("zoomend",this._zoomEnd,this),e.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(e){for(var t=e;t&&!t._icon;)t=t.__parent;return t||null},_arraySplice:function(e,t){for(var i=e.length-1;i>=0;i--)if(e[i]===t)return e.splice(i,1),!0},_removeFromGridUnclustered:function(e,t){for(var i=this._map,n=this._gridUnclustered,r=Math.floor(this._map.getMinZoom());t>=r&&n[t].removeObject(e,i.project(e.getLatLng(),t));t--);},_childMarkerDragStart:function(e){e.target.__dragStart=e.target._latlng},_childMarkerMoved:function(e){if(!this._ignoreMove&&!e.target.__dragStart){var t=e.target._popup&&e.target._popup.isOpen();this._moveChild(e.target,e.oldLatLng,e.latlng),t&&e.target.openPopup()}},_moveChild:function(e,t,i){e._latlng=t,this.removeLayer(e),e._latlng=i,this.addLayer(e)},_childMarkerDragEnd:function(e){e.target.__dragStart&&this._moveChild(e.target,e.target.__dragStart,e.target._latlng),delete e.target.__dragStart},_removeLayer:function(e,t,i){var n=this._gridClusters,r=this._gridUnclustered,s=this._featureGroup,o=this._map,a=Math.floor(this._map.getMinZoom());t&&this._removeFromGridUnclustered(e,this._maxZoom);var h,l=e.__parent,u=l._markers;for(this._arraySplice(u,e);l&&(l._childCount--,l._boundsNeedUpdate=!0,!(l._zoom<a));)t&&l._childCount<=1?(h=l._markers[0]===e?l._markers[1]:l._markers[0],n[l._zoom].removeObject(l,o.project(l._cLatLng,l._zoom)),r[l._zoom].addObject(h,o.project(h.getLatLng(),l._zoom)),this._arraySplice(l.__parent._childClusters,l),l.__parent._markers.push(h),h.__parent=l.__parent,l._icon&&(s.removeLayer(l),i||s.addLayer(h))):l._iconNeedsUpdate=!0,l=l.__parent;delete e.__parent},_isOrIsParent:function(e,t){for(;t;){if(e===t)return!0;t=t.parentNode}return!1},fire:function(e,t,i){if(t&&t.layer instanceof L.MarkerCluster){if(t.originalEvent&&this._isOrIsParent(t.layer._icon,t.originalEvent.relatedTarget))return;e="cluster"+e}L.FeatureGroup.prototype.fire.call(this,e,t,i)},listens:function(e,t){return L.FeatureGroup.prototype.listens.call(this,e,t)||L.FeatureGroup.prototype.listens.call(this,"cluster"+e,t)},_defaultIconCreateFunction:function(e){var t=e.getChildCount(),i=" marker-cluster-";return i+=10>t?"small":100>t?"medium":"large",new L.DivIcon({html:"<div><span>"+t+"</span></div>",className:"marker-cluster"+i,iconSize:new L.Point(40,40)})},_bindEvents:function(){var e=this._map,t=this.options.spiderfyOnMaxZoom,i=this.options.showCoverageOnHover,n=this.options.zoomToBoundsOnClick;(t||n)&&this.on("clusterclick",this._zoomOrSpiderfy,this),i&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),e.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(e){for(var t=e.layer,i=t;1===i._childClusters.length;)i=i._childClusters[0];i._zoom===this._maxZoom&&i._childCount===t._childCount&&this.options.spiderfyOnMaxZoom?t.spiderfy():this.options.zoomToBoundsOnClick&&t.zoomToBounds(),e.originalEvent&&13===e.originalEvent.keyCode&&this._map._container.focus()},_showCoverage:function(e){var t=this._map;this._inZoomAnimation||(this._shownPolygon&&t.removeLayer(this._shownPolygon),e.layer.getChildCount()>2&&e.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),t.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var e=this.options.spiderfyOnMaxZoom,t=this.options.showCoverageOnHover,i=this.options.zoomToBoundsOnClick,n=this._map;(e||i)&&this.off("clusterclick",this._zoomOrSpiderfy,this),t&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),n.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var e=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,e),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),e),this._currentShownBounds=e}},_generateInitialClusters:function(){var e=Math.ceil(this._map.getMaxZoom()),t=Math.floor(this._map.getMinZoom()),i=this.options.maxClusterRadius,n=i;"function"!=typeof i&&(n=function(){return i}),null!==this.options.disableClusteringAtZoom&&(e=this.options.disableClusteringAtZoom-1),this._maxZoom=e,this._gridClusters={},this._gridUnclustered={};for(var r=e;r>=t;r--)this._gridClusters[r]=new L.DistanceGrid(n(r)),this._gridUnclustered[r]=new L.DistanceGrid(n(r));this._topClusterLevel=new this._markerCluster(this,t-1)},_addLayer:function(e,t){var i,n,r=this._gridClusters,s=this._gridUnclustered,o=Math.floor(this._map.getMinZoom());for(this.options.singleMarkerMode&&this._overrideMarkerIcon(e),e.on(this._childMarkerEventHandlers,this);t>=o;t--){i=this._map.project(e.getLatLng(),t);var a=r[t].getNearObject(i);if(a)return a._addChild(e),e.__parent=a,void 0;if(a=s[t].getNearObject(i)){var h=a.__parent;h&&this._removeLayer(a,!1);var l=new this._markerCluster(this,t,a,e);r[t].addObject(l,this._map.project(l._cLatLng,t)),a.__parent=l,e.__parent=l;var u=l;for(n=t-1;n>h._zoom;n--)u=new this._markerCluster(this,n,u),r[n].addObject(u,this._map.project(a.getLatLng(),n));return h._addChild(u),this._removeFromGridUnclustered(a,t),void 0}s[t].addObject(e,i)}this._topClusterLevel._addChild(e),e.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(e){e instanceof L.MarkerCluster&&e._iconNeedsUpdate&&e._updateIcon()})},_enqueue:function(e){this._queue.push(e),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var e=0;e<this._queue.length;e++)this._queue[e].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var e=Math.round(this._map._zoom);this._processQueue(),this._zoom<e&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,e)):this._zoom>e?(this._animationStart(),this._animationZoomOut(this._zoom,e)):this._moveEnd()},_getExpandedVisibleBounds:function(){return this.options.removeOutsideVisibleBounds?L.Browser.mobile?this._checkBoundsMaxLat(this._map.getBounds()):this._checkBoundsMaxLat(this._map.getBounds().pad(1)):this._mapBoundsInfinite},_checkBoundsMaxLat:function(e){var t=this._maxLat;return t!==i&&(e.getNorth()>=t&&(e._northEast.lat=1/0),e.getSouth()<=-t&&(e._southWest.lat=-1/0)),e},_animationAddLayerNonAnimated:function(e,t){if(t===e)this._featureGroup.addLayer(e);else if(2===t._childCount){t._addToMap();var i=t.getAllChildMarkers();this._featureGroup.removeLayer(i[0]),this._featureGroup.removeLayer(i[1])}else t._updateIcon()},_extractNonGroupLayers:function(e,t){var i,n=e.getLayers(),r=0;for(t=t||[];r<n.length;r++)i=n[r],i instanceof L.LayerGroup?this._extractNonGroupLayers(i,t):t.push(i);return t},_overrideMarkerIcon:function(e){var t=e.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[e]}});return t}}),L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(e,t){this._animationAddLayerNonAnimated(e,t)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(e,t){var i,n=this._getExpandedVisibleBounds(),r=this._featureGroup,s=Math.floor(this._map.getMinZoom());this._ignoreMove=!0,this._topClusterLevel._recursively(n,e,s,function(s){var o,a=s._latlng,h=s._markers;for(n.contains(a)||(a=null),s._isSingleParent()&&e+1===t?(r.removeLayer(s),s._recursivelyAddChildrenToMap(null,t,n)):(s.clusterHide(),s._recursivelyAddChildrenToMap(a,t,n)),i=h.length-1;i>=0;i--)o=h[i],n.contains(o._latlng)||r.removeLayer(o)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(n,t),r.eachLayer(function(e){e instanceof L.MarkerCluster||!e._icon||e.clusterShow()}),this._topClusterLevel._recursively(n,e,t,function(e){e._recursivelyRestoreChildPositions(t)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(n,e,s,function(e){r.removeLayer(e),e.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(e,t){this._animationZoomOutSingle(this._topClusterLevel,e-1,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e,this._getExpandedVisibleBounds())},_animationAddLayer:function(e,t){var i=this,n=this._featureGroup;n.addLayer(e),t!==e&&(t._childCount>2?(t._updateIcon(),this._forceLayout(),this._animationStart(),e._setPos(this._map.latLngToLayerPoint(t.getLatLng())),e.clusterHide(),this._enqueue(function(){n.removeLayer(e),e.clusterShow(),i._animationEnd()})):(this._forceLayout(),i._animationStart(),i._animationZoomOutSingle(t,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(e,t,i){var n=this._getExpandedVisibleBounds(),r=Math.floor(this._map.getMinZoom());e._recursivelyAnimateChildrenInAndAddSelfToMap(n,r,t+1,i);var s=this;this._forceLayout(),e._recursivelyBecomeVisible(n,i),this._enqueue(function(){if(1===e._childCount){var o=e._markers[0];this._ignoreMove=!0,o.setLatLng(o.getLatLng()),this._ignoreMove=!1,o.clusterShow&&o.clusterShow()}else e._recursively(n,i,r,function(e){e._recursivelyRemoveChildrenFromMap(n,r,t+1)});s._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(t.body.offsetWidth)}}),L.markerClusterGroup=function(e){return new L.MarkerClusterGroup(e)},L.MarkerCluster=L.Marker.extend({initialize:function(e,t,i,n){L.Marker.prototype.initialize.call(this,i?i._cLatLng||i.getLatLng():new L.LatLng(0,0),{icon:this,pane:e.options.clusterPane}),this._group=e,this._zoom=t,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,i&&this._addChild(i),n&&this._addChild(n)},getAllChildMarkers:function(e){e=e||[];for(var t=this._childClusters.length-1;t>=0;t--)this._childClusters[t].getAllChildMarkers(e);for(var i=this._markers.length-1;i>=0;i--)e.push(this._markers[i]);return e},getChildCount:function(){return this._childCount},zoomToBounds:function(e){for(var t,i=this._childClusters.slice(),n=this._group._map,r=n.getBoundsZoom(this._bounds),s=this._zoom+1,o=n.getZoom();i.length>0&&r>s;){s++;var a=[];for(t=0;t<i.length;t++)a=a.concat(i[t]._childClusters);i=a}r>s?this._group._map.setView(this._latlng,s):o>=r?this._group._map.setView(this._latlng,o+1):this._group._map.fitBounds(this._bounds,e)},getBounds:function(){var e=new L.LatLngBounds;return e.extend(this._bounds),e},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(e,t){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(e),e instanceof L.MarkerCluster?(t||(this._childClusters.push(e),e.__parent=this),this._childCount+=e._childCount):(t||this._markers.push(e),this._childCount++),this.__parent&&this.__parent._addChild(e,!0)},_setClusterCenter:function(e){this._cLatLng||(this._cLatLng=e._cLatLng||e._latlng)},_resetBounds:function(){var e=this._bounds;e._southWest&&(e._southWest.lat=1/0,e._southWest.lng=1/0),e._northEast&&(e._northEast.lat=-1/0,e._northEast.lng=-1/0)},_recalculateBounds:function(){var e,t,i,n,r=this._markers,s=this._childClusters,o=0,a=0,h=this._childCount;if(0!==h){for(this._resetBounds(),e=0;e<r.length;e++)i=r[e]._latlng,this._bounds.extend(i),o+=i.lat,a+=i.lng;for(e=0;e<s.length;e++)t=s[e],t._boundsNeedUpdate&&t._recalculateBounds(),this._bounds.extend(t._bounds),i=t._wLatLng,n=t._childCount,o+=i.lat*n,a+=i.lng*n;this._latlng=this._wLatLng=new L.LatLng(o/h,a/h),this._boundsNeedUpdate=!1}},_addToMap:function(e){e&&(this._backupLatlng=this._latlng,this.setLatLng(e)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(e,t,i){this._recursively(e,this._group._map.getMinZoom(),i-1,function(e){var i,n,r=e._markers;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())},function(e){var i,n,r=e._childClusters;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(e,t,i,n){this._recursively(e,n,t,function(r){r._recursivelyAnimateChildrenIn(e,r._group._map.latLngToLayerPoint(r.getLatLng()).round(),i),r._isSingleParent()&&i-1===n?(r.clusterShow(),r._recursivelyRemoveChildrenFromMap(e,t,i)):r.clusterHide(),r._addToMap()})},_recursivelyBecomeVisible:function(e,t){this._recursively(e,this._group._map.getMinZoom(),t,null,function(e){e.clusterShow()})},_recursivelyAddChildrenToMap:function(e,t,i){this._recursively(i,this._group._map.getMinZoom()-1,t,function(n){if(t!==n._zoom)for(var r=n._markers.length-1;r>=0;r--){var s=n._markers[r];i.contains(s._latlng)&&(e&&(s._backupLatlng=s.getLatLng(),s.setLatLng(e),s.clusterHide&&s.clusterHide()),n._group._featureGroup.addLayer(s))}},function(t){t._addToMap(e)})},_recursivelyRestoreChildPositions:function(e){for(var t=this._markers.length-1;t>=0;t--){var i=this._markers[t];i._backupLatlng&&(i.setLatLng(i._backupLatlng),delete i._backupLatlng)}if(e-1===this._zoom)for(var n=this._childClusters.length-1;n>=0;n--)this._childClusters[n]._restorePosition();else for(var r=this._childClusters.length-1;r>=0;r--)this._childClusters[r]._recursivelyRestoreChildPositions(e)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(e,t,i,n){var r,s;this._recursively(e,t-1,i-1,function(e){for(s=e._markers.length-1;s>=0;s--)r=e._markers[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())},function(e){for(s=e._childClusters.length-1;s>=0;s--)r=e._childClusters[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())})},_recursively:function(e,t,i,n,r){var s,o,a=this._childClusters,h=this._zoom;if(h>=t&&(n&&n(this),r&&h===i&&r(this)),t>h||i>h)for(s=a.length-1;s>=0;s--)o=a[s],e.intersects(o._bounds)&&o._recursively(e,t,i,n,r)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}}),L.Marker.include({clusterHide:function(){return this.options.opacityWhenUnclustered=this.options.opacity||1,this.setOpacity(0)},clusterShow:function(){var e=this.setOpacity(this.options.opacity||this.options.opacityWhenUnclustered);return delete this.options.opacityWhenUnclustered,e}}),L.DistanceGrid=function(e){this._cellSize=e,this._sqCellSize=e*e,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(e,t){var i=this._getCoord(t.x),n=this._getCoord(t.y),r=this._grid,s=r[n]=r[n]||{},o=s[i]=s[i]||[],a=L.Util.stamp(e);this._objectPoint[a]=t,o.push(e)},updateObject:function(e,t){this.removeObject(e),this.addObject(e,t)},removeObject:function(e,t){var i,n,r=this._getCoord(t.x),s=this._getCoord(t.y),o=this._grid,a=o[s]=o[s]||{},h=a[r]=a[r]||[];for(delete this._objectPoint[L.Util.stamp(e)],i=0,n=h.length;n>i;i++)if(h[i]===e)return h.splice(i,1),1===n&&delete a[r],!0},eachObject:function(e,t){var i,n,r,s,o,a,h,l=this._grid;for(i in l){o=l[i];for(n in o)for(a=o[n],r=0,s=a.length;s>r;r++)h=e.call(t,a[r]),h&&(r--,s--)}},getNearObject:function(e){var t,i,n,r,s,o,a,h,l=this._getCoord(e.x),u=this._getCoord(e.y),_=this._objectPoint,d=this._sqCellSize,c=null;for(t=u-1;u+1>=t;t++)if(r=this._grid[t])for(i=l-1;l+1>=i;i++)if(s=r[i])for(n=0,o=s.length;o>n;n++)a=s[n],h=this._sqDist(_[L.Util.stamp(a)],e),d>h&&(d=h,c=a);return c},_getCoord:function(e){return Math.floor(e/this._cellSize)},_sqDist:function(e,t){var i=t.x-e.x,n=t.y-e.y;return i*i+n*n}},function(){L.QuickHull={getDistant:function(e,t){var i=t[1].lat-t[0].lat,n=t[0].lng-t[1].lng;return n*(e.lat-t[0].lat)+i*(e.lng-t[0].lng)},findMostDistantPointFromBaseLine:function(e,t){var i,n,r,s=0,o=null,a=[];for(i=t.length-1;i>=0;i--)n=t[i],r=this.getDistant(n,e),r>0&&(a.push(n),r>s&&(s=r,o=n));return{maxPoint:o,newPoints:a}},buildConvexHull:function(e,t){var i=[],n=this.findMostDistantPointFromBaseLine(e,t);return n.maxPoint?(i=i.concat(this.buildConvexHull([e[0],n.maxPoint],n.newPoints)),i=i.concat(this.buildConvexHull([n.maxPoint,e[1]],n.newPoints))):[e[0]]},getConvexHull:function(e){var t,i=!1,n=!1,r=!1,s=!1,o=null,a=null,h=null,l=null,u=null,_=null;for(t=e.length-1;t>=0;t--){var d=e[t];(i===!1||d.lat>i)&&(o=d,i=d.lat),(n===!1||d.lat<n)&&(a=d,n=d.lat),(r===!1||d.lng>r)&&(h=d,r=d.lng),(s===!1||d.lng<s)&&(l=d,s=d.lng)}n!==i?(_=a,u=o):(_=l,u=h);var c=[].concat(this.buildConvexHull([_,u],e),this.buildConvexHull([u,_],e));return c}}}(),L.MarkerCluster.include({getConvexHull:function(){var e,t,i=this.getAllChildMarkers(),n=[];for(t=i.length-1;t>=0;t--)e=i[t].getLatLng(),n.push(e);return L.QuickHull.getConvexHull(n)}}),L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var e,t=this.getAllChildMarkers(),i=this._group,n=i._map,r=n.latLngToLayerPoint(this._latlng);this._group._unspiderfy(),this._group._spiderfied=this,t.length>=this._circleSpiralSwitchover?e=this._generatePointsSpiral(t.length,r):(r.y+=10,e=this._generatePointsCircle(t.length,r)),this._animationSpiderfy(t,e)}},unspiderfy:function(e){this._group._inZoomAnimation||(this._animationUnspiderfy(e),this._group._spiderfied=null)},_generatePointsCircle:function(e,t){var i,n,r=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+e),s=r/this._2PI,o=this._2PI/e,a=[];for(a.length=e,i=e-1;i>=0;i--)n=this._circleStartAngle+i*o,a[i]=new L.Point(t.x+s*Math.cos(n),t.y+s*Math.sin(n))._round();return a},_generatePointsSpiral:function(e,t){var i,n=this._group.options.spiderfyDistanceMultiplier,r=n*this._spiralLengthStart,s=n*this._spiralFootSeparation,o=n*this._spiralLengthFactor*this._2PI,a=0,h=[];for(h.length=e,i=e-1;i>=0;i--)a+=s/r+5e-4*i,h[i]=new L.Point(t.x+r*Math.cos(a),t.y+r*Math.sin(a))._round(),r+=o/a;return h},_noanimationUnspiderfy:function(){var e,t,i=this._group,n=i._map,r=i._featureGroup,s=this.getAllChildMarkers();for(i._ignoreMove=!0,this.setOpacity(1),t=s.length-1;t>=0;t--)e=s[t],r.removeLayer(e),e._preSpiderfyLatlng&&(e.setLatLng(e._preSpiderfyLatlng),delete e._preSpiderfyLatlng),e.setZIndexOffset&&e.setZIndexOffset(0),e._spiderLeg&&(n.removeLayer(e._spiderLeg),delete e._spiderLeg);i.fire("unspiderfied",{cluster:this,markers:s}),i._ignoreMove=!1,i._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(e,t){var i,n,r,s,o=this._group,a=o._map,h=o._featureGroup,l=this._group.options.spiderLegPolylineOptions;for(o._ignoreMove=!0,i=0;i<e.length;i++)s=a.layerPointToLatLng(t[i]),n=e[i],r=new L.Polyline([this._latlng,s],l),a.addLayer(r),n._spiderLeg=r,n._preSpiderfyLatlng=n._latlng,n.setLatLng(s),n.setZIndexOffset&&n.setZIndexOffset(1e6),h.addLayer(n);this.setOpacity(.3),o._ignoreMove=!1,o.fire("spiderfied",{cluster:this,markers:e})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(e,t){var n,r,s,o,a,h,l=this,u=this._group,_=u._map,d=u._featureGroup,c=this._latlng,p=_.latLngToLayerPoint(c),f=L.Path.SVG,m=L.extend({},this._group.options.spiderLegPolylineOptions),g=m.opacity;for(g===i&&(g=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),f?(m.opacity=0,m.className=(m.className||"")+" leaflet-cluster-spider-leg"):m.opacity=g,u._ignoreMove=!0,n=0;n<e.length;n++)r=e[n],h=_.layerPointToLatLng(t[n]),s=new L.Polyline([c,h],m),_.addLayer(s),r._spiderLeg=s,f&&(o=s._path,a=o.getTotalLength()+.1,o.style.strokeDasharray=a,o.style.strokeDashoffset=a),r.setZIndexOffset&&r.setZIndexOffset(1e6),r.clusterHide&&r.clusterHide(),d.addLayer(r),r._setPos&&r._setPos(p);for(u._forceLayout(),u._animationStart(),n=e.length-1;n>=0;n--)h=_.layerPointToLatLng(t[n]),r=e[n],r._preSpiderfyLatlng=r._latlng,r.setLatLng(h),r.clusterShow&&r.clusterShow(),f&&(s=r._spiderLeg,o=s._path,o.style.strokeDashoffset=0,s.setStyle({opacity:g}));this.setOpacity(.3),u._ignoreMove=!1,setTimeout(function(){u._animationEnd(),u.fire("spiderfied",{cluster:l,markers:e})},200)},_animationUnspiderfy:function(e){var t,i,n,r,s,o,a=this,h=this._group,l=h._map,u=h._featureGroup,_=e?l._latLngToNewLayerPoint(this._latlng,e.zoom,e.center):l.latLngToLayerPoint(this._latlng),d=this.getAllChildMarkers(),c=L.Path.SVG;for(h._ignoreMove=!0,h._animationStart(),this.setOpacity(1),i=d.length-1;i>=0;i--)t=d[i],t._preSpiderfyLatlng&&(t.closePopup(),t.setLatLng(t._preSpiderfyLatlng),delete t._preSpiderfyLatlng,o=!0,t._setPos&&(t._setPos(_),o=!1),t.clusterHide&&(t.clusterHide(),o=!1),o&&u.removeLayer(t),c&&(n=t._spiderLeg,r=n._path,s=r.getTotalLength()+.1,r.style.strokeDashoffset=s,n.setStyle({opacity:0})));h._ignoreMove=!1,setTimeout(function(){var e=0;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&e++;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&(t.clusterShow&&t.clusterShow(),t.setZIndexOffset&&t.setZIndexOffset(0),e>1&&u.removeLayer(t),l.removeLayer(t._spiderLeg),delete t._spiderLeg);h._animationEnd(),h.fire("unspiderfied",{cluster:a,markers:d})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(e){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(e))},_unspiderfyWrapper:function(){this._unspiderfy()
},_unspiderfy:function(e){this._spiderfied&&this._spiderfied.unspiderfy(e)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(e){e._spiderLeg&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow(),e.setZIndexOffset&&e.setZIndexOffset(0),this._map.removeLayer(e._spiderLeg),delete e._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(e){return e?e instanceof L.MarkerClusterGroup?e=e._topClusterLevel.getAllChildMarkers():e instanceof L.LayerGroup?e=e._layers:e instanceof L.MarkerCluster?e=e.getAllChildMarkers():e instanceof L.Marker&&(e=[e]):e=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(e),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(e),this},_flagParentsIconsNeedUpdate:function(e){var t,i;for(t in e)for(i=e[t].__parent;i;)i._iconNeedsUpdate=!0,i=i.__parent},_refreshSingleMarkerModeMarkers:function(e){var t,i;for(t in e)i=e[t],this.hasLayer(i)&&i.setIcon(this._overrideMarkerIcon(i))}}),L.Marker.include({refreshIconOptions:function(e,t){var i=this.options.icon;return L.setOptions(i,e),this.setIcon(i),t&&this.__parent&&this.__parent._group.refreshClusters(this),this}})}(window,document);

/***/ }),

/***/ 1136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1137), __webpack_require__(1138)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('./TileLayer.Offline'), require('./Control.Offline'));
    }
}(function (TileLayerOffline, ControlOffline) {
}));


/***/ }),

/***/ 1137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory, window) {

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(109)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else if (typeof window !== 'undefined') {
        if (typeof window.L === 'undefined') {
            throw 'Leaflet must be loaded first!';
        }
        factory(window.L);
    }
}(function (L) {

    /**
     * The Offline Layer should work in the same way as the Tile Layer does
     * when there are no offline tile images saved.
     */
    L.TileLayer.Offline = L.TileLayer.extend({

        /**
         * Constructor of the layer.
         * 
         * @param {String} url URL of the tile map provider.
         * @param {Object} tilesDb An object that implements a certain interface
         * so it's able to serve as the database layer to save and remove the tiles.
         * @param {Object} options This is the same options parameter as the Leaflet
         * Tile Layer, there are no additional parameters. Check their documentation
         * for up-to-date information.
         */
        initialize: function (url, tilesDb, options) {
            this._url = url;
            this._tilesDb = tilesDb;

            options = L.Util.setOptions(this, options);

            if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {
                options.tileSize = Math.floor(options.tileSize / 2);

                if (!options.zoomReverse) {
                    options.zoomOffset++;
                    options.maxZoom--;
                } else {
                    options.zoomOffset--;
                    options.minZoom++;
                }

                options.minZoom = Math.max(0, options.minZoom);
            }

            if (typeof options.subdomains === 'string') {
                options.subdomains = options.subdomains.split('');
            }

            if (!L.Browser.android) {
                this.on('tileunload', this._onTileRemove);
            }
        },

        /**
         * Overrides the method from the Tile Layer. Loads a tile given its
         * coordinates.
         * 
         * @param {Object} coords Coordinates of the tile.
         * @param {Function} done A callback to be called when the tile has been
         * loaded.
         * @returns {HTMLElement} An <img> HTML element with the appropriate
         * image URL.
         */
        createTile: function (coords, done) {
            var tile = document.createElement('img');

            L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
            L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

            if (this.options.crossOrigin) {
                tile.crossOrigin = '';
            }

            tile.alt = '';

            tile.setAttribute('role', 'presentation');

            this.getTileUrl(coords).then(function (url) {
                tile.src = url;
            }).catch(function (err) {
                throw err;
            });

            return tile;
        },

        /**
         * Overrides the method from the Tile Layer. Returns the URL for a tile
         * given its coordinates. It tries to get the tile image offline first,
         * then if it fails, it falls back to the original Tile Layer
         * implementation.
         * 
         * @param {Object} coords Coordinates of the tile.
         * @returns {String} The URL for a tile image.
         */
        getTileUrl: function (coords) {
            var url = L.TileLayer.prototype.getTileUrl.call(this, coords);
            var dbStorageKey = this._getStorageKey(url);

            var resultPromise = this._tilesDb.getItem(dbStorageKey).then(function (data) {
                if (data && typeof data === 'object') {
                    return URL.createObjectURL(data);
                }
                return url;
            }).catch(function (err) {
                throw err;
            });

            return resultPromise;
        },

        /**
         * Gets the URLs for all the tiles that are inside the given bounds.
         * Every element of the result array is in this format:
         * {key: <String>, url: <String>}. The key is the key used on the
         * database layer to find the tile image offline. The URL is the
         * location from where the tile image will be downloaded.
         * 
         * @param {Object} bounds The bounding box of the tiles.
         * @param {Number} zoom The zoom level of the bounding box.
         * @returns {Array} An array containing all the URLs inside the given
         * bounds.
         */
        getTileUrls: function (bounds, zoom) {
            var tiles = [];
            var originalurl = this._url;

            this.setUrl(this._url.replace('{z}', zoom), true);

            var tileBounds = L.bounds(
                bounds.min.divideBy(this.getTileSize().x).floor(),
                bounds.max.divideBy(this.getTileSize().x).floor()
            );

            for (var i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
                for (var j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
                    var tilePoint = new L.Point(i, j);
                    var url = L.TileLayer.prototype.getTileUrl.call(this, tilePoint);

                    tiles.push({
                        'key': this._getStorageKey(url),
                        'url': url,
                    });
                }
            }

            this.setUrl(originalurl, true);

            return tiles;
        },

        /**
         * Determines the key that will be used on the database layer given
         * a URL.
         * 
         * @param {String} url The URL of a tile image.
         * @returns {String} The key that will be used on the database layer
         * to find a tile image.
         */
        _getStorageKey: function (url) {
            var key = null;

            if (url.indexOf('{s}')) {
                var regexstring = new RegExp('[' + this.options.subdomains.join('|') + ']\.');
                key = url.replace(regexstring, this.options.subdomains['0'] + '.');
            }

            return key || url;
        },
    });

    /**
     * Factory function as suggested by the Leaflet team.
     * 
     * @param {String} url URL of the tile map provider.
     * @param {Object} tilesDb An object that implements a certain interface
     * so it's able to serve as the database layer to save and remove the tiles.
     * @param {Object} options This is the same options parameter as the Leaflet
     * Tile Layer, there are no additional parameters. Check their documentation
     * for up-to-date information.
     */
    L.tileLayer.offline = function (url, tilesDb, options) {
        return new L.TileLayer.Offline(url, tilesDb, options);
    };
}, window));


/***/ }),

/***/ 1138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory, window) {

    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(109)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else if (typeof window !== 'undefined') {
        if (typeof window.L === 'undefined') {
            throw 'Leaflet must be loaded first!';
        }
        factory(window.L);
    }
}(function (L) {

    /**
     * The Offline Control to be used together with the Offline Layer.
     */
    L.Control.Offline = L.Control.extend({
        options: {
            position: 'topleft',
            saveButtonHtml: 'S',
            saveButtonTitle: 'Save tiles',
            removeButtonHtml: 'R',
            removeButtonTitle: 'Remove tiles',
            minZoom: 0,
            maxZoom: 19,
            confirmSavingCallback: null,
            confirmRemovalCallback: null
        },

        /**
         * Constructor of the control.
         * 
         * @param {Object} baseLayer The Offline Layer to work together with the
         * control.
         * @param {Object} tilesDb An object that implements a certain interface
         * so it's able to serve as the database layer to save and remove the tiles.
         * @param {Object} options This is the same parameter as the Leaflet
         * Control, but it has some additions. Check the README for more.
         */
        initialize: function (baseLayer, tilesDb, options) {
            this._baseLayer = baseLayer;
            this._tilesDb = tilesDb;

            L.Util.setOptions(this, options);
        },

        /**
         * Creates the container DOM element for the control and add listeners
         * on relevant map events.
         * 
         * @param {Object} map The Leaflet map.
         * @returns {HTMLElement} The DOM element for the control.
         */
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-control-offline leaflet-bar');

            this._createButton(this.options.saveButtonHtml, this.options.saveButtonTitle, 'save-tiles-button', container, this._saveTiles);
            this._createButton(this.options.removeButtonHtml, this.options.removeButtonTitle, 'remove-tiles-button', container, this._removeTiles);

            return container;
        },

        /**
         * Auxiliary method that creates a button DOM element.
         * 
         * @param {String} html The HTML that will be used inside the button
         * DOM element.
         * @param {String} title The title of the button DOM element.
         * @param {String} className The class name for the button DOM element.
         * @param {HTMLElement} container The container DOM element for the
         * buttons.
         * @param {Function} fn A function that will be executed when the button
         * is clicked.
         * @returns {HTMLElement} A button DOM element.
         */
        _createButton: function (html, title, className, container, fn) {
            var link = L.DomUtil.create('a', className, container);
            link.innerHTML = html;
            link.href = '#';
            link.title = title;

            L.DomEvent.disableClickPropagation(link);
            L.DomEvent.on(link, 'click', L.DomEvent.stop);
            L.DomEvent.on(link, 'click', fn, this);
            L.DomEvent.on(link, 'click', this._refocusOnMap, this);

            return link;
        },

        /**
         * The function executed when the button to save tiles is clicked.
         */
        _saveTiles: function () {
            var self = this;

            var bounds = null;
            var zoomLevels = [];
            var tileUrls = [];
            var currentZoom = this._map.getZoom();
            var latlngBounds = this._map.getBounds();

            if (currentZoom < this.options.minZoom) {
                self._baseLayer.fire('offline:below-min-zoom-error');

                return;
            }

            for (var zoom = currentZoom; zoom <= this.options.maxZoom; zoom++) {
                zoomLevels.push(zoom);
            }

            for (var i = 0; i < zoomLevels.length; i++) {
                bounds = L.bounds(this._map.project(latlngBounds.getNorthWest(), zoomLevels[i]),
                    this._map.project(latlngBounds.getSouthEast(), zoomLevels[i]));
                tileUrls = tileUrls.concat(this._baseLayer.getTileUrls(bounds, zoomLevels[i]));
            }

            var continueSaveTiles = function () {
                self._baseLayer.fire('offline:save-start', {
                    nTilesToSave: tileUrls.length
                });

                self._tilesDb.saveTiles(tileUrls).then(function () {
                    self._baseLayer.fire('offline:save-end');
                }).catch(function (err) {
                    self._baseLayer.fire('offline:save-error', {
                        error: err
                    });
                });
            };

            if (this.options.confirmSavingCallback) {
                this.options.confirmSavingCallback(tileUrls.length, continueSaveTiles);
            } else {
                continueSaveTiles();
            }
        },

        /**
         * The function executed when the button to remove tiles is clicked.
         */
        _removeTiles: function () {
            var self = this;

            var continueRemoveTiles = function () {
                self._baseLayer.fire('offline:remove-start');

                self._tilesDb.clear().then(function () {
                    self._baseLayer.fire('offline:remove-end');
                }).catch(function (err) {
                    self._baseLayer.fire('offline:remove-error', {
                        error: err
                    });
                });
            };

            if (self.options.confirmRemovalCallback) {
                self.options.confirmRemovalCallback(continueRemoveTiles);
            } else {
                continueRemoveTiles();
            }
        }
    });

    /**
     * Factory function as suggested by the Leaflet team.
     * 
     * @param {Object} baseLayer The Offline Layer to work together with the
     * control.
     * @param {Object} tilesDb An object that implements a certain interface
     * so it's able to serve as the database layer to save and remove the tiles.
     * @param {Object} options This is the same parameter as the Leaflet
     * Control, but it has some additions. Check the README for more.
     */
    L.control.offline = function (baseLayer, tilesDb, options) {
        return new L.Control.Offline(baseLayer, tilesDb, options);
    };
}, window));


/***/ }),

/***/ 1139:
/***/ (function(module, exports) {

(function() {
    // save these original methods before they are overwritten
    var proto_initIcon = L.Marker.prototype._initIcon;
    var proto_setPos = L.Marker.prototype._setPos;

    var oldIE = (L.DomUtil.TRANSFORM === 'msTransform');

    L.Marker.addInitHook(function () {
        var iconOptions = this.options.icon && this.options.icon.options;
        var iconAnchor = iconOptions && this.options.icon.options.iconAnchor;
        if (iconAnchor) {
            iconAnchor = (iconAnchor[0] + 'px ' + iconAnchor[1] + 'px');
        }
        this.options.rotationOrigin = this.options.rotationOrigin || iconAnchor || 'center bottom' ;
        this.options.rotationAngle = this.options.rotationAngle || 0;

        // Ensure marker keeps rotated during dragging
        this.on('drag', function(e) { e.target._applyRotation(); });
    });

    L.Marker.include({
        _initIcon: function() {
            proto_initIcon.call(this);
        },

        _setPos: function (pos) {
            proto_setPos.call(this, pos);
            this._applyRotation();
        },

        _applyRotation: function () {
            if(this.options.rotationAngle) {
                this._icon.style[L.DomUtil.TRANSFORM+'Origin'] = this.options.rotationOrigin;

                if(oldIE) {
                    // for IE 9, use the 2D rotation
                    this._icon.style[L.DomUtil.TRANSFORM] = 'rotate(' + this.options.rotationAngle + 'deg)';
                } else {
                    // for modern browsers, prefer the 3D accelerated version
                    this._icon.style[L.DomUtil.TRANSFORM] += ' rotateZ(' + this.options.rotationAngle + 'deg)';
                }
            }
        },

        setRotationAngle: function(angle) {
            this.options.rotationAngle = angle;
            this.update();
            return this;
        },

        setRotationOrigin: function(origin) {
            this.options.rotationOrigin = origin;
            this.update();
            return this;
        }
    });
})();


/***/ }),

/***/ 1145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TasksMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__ = __webpack_require__(1134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_markercluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_offline__ = __webpack_require__(1136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_offline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_leaflet_offline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_Helper__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_orm_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entity_Score__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular_navigation_deep_linker__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_gps_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_modals_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet_rotatedmarker__ = __webpack_require__(1139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_leaflet_rotatedmarker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_leaflet_rotatedmarker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_conic_gradient__ = __webpack_require__(1146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_conic_gradient___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_conic_gradient__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_images_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_app_component__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__modals_MCMIconModal_MCMIconModal__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__modals_MCMIntroModal_MCMIntroModal__ = __webpack_require__(629);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ionic_angular_components_modal_modal_controller__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__ = __webpack_require__(630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__chat_chat__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_chat_and_session_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__modals_MCMTrailFinishedModal_MCMTrailFinishedModal__ = __webpack_require__(631);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



























var TasksMap = /** @class */ (function () {
    function TasksMap(navCtrl, navParams, events, ormService, deepLinker, gpsService, modalsService, imagesService, storage, spinner, modalCtrl, chatAndSessionService, app, helper) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.events = events;
        this.ormService = ormService;
        this.deepLinker = deepLinker;
        this.gpsService = gpsService;
        this.modalsService = modalsService;
        this.imagesService = imagesService;
        this.storage = storage;
        this.spinner = spinner;
        this.modalCtrl = modalCtrl;
        this.chatAndSessionService = chatAndSessionService;
        this.app = app;
        this.helper = helper;
        this.state = {
            selectedTask: null,
            isShowingAllTasks: false,
            visibleTasks: {},
            skippedTaskIds: [],
            selectedStartTask: false,
            showIntroModal: false,
            showGuidedTrailModal: false
        };
        this.stateKey = "savedMapStateByRoute";
        this.taskToSkip = null;
        this.gamificationIsDisabled = false;
        this.isUserInsideMap = true;
        this.user = null;
        this.countdownBeforeSession = false;
        this.startInterval = false;
        this.showCountdownOrTimer = false;
        //private refreshIntervalId: any = null;
        this.showSessionEnds = false;
        this.taskBlocked = false;
        this.sessionTimeTimer = __WEBPACK_IMPORTED_MODULE_25__node_modules_rxjs__["Observable"].interval(TasksMap_1.UPDATE_SESSION_TIME_INTERVAL_IN_SECS * 1000);
        this.markerGroup = null;
        /*this.userPositionIcon = L.icon({iconUrl:"./assets/icons/icon_mapposition.png" , iconSize: [100, 100], iconAnchor: [50, 50], className:'marker userPosition'});       //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
        this.taskOpenIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-open.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskOpenIcon.clusterColor = '#036D99';
        this.taskSkippedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-skipped.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskSkippedIcon.clusterColor = '#B2B2B2';
        this.taskDoneIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskDoneIcon.clusterColor = '#F3B100';
        this.taskDonePerfectIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-done-perfect.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskDonePerfectIcon.clusterColor = '#4CAF50';
        this.taskFailedIcon = L.icon({iconUrl:'assets/icons/icon_taskmarker-failed.png' , iconSize: [35, 48], iconAnchor: [17.5, 43], className:'marker'});
        this.taskFailedIcon.clusterColor = '#E62B25';*/
        this.chatAndSessionService.init();
        this.events.subscribe('user:kicked', function (user) {
            if (user == 'self') {
                console.log("userKicked");
                _this.sessionKicked();
                _this.events.unsubscribe('user:kicked', null);
            }
            else {
                console.log("Someone else was kicked.");
            }
        });
        this.events.subscribe('session:updated', function (sessionInfo) {
            console.log('Session has been updated');
            _this.updateSession(sessionInfo);
        });
        this.events.subscribe('user:assigned_task', function (taskId) {
            console.log('User has been assigned task with id: ' + taskId);
            _this.sessionInfo.sessionUser.assigned_task_id = taskId;
            _this.forceStartFromTask(taskId);
            _this.redrawMarker();
        });
    }
    TasksMap_1 = TasksMap;
    TasksMap.prototype.isTrailCompleted = function () {
        if (this.route.isAnswerFeedbackEnabled()) {
            return (this.taskList && this.score.getTasksSolved().length + this.score.getTasksSolvedLow().length + this.score.getTasksFailed().length == this.taskList.length);
        }
        else {
            return this.score.getTasksSaved() && this.score.getTasksSaved().length == this.taskList.length;
        }
    };
    TasksMap.prototype.showTrailCompletedAlert = function () {
        var that = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_26__modals_MCMTrailFinishedModal_MCMTrailFinishedModal__["a" /* MCMTrailFinishedModal */], {
            score: this.score,
            tasks: this.taskList,
            narrative: this.app.activeNarrative,
            callback: function () {
                modal.dismiss().then(function () {
                    that.route.completed = true;
                    that.route.completedDate = new Date().toDateString().split(' ').slice(1).join(' ');
                    that.ormService.saveAndFireChangedEvent(that.route);
                });
            }
        }, { cssClass: this.app.activeNarrative });
        modal.present();
        // let that = this;
        // let title = 'a_alert_congrats';
        // let message = 'a_alert_congrats_msg';
        // if (this.route.isNarrativeEnabled()) {
        //   title = this.route.getNarrativeString(title);
        //   message = this.route.getNarrativeString(message);
        // }
        // let modal = this.modalCtrl.create(MCMIconModal,  {
        //     title: title,
        //     message: message,
        //     modalType: MCMModalType.solved,
        //     param: {TITLE: this.route.title},
        //     narrativeEnabled: this.route.isNarrativeEnabled(),
        //     narrative: this.app.activeNarrative,
        //     buttons: [
        //         {
        //             title: 'a_alert_close',
        //             callback: function(){
        //                 modal.dismiss().then(() => {
        //                     that.route.completed = true;
        //                     that.route.completedDate = new Date().toDateString().split(' ').slice(1).join(' ');
        //                     that.ormService.saveAndFireChangedEvent(that.route);
        //                 });
        //             }
        //         }
        //     ]}, {showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative});
        // modal.present();
    };
    TasksMap.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, _b, sessionInfo;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('TasksMap ionViewWillEnter()');
                        console.log(this.navCtrl);
                        this.routeId = this.navParams.get('routeId');
                        console.log(this.routeId);
                        _a = this;
                        return [4 /*yield*/, this.ormService.findRouteById(this.routeId)];
                    case 1:
                        _a.route = _c.sent();
                        this.gamificationIsDisabled = this.route.isGamificationDisabled();
                        _b = this;
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 2:
                        _b.user = _c.sent();
                        this.score = this.route.getScoreForUser(this.user);
                        sessionInfo = this.chatAndSessionService.getSessionInfo();
                        this.updateSession(sessionInfo);
                        this.events.publish('narrativeChange', this.route.getNarrativeName());
                        this.updateIcons();
                        return [4 /*yield*/, this.loadMap()];
                    case 3:
                        _c.sent();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: 
                                    // adding markers immediately after map initialization caused marker cluster problems -> use timeout
                                    return [4 /*yield*/, this.initializeMap()];
                                    case 1:
                                        // adding markers immediately after map initialization caused marker cluster problems -> use timeout
                                        _a.sent();
                                        this.spinner.hide();
                                        if (this.isTrailCompleted() && !this.route.completed) {
                                            this.showTrailCompletedAlert();
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 100);
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMap.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var details, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log('TasksMap ionViewDidEnter()');
                        if (!(this.sessionInfo != null)) return [3 /*break*/, 5];
                        details = JSON.stringify({});
                        this.chatAndSessionService.addUserEvent("event_trail_opened", details, "0");
                        if (!(this.sessionInfo.started === false)) return [3 /*break*/, 5];
                        this.showAllTasks();
                        this.resetTasks();
                        if (!(this.sessionInfo.sessionUser.assigned_task_id != 0)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.route.getTasks()];
                    case 1:
                        _a.taskList = _c.sent();
                        this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id);
                        if (this.route.isNarrativeEnabled()) {
                            this.showIntroModal().then(function () {
                                _this.state.showIntroModal = false;
                            });
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.route.isNarrativeEnabled()) {
                            this.showIntroModal().then(function () {
                                _this.state.showIntroModal = false;
                                _this.showGuidedTrailModalWithDelay(500);
                            });
                        }
                        _c.label = 3;
                    case 3:
                        this.saveMapStateToLocalStorage();
                        this.sessionInfo.started = true;
                        return [4 /*yield*/, this.chatAndSessionService.updateSession(this.sessionInfo)];
                    case 4:
                        _c.sent();
                        this.redrawMarker();
                        return [2 /*return*/];
                    case 5:
                        if (!this.navParams.data.tasksMapState) return [3 /*break*/, 6];
                        console.log("3");
                        this.state = this.navParams.data.tasksMapState;
                        if (this.taskToSkip || (this.state.selectedStartTask && (this.score.getTasksSolved().indexOf(this.state.selectedTask.id) > -1 || this.score.getTasksSolvedLow().indexOf(this.state.selectedTask.id) > -1))) {
                            this.goToNextTask(this.state.selectedTask, true);
                        }
                        return [3 /*break*/, 8];
                    case 6:
                        _b = this;
                        return [4 /*yield*/, this.getMapStateFromLocalStorage()];
                    case 7:
                        _b.state = _c.sent();
                        console.log(this.state);
                        if (this.taskToSkip) {
                            this.goToNextTask(this.taskToSkip, true);
                            this.taskToSkip = null;
                        }
                        if (!this.state) {
                            // attach state to navParams so that state is restored when moving back in history (from task detail view)
                            this.state = this.navParams.data.tasksMapState = {
                                selectedTask: this.navParams.get("selectedTask"),
                                isShowingAllTasks: false,
                                visibleTasks: {},
                                skippedTaskIds: [],
                                selectedStartTask: false,
                                showIntroModal: false,
                                showGuidedTrailModal: false // GuidedTrail Modal will be displayed on first start anyway
                            };
                            this.state.isShowingAllTasks = !this.state.selectedTask;
                            if (this.state.selectedTask) {
                                this.state.visibleTasks[this.state.selectedTask.position] = true;
                            }
                            else if (this.route.isNarrativeEnabled()) {
                                this.showIntroModal().then(function () {
                                    _this.showGuidedTrailModalWithDelay(500);
                                });
                            }
                            else {
                                this.showGuidedTrailModalWithDelay(500);
                            }
                        }
                        else {
                            if (this.state.showIntroModal && this.route.isNarrativeEnabled()) {
                                this.showIntroModal().then(function () {
                                    var that = _this;
                                    that.state.showIntroModal = false;
                                    _this.saveMapStateToLocalStorage();
                                    if (_this.state.showGuidedTrailModal) {
                                        _this.showGuidedTrailModalWithDelay(500);
                                    }
                                });
                            }
                            else if (this.state.showGuidedTrailModal) {
                                this.showGuidedTrailModalWithDelay(500);
                            }
                        }
                        _c.label = 8;
                    case 8:
                        this.redrawMarker();
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMap.prototype.showGuidedTrailModalWithDelay = function (delay) {
        var that = this;
        this.state.showGuidedTrailModal = false;
        setTimeout(function () {
            var _this = this;
            that.modalsService.showDialog('a_guided_trail_title', 'a_guided_trail', 'no', function () {
            }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    that.selectStartPoint();
                    that.state.selectedStartTask = true;
                    return [2 /*return*/];
                });
            }); }, that.app.activeNarrative);
        }, delay);
    };
    TasksMap.prototype.forceStartFromTask = function (taskId) {
        var selectedTask = this.taskList.filter(function (x) { return x.id == taskId; }).pop();
        this.state.selectedTask = selectedTask;
        this.state.visibleTasks = {};
        this.state.visibleTasks[selectedTask.position] = true;
        this.state.isShowingAllTasks = false;
        this.state.showGuidedTrailModal = false;
        this.centerSelectedTask();
    };
    TasksMap.prototype.ngOnInit = function () {
        // this.sessionSubscription = this.chatAndSessionService.getSubject().subscribe(this.updateSession);
    };
    TasksMap.prototype.ngOnDestroy = function () {
        if (this.sessionSubscription) {
            this.sessionSubscription.unsubscribe();
            this.sessionSubscription = null;
        }
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
        // Unsubscribe events:
        this.events.unsubscribe('user:kicked');
        this.events.unsubscribe('session:updated');
        this.events.unsubscribe('user:assigned_task');
        this.events.publish('narrativeChange', 'default');
    };
    TasksMap.prototype.initializeMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.currentScore = this.score.score;
                this.redrawMarker();
                this.gpsService.isLocationOn();
                // This should fix the gray tiles and missing marker issue on android
                if (this.map != null) {
                    this.map.invalidateSize();
                }
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.updateSession = function (sessionInfo) {
        var _this = this;
        console.log(this.routeId);
        console.log(sessionInfo);
        if (sessionInfo && sessionInfo.session) {
            if (this.routeId != sessionInfo.session.trail_id) {
                console.log("active session belongs to different trail");
                this.sessionInfo = null;
            }
            else {
                this.sessionInfo = sessionInfo;
                console.log('active session: ' + sessionInfo.session.code);
                if (this.sessionTimeSubscription) {
                    this.sessionTimeSubscription.unsubscribe();
                }
                this.sessionTime();
                this.sessionTimeSubscription = this.sessionTimeTimer.subscribe(function (tick) {
                    _this.sessionTime();
                });
            }
        }
        else {
            console.log('no active session');
            this.sessionInfo = null;
        }
    };
    TasksMap.prototype.getMapStateFromLocalStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mapState, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.stateKey)];
                    case 1:
                        mapState = _a.sent();
                        if (mapState && mapState[this.routeId]) {
                            state = mapState[this.routeId];
                            console.log(this.navParams);
                            state.selectedTask = this.navParams.get("selectedTask");
                            return [2 /*return*/, state];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    TasksMap.prototype.saveMapStateToLocalStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mapState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.stateKey)];
                    case 1:
                        mapState = _a.sent();
                        if (!mapState) {
                            mapState = {};
                        }
                        mapState[this.routeId] = this.state;
                        return [2 /*return*/, this.storage.set(this.stateKey, mapState)];
                }
            });
        });
    };
    TasksMap.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.saveMapStateToLocalStorage();
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.assignedTask = function () {
        if (this.sessionInfo == null) {
            return false;
        }
        else {
            return this.sessionInfo.session.assign_tasks;
        }
    };
    TasksMap.prototype.redrawMarker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var markerGroup, _a, _loop_1, this_1, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.map) {
                            return [2 /*return*/];
                        }
                        if (this.markerGroup != null) {
                            console.warn('removing markerGroup');
                            this.map.removeLayer(this.markerGroup);
                            this.markerGroup = null;
                        }
                        markerGroup = __WEBPACK_IMPORTED_MODULE_2_leaflet__["markerClusterGroup"]({
                            maxClusterRadius: 30,
                            iconCreateFunction: function (cluster) {
                                var childCount = cluster.getChildCount();
                                var markers = cluster.getAllChildMarkers();
                                var className = 'marker-cluster marker-cluster-';
                                if (childCount < 10) {
                                    className += 'small';
                                }
                                else if (childCount < 100) {
                                    className += 'medium';
                                }
                                else {
                                    className += 'large';
                                }
                                var colorOccurrences = {};
                                var numberOfColoredMarkers = 0;
                                markers.map(function (marker) {
                                    if (marker.options.icon.clusterColor) {
                                        numberOfColoredMarkers++;
                                        if (colorOccurrences[marker.options.icon.clusterColor]) {
                                            colorOccurrences[marker.options.icon.clusterColor] += 1;
                                        }
                                        else {
                                            colorOccurrences[marker.options.icon.clusterColor] = 1;
                                        }
                                    }
                                });
                                var style = '';
                                var img = '';
                                var colors = Object.keys(colorOccurrences);
                                if (colors.length == 1) {
                                    style = "background-color: " + colors[0];
                                }
                                else {
                                    var stops_1 = '';
                                    var alreadyFilledPercentage_1 = 0;
                                    colors.map(function (color) {
                                        var n = colorOccurrences[color];
                                        var percentage = Math.round(n / numberOfColoredMarkers * 100);
                                        if (alreadyFilledPercentage_1 > 0) {
                                            stops_1 += ', ';
                                        }
                                        alreadyFilledPercentage_1 += percentage;
                                        stops_1 += color + " 0 " + alreadyFilledPercentage_1 + "%";
                                    });
                                    var gradient = new ConicGradient({
                                        stops: stops_1,
                                        size: 24
                                    });
                                    img = "<img src=\"" + gradient.png + "\"></img>";
                                }
                                return new __WEBPACK_IMPORTED_MODULE_2_leaflet__["DivIcon"]({
                                    html: "<div style=\"" + style + "\">" + img + "<span>" + childCount + "</span></div>",
                                    className: className,
                                    iconSize: new __WEBPACK_IMPORTED_MODULE_2_leaflet__["Point"](40, 40)
                                });
                            },
                        });
                        _a = this;
                        return [4 /*yield*/, this.route.getTasks()];
                    case 1:
                        _a.taskList = _b.sent();
                        _loop_1 = function (i) {
                            var task = this_1.taskList[i];
                            if (!this_1.state.isShowingAllTasks && !this_1.state.visibleTasks[task.position]) {
                                return "continue";
                            }
                            var icon = this_1.taskOpenIcon;
                            var removeTaskFromSkippedArray = true;
                            if (this_1.score.getTasksSaved().indexOf(task.id) > -1) {
                                icon = this_1.taskSavedIcon;
                            }
                            else if (this_1.score.getTasksSolved().indexOf(task.id) > -1) {
                                icon = this_1.taskDonePerfectIcon;
                            }
                            else if (this_1.score.getTasksSolvedLow().indexOf(task.id) > -1) {
                                icon = this_1.taskDoneIcon;
                            }
                            else if (this_1.score.getTasksFailed().indexOf(task.id) > -1) {
                                icon = this_1.taskFailedIcon;
                            }
                            else if (this_1.state.skippedTaskIds.indexOf(task.id) > -1) {
                                icon = this_1.taskSkippedIcon;
                                removeTaskFromSkippedArray = false;
                            }
                            if (removeTaskFromSkippedArray && this_1.state.skippedTaskIds.indexOf(task.id) > -1) {
                                // remove task from skipped array
                                this_1.state.skippedTaskIds.splice(this_1.state.skippedTaskIds.indexOf(task.id), 1);
                            }
                            markerGroup.addLayer(__WEBPACK_IMPORTED_MODULE_2_leaflet__["marker"]([task.lat, task.lon], { icon: icon }).on('click', function () {
                                if (_this.state.selectedTask == task) {
                                    _this.gototask(task.id, task.title);
                                }
                                else {
                                    // Add event of user entering trail when session active
                                    if (_this.sessionInfo != null) {
                                        var details = JSON.stringify({});
                                        _this.chatAndSessionService.addUserEvent("event_task_previewed", details, task.id.toString());
                                    }
                                    _this.state.selectedTask = task;
                                    _this.map.panTo([task.lat, task.lon]);
                                }
                            }));
                        };
                        this_1 = this;
                        for (i = 0; i < this.taskList.length; i++) {
                            _loop_1(i);
                        }
                        this.map.addLayer(markerGroup);
                        this.markerGroup = markerGroup;
                        return [2 /*return*/];
                }
            });
        });
    };
    TasksMap.prototype.loadMap = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var mapquestUrl, subDomains, map, zoomLevels, offlineLayer, tiles_1, resolveOfflineURLsAsTiles_1, that_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mapquestUrl = this.route.getTilesMap(this.app.activeNarrative);
                        subDomains = this.route.getTilesServerSubdomains(this.app.activeNarrative);
                        if (!(this.map == null)) return [3 /*break*/, 2];
                        this.map = __WEBPACK_IMPORTED_MODULE_2_leaflet__["map"]('tasks-map', {
                            attributionControl: false,
                            zoom: 18,
                            trackResize: false,
                            maxBounds: this.route.getBoundingBoxLatLng()
                        });
                        // TODO: Replace leaflet-mapbox-gl Bridge with native MapboxGl JS implementation
                        // (<any>L).mapboxGL({
                        //     accessToken: "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww",
                        //     style: mapquestUrl,
                        //     updateInterval: 0,
                        // }).addTo(this.map);
                        __WEBPACK_IMPORTED_MODULE_2_leaflet__["control"].attribution({ position: 'bottomleft', prefix: 'Leaflet' }).addTo(this.map);
                        this.map.fitBounds(this.route.getViewBoundingBoxLatLng());
                        // this.map.setZoom(18);
                        this.map.on('click', function (e) {
                            //check if details open and reset content. for now just reset content
                            // this.routeDetails = null;
                            _this.state.selectedTask = null;
                        });
                        map = this.map;
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */].initialize()];
                    case 1:
                        _a.sent();
                        zoomLevels = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].calculateZoom(this.route.getViewBoundingBoxLatLng());
                        offlineLayer = __WEBPACK_IMPORTED_MODULE_2_leaflet__["tileLayer"].offline(mapquestUrl, __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */], {
                            attribution: '&copy; mapbox.com',
                            subdomains: subDomains,
                            minZoom: zoomLevels.min_zoom,
                            maxZoom: zoomLevels.max_zoom,
                            tileSize: 256,
                            crossOrigin: true,
                            detectRetina: true,
                            bounds: this.route.getBoundingBoxLatLng()
                        });
                        this.gpsService.getCurrentPosition()
                            .then(function (resp) {
                            if (resp && resp.coords) {
                                console.debug('found you');
                                // let markerGroup = L.featureGroup();
                                _this.userMarker = __WEBPACK_IMPORTED_MODULE_2_leaflet__["marker"]([resp.coords.latitude, resp.coords.longitude], { icon: _this.userPositionIcon }).on('click', function () {
                                    // alert('Marker clicked');
                                });
                                _this.userMarker.setRotationOrigin('center center');
                                _this.userMarker.addTo(_this.map);
                                if (_this.watchSubscription) {
                                    _this.watchSubscription.unsubscribe();
                                }
                                _this.watchSubscription = _this.gpsService.watchPosition().subscribe(function (resp) {
                                    if (resp && resp.coords) {
                                        var lanlng = new __WEBPACK_IMPORTED_MODULE_2_leaflet__["LatLng"](resp.coords.latitude, resp.coords.longitude);
                                        var bBox = _this.map.getBounds();
                                        if (bBox.contains(lanlng)) {
                                            // User entered visible map bounding box -> Change Icon
                                            if (!_this.isUserInsideMap) {
                                                _this.userMarker.setIcon(_this.userPositionIcon);
                                            }
                                            _this.userMarker.setLatLng(lanlng);
                                            //Rotate the user marker
                                            if (_this.prevPos != null) {
                                                var angle = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].getAngle(_this.prevPos, resp.coords);
                                                _this.userMarker.setRotationAngle(angle);
                                            }
                                            _this.isUserInsideMap = true;
                                        }
                                        else {
                                            // User left visible map bounding box -> Change icon to arrow
                                            if (_this.isUserInsideMap) {
                                                _this.userMarker.setIcon(_this.userPositionArrow);
                                            }
                                            _this.updateUserLocationArrow(lanlng);
                                            _this.isUserInsideMap = false;
                                        }
                                        _this.prevPos = resp.coords;
                                    }
                                });
                                // Add map listener events
                                _this.map.on('moveend', function (e) {
                                    if (!_this.isUserInsideMap) {
                                        _this.updateUserLocationArrow(new __WEBPACK_IMPORTED_MODULE_2_leaflet__["LatLng"](_this.prevPos.latitude, _this.prevPos.longitude));
                                    }
                                });
                            }
                        })
                            .catch(function (error) {
                            console.error("Location error: " + JSON.stringify(error));
                        });
                        tiles_1 = this.ormService.getTileURLsAsObject(this.route);
                        resolveOfflineURLsAsTiles_1 = !this.route.isNarrativeEnabled();
                        that_1 = this;
                        offlineLayer.getTileUrl = function (coords) {
                            var url = __WEBPACK_IMPORTED_MODULE_2_leaflet__["TileLayer"].prototype.getTileUrl.call(this, coords);
                            var dbStorageKey = this._getStorageKey(url);
                            if (tiles_1[dbStorageKey]) {
                                return Promise.resolve(that_1.imagesService.getOfflineURL(dbStorageKey, false, resolveOfflineURLsAsTiles_1));
                            }
                            return Promise.resolve(url);
                        };
                        offlineLayer.addTo(map);
                        this.map.fitBounds(this.route.getViewBoundingBoxLatLng());
                        offlineLayer.on('offline:below-min-zoom-error', function () {
                            alert('Can not save tiles below minimum zoom level.');
                        });
                        offlineLayer.on('offline:save-start', function (data) {
                            console.debug(data);
                            console.debug('Saving ' + data.nTilesToSave + ' tiles.');
                        });
                        offlineLayer.on('offline:save-end', function () {
                            alert('All the tiles were saved.');
                        });
                        offlineLayer.on('offline:save-error', function (err) {
                            console.error('Error when saving tiles: ' + err);
                        });
                        offlineLayer.on('offline:remove-start', function () {
                            console.debug('Removing tiles.');
                        });
                        offlineLayer.on('offline:remove-end', function () {
                            alert('All the tiles were removed.');
                        });
                        offlineLayer.on('offline:remove-error', function (err) {
                            console.error('Error when removing tiles: ' + err);
                        });
                        //centers map in the selected task
                        if (this.state.selectedTask != null) {
                            this.centerSelectedTask();
                            /* todo: show only selectedTask */
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /*
    @description: Shows direction arrow pointing towards users geolocation if he isn't inside the current boundaries
    @param userLatLng array - [lat, lng]
     */
    TasksMap.prototype.updateUserLocationArrow = function (userLatLng) {
        if (!userLatLng) {
            return;
        }
        var bBox = this.map.getBounds();
        var alpha = __WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].bearing(this.map.getCenter(), userLatLng);
        var beta = __WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].bearing(this.map.getCenter(), bBox.getNorthEast());
        var dx2 = (__WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].length([bBox.getNorthWest(), bBox.getNorthEast()])) / 2;
        var dy2 = (__WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].length([bBox.getSouthWest(), bBox.getNorthWest()])) / 2;
        var length = 0;
        // fix negative alpha values
        if (alpha < 0) {
            alpha = alpha + 360;
        }
        // Calculate length to bounding box in direction of own position
        if ((alpha >= beta && alpha <= (180 - beta)) ||
            (alpha >= (180 + beta) && alpha <= (360 - beta))) {
            length = Math.abs(dx2 / Math.sin(alpha * (Math.PI / 180)));
        }
        else {
            length = Math.abs(dy2 / Math.cos(alpha * (Math.PI / 180)));
        }
        var closestPoint = __WEBPACK_IMPORTED_MODULE_2_leaflet__["GeometryUtil"].destination(this.map.getCenter(), alpha, 0.90 * length);
        this.userMarker.setLatLng(closestPoint);
        this.userMarker.setRotationAngle(alpha);
    };
    TasksMap.prototype.centerSelectedTask = function () {
        this.map.panTo([this.state.selectedTask.lat, this.state.selectedTask.lon]);
    };
    TasksMap.prototype.goToNextTaskById = function (taskId, skip) {
        var _this = this;
        this.taskList.forEach(function (task) {
            if (task.id == taskId) {
                _this.goToNextTask(task, skip);
                return;
            }
        });
    };
    TasksMap.prototype.goToNextTask = function (task, skip) {
        //  setTimeout(async () => {
        if (skip) {
            this.state.skippedTaskIds.push(task.id);
        }
        // task.position == index + 1
        this.state.selectedTask = this.taskList[task.position % this.taskList.length];
        this.state.visibleTasks[this.state.selectedTask.position] = true;
        //this.redrawMarker();
        this.centerSelectedTask();
        this.saveMapStateToLocalStorage();
        // }, 200);
    };
    TasksMap.prototype.selectStartPoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            return __generator(this, function (_a) {
                that = this;
                console.log('Active Narrative is: ' + this.app.activeNarrative);
                return [2 /*return*/, this.modalsService.presentTaskListModal(this.route, this.score, this.state, this.app.activeNarrative, this.navCtrl, function (selectedTask) {
                        console.debug("back in tasksMap");
                        that.state.selectedTask = selectedTask;
                        that.state.visibleTasks = {};
                        that.state.visibleTasks[selectedTask.position] = true;
                        that.state.isShowingAllTasks = false;
                        that.centerSelectedTask();
                        that.redrawMarker();
                        if (that.sessionInfo != null) {
                            var details = JSON.stringify({ title: that.state.selectedTask.title });
                            that.chatAndSessionService.addUserEvent("event_trail_start_from_task", details, that.state.selectedTask.id.toString());
                        }
                    })];
            });
        });
    };
    TasksMap.prototype.showAllTasks = function () {
        this.state.isShowingAllTasks = true;
        this.redrawMarker();
    };
    TasksMap.prototype.displayResetTasksModal = function () {
        var _this = this;
        this.modalsService.showDialog('a_route_detail_settings_resetTasks', 'a_route_detail_settings_resetTasks_msg', 'no', function () { }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resetTasks()];
                    case 1:
                        _a.sent();
                        this.showGuidedTrailModalWithDelay(50);
                        return [2 /*return*/];
                }
            });
        }); }, this.app.activeNarrative);
    };
    TasksMap.prototype.resetTasks = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.ormService.deleteUserScore(_this.score).then(function () { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.score = new __WEBPACK_IMPORTED_MODULE_8__entity_Score__["a" /* Score */]();
                            this.state = this.navParams.data.tasksMapState = {
                                selectedTask: null,
                                isShowingAllTasks: true,
                                visibleTasks: {},
                                skippedTaskIds: [],
                                selectedStartTask: false,
                                showIntroModal: true,
                                showGuidedTrailModal: true
                            };
                            if (!!this.taskList) return [3 /*break*/, 2];
                            _a = this;
                            return [4 /*yield*/, this.route.getTasks()];
                        case 1:
                            _a.taskList = _b.sent();
                            _b.label = 2;
                        case 2:
                            if (this.sessionInfo != null && this.sessionInfo.sessionUser.assigned_task_id != 0) {
                                this.forceStartFromTask(this.sessionInfo.sessionUser.assigned_task_id);
                            }
                            this.route.completed = false;
                            this.route.completedDate = null;
                            return [4 /*yield*/, this.saveMapStateToLocalStorage()];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, this.ormService.saveAndFireChangedEvent(this.route)];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, this.redrawMarker()];
                        case 5:
                            _b.sent();
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    TasksMap.prototype.sessionFinished = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.modalsService.showDialog('a_private_session_quit', 'a_private_session_quit_text', 'no', function () { }, 'yes', function () {
                    var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], {
                        session: _this.sessionInfo.session,
                        score: _this.score,
                        tasks: _this.taskList,
                        narrative: _this.app.activeNarrative
                    }, { cssClass: _this.app.activeNarrative });
                    modal.present();
                    if (_this.sessionInfo != null) {
                        var details = JSON.stringify({});
                        _this.chatAndSessionService.addUserEvent("event_session_leave", details, "0");
                    }
                    _this.chatAndSessionService.exitActiveSession();
                    if (_this.sessionTimeSubscription) {
                        _this.sessionTimeSubscription.unsubscribe();
                    }
                }, this.app.activeNarrative);
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.sessionKicked = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that, modal;
            return __generator(this, function (_a) {
                that = this;
                modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_18__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                    title: 'a_private_session_kicked',
                    message: 'a_private_session_kicked_text',
                    modalType: __WEBPACK_IMPORTED_MODULE_17__app_app_component__["a" /* MCMModalType */].hint,
                    type: 'text',
                    gamificationEnabled: false,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: [
                        {
                            title: 'a_g_ok',
                            callback: function () {
                                modal.dismiss();
                                var finishedModal = that.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], {
                                    session: that.sessionInfo.session,
                                    score: that.score,
                                    tasks: that.taskList,
                                    narrative: this.app.activeNarrative
                                }, {
                                    showBackdrop: true,
                                    enableBackdropDismiss: false
                                });
                                if (that.sessionInfo != null) {
                                    that.chatAndSessionService.exitActiveSession();
                                }
                                if (that.sessionTimeSubscription) {
                                    that.sessionTimeSubscription.unsubscribe();
                                }
                                finishedModal.present();
                            }
                        },
                    ]
                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                modal.present();
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.gototask = function (taskId, taskName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var that;
            return __generator(this, function (_a) {
                if (this.taskBlocked) {
                    console.log('session in preparation.');
                    return [2 /*return*/];
                }
                console.debug('taskId', taskId);
                that = this;
                this.navCtrl.push('TaskDetail', { taskId: taskId, headerTitle: taskName, routeId: this.routeId, goToNextTaskById: function (taskIdToSkip, skip) {
                        that.goToNextTaskById(taskIdToSkip, skip);
                    } }, {}, function () {
                    // necessary because of bug which does not update URL
                    _this.deepLinker.navChange('forward');
                });
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.navigateToChat = function () {
        return __awaiter(this, void 0, void 0, function () {
            var details;
            return __generator(this, function (_a) {
                console.debug('showChat');
                if (this.sessionInfo != null) {
                    details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_trail_chat_open", details, "0");
                }
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_22__chat_chat__["a" /* ChatPage */], {
                    val: 'chatseite',
                    headerTitle: this.sessionInfo.session.name
                });
                return [2 /*return*/];
            });
        });
    };
    TasksMap.prototype.sessionTime = function () {
        if (this.sessionInfo == null) {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            return;
        }
        var session = this.sessionInfo.session;
        var currentTimeUnix = __WEBPACK_IMPORTED_MODULE_24_moment__().unix();
        var startTimeInUnix = __WEBPACK_IMPORTED_MODULE_24_moment__(session.starts_at).unix();
        var endTimeInUnix = __WEBPACK_IMPORTED_MODULE_24_moment__(session.ends_at).unix();
        var countdown = startTimeInUnix - currentTimeUnix;
        var countdownInMin = Math.floor(countdown / 60);
        var timerInMin = Math.floor((endTimeInUnix - currentTimeUnix) / 60);
        if (currentTimeUnix > (startTimeInUnix - 3600) && currentTimeUnix < endTimeInUnix) {
            this.startInterval = true;
            if (currentTimeUnix < startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownBeforeSession = true;
                this.countdownOrTimerForSession = countdownInMin;
                this.taskBlocked = true;
            }
            if (currentTimeUnix > startTimeInUnix && currentTimeUnix < endTimeInUnix) {
                this.showCountdownOrTimer = true;
                this.countdownOrTimerForSession = timerInMin;
                this.countdownBeforeSession = false;
                this.taskBlocked = false;
            }
        }
        else {
            this.startInterval = false;
            if (this.sessionTimeSubscription) {
                this.sessionTimeSubscription.unsubscribe();
            }
            this.showSessionEnds = true;
            this.taskBlocked = false;
            // Leave session
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_21__modals_MCMSessionFinishedModal_MCMSessionFinishedModal__["a" /* MCMSessionFinishedModal */], {
                session: this.sessionInfo.session,
                score: this.score,
                tasks: this.taskList,
                narrative: this.app.activeNarrative
            }, { cssClass: this.app.activeNarrative });
            modal.present();
            return;
        }
    };
    TasksMap.prototype.showIntroModal = function () {
        var _this = this;
        return new Promise(function (success) {
            var title = 'a_alert_welcome';
            var message = 'a_alert_welcome_msg';
            if (_this.route.isNarrativeEnabled()) {
                title = _this.route.getNarrativeString(title);
                message = _this.route.getNarrativeString(message);
            }
            var introModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_19__modals_MCMIntroModal_MCMIntroModal__["a" /* MCMIntroModal */], {
                title: title,
                message: message,
                modalType: __WEBPACK_IMPORTED_MODULE_17__app_app_component__["a" /* MCMModalType */].hint,
                narrative: _this.app.activeNarrative,
                buttons: [
                    {
                        title: 'a_alert_close',
                        callback: function () {
                            introModal.dismiss();
                            success();
                        }
                    }
                ]
            }, { cssClass: _this.app.activeNarrative });
            introModal.present();
        });
    };
    TasksMap.prototype.updateIcons = function () {
        switch (this.app.activeNarrative) {
            case 'pirates':
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/mapposition.png", iconSize: [100, 100], iconAnchor: [50, 50], className: 'marker userPosition' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.userPositionArrow = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/userDirection.png", iconSize: [36, 36], iconAnchor: [18, 18], className: 'marker userArrow' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.taskOpenIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-open.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskSkippedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-skipped.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskSavedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-saved.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskDoneIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-good.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskDonePerfectIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-perfect.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskFailedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-failed.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.taskOpenIcon.clusterColor = '#AA2000';
                this.taskSkippedIcon.clusterColor = '#b2b2b2';
                this.taskSavedIcon.clusterColor = '#6E38B9';
                this.taskDoneIcon.clusterColor = '#FFC033';
                this.taskDonePerfectIcon.clusterColor = '#33CC00';
                this.taskFailedIcon.clusterColor = '#333333';
                break;
            default:
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/mapposition.png", iconSize: [100, 100], iconAnchor: [50, 50], className: 'marker userPosition' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.userPositionArrow = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: "./assets/icons/userDirection.png", iconSize: [36, 36], iconAnchor: [18, 18], className: 'marker userArrow' });
                this.taskOpenIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-open.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskSkippedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-skipped.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskSavedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-saved.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskDoneIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-good.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskDonePerfectIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-perfect.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskFailedIcon = __WEBPACK_IMPORTED_MODULE_2_leaflet__["icon"]({ iconUrl: 'assets/icons/marker-task-failed.png', iconSize: [35, 48], iconAnchor: [17.5, 43], className: 'marker' });
                this.taskOpenIcon.clusterColor = '#036D99';
                this.taskSkippedIcon.clusterColor = '#B2B2B2';
                this.taskSavedIcon.clusterColor = '#6E38B9';
                this.taskDoneIcon.clusterColor = '#F3B100';
                this.taskDonePerfectIcon.clusterColor = '#4CAF50';
                this.taskFailedIcon.clusterColor = '#E62B25';
                break;
        }
    };
    TasksMap.UPDATE_SESSION_TIME_INTERVAL_IN_SECS = 15;
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('tasks-map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TasksMap.prototype, "mapContainer", void 0);
    TasksMap = TasksMap_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tasks-map',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/tabs/TasksMap/TasksMap.html"*/'<mcm-header></mcm-header>\n<ion-content class="has-header map tasks">\n    <div ion-fixed>\n        <div id="tasks-map" class="map-view"></div>\n\n        <div id="ranking" class="detail-box" *ngIf="(!gamificationIsDisabled && currentScore && currentScore > 0) || (sessionInfo != null && this.showCountdownOrTimer)">\n            <ion-grid class="table">\n                <ion-row class="session" *ngIf="sessionInfo != null && this.showCountdownOrTimer">\n                    <ion-col col class="countdown">\n                        <img class="icon countdown" src="./assets/icons/countdown.svg"/>\n                    </ion-col>\n                    <ion-col>\n                        <ion-label *ngIf="this.countdownBeforeSession">{{\'a_private_session_countdown\' | translate}}</ion-label>\n                        <ion-label *ngIf="this.countdownBeforeSession == false">{{\'a_private_session_timer\' | translate}}</ion-label>\n                        <ion-label *ngIf="this.showSessionEnds">{{\'a_private_session_ends\' | translate}}</ion-label>\n                    </ion-col>\n                    <ion-col>\n                        <ion-label>{{ countdownOrTimerForSession }} Min</ion-label>\n                    </ion-col>\n                </ion-row>\n                <ion-row class="current" *ngIf="this.route.isAnswerFeedbackEnabled() && !gamificationIsDisabled && currentScore && currentScore > 0 && (sessionInfo==null || !sessionInfo.session.has_leaderboard)">\n                    <ion-col>\n                        <ion-label *ngIf="!sessionInfo">{{user.name}}</ion-label>\n                        <ion-label *ngIf="sessionInfo">{{sessionInfo.sessionUser.team_name}}</ion-label>\n                    </ion-col>\n                    <ion-col>\n                        <ion-label class="score">{{currentScore}}</ion-label>\n                    </ion-col>\n                </ion-row>\n                <div *ngIf="sessionInfo !=null && sessionInfo.session.has_leaderboard && this.route.isAnswerFeedbackEnabled()">\n                    <ion-row [ngClass]="{\'self\' : user.self}"\n                             *ngFor="let user of chatAndSessionService.getLeaderboard(); let i = index">\n                        <ion-col class="chart">\n                            <img class="icon arrow" src="./assets/icons/up.svg"\n                                 *ngIf="chatAndSessionService.getLeaderboard().length > 1 && i == 0 && !user.self"/>\n                            <img class="icon arrow" src="./assets/icons/down.svg"\n                                 *ngIf="chatAndSessionService.getLeaderboard().length > 1 && i != 0 && !user.self"/>\n                        </ion-col>\n\n                        <ion-col>\n                            <ion-label>{{user.team_name}}</ion-label>\n                        </ion-col>\n                        <ion-col>\n                            <ion-label class="score">{{user.score}}</ion-label>\n                        </ion-col>\n                    </ion-row>\n                </div>\n            </ion-grid>\n        </div>\n\n        <div id="details" class="detail-box" [ngClass]="{\'open\': state.selectedTask}">\n\n            <ion-fab right top>\n                <button ion-fab color="primary" (click)="fabListOpen = !fabListOpen"><ion-icon name="more"></ion-icon></button>\n                <ion-fab-list side="top">\n                    <button [hidden]="sessionInfo != null" color="danger" ion-fab (click)="displayResetTasksModal()" *ngIf="sessionInfo == null">\n                        <ion-icon name="icon-restart"></ion-icon>\n                    </button>\n                    <button color="primary" [hidden]="!state.isShowingAllTasks || assignedTask()" ion-fab (click)="selectStartPoint()">\n                        <ion-icon name="icon-starting-point"></ion-icon>\n                    </button>\n                    <button color="danger" [hidden]="state.isShowingAllTasks || assignedTask()" ion-fab (click)="showAllTasks()">\n                        <ion-icon name="icon-visibility"></ion-icon>\n                    </button>\n                    <button color="danger" ion-fab (click)="sessionFinished()" *ngIf="sessionInfo != null">\n                        <ion-icon name="icon-exit"></ion-icon>\n                    </button>\n                    <button ion-fab color="primary" (click)="navigateToChat()" *ngIf="sessionInfo != null">\n                        <ion-icon name="icon-chat"></ion-icon>\n                    </button>\n                    <span [ngClass]="{\'badge-no-show\': chatAndSessionService.getNewMsgNumber() == 0}" class="badge-top-right" *ngIf="sessionInfo != null && fabListOpen">{{chatAndSessionService.getNewMsgNumber()}}</span>\n                </ion-fab-list>\n                <span [ngClass]="{\'badge-no-show\': chatAndSessionService.getNewMsgNumber() == 0}" class="badge-top-right" *ngIf="sessionInfo != null && !fabListOpen">{{chatAndSessionService.getNewMsgNumber()}}</span>\n            </ion-fab>\n\n            <div tappable class="image-container" *ngIf="state.selectedTask" (click)="gototask(state.selectedTask.id, state.selectedTask.title)">\n                <div class="cover">\n                    <img class="thumb" [src]="state.selectedTask.getImageURL()" />\n                </div>\n            </div>\n            <div class="text-container" *ngIf="state.selectedTask">\n                <div class="segmented-box">\n                    <div class="title segement">\n                        <span tappable (click)="gototask(state.selectedTask.id, state.selectedTask.title)">#{{state.selectedTask.position}}</span>\n                        <h2 tappable (click)="gototask(state.selectedTask.id, state.selectedTask.title)">{{state.selectedTask.title}}</h2>\n                    </div>\n                </div>\n                <div class="segmented-box bottom">\n                    <!--TODO FUTUTRE GAMIFICATION INTEGRATION-->\n                    <!--<span class="segement">??? {{ "a_g_max_points" | translate }}</span>-->\n                    <div class="segement buttons">\n                        <div class="text-right">\n                            <button ion-button small round (click)="gototask(state.selectedTask.id, state.selectedTask.title)">{{ \'a_alert_show_task\' | translate }}</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/home/tabs/TasksMap/TasksMap.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular_navigation_deep_linker__["a" /* DeepLinker */],
            __WEBPACK_IMPORTED_MODULE_10__services_gps_service__["a" /* GpsService */],
            __WEBPACK_IMPORTED_MODULE_11__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_14__services_images_service__["a" /* ImagesService */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_20_ionic_angular_components_modal_modal_controller__["a" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_23__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_17__app_app_component__["b" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */]])
    ], TasksMap);
    return TasksMap;
    var TasksMap_1;
}());

//# sourceMappingURL=TasksMap.js.map

/***/ }),

/***/ 1146:
/***/ (function(module, exports) {

/**
 * CSS conic-gradient() polyfill
 * By Lea Verou — http://lea.verou.me
 * MIT license
 */

(function(){

var π = Math.PI;
var τ = 2 * π;
var ε = .00001;
var deg = π/180;

var dummy = document.createElement("div");
document.head.appendChild(dummy);

var _ = self.ConicGradient = function(o) {
	var me = this;
	_.all.push(this);

	o = o || {};

	this.canvas = document.createElement("canvas");
	this.context = this.canvas.getContext("2d");

	this.repeating = !!o.repeating;

	this.size = o.size || Math.max(innerWidth, innerHeight);

	this.canvas.width = this.canvas.height = this.size;

	var stops = o.stops;

	this.stops = (stops || "").split(/\s*,(?![^(]*\))\s*/); // commas that are not followed by a ) without a ( first

	this.from = 0;

	for (var i=0; i<this.stops.length; i++) {
		if (this.stops[i]) {
			var stop = this.stops[i] = new _.ColorStop(this, this.stops[i]);

			if (stop.next) {
				this.stops.splice(i+1, 0, stop.next);
				i++;
			}
		}
		else {
			this.stops.splice(i, 1);
			i--;
		}
	}

	if (this.stops[0].color.indexOf('from') == 0) {
		this.from = this.stops[0].pos*360;
		this.stops.shift();
	}
	// Normalize stops

	// Add dummy first stop or set first stop’s position to 0 if it doesn’t have one
	if (this.stops[0].pos === undefined) {
			this.stops[0].pos = 0;
		}
	else if (this.stops[0].pos > 0) {
		var first = this.stops[0].clone();
		first.pos = 0;
		this.stops.unshift(first);
	}

	// Add dummy last stop or set first stop’s position to 100% if it doesn’t have one
	if (this.stops[this.stops.length - 1].pos === undefined) {
		this.stops[this.stops.length - 1].pos = 1;
	}
	else if (!this.repeating && this.stops[this.stops.length - 1].pos < 1) {
		var last = this.stops[this.stops.length - 1].clone();
		last.pos = 1;
		this.stops.push(last);
	}

	this.stops.forEach(function(stop, i){
		if (stop.pos === undefined) {
			// Evenly space color stops with no position
			for (var j=i+1; this[j]; j++) {
				if (this[j].pos !== undefined) {
					stop.pos = this[i-1].pos + (this[j].pos - this[i-1].pos)/(j-i+1);
					break;
				}
			}
		}
		else if (i > 0) {
			// Normalize color stops whose position is smaller than the position of the stop before them
			stop.pos = Math.max(stop.pos, this[i-1].pos);
		}
	}, this.stops);

	if (this.repeating) {
		// Repeat color stops until >= 1
		var stops = this.stops.slice();
		var lastStop = stops[stops.length-1];
		var difference = lastStop.pos - stops[0].pos;

		for (var i=0; this.stops[this.stops.length-1].pos < 1 && i<10000; i++) {
			for (var j=0; j<stops.length; j++) {
				var s = stops[j].clone();
				s.pos += (i+1)*difference;

				this.stops.push(s);
			}
		}
	}

	this.paint();
};

_.all = [];

_.prototype = {
	toString: function() {
		return "url('" + this.dataURL + "')";
	},

	get dataURL() {
		// IE/Edge only render data-URI based background-image when the image data
		// is escaped.
		// Ref: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/#comment-3
		return "data:image/svg+xml," + encodeURIComponent(this.svg);
	},

	get blobURL() {
		// Warning: Flicker when updating due to slow blob: URL resolution :(
		// TODO cache this and only update it when color stops change
		return URL.createObjectURL(new Blob([this.svg], {type: "image/svg+xml"}));
	},

	get svg() {
		return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none">' +
			'<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">' +
			'<image width="100" height="100%" xlink:href="' + this.png + '" /></svg></svg>';
	},

	get png() {
		return this.canvas.toDataURL();
	},

	get r() {
		return Math.sqrt(2) * this.size / 2;
	},

	// Paint the conical gradient on the canvas
	// Algorithm inspired from http://jsdo.it/akm2/yr9B
	paint: function() {
		var c = this.context;

		var radius = this.r;
		var x = this.size / 2;

		var stopIndex = 0; // The index of the current color
		var stop = this.stops[stopIndex], prevStop;

		var diff, t;

		// Transform coordinate system so that angles start from the top left, like in CSS
		c.translate(this.size/2, this.size/2);
		c.rotate(-90*deg);
		c.rotate(this.from*deg);
		c.translate(-this.size/2, -this.size/2);

		for (var i = 0; i < 360;) {
			if (i/360 + ε >= stop.pos) {
				// Switch color stop
				do {
					prevStop = stop;

					stopIndex++;
					stop = this.stops[stopIndex];
				} while(stop && stop != prevStop && stop.pos === prevStop.pos);

				if (!stop) {
					break;
				}

				var sameColor = prevStop.color + "" === stop.color + "" && prevStop != stop;

				diff = prevStop.color.map(function(c, i){
					return stop.color[i] - c;
				});
			}

			t = (i/360 - prevStop.pos) / (stop.pos - prevStop.pos);

			var interpolated = sameColor? stop.color : diff.map(function(d,i){
				var ret = d * t + prevStop.color[i];

				return i < 3? ret & 255 : ret;
			});

			// Draw a series of arcs, 1deg each
			c.fillStyle = 'rgba(' + interpolated.join(",") + ')';
			c.beginPath();
			c.moveTo(x, x);

			if (sameColor) {
				var θ = 360 * (stop.pos - prevStop.pos);
			}
			else {
				var θ = .5;
			}

			var beginArg = i*deg;
			beginArg = Math.min(360*deg, beginArg);

			// .02: To prevent empty blank line and corresponding moire
			// only non-alpha colors are cared now
			var endArg = beginArg + θ*deg;
			endArg = Math.min(360*deg, endArg + .02);

			c.arc(x, x, radius, beginArg, endArg);

			c.closePath();
			c.fill();

			i += θ;
		}
	}
};

_.ColorStop = function(gradient, stop) {
	this.gradient = gradient;

	if (stop) {
		var parts = stop.match(/^(.+?)(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?(?:\s+([\d.]+)(%|deg|turn|grad|rad)?)?\s*$/);

		this.color = _.ColorStop.colorToRGBA(parts[1]);

		if (parts[2]) {
			var unit = parts[3];

			if (unit == "%" || parts[2] === "0" && !unit) {
				this.pos = parts[2]/100;
			}
			else if (unit == "turn") {
				this.pos  = +parts[2];
			}
			else if (unit == "deg") {
				this.pos  = parts[2] / 360;
			}
			else if (unit == "grad") {
				this.pos  = parts[2] / 400;
			}
			else if (unit == "rad") {
				this.pos  = parts[2] / τ;
			}
		}

		if (parts[4]) {
			this.next = new _.ColorStop(gradient, parts[1] + " " + parts[4] + parts[5]);
		}
	}
}

_.ColorStop.prototype = {
	clone: function() {
		var ret = new _.ColorStop(this.gradient);
		ret.color = this.color;
		ret.pos = this.pos;

		return ret;
	},

	toString: function() {
		return "rgba(" + this.color.join(", ") + ") " + this.pos * 100 + "%";
	}
};

_.ColorStop.colorToRGBA = function(color) {
	if (!Array.isArray(color) && color.indexOf("from") == -1) {
		dummy.style.color = color;

		var rgba = getComputedStyle(dummy).color.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/);

		if (rgba) {
			rgba.shift();
			rgba = rgba.map(function(a) { return +a });
			rgba[3] = isNaN(rgba[3])? 1 : rgba[3];
		}

		return rgba || [0,0,0,0];
	}

	return color;
};

})();

if (self.StyleFix) {
	// Test if conic gradients are supported first:
	(function(){
		var dummy = document.createElement("p");
		dummy.style.backgroundImage = "conic-gradient(white, black)";
		dummy.style.backgroundImage = PrefixFree.prefix + "conic-gradient(white, black)";

		if (!dummy.style.backgroundImage) {
			// Not supported, use polyfill
			StyleFix.register(function(css, raw) {
				if (css.indexOf("conic-gradient") > -1) {
					css = css.replace(/(?:repeating-)?conic-gradient\(\s*((?:\([^()]+\)|[^;()}])+?)\)/g, function(gradient, stops) {
						return new ConicGradient({
							stops: stops,
							repeating: gradient.indexOf("repeating-") > -1
						});
					});
				}

				return css;
			});
		}
	})();
}


/***/ })

});
//# sourceMappingURL=1.js.map