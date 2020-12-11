webpackJsonp([0],{

/***/ 1132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskDetailPageModule", function() { return TaskDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_detail__ = __webpack_require__(1149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var TaskDetailPageModule = /** @class */ (function () {
    function TaskDetailPageModule() {
    }
    TaskDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__task_detail__["a" /* TaskDetail */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__task_detail__["a" /* TaskDetail */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__ionic_native_photo_viewer__["a" /* PhotoViewer */]]
        })
    ], TaskDetailPageModule);
    return TaskDetailPageModule;
}());

//# sourceMappingURL=task-detail.module.js.map

/***/ }),

/***/ 1133:
/***/ (function(module, exports) {

/*
 Leaflet.markercluster, Provides Beautiful Animated Marker Clustering functionality for Leaflet, a JS library for interactive maps.
 https://github.com/Leaflet/Leaflet.markercluster
 (c) 2012-2013, Dave Leaver, smartrak
*/
!function(e,t,i){L.MarkerClusterGroup=L.FeatureGroup.extend({options:{maxClusterRadius:80,iconCreateFunction:null,spiderfyOnMaxZoom:!0,showCoverageOnHover:!0,zoomToBoundsOnClick:!0,singleMarkerMode:!1,disableClusteringAtZoom:null,removeOutsideVisibleBounds:!0,animate:!0,animateAddingMarkers:!1,spiderfyDistanceMultiplier:1,spiderLegPolylineOptions:{weight:1.5,color:"#222",opacity:.5},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{}},initialize:function(e){L.Util.setOptions(this,e),this.options.iconCreateFunction||(this.options.iconCreateFunction=this._defaultIconCreateFunction),this.options.clusterPane||(this.options.clusterPane=L.Marker.prototype.options.pane),this._featureGroup=L.featureGroup(),this._featureGroup.addEventParent(this),this._nonPointGroup=L.featureGroup(),this._nonPointGroup.addEventParent(this),this._inZoomAnimation=0,this._needsClustering=[],this._needsRemoving=[],this._currentShownBounds=null,this._queue=[],this._childMarkerEventHandlers={dragstart:this._childMarkerDragStart,move:this._childMarkerMoved,dragend:this._childMarkerDragEnd};var t=L.DomUtil.TRANSITION&&this.options.animate;L.extend(this,t?this._withAnimation:this._noAnimation),this._markerCluster=t?L.MarkerCluster:L.MarkerClusterNonAnimated},addLayer:function(e){if(e instanceof L.LayerGroup)return this.addLayers([e]);if(!e.getLatLng)return this._nonPointGroup.addLayer(e),this.fire("layeradd",{layer:e}),this;if(!this._map)return this._needsClustering.push(e),this.fire("layeradd",{layer:e}),this;if(this.hasLayer(e))return this;this._unspiderfy&&this._unspiderfy(),this._addLayer(e,this._maxZoom),this.fire("layeradd",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons();var t=e,i=this._zoom;if(e.__parent)for(;t.__parent._zoom>=i;)t=t.__parent;return this._currentShownBounds.contains(t.getLatLng())&&(this.options.animateAddingMarkers?this._animationAddLayer(e,t):this._animationAddLayerNonAnimated(e,t)),this},removeLayer:function(e){return e instanceof L.LayerGroup?this.removeLayers([e]):e.getLatLng?this._map?e.__parent?(this._unspiderfy&&(this._unspiderfy(),this._unspiderfyLayer(e)),this._removeLayer(e,!0),this.fire("layerremove",{layer:e}),this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),e.off(this._childMarkerEventHandlers,this),this._featureGroup.hasLayer(e)&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow()),this):this:(!this._arraySplice(this._needsClustering,e)&&this.hasLayer(e)&&this._needsRemoving.push({layer:e,latlng:e._latlng}),this.fire("layerremove",{layer:e}),this):(this._nonPointGroup.removeLayer(e),this.fire("layerremove",{layer:e}),this)},addLayers:function(e,t){if(!L.Util.isArray(e))return this.addLayer(e);var i,n=this._featureGroup,r=this._nonPointGroup,s=this.options.chunkedLoading,o=this.options.chunkInterval,a=this.options.chunkProgress,h=e.length,l=0,u=!0;if(this._map){var _=(new Date).getTime(),d=L.bind(function(){for(var c=(new Date).getTime();h>l;l++){if(s&&0===l%200){var p=(new Date).getTime()-c;if(p>o)break}if(i=e[l],i instanceof L.LayerGroup)u&&(e=e.slice(),u=!1),this._extractNonGroupLayers(i,e),h=e.length;else if(i.getLatLng){if(!this.hasLayer(i)&&(this._addLayer(i,this._maxZoom),t||this.fire("layeradd",{layer:i}),i.__parent&&2===i.__parent.getChildCount())){var f=i.__parent.getAllChildMarkers(),m=f[0]===i?f[1]:f[0];n.removeLayer(m)}}else r.addLayer(i),t||this.fire("layeradd",{layer:i})}a&&a(l,h,(new Date).getTime()-_),l===h?(this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds)):setTimeout(d,this.options.chunkDelay)},this);d()}else for(var c=this._needsClustering;h>l;l++)i=e[l],i instanceof L.LayerGroup?(u&&(e=e.slice(),u=!1),this._extractNonGroupLayers(i,e),h=e.length):i.getLatLng?this.hasLayer(i)||c.push(i):r.addLayer(i);return this},removeLayers:function(e){var t,i,n=e.length,r=this._featureGroup,s=this._nonPointGroup,o=!0;if(!this._map){for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):(this._arraySplice(this._needsClustering,i),s.removeLayer(i),this.hasLayer(i)&&this._needsRemoving.push({layer:i,latlng:i._latlng}),this.fire("layerremove",{layer:i}));return this}if(this._unspiderfy){this._unspiderfy();var a=e.slice(),h=n;for(t=0;h>t;t++)i=a[t],i instanceof L.LayerGroup?(this._extractNonGroupLayers(i,a),h=a.length):this._unspiderfyLayer(i)}for(t=0;n>t;t++)i=e[t],i instanceof L.LayerGroup?(o&&(e=e.slice(),o=!1),this._extractNonGroupLayers(i,e),n=e.length):i.__parent?(this._removeLayer(i,!0,!0),this.fire("layerremove",{layer:i}),r.hasLayer(i)&&(r.removeLayer(i),i.clusterShow&&i.clusterShow())):(s.removeLayer(i),this.fire("layerremove",{layer:i}));return this._topClusterLevel._recalculateBounds(),this._refreshClustersIcons(),this._topClusterLevel._recursivelyAddChildrenToMap(null,this._zoom,this._currentShownBounds),this},clearLayers:function(){return this._map||(this._needsClustering=[],delete this._gridClusters,delete this._gridUnclustered),this._noanimationUnspiderfy&&this._noanimationUnspiderfy(),this._featureGroup.clearLayers(),this._nonPointGroup.clearLayers(),this.eachLayer(function(e){e.off(this._childMarkerEventHandlers,this),delete e.__parent},this),this._map&&this._generateInitialClusters(),this},getBounds:function(){var e=new L.LatLngBounds;this._topClusterLevel&&e.extend(this._topClusterLevel._bounds);for(var t=this._needsClustering.length-1;t>=0;t--)e.extend(this._needsClustering[t].getLatLng());return e.extend(this._nonPointGroup.getBounds()),e},eachLayer:function(e,t){var i,n,r,s=this._needsClustering.slice(),o=this._needsRemoving;for(this._topClusterLevel&&this._topClusterLevel.getAllChildMarkers(s),n=s.length-1;n>=0;n--){for(i=!0,r=o.length-1;r>=0;r--)if(o[r].layer===s[n]){i=!1;break}i&&e.call(t,s[n])}this._nonPointGroup.eachLayer(e,t)},getLayers:function(){var e=[];return this.eachLayer(function(t){e.push(t)}),e},getLayer:function(e){var t=null;return e=parseInt(e,10),this.eachLayer(function(i){L.stamp(i)===e&&(t=i)}),t},hasLayer:function(e){if(!e)return!1;var t,i=this._needsClustering;for(t=i.length-1;t>=0;t--)if(i[t]===e)return!0;for(i=this._needsRemoving,t=i.length-1;t>=0;t--)if(i[t].layer===e)return!1;return!(!e.__parent||e.__parent._group!==this)||this._nonPointGroup.hasLayer(e)},zoomToShowLayer:function(e,t){"function"!=typeof t&&(t=function(){});var i=function(){!e._icon&&!e.__parent._icon||this._inZoomAnimation||(this._map.off("moveend",i,this),this.off("animationend",i,this),e._icon?t():e.__parent._icon&&(this.once("spiderfied",t,this),e.__parent.spiderfy()))};e._icon&&this._map.getBounds().contains(e.getLatLng())?t():e.__parent._zoom<Math.round(this._map._zoom)?(this._map.on("moveend",i,this),this._map.panTo(e.getLatLng())):(this._map.on("moveend",i,this),this.on("animationend",i,this),e.__parent.zoomToBounds())},onAdd:function(e){this._map=e;var t,i,n;if(!isFinite(this._map.getMaxZoom()))throw"Map has no maxZoom specified";for(this._featureGroup.addTo(e),this._nonPointGroup.addTo(e),this._gridClusters||this._generateInitialClusters(),this._maxLat=e.options.crs.projection.MAX_LATITUDE,t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],n.newlatlng=n.layer._latlng,n.layer._latlng=n.latlng;for(t=0,i=this._needsRemoving.length;i>t;t++)n=this._needsRemoving[t],this._removeLayer(n.layer,!0),n.layer._latlng=n.newlatlng;this._needsRemoving=[],this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds(),this._map.on("zoomend",this._zoomEnd,this),this._map.on("moveend",this._moveEnd,this),this._spiderfierOnAdd&&this._spiderfierOnAdd(),this._bindEvents(),i=this._needsClustering,this._needsClustering=[],this.addLayers(i,!0)},onRemove:function(e){e.off("zoomend",this._zoomEnd,this),e.off("moveend",this._moveEnd,this),this._unbindEvents(),this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim",""),this._spiderfierOnRemove&&this._spiderfierOnRemove(),delete this._maxLat,this._hideCoverage(),this._featureGroup.remove(),this._nonPointGroup.remove(),this._featureGroup.clearLayers(),this._map=null},getVisibleParent:function(e){for(var t=e;t&&!t._icon;)t=t.__parent;return t||null},_arraySplice:function(e,t){for(var i=e.length-1;i>=0;i--)if(e[i]===t)return e.splice(i,1),!0},_removeFromGridUnclustered:function(e,t){for(var i=this._map,n=this._gridUnclustered,r=Math.floor(this._map.getMinZoom());t>=r&&n[t].removeObject(e,i.project(e.getLatLng(),t));t--);},_childMarkerDragStart:function(e){e.target.__dragStart=e.target._latlng},_childMarkerMoved:function(e){if(!this._ignoreMove&&!e.target.__dragStart){var t=e.target._popup&&e.target._popup.isOpen();this._moveChild(e.target,e.oldLatLng,e.latlng),t&&e.target.openPopup()}},_moveChild:function(e,t,i){e._latlng=t,this.removeLayer(e),e._latlng=i,this.addLayer(e)},_childMarkerDragEnd:function(e){e.target.__dragStart&&this._moveChild(e.target,e.target.__dragStart,e.target._latlng),delete e.target.__dragStart},_removeLayer:function(e,t,i){var n=this._gridClusters,r=this._gridUnclustered,s=this._featureGroup,o=this._map,a=Math.floor(this._map.getMinZoom());t&&this._removeFromGridUnclustered(e,this._maxZoom);var h,l=e.__parent,u=l._markers;for(this._arraySplice(u,e);l&&(l._childCount--,l._boundsNeedUpdate=!0,!(l._zoom<a));)t&&l._childCount<=1?(h=l._markers[0]===e?l._markers[1]:l._markers[0],n[l._zoom].removeObject(l,o.project(l._cLatLng,l._zoom)),r[l._zoom].addObject(h,o.project(h.getLatLng(),l._zoom)),this._arraySplice(l.__parent._childClusters,l),l.__parent._markers.push(h),h.__parent=l.__parent,l._icon&&(s.removeLayer(l),i||s.addLayer(h))):l._iconNeedsUpdate=!0,l=l.__parent;delete e.__parent},_isOrIsParent:function(e,t){for(;t;){if(e===t)return!0;t=t.parentNode}return!1},fire:function(e,t,i){if(t&&t.layer instanceof L.MarkerCluster){if(t.originalEvent&&this._isOrIsParent(t.layer._icon,t.originalEvent.relatedTarget))return;e="cluster"+e}L.FeatureGroup.prototype.fire.call(this,e,t,i)},listens:function(e,t){return L.FeatureGroup.prototype.listens.call(this,e,t)||L.FeatureGroup.prototype.listens.call(this,"cluster"+e,t)},_defaultIconCreateFunction:function(e){var t=e.getChildCount(),i=" marker-cluster-";return i+=10>t?"small":100>t?"medium":"large",new L.DivIcon({html:"<div><span>"+t+"</span></div>",className:"marker-cluster"+i,iconSize:new L.Point(40,40)})},_bindEvents:function(){var e=this._map,t=this.options.spiderfyOnMaxZoom,i=this.options.showCoverageOnHover,n=this.options.zoomToBoundsOnClick;(t||n)&&this.on("clusterclick",this._zoomOrSpiderfy,this),i&&(this.on("clustermouseover",this._showCoverage,this),this.on("clustermouseout",this._hideCoverage,this),e.on("zoomend",this._hideCoverage,this))},_zoomOrSpiderfy:function(e){for(var t=e.layer,i=t;1===i._childClusters.length;)i=i._childClusters[0];i._zoom===this._maxZoom&&i._childCount===t._childCount&&this.options.spiderfyOnMaxZoom?t.spiderfy():this.options.zoomToBoundsOnClick&&t.zoomToBounds(),e.originalEvent&&13===e.originalEvent.keyCode&&this._map._container.focus()},_showCoverage:function(e){var t=this._map;this._inZoomAnimation||(this._shownPolygon&&t.removeLayer(this._shownPolygon),e.layer.getChildCount()>2&&e.layer!==this._spiderfied&&(this._shownPolygon=new L.Polygon(e.layer.getConvexHull(),this.options.polygonOptions),t.addLayer(this._shownPolygon)))},_hideCoverage:function(){this._shownPolygon&&(this._map.removeLayer(this._shownPolygon),this._shownPolygon=null)},_unbindEvents:function(){var e=this.options.spiderfyOnMaxZoom,t=this.options.showCoverageOnHover,i=this.options.zoomToBoundsOnClick,n=this._map;(e||i)&&this.off("clusterclick",this._zoomOrSpiderfy,this),t&&(this.off("clustermouseover",this._showCoverage,this),this.off("clustermouseout",this._hideCoverage,this),n.off("zoomend",this._hideCoverage,this))},_zoomEnd:function(){this._map&&(this._mergeSplitClusters(),this._zoom=Math.round(this._map._zoom),this._currentShownBounds=this._getExpandedVisibleBounds())},_moveEnd:function(){if(!this._inZoomAnimation){var e=this._getExpandedVisibleBounds();this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,e),this._topClusterLevel._recursivelyAddChildrenToMap(null,Math.round(this._map._zoom),e),this._currentShownBounds=e}},_generateInitialClusters:function(){var e=Math.ceil(this._map.getMaxZoom()),t=Math.floor(this._map.getMinZoom()),i=this.options.maxClusterRadius,n=i;"function"!=typeof i&&(n=function(){return i}),null!==this.options.disableClusteringAtZoom&&(e=this.options.disableClusteringAtZoom-1),this._maxZoom=e,this._gridClusters={},this._gridUnclustered={};for(var r=e;r>=t;r--)this._gridClusters[r]=new L.DistanceGrid(n(r)),this._gridUnclustered[r]=new L.DistanceGrid(n(r));this._topClusterLevel=new this._markerCluster(this,t-1)},_addLayer:function(e,t){var i,n,r=this._gridClusters,s=this._gridUnclustered,o=Math.floor(this._map.getMinZoom());for(this.options.singleMarkerMode&&this._overrideMarkerIcon(e),e.on(this._childMarkerEventHandlers,this);t>=o;t--){i=this._map.project(e.getLatLng(),t);var a=r[t].getNearObject(i);if(a)return a._addChild(e),e.__parent=a,void 0;if(a=s[t].getNearObject(i)){var h=a.__parent;h&&this._removeLayer(a,!1);var l=new this._markerCluster(this,t,a,e);r[t].addObject(l,this._map.project(l._cLatLng,t)),a.__parent=l,e.__parent=l;var u=l;for(n=t-1;n>h._zoom;n--)u=new this._markerCluster(this,n,u),r[n].addObject(u,this._map.project(a.getLatLng(),n));return h._addChild(u),this._removeFromGridUnclustered(a,t),void 0}s[t].addObject(e,i)}this._topClusterLevel._addChild(e),e.__parent=this._topClusterLevel},_refreshClustersIcons:function(){this._featureGroup.eachLayer(function(e){e instanceof L.MarkerCluster&&e._iconNeedsUpdate&&e._updateIcon()})},_enqueue:function(e){this._queue.push(e),this._queueTimeout||(this._queueTimeout=setTimeout(L.bind(this._processQueue,this),300))},_processQueue:function(){for(var e=0;e<this._queue.length;e++)this._queue[e].call(this);this._queue.length=0,clearTimeout(this._queueTimeout),this._queueTimeout=null},_mergeSplitClusters:function(){var e=Math.round(this._map._zoom);this._processQueue(),this._zoom<e&&this._currentShownBounds.intersects(this._getExpandedVisibleBounds())?(this._animationStart(),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),this._zoom,this._getExpandedVisibleBounds()),this._animationZoomIn(this._zoom,e)):this._zoom>e?(this._animationStart(),this._animationZoomOut(this._zoom,e)):this._moveEnd()},_getExpandedVisibleBounds:function(){return this.options.removeOutsideVisibleBounds?L.Browser.mobile?this._checkBoundsMaxLat(this._map.getBounds()):this._checkBoundsMaxLat(this._map.getBounds().pad(1)):this._mapBoundsInfinite},_checkBoundsMaxLat:function(e){var t=this._maxLat;return t!==i&&(e.getNorth()>=t&&(e._northEast.lat=1/0),e.getSouth()<=-t&&(e._southWest.lat=-1/0)),e},_animationAddLayerNonAnimated:function(e,t){if(t===e)this._featureGroup.addLayer(e);else if(2===t._childCount){t._addToMap();var i=t.getAllChildMarkers();this._featureGroup.removeLayer(i[0]),this._featureGroup.removeLayer(i[1])}else t._updateIcon()},_extractNonGroupLayers:function(e,t){var i,n=e.getLayers(),r=0;for(t=t||[];r<n.length;r++)i=n[r],i instanceof L.LayerGroup?this._extractNonGroupLayers(i,t):t.push(i);return t},_overrideMarkerIcon:function(e){var t=e.options.icon=this.options.iconCreateFunction({getChildCount:function(){return 1},getAllChildMarkers:function(){return[e]}});return t}}),L.MarkerClusterGroup.include({_mapBoundsInfinite:new L.LatLngBounds(new L.LatLng(-1/0,-1/0),new L.LatLng(1/0,1/0))}),L.MarkerClusterGroup.include({_noAnimation:{_animationStart:function(){},_animationZoomIn:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationZoomOut:function(e,t){this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this.fire("animationend")},_animationAddLayer:function(e,t){this._animationAddLayerNonAnimated(e,t)}},_withAnimation:{_animationStart:function(){this._map._mapPane.className+=" leaflet-cluster-anim",this._inZoomAnimation++},_animationZoomIn:function(e,t){var i,n=this._getExpandedVisibleBounds(),r=this._featureGroup,s=Math.floor(this._map.getMinZoom());this._ignoreMove=!0,this._topClusterLevel._recursively(n,e,s,function(s){var o,a=s._latlng,h=s._markers;for(n.contains(a)||(a=null),s._isSingleParent()&&e+1===t?(r.removeLayer(s),s._recursivelyAddChildrenToMap(null,t,n)):(s.clusterHide(),s._recursivelyAddChildrenToMap(a,t,n)),i=h.length-1;i>=0;i--)o=h[i],n.contains(o._latlng)||r.removeLayer(o)}),this._forceLayout(),this._topClusterLevel._recursivelyBecomeVisible(n,t),r.eachLayer(function(e){e instanceof L.MarkerCluster||!e._icon||e.clusterShow()}),this._topClusterLevel._recursively(n,e,t,function(e){e._recursivelyRestoreChildPositions(t)}),this._ignoreMove=!1,this._enqueue(function(){this._topClusterLevel._recursively(n,e,s,function(e){r.removeLayer(e),e.clusterShow()}),this._animationEnd()})},_animationZoomOut:function(e,t){this._animationZoomOutSingle(this._topClusterLevel,e-1,t),this._topClusterLevel._recursivelyAddChildrenToMap(null,t,this._getExpandedVisibleBounds()),this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds,Math.floor(this._map.getMinZoom()),e,this._getExpandedVisibleBounds())},_animationAddLayer:function(e,t){var i=this,n=this._featureGroup;n.addLayer(e),t!==e&&(t._childCount>2?(t._updateIcon(),this._forceLayout(),this._animationStart(),e._setPos(this._map.latLngToLayerPoint(t.getLatLng())),e.clusterHide(),this._enqueue(function(){n.removeLayer(e),e.clusterShow(),i._animationEnd()})):(this._forceLayout(),i._animationStart(),i._animationZoomOutSingle(t,this._map.getMaxZoom(),this._zoom)))}},_animationZoomOutSingle:function(e,t,i){var n=this._getExpandedVisibleBounds(),r=Math.floor(this._map.getMinZoom());e._recursivelyAnimateChildrenInAndAddSelfToMap(n,r,t+1,i);var s=this;this._forceLayout(),e._recursivelyBecomeVisible(n,i),this._enqueue(function(){if(1===e._childCount){var o=e._markers[0];this._ignoreMove=!0,o.setLatLng(o.getLatLng()),this._ignoreMove=!1,o.clusterShow&&o.clusterShow()}else e._recursively(n,i,r,function(e){e._recursivelyRemoveChildrenFromMap(n,r,t+1)});s._animationEnd()})},_animationEnd:function(){this._map&&(this._map._mapPane.className=this._map._mapPane.className.replace(" leaflet-cluster-anim","")),this._inZoomAnimation--,this.fire("animationend")},_forceLayout:function(){L.Util.falseFn(t.body.offsetWidth)}}),L.markerClusterGroup=function(e){return new L.MarkerClusterGroup(e)},L.MarkerCluster=L.Marker.extend({initialize:function(e,t,i,n){L.Marker.prototype.initialize.call(this,i?i._cLatLng||i.getLatLng():new L.LatLng(0,0),{icon:this,pane:e.options.clusterPane}),this._group=e,this._zoom=t,this._markers=[],this._childClusters=[],this._childCount=0,this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._bounds=new L.LatLngBounds,i&&this._addChild(i),n&&this._addChild(n)},getAllChildMarkers:function(e){e=e||[];for(var t=this._childClusters.length-1;t>=0;t--)this._childClusters[t].getAllChildMarkers(e);for(var i=this._markers.length-1;i>=0;i--)e.push(this._markers[i]);return e},getChildCount:function(){return this._childCount},zoomToBounds:function(e){for(var t,i=this._childClusters.slice(),n=this._group._map,r=n.getBoundsZoom(this._bounds),s=this._zoom+1,o=n.getZoom();i.length>0&&r>s;){s++;var a=[];for(t=0;t<i.length;t++)a=a.concat(i[t]._childClusters);i=a}r>s?this._group._map.setView(this._latlng,s):o>=r?this._group._map.setView(this._latlng,o+1):this._group._map.fitBounds(this._bounds,e)},getBounds:function(){var e=new L.LatLngBounds;return e.extend(this._bounds),e},_updateIcon:function(){this._iconNeedsUpdate=!0,this._icon&&this.setIcon(this)},createIcon:function(){return this._iconNeedsUpdate&&(this._iconObj=this._group.options.iconCreateFunction(this),this._iconNeedsUpdate=!1),this._iconObj.createIcon()},createShadow:function(){return this._iconObj.createShadow()},_addChild:function(e,t){this._iconNeedsUpdate=!0,this._boundsNeedUpdate=!0,this._setClusterCenter(e),e instanceof L.MarkerCluster?(t||(this._childClusters.push(e),e.__parent=this),this._childCount+=e._childCount):(t||this._markers.push(e),this._childCount++),this.__parent&&this.__parent._addChild(e,!0)},_setClusterCenter:function(e){this._cLatLng||(this._cLatLng=e._cLatLng||e._latlng)},_resetBounds:function(){var e=this._bounds;e._southWest&&(e._southWest.lat=1/0,e._southWest.lng=1/0),e._northEast&&(e._northEast.lat=-1/0,e._northEast.lng=-1/0)},_recalculateBounds:function(){var e,t,i,n,r=this._markers,s=this._childClusters,o=0,a=0,h=this._childCount;if(0!==h){for(this._resetBounds(),e=0;e<r.length;e++)i=r[e]._latlng,this._bounds.extend(i),o+=i.lat,a+=i.lng;for(e=0;e<s.length;e++)t=s[e],t._boundsNeedUpdate&&t._recalculateBounds(),this._bounds.extend(t._bounds),i=t._wLatLng,n=t._childCount,o+=i.lat*n,a+=i.lng*n;this._latlng=this._wLatLng=new L.LatLng(o/h,a/h),this._boundsNeedUpdate=!1}},_addToMap:function(e){e&&(this._backupLatlng=this._latlng,this.setLatLng(e)),this._group._featureGroup.addLayer(this)},_recursivelyAnimateChildrenIn:function(e,t,i){this._recursively(e,this._group._map.getMinZoom(),i-1,function(e){var i,n,r=e._markers;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())},function(e){var i,n,r=e._childClusters;for(i=r.length-1;i>=0;i--)n=r[i],n._icon&&(n._setPos(t),n.clusterHide())})},_recursivelyAnimateChildrenInAndAddSelfToMap:function(e,t,i,n){this._recursively(e,n,t,function(r){r._recursivelyAnimateChildrenIn(e,r._group._map.latLngToLayerPoint(r.getLatLng()).round(),i),r._isSingleParent()&&i-1===n?(r.clusterShow(),r._recursivelyRemoveChildrenFromMap(e,t,i)):r.clusterHide(),r._addToMap()})},_recursivelyBecomeVisible:function(e,t){this._recursively(e,this._group._map.getMinZoom(),t,null,function(e){e.clusterShow()})},_recursivelyAddChildrenToMap:function(e,t,i){this._recursively(i,this._group._map.getMinZoom()-1,t,function(n){if(t!==n._zoom)for(var r=n._markers.length-1;r>=0;r--){var s=n._markers[r];i.contains(s._latlng)&&(e&&(s._backupLatlng=s.getLatLng(),s.setLatLng(e),s.clusterHide&&s.clusterHide()),n._group._featureGroup.addLayer(s))}},function(t){t._addToMap(e)})},_recursivelyRestoreChildPositions:function(e){for(var t=this._markers.length-1;t>=0;t--){var i=this._markers[t];i._backupLatlng&&(i.setLatLng(i._backupLatlng),delete i._backupLatlng)}if(e-1===this._zoom)for(var n=this._childClusters.length-1;n>=0;n--)this._childClusters[n]._restorePosition();else for(var r=this._childClusters.length-1;r>=0;r--)this._childClusters[r]._recursivelyRestoreChildPositions(e)},_restorePosition:function(){this._backupLatlng&&(this.setLatLng(this._backupLatlng),delete this._backupLatlng)},_recursivelyRemoveChildrenFromMap:function(e,t,i,n){var r,s;this._recursively(e,t-1,i-1,function(e){for(s=e._markers.length-1;s>=0;s--)r=e._markers[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())},function(e){for(s=e._childClusters.length-1;s>=0;s--)r=e._childClusters[s],n&&n.contains(r._latlng)||(e._group._featureGroup.removeLayer(r),r.clusterShow&&r.clusterShow())})},_recursively:function(e,t,i,n,r){var s,o,a=this._childClusters,h=this._zoom;if(h>=t&&(n&&n(this),r&&h===i&&r(this)),t>h||i>h)for(s=a.length-1;s>=0;s--)o=a[s],e.intersects(o._bounds)&&o._recursively(e,t,i,n,r)},_isSingleParent:function(){return this._childClusters.length>0&&this._childClusters[0]._childCount===this._childCount}}),L.Marker.include({clusterHide:function(){return this.options.opacityWhenUnclustered=this.options.opacity||1,this.setOpacity(0)},clusterShow:function(){var e=this.setOpacity(this.options.opacity||this.options.opacityWhenUnclustered);return delete this.options.opacityWhenUnclustered,e}}),L.DistanceGrid=function(e){this._cellSize=e,this._sqCellSize=e*e,this._grid={},this._objectPoint={}},L.DistanceGrid.prototype={addObject:function(e,t){var i=this._getCoord(t.x),n=this._getCoord(t.y),r=this._grid,s=r[n]=r[n]||{},o=s[i]=s[i]||[],a=L.Util.stamp(e);this._objectPoint[a]=t,o.push(e)},updateObject:function(e,t){this.removeObject(e),this.addObject(e,t)},removeObject:function(e,t){var i,n,r=this._getCoord(t.x),s=this._getCoord(t.y),o=this._grid,a=o[s]=o[s]||{},h=a[r]=a[r]||[];for(delete this._objectPoint[L.Util.stamp(e)],i=0,n=h.length;n>i;i++)if(h[i]===e)return h.splice(i,1),1===n&&delete a[r],!0},eachObject:function(e,t){var i,n,r,s,o,a,h,l=this._grid;for(i in l){o=l[i];for(n in o)for(a=o[n],r=0,s=a.length;s>r;r++)h=e.call(t,a[r]),h&&(r--,s--)}},getNearObject:function(e){var t,i,n,r,s,o,a,h,l=this._getCoord(e.x),u=this._getCoord(e.y),_=this._objectPoint,d=this._sqCellSize,c=null;for(t=u-1;u+1>=t;t++)if(r=this._grid[t])for(i=l-1;l+1>=i;i++)if(s=r[i])for(n=0,o=s.length;o>n;n++)a=s[n],h=this._sqDist(_[L.Util.stamp(a)],e),d>h&&(d=h,c=a);return c},_getCoord:function(e){return Math.floor(e/this._cellSize)},_sqDist:function(e,t){var i=t.x-e.x,n=t.y-e.y;return i*i+n*n}},function(){L.QuickHull={getDistant:function(e,t){var i=t[1].lat-t[0].lat,n=t[0].lng-t[1].lng;return n*(e.lat-t[0].lat)+i*(e.lng-t[0].lng)},findMostDistantPointFromBaseLine:function(e,t){var i,n,r,s=0,o=null,a=[];for(i=t.length-1;i>=0;i--)n=t[i],r=this.getDistant(n,e),r>0&&(a.push(n),r>s&&(s=r,o=n));return{maxPoint:o,newPoints:a}},buildConvexHull:function(e,t){var i=[],n=this.findMostDistantPointFromBaseLine(e,t);return n.maxPoint?(i=i.concat(this.buildConvexHull([e[0],n.maxPoint],n.newPoints)),i=i.concat(this.buildConvexHull([n.maxPoint,e[1]],n.newPoints))):[e[0]]},getConvexHull:function(e){var t,i=!1,n=!1,r=!1,s=!1,o=null,a=null,h=null,l=null,u=null,_=null;for(t=e.length-1;t>=0;t--){var d=e[t];(i===!1||d.lat>i)&&(o=d,i=d.lat),(n===!1||d.lat<n)&&(a=d,n=d.lat),(r===!1||d.lng>r)&&(h=d,r=d.lng),(s===!1||d.lng<s)&&(l=d,s=d.lng)}n!==i?(_=a,u=o):(_=l,u=h);var c=[].concat(this.buildConvexHull([_,u],e),this.buildConvexHull([u,_],e));return c}}}(),L.MarkerCluster.include({getConvexHull:function(){var e,t,i=this.getAllChildMarkers(),n=[];for(t=i.length-1;t>=0;t--)e=i[t].getLatLng(),n.push(e);return L.QuickHull.getConvexHull(n)}}),L.MarkerCluster.include({_2PI:2*Math.PI,_circleFootSeparation:25,_circleStartAngle:Math.PI/6,_spiralFootSeparation:28,_spiralLengthStart:11,_spiralLengthFactor:5,_circleSpiralSwitchover:9,spiderfy:function(){if(this._group._spiderfied!==this&&!this._group._inZoomAnimation){var e,t=this.getAllChildMarkers(),i=this._group,n=i._map,r=n.latLngToLayerPoint(this._latlng);this._group._unspiderfy(),this._group._spiderfied=this,t.length>=this._circleSpiralSwitchover?e=this._generatePointsSpiral(t.length,r):(r.y+=10,e=this._generatePointsCircle(t.length,r)),this._animationSpiderfy(t,e)}},unspiderfy:function(e){this._group._inZoomAnimation||(this._animationUnspiderfy(e),this._group._spiderfied=null)},_generatePointsCircle:function(e,t){var i,n,r=this._group.options.spiderfyDistanceMultiplier*this._circleFootSeparation*(2+e),s=r/this._2PI,o=this._2PI/e,a=[];for(a.length=e,i=e-1;i>=0;i--)n=this._circleStartAngle+i*o,a[i]=new L.Point(t.x+s*Math.cos(n),t.y+s*Math.sin(n))._round();return a},_generatePointsSpiral:function(e,t){var i,n=this._group.options.spiderfyDistanceMultiplier,r=n*this._spiralLengthStart,s=n*this._spiralFootSeparation,o=n*this._spiralLengthFactor*this._2PI,a=0,h=[];for(h.length=e,i=e-1;i>=0;i--)a+=s/r+5e-4*i,h[i]=new L.Point(t.x+r*Math.cos(a),t.y+r*Math.sin(a))._round(),r+=o/a;return h},_noanimationUnspiderfy:function(){var e,t,i=this._group,n=i._map,r=i._featureGroup,s=this.getAllChildMarkers();for(i._ignoreMove=!0,this.setOpacity(1),t=s.length-1;t>=0;t--)e=s[t],r.removeLayer(e),e._preSpiderfyLatlng&&(e.setLatLng(e._preSpiderfyLatlng),delete e._preSpiderfyLatlng),e.setZIndexOffset&&e.setZIndexOffset(0),e._spiderLeg&&(n.removeLayer(e._spiderLeg),delete e._spiderLeg);i.fire("unspiderfied",{cluster:this,markers:s}),i._ignoreMove=!1,i._spiderfied=null}}),L.MarkerClusterNonAnimated=L.MarkerCluster.extend({_animationSpiderfy:function(e,t){var i,n,r,s,o=this._group,a=o._map,h=o._featureGroup,l=this._group.options.spiderLegPolylineOptions;for(o._ignoreMove=!0,i=0;i<e.length;i++)s=a.layerPointToLatLng(t[i]),n=e[i],r=new L.Polyline([this._latlng,s],l),a.addLayer(r),n._spiderLeg=r,n._preSpiderfyLatlng=n._latlng,n.setLatLng(s),n.setZIndexOffset&&n.setZIndexOffset(1e6),h.addLayer(n);this.setOpacity(.3),o._ignoreMove=!1,o.fire("spiderfied",{cluster:this,markers:e})},_animationUnspiderfy:function(){this._noanimationUnspiderfy()}}),L.MarkerCluster.include({_animationSpiderfy:function(e,t){var n,r,s,o,a,h,l=this,u=this._group,_=u._map,d=u._featureGroup,c=this._latlng,p=_.latLngToLayerPoint(c),f=L.Path.SVG,m=L.extend({},this._group.options.spiderLegPolylineOptions),g=m.opacity;for(g===i&&(g=L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity),f?(m.opacity=0,m.className=(m.className||"")+" leaflet-cluster-spider-leg"):m.opacity=g,u._ignoreMove=!0,n=0;n<e.length;n++)r=e[n],h=_.layerPointToLatLng(t[n]),s=new L.Polyline([c,h],m),_.addLayer(s),r._spiderLeg=s,f&&(o=s._path,a=o.getTotalLength()+.1,o.style.strokeDasharray=a,o.style.strokeDashoffset=a),r.setZIndexOffset&&r.setZIndexOffset(1e6),r.clusterHide&&r.clusterHide(),d.addLayer(r),r._setPos&&r._setPos(p);for(u._forceLayout(),u._animationStart(),n=e.length-1;n>=0;n--)h=_.layerPointToLatLng(t[n]),r=e[n],r._preSpiderfyLatlng=r._latlng,r.setLatLng(h),r.clusterShow&&r.clusterShow(),f&&(s=r._spiderLeg,o=s._path,o.style.strokeDashoffset=0,s.setStyle({opacity:g}));this.setOpacity(.3),u._ignoreMove=!1,setTimeout(function(){u._animationEnd(),u.fire("spiderfied",{cluster:l,markers:e})},200)},_animationUnspiderfy:function(e){var t,i,n,r,s,o,a=this,h=this._group,l=h._map,u=h._featureGroup,_=e?l._latLngToNewLayerPoint(this._latlng,e.zoom,e.center):l.latLngToLayerPoint(this._latlng),d=this.getAllChildMarkers(),c=L.Path.SVG;for(h._ignoreMove=!0,h._animationStart(),this.setOpacity(1),i=d.length-1;i>=0;i--)t=d[i],t._preSpiderfyLatlng&&(t.closePopup(),t.setLatLng(t._preSpiderfyLatlng),delete t._preSpiderfyLatlng,o=!0,t._setPos&&(t._setPos(_),o=!1),t.clusterHide&&(t.clusterHide(),o=!1),o&&u.removeLayer(t),c&&(n=t._spiderLeg,r=n._path,s=r.getTotalLength()+.1,r.style.strokeDashoffset=s,n.setStyle({opacity:0})));h._ignoreMove=!1,setTimeout(function(){var e=0;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&e++;for(i=d.length-1;i>=0;i--)t=d[i],t._spiderLeg&&(t.clusterShow&&t.clusterShow(),t.setZIndexOffset&&t.setZIndexOffset(0),e>1&&u.removeLayer(t),l.removeLayer(t._spiderLeg),delete t._spiderLeg);h._animationEnd(),h.fire("unspiderfied",{cluster:a,markers:d})},200)}}),L.MarkerClusterGroup.include({_spiderfied:null,unspiderfy:function(){this._unspiderfy.apply(this,arguments)},_spiderfierOnAdd:function(){this._map.on("click",this._unspiderfyWrapper,this),this._map.options.zoomAnimation&&this._map.on("zoomstart",this._unspiderfyZoomStart,this),this._map.on("zoomend",this._noanimationUnspiderfy,this),L.Browser.touch||this._map.getRenderer(this)},_spiderfierOnRemove:function(){this._map.off("click",this._unspiderfyWrapper,this),this._map.off("zoomstart",this._unspiderfyZoomStart,this),this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._map.off("zoomend",this._noanimationUnspiderfy,this),this._noanimationUnspiderfy()},_unspiderfyZoomStart:function(){this._map&&this._map.on("zoomanim",this._unspiderfyZoomAnim,this)},_unspiderfyZoomAnim:function(e){L.DomUtil.hasClass(this._map._mapPane,"leaflet-touching")||(this._map.off("zoomanim",this._unspiderfyZoomAnim,this),this._unspiderfy(e))},_unspiderfyWrapper:function(){this._unspiderfy()
},_unspiderfy:function(e){this._spiderfied&&this._spiderfied.unspiderfy(e)},_noanimationUnspiderfy:function(){this._spiderfied&&this._spiderfied._noanimationUnspiderfy()},_unspiderfyLayer:function(e){e._spiderLeg&&(this._featureGroup.removeLayer(e),e.clusterShow&&e.clusterShow(),e.setZIndexOffset&&e.setZIndexOffset(0),this._map.removeLayer(e._spiderLeg),delete e._spiderLeg)}}),L.MarkerClusterGroup.include({refreshClusters:function(e){return e?e instanceof L.MarkerClusterGroup?e=e._topClusterLevel.getAllChildMarkers():e instanceof L.LayerGroup?e=e._layers:e instanceof L.MarkerCluster?e=e.getAllChildMarkers():e instanceof L.Marker&&(e=[e]):e=this._topClusterLevel.getAllChildMarkers(),this._flagParentsIconsNeedUpdate(e),this._refreshClustersIcons(),this.options.singleMarkerMode&&this._refreshSingleMarkerModeMarkers(e),this},_flagParentsIconsNeedUpdate:function(e){var t,i;for(t in e)for(i=e[t].__parent;i;)i._iconNeedsUpdate=!0,i=i.__parent},_refreshSingleMarkerModeMarkers:function(e){var t,i;for(t in e)i=e[t],this.hasLayer(i)&&i.setIcon(this._overrideMarkerIcon(i))}}),L.Marker.include({refreshIconOptions:function(e,t){var i=this.options.icon;return L.setOptions(i,e),this.setIcon(i),t&&this.__parent&&this.__parent._group.refreshClusters(this),this}})}(window,document);

/***/ }),

/***/ 1135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

(function (factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1136), __webpack_require__(1137)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory(require('./TileLayer.Offline'), require('./Control.Offline'));
    }
}(function (TileLayerOffline, ControlOffline) {
}));


/***/ }),

/***/ 1136:
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

/***/ 1138:
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

/***/ 1149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDetail; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_orm_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_modal_modal_controller__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__ = __webpack_require__(622);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_component__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task_detail_map__ = __webpack_require__(1150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_leaflet_geometryutil__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_leaflet_geometryutil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_leaflet_geometryutil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_modals_service__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_gps_service__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_chat_and_session_service__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_viewer__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__classes_Helper__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_images_service__ = __webpack_require__(45);
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


















/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TaskDetail = /** @class */ (function () {
    function TaskDetail(navCtrl, navParams, ormService, modalCtrl, deepLinker, modalsService, gpsService, chatAndSessionService, app, photoViewer, spinnerDialog, imageService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ormService = ormService;
        this.modalCtrl = modalCtrl;
        this.deepLinker = deepLinker;
        this.modalsService = modalsService;
        this.gpsService = gpsService;
        this.chatAndSessionService = chatAndSessionService;
        this.app = app;
        this.photoViewer = photoViewer;
        this.spinnerDialog = spinnerDialog;
        this.imageService = imageService;
        this.solvedSubtasks = [];
        this.activeAccordions = [];
        this.gamificationIsDisabled = false;
        this.answerIndex = null;
        this.multipleChoiceList = [];
        this.gpsTaskButtonLabels = [];
        this.shownHints = [];
        this.keyboardSubscriptions = new __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__["Subscription"]();
    }
    TaskDetail_1 = TaskDetail;
    /*
      Custom Keyboard subscribe
    */
    TaskDetail.prototype.subscribeCKEvents = function () {
        var _this = this;
        // Initialize a new Keyboard subscription in case the old one was unsubscribed
        this.keyboardSubscriptions = new __WEBPACK_IMPORTED_MODULE_12_rxjs_Subscription__["Subscription"]();
        // Subscribe to the click event observable
        // Here we add the clicked key value to the string
        this.keyboardSubscriptions.add(__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].onCKClick.subscribe(function (key) {
            console.log('Keyboard input');
            if ((_this.taskDetails.timeSolved == 0 && !_this.taskDetails.failed) || !_this.route.isAnswerFeedbackEnabled()) {
                if (key === "C") {
                    if (_this.answerIndex != null) {
                        _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer = "";
                    }
                    else {
                        _this.taskDetails.answer = "";
                    }
                }
                else if (key === "✔") {
                    _this.checkResult();
                }
                else {
                    if (_this.answerIndex != null) {
                        _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer += key;
                    }
                    else {
                        _this.taskDetails.answer += key;
                    }
                }
            }
        }, function (err) { console.log(err); }, function () { console.log('onCKClick subscribed.'); }));
        // Subscribe to the delete event observable
        // Here we delete the last character of the string
        this.keyboardSubscriptions.add(__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].onDeleteClick.subscribe(function () {
            if (_this.answerIndex != null) {
                _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer = _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer.slice(0, _this.taskDetails.answerMultipleChoice[_this.answerIndex].answer.length - 1);
            }
            else {
                _this.taskDetails.answer = _this.taskDetails.answer.slice(0, _this.taskDetails.answer.length - 1);
            }
        }, function (err) { console.log(err); }, function () { console.log('onDeleteClick subscribed.'); }));
        this.keyboardSubscriptions.add(__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].onCKHide.subscribe(function () {
            _this.setKeyboardOn(false);
        }, function (err) { console.log(err); }, function () { console.log('onCKHide subscribed.'); }));
    };
    /*
    Custom Keyboard unsubscribe
     */
    TaskDetail.prototype.unsubscribeCKEvents = function () {
        this.keyboardSubscriptions.unsubscribe();
    };
    TaskDetail.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('TasksMap ionViewDidEnter()');
                eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
                return [2 /*return*/];
            });
        });
    };
    TaskDetail.prototype.ionViewWillEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, answerArray, i, component, _i, _f, task, subtaskDetails, _g, details, gpsType, points, buttonCount, startCharCode, i;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        console.log('TasksMap ionViewWillEnter()');
                        this.routeId = this.navParams.get('routeId');
                        _a = this;
                        return [4 /*yield*/, this.ormService.findRouteById(this.routeId)];
                    case 1:
                        _a.route = _h.sent();
                        this.taskId = this.navParams.get('taskId');
                        this.subTaskIndex = this.navParams.get('subTaskIndex');
                        _b = this;
                        return [4 /*yield*/, this.ormService.findTaskById(this.taskId)];
                    case 2:
                        _b.task = _h.sent();
                        if (this.subTaskIndex || this.subTaskIndex === 0) {
                            this.rootTask = this.task;
                            this.task = this.rootTask.subtasks[this.subTaskIndex];
                        }
                        console.log("Opened Task: ", this.task);
                        this.isSpecialTaskType = (this.task.solutionType === 'multiple_choice' || this.task.solutionType === 'gps' || this.task.solutionType === 'vector_values' || this.task.solutionType === 'vector_intervals');
                        _c = this;
                        _e = (_d = this.route).getScoreForUser;
                        return [4 /*yield*/, this.ormService.getActiveUser()];
                    case 3:
                        _c.score = _e.apply(_d, [_h.sent()]);
                        this.taskDetails = this.score.getTaskStateForTask(this.task.id);
                        if (this.task.solutionType === 'vector_values' || this.task.solutionType === 'vector_intervals') {
                            this.specialSolution = this.task.getSolution();
                            if (!this.taskDetails.answerMultipleChoice || this.taskDetails.answerMultipleChoice.length == 0) {
                                answerArray = [];
                                for (i = 0; i < this.specialSolution.components.length; i++) {
                                    component = this.specialSolution.components[i];
                                    answerArray.push({ name: component.name, answer: '', solved: null });
                                }
                                this.taskDetails.answerMultipleChoice = answerArray;
                            }
                        }
                        if (this.task.subtasks) {
                            this.solvedSubtasks = [];
                            for (_i = 0, _f = this.task.subtasks; _i < _f.length; _i++) {
                                task = _f[_i];
                                subtaskDetails = this.score.getTaskStateForTask(task.id);
                                if (subtaskDetails.solved || subtaskDetails.failed || subtaskDetails.solvedLow || subtaskDetails.saved) {
                                    this.solvedSubtasks.push(subtaskDetails);
                                }
                            }
                        }
                        _g = this;
                        return [4 /*yield*/, this.chatAndSessionService.getActiveSession()];
                    case 4:
                        _g.sessionInfo = _h.sent();
                        console.log(this.sessionInfo);
                        console.log(this.task);
                        // Add event of user entering trail when session active
                        if (this.sessionInfo != null && !this.task) {
                            details = JSON.stringify({ title: this.task.title });
                            this.chatAndSessionService.addUserEvent("event_task_opened", details, this.task.id.toString());
                        }
                        if (this.taskDetails.timeSolved == 0) {
                            // Do not display last entered answer
                            this.taskDetails.answer = "";
                        }
                        this.gamificationIsDisabled = this.route.isGamificationDisabled();
                        //Temporary attribution of the scores, later they should come from the server, associated with each task
                        if (!this.rootTask && this.route.isAnswerFeedbackEnabled()) {
                            if (this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') {
                                this.maxScore = 40 * this.specialSolution.components.length;
                                if (this.maxScore > 200) {
                                    this.maxScore = 200;
                                }
                            }
                            else {
                                this.maxScore = 100;
                            }
                            this.orangeScore = 50;
                            this.penalty = 10;
                            this.minScore = 10;
                        }
                        else {
                            this.maxScore = 0;
                            this.orangeScore = 0;
                            this.penalty = 0;
                            this.minScore = 0;
                        }
                        if (this.score.score == null)
                            this.score.score = 0;
                        if (this.taskDetails.timeFirstOpen == 0) {
                            this.taskDetails.timeFirstOpen = new Date().getTime();
                        }
                        if (this.task.solutionType == 'multiple_choice') {
                            this.multipleChoiceView.changes.subscribe(function (data) {
                                console.log("MultipleChoiceChildData", data);
                                eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
                            });
                            if (this.taskDetails.solved || this.taskDetails.solvedLow) {
                                this.multipleChoiceList = this.taskDetails.answerMultipleChoice;
                            }
                            else {
                                this.multipleChoiceList = this.task.getSolutionOptionList();
                            }
                        }
                        // Init task detail map, if task is gps task
                        if (this.task.solutionType == "gps") {
                            this.taskDetailMap = new __WEBPACK_IMPORTED_MODULE_6__task_detail_map__["a" /* TaskDetailMap */](this.task, this.route, this.gpsService, this.app, this.ormService, this.imageService);
                            this.taskDetailMap.loadMap();
                            gpsType = this.task.getSolutionGpsValue("task");
                            if (gpsType != null) {
                                points = [];
                                if (gpsType == "centerTwo") {
                                    points = [
                                        this.task.getSolutionGpsValue("point1"),
                                        this.task.getSolutionGpsValue("point2")
                                    ];
                                }
                                if (gpsType == "centerThree") {
                                    points = [
                                        this.task.getSolutionGpsValue("point1"),
                                        this.task.getSolutionGpsValue("point2"),
                                        this.task.getSolutionGpsValue("point3")
                                    ];
                                }
                                if (points.length > 0) {
                                    this.taskDetailMap.insertPreDefinedPoints(points);
                                }
                                if (gpsType == "linearFx") {
                                    this.taskDetailMap.insertAxis(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"));
                                }
                            }
                            buttonCount = this.task.getSolutionGpsValue("points");
                            if (buttonCount != null) {
                                buttonCount = parseInt(buttonCount);
                            }
                            else {
                                buttonCount = 0;
                            }
                            startCharCode = "A".charCodeAt(0);
                            for (i = 0; i < buttonCount; i++) {
                                this.gpsTaskButtonLabels[i] = String.fromCharCode(startCharCode + i);
                            }
                        }
                        if (this.taskDetails.skipped) {
                            this.taskDetails.newTries = 0;
                        }
                        if (this.task.solutionType == 'range' || this.task.solutionType == 'value' || this.task.solutionType == 'vector_values' || this.task.solutionType == 'vector_intervals') {
                            this.subscribeCKEvents();
                        }
                        eval('MathJax.Hub.Queue(["Typeset", MathJax.Hub])');
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskDetail.prototype.ionViewWillLeave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var goToNextTaskById;
            return __generator(this, function (_a) {
                // Hide keyboard if still visible
                if (__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].isVisible()) {
                    __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].hide();
                }
                if (this.task.solutionType == 'range' || this.task.solutionType == 'value') {
                    this.unsubscribeCKEvents();
                }
                if (this.taskDetails.solved || this.taskDetails.solvedLow || this.taskDetails.failed) {
                    //This guaratees that the state is updated before the map opens and gets the information.
                    if (this.navParams.get('goToNextTaskById')) {
                        goToNextTaskById = this.navParams.get('goToNextTaskById');
                        goToNextTaskById(this.task.id, false);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // Show keyboard
    TaskDetail.prototype.setKeyboardOn = function (state, answerIndex) {
        if (answerIndex === void 0) { answerIndex = null; }
        var that = this;
        this.answerIndex = answerIndex;
        if (state && this.task.solutionType != "gps") {
            __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].show(function () {
                // Scroll input field into view (may happen that the field is hidden by keyboard)
                if (!that.rootTask) {
                    that.content.scrollTo(0, document.getElementById('keyboard-anchor').offsetTop);
                }
                else {
                    that.content.scrollTo(0, document.getElementById('snd-keyboard-anchor').offsetTop);
                }
            });
        }
    };
    TaskDetail.prototype.hideKeyboard = function () {
        if (__WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].isVisible()) {
            __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].hide();
        }
    };
    TaskDetail.prototype.keyboardVisible = function () {
        return __WEBPACK_IMPORTED_MODULE_7__components_customKeyBoard_custom_keyboard__["a" /* CustomKeyBoard */].isVisible();
    };
    /*
    Checks if entered answer is valid decimal number
     */
    TaskDetail.prototype.isDecimal = function (s) {
        var match = s.match(/^-?(0(([.,])[0-9]+)?|[1-9]{1}[0-9]*(([.,])[0-9]+)?)/g);
        return match !== null ? match[0] === s : false;
    };
    TaskDetail.prototype.showHint = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var needUpdate, title, type, message, details, details, details, hintModal;
            return __generator(this, function (_a) {
                needUpdate = false;
                title = "";
                type = this.task.getHint(index).type;
                message = this.task.getHint(index).value;
                if (this.shownHints.indexOf(index) == -1) {
                    this.shownHints.push(index);
                }
                switch (index) {
                    case 1:
                        if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                            //only update if task is not solved
                            this.taskDetails.hint1 = true;
                            needUpdate = true;
                        }
                        title = 'a_btn_hint1';
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({});
                            this.chatAndSessionService.addUserEvent("event_took_hint1", details, this.task.id.toString());
                        }
                        break;
                    case 2:
                        if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                            //only update if task is not solved
                            this.taskDetails.hint2 = true;
                            needUpdate = true;
                        }
                        title = 'a_btn_hint2';
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({});
                            this.chatAndSessionService.addUserEvent("event_took_hint2", details, this.task.id.toString());
                        }
                        break;
                    case 3:
                        if (!this.taskDetails.solved && !this.taskDetails.solvedLow && !this.taskDetails.failed) {
                            //only update if task is not solved
                            this.taskDetails.hint3 = true;
                            if (this.sessionInfo != null) {
                                details = JSON.stringify({});
                                this.chatAndSessionService.addUserEvent("event_took_hint3", details, this.task.id.toString());
                            }
                            needUpdate = true;
                        }
                        title = 'a_btn_hint3';
                        break;
                }
                if (needUpdate) {
                    this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
                }
                hintModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                    title: title,
                    type: type,
                    message: message,
                    modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].hint,
                    narrativeEnabled: this.route.isNarrativeEnabled(),
                    narrative: this.app.activeNarrative,
                    buttons: [
                        {
                            title: 'a_alert_close',
                            callback: function () {
                                hintModal.dismiss();
                            }
                        }
                    ]
                }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                hintModal.onDidDismiss(function (click) {
                    if (_this.sessionInfo != null) {
                        var details = JSON.stringify({});
                        _this.chatAndSessionService.addUserEvent("event_hint_closed", details, _this.task.id.toString());
                    }
                });
                hintModal.present();
                return [2 /*return*/];
            });
        });
    };
    TaskDetail.prototype.checkResult = function () {
        return __awaiter(this, void 0, void 0, function () {
            var solution, answer, details, f_answer, f_solution, taskSuccess, checkedByUser, i, item, solution_1, solutionList, von, bis, answer_1, solution_2, vonLow, bisLow, solution_3, gpsType, answers, solutions, solvedTask, detailSolutions, solutionText, i, answer_2, solution_4, answers, solutions, solvedTask, detailSolutions, solutionText, i, answer_3, solution_5;
            return __generator(this, function (_a) {
                if ((this.task.solutionType == 'range' || this.task.solutionType == 'value') && !this.isDecimal(this.taskDetails.answer)) {
                    return [2 /*return*/];
                }
                console.log(this.task.solutionType);
                solution = [this.taskDetails.answer];
                answer = this.taskDetails.answer.replace(",", ".");
                details = JSON.stringify({ solution: solution, solutionType: this.task.solutionType });
                if (this.task.solutionType == "value") {
                    f_answer = parseFloat(answer);
                    f_solution = parseFloat(this.task.getSolution());
                    if (f_answer.toString() == f_solution.toString()) {
                        this.CalculateScore("value", "solved");
                        this.taskSolved('solved', solution);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', solution);
                    }
                }
                else if (this.task.solutionType == "multiple_choice") {
                    console.log(this.multipleChoiceList);
                    taskSuccess = true;
                    checkedByUser = this.multipleChoiceList.filter(function (item) {
                        return item.userChecked == true;
                    });
                    checkedByUser = checkedByUser.map(function (item) { return item.value; });
                    for (i = 0; i < this.multipleChoiceList.length; i++) {
                        item = this.multipleChoiceList[i];
                        console.log(item);
                        console.log(item.userChecked != item.rightAnswer);
                        if (item.userChecked != item.rightAnswer) {
                            taskSuccess = false;
                            console.log('found wrong answer');
                            break;
                        }
                    }
                    this.taskDetails.answerMultipleChoice = this.multipleChoiceList;
                    console.log(taskSuccess);
                    solution_1 = [this.task.getSolution()];
                    if (taskSuccess) {
                        this.CalculateScore("multiple_choice", "solved");
                        this.taskSolved('solved', solution_1);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: checkedByUser, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', ['']);
                    }
                }
                else if (this.task.solutionType == "range") {
                    solutionList = this.task.getSolutionList();
                    von = solutionList[0];
                    bis = solutionList[1];
                    answer_1 = +this.taskDetails.answer.replace(",", ".");
                    solution_2 = [this.taskDetails.answer];
                    if (answer_1 >= von && answer_1 <= bis) {
                        this.CalculateScore("range", "solved");
                        //DEBUG:LOG PAREI AQUI
                        this.taskSolved('solved', solution_2);
                    }
                    else {
                        if (solutionList.length == 4) {
                            vonLow = solutionList[2];
                            bisLow = solutionList[3];
                            solution_3 = [this.taskDetails.answer];
                            if (answer_1 >= vonLow && answer_1 <= bisLow) {
                                this.CalculateScore("range", "solved_low");
                                this.taskSolved('solved_low', solution_3);
                            }
                            else {
                                if (this.sessionInfo != null) {
                                    this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                                }
                                this.taskSolved('', ['']);
                            }
                        }
                        else {
                            if (this.sessionInfo != null) {
                                this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                            }
                            this.taskSolved('', ['']);
                        }
                    }
                }
                else if (this.task.solutionType == "gps") {
                    gpsType = this.task.getSolutionGpsValue("task");
                    console.log(gpsType);
                    switch (gpsType) {
                        case "lineNoDirection":
                            this.CalculateLine(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], +this.task.getSolutionGpsValue("length"));
                            break;
                        case "line":
                            this.CalculateLineDirection(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], +this.task.getSolutionGpsValue("length"), +this.task.getSolutionGpsValue("direction"));
                            break;
                        case "triangle":
                            this.CalculateTriangle(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], this.taskDetailMap.pointMarkers[2], +this.task.getSolutionGpsValue("length"));
                            break;
                        case "square":
                            this.CalculateSquare(this.taskDetailMap.pointMarkers[0], this.taskDetailMap.pointMarkers[1], this.taskDetailMap.pointMarkers[2], this.taskDetailMap.pointMarkers[3], +this.task.getSolutionGpsValue("length"));
                            break;
                        case "centerTwo":
                            this.CalculateCenterTwoP(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.taskDetailMap.pointMarkers[0]);
                            break;
                        case "centerThree":
                            this.CalculateCenterThreeP(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.task.getSolutionGpsValue("point3"), this.taskDetailMap.pointMarkers[0]);
                            break;
                        case "linearFx":
                            this.CalculateLinearFx(this.task.getSolutionGpsValue("point1"), this.task.getSolutionGpsValue("point2"), this.taskDetailMap.pointMarkers[0].getLatLng(), this.taskDetailMap.pointMarkers[1].getLatLng(), this.task.getSolutionGpsValue("slope"), this.task.getSolutionGpsValue("y"));
                        default:
                            // code...
                            break;
                    }
                }
                else if (this.task.solutionType == "vector_values") {
                    answers = this.taskDetails.answerMultipleChoice;
                    solutions = this.specialSolution.components;
                    solvedTask = true;
                    detailSolutions = [];
                    solutionText = "";
                    for (i = 0; i < answers.length; i++) {
                        answer_2 = answers[i];
                        solution_4 = solutions[i];
                        detailSolutions.push({ name: solution_4.name, answer: answer_2.answer });
                        answer_2.solved = answer_2.answer == solution_4.val;
                        if (!answer_2.solved) {
                            solvedTask = false;
                            continue;
                        }
                        if (i == 0) {
                            solutionText += answer_2.name + ": " + answer_2.answer;
                        }
                        else {
                            solutionText += ", " + answer_2.name + ": " + answer_2.answer;
                        }
                    }
                    if (solvedTask) {
                        this.CalculateScore("vector_values", "solved");
                        console.log("Task Solved with Solution:", solutionText);
                        this.taskSolved('solved', [solutionText]);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: detailSolutions, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', ['']);
                    }
                }
                else if (this.task.solutionType == "vector_intervals") {
                    answers = this.taskDetails.answerMultipleChoice;
                    solutions = this.specialSolution.components;
                    solvedTask = true;
                    detailSolutions = [];
                    solutionText = "";
                    for (i = 0; i < answers.length; i++) {
                        answer_3 = answers[i];
                        solution_5 = solutions[i];
                        detailSolutions.push({ name: solution_5.name, answer: answer_3.answer });
                        answer_3.solved = answer_3.answer >= solution_5.low && answer_3.answer <= solution_5.high;
                        if (!answer_3.solved) {
                            solvedTask = false;
                            continue;
                        }
                        if (i == 0) {
                            solutionText += answer_3.name + ": " + answer_3.answer;
                        }
                        else {
                            solutionText += ", " + answer_3.name + ": " + answer_3.answer;
                        }
                    }
                    if (solvedTask) {
                        this.CalculateScore("vector_intervals", "solved");
                        console.log("Task Solved with Solution:", solutionText);
                        this.taskSolved('solved', [solutionText]);
                    }
                    else {
                        if (this.sessionInfo != null) {
                            details = JSON.stringify({ solution: detailSolutions, solutionType: this.task.solutionType });
                            this.chatAndSessionService.addUserEvent("event_entered_wrong_answer", details, this.task.id.toString());
                        }
                        this.taskSolved('', ['']);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /*
    This function is called when in trail settings the automatic validation of answers is disabled
    It allows users to complete a task, when they think that they are finished and mark it accordingly so
    In session mode where the users are force assigned a task, it allows to continue with the next task
     */
    TaskDetail.prototype.completeTask = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.taskDetails.score = this.maxScore;
                this.score.score += this.taskDetails.score;
                this.taskSolved("solved", [""]);
                return [2 /*return*/];
            });
        });
    };
    TaskDetail.prototype.showSolutionSample = function () {
        var _this = this;
        if (!this.taskDetails.solved && !this.taskDetails.solvedLow) {
            if (!this.rootTask) {
                this.score.addFailedTask(this.task.id);
            }
            this.taskDetails.score = 0;
            this.taskDetails.failed = true;
            this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
        }
        var solutionSample = this.task.getSolutionSample();
        var solutionSrc = this.task.getSolutionSampleImgSrc();
        var messages = [];
        if ((!solutionSample || solutionSample.length == 0) && (!solutionSrc || solutionSrc.length == 0)) {
            messages = [
                'a_msg_no_solutionsample',
                'p_t_solution',
                this.task.getSolution()
            ];
        }
        else {
            messages.push(solutionSample);
        }
        var that = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
            title: 't_samplesolution',
            imageUrl: this.task.getSolutionSampleImgSrc(),
            messages: messages,
            modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].sampleSolution,
            narrativeEnabled: this.route.isNarrativeEnabled(),
            narrative: this.app.activeNarrative,
            buttons: [
                {
                    title: 'a_alert_close',
                    callback: function () {
                        modal.dismiss();
                        if (that.rootTask) {
                            that.goToNextSubtask();
                        }
                    }
                }
            ]
        }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
        modal.onDidDismiss(function (data) {
            if (_this.sessionInfo != null) {
                var details = JSON.stringify({});
                _this.chatAndSessionService.addUserEvent("event_viewed_sample_solution", details, _this.task.id.toString());
            }
        });
        modal.present();
    };
    TaskDetail.prototype.closeDetails = function (skip) {
        return __awaiter(this, void 0, void 0, function () {
            var goToNextTaskById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.navParams.get('goToNextTaskById')) return [3 /*break*/, 3];
                        goToNextTaskById = this.navParams.get('goToNextTaskById');
                        if (!skip) return [3 /*break*/, 2];
                        this.taskDetails.skipped = true;
                        return [4 /*yield*/, this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        goToNextTaskById(this.task.id, skip);
                        _a.label = 3;
                    case 3:
                        // necessary because of bug which does not update URL
                        this.deepLinker.navChange('back');
                        this.navCtrl.pop({}, function () {
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskDetail.prototype.confirmSkippingTask = function () {
        var _this = this;
        var skipText = 'a_skipTask_confirm';
        if (this.route.isNarrativeEnabled()) {
            skipText = this.route.getNarrativeString(skipText);
        }
        this.modalsService.showDialog('a_skipTask', skipText, 'no', function () {
        }, 'yes', function () { return __awaiter(_this, void 0, void 0, function () {
            var details;
            return __generator(this, function (_a) {
                if (this.sessionInfo != null) {
                    details = JSON.stringify({});
                    this.chatAndSessionService.addUserEvent("event_task_skipped", details, this.task.id.toString());
                }
                this.closeDetails(true);
                return [2 /*return*/];
            });
        }); }, this.app.activeNarrative);
    };
    TaskDetail.prototype.getNextAvailableHint = function () {
        if (this.shownHints.indexOf(1) == -1 && this.task.hasHintMessage(1) || !this.task.hasHintMessage(2)) {
            return 1;
        }
        else if (this.shownHints.indexOf(2) == -1 && this.task.hasHintMessage(2) || !this.task.hasHintMessage(3)) {
            return 2;
        }
        else if (this.shownHints.indexOf(3) == -1 && this.task.hasHintMessage(3)) {
            return 3;
        }
        return 4;
    };
    TaskDetail.prototype.taskSolved = function (solved, solution) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var that, message, title, that_1, bSampleSolution, subTaskOkay, bNextTask, modal_1, data, details, message, buttons, tries_1, bShowHint, bClose, bSampleSolution, bSkipTask, bFailTask, title, modal_2, data, bNextTask;
            return __generator(this, function (_a) {
                that = this;
                // Add event of user entering trail when session active
                if (!this.route.isAnswerFeedbackEnabled()) {
                    this.taskDetails.saved = true;
                    if (!this.rootTask) {
                        this.score.addSavedTask(this.task.id);
                    }
                }
                if (solved == 'solved' || solved == 'solved_low') {
                    this.taskDetails.skipped = false;
                    message = "";
                    title = "";
                    if (solved == 'solved') {
                        title = 'a_alert_right_answer_title';
                        this.taskDetails.solved = true;
                        if (!this.rootTask) {
                            this.score.addSolvedTask(this.task.id);
                        }
                        switch (this.taskDetails.tries) {
                            case 0:
                                if (this.task.solutionType == "gps")
                                    message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                else
                                    message = 'a_alert_right_answer_1';
                                break;
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                if (this.task.solutionType == "gps")
                                    message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                else
                                    message = 'a_alert_right_answer_2';
                                break;
                            case 5:
                                if (this.task.solutionType == "gps")
                                    message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                else
                                    message = 'a_alert_right_answer_3';
                                break;
                        }
                    }
                    if (solved == 'solved_low') {
                        title = 'a_alert_right_answer_title_low';
                        this.taskDetails.solvedLow = true;
                        if (!this.rootTask) {
                            this.score.addSolvedTaskLow(this.task.id);
                        }
                        switch (this.taskDetails.tries) {
                            case 0:
                                if (this.task.solutionType == "gps")
                                    message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                else
                                    message = 'a_alert_right_answer_1_low';
                                break;
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                                if (this.task.solutionType == "gps")
                                    message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                else
                                    message = 'a_alert_right_answer_2_low';
                                break;
                            case 5:
                                if (this.task.solutionType == "gps")
                                    message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                                else
                                    message = 'a_alert_right_answer_3_low';
                                break;
                        }
                    }
                    that_1 = this;
                    bSampleSolution = {
                        title: 't_samplesolution',
                        callback: function () {
                            modal_1.dismiss().then(function () {
                                that_1.showSolutionSample();
                            });
                        }
                    };
                    subTaskOkay = {
                        title: 'okay',
                        callback: function () {
                            modal_1.dismiss().then(function () {
                                that_1.goToNextSubtask();
                            });
                        }
                    };
                    bNextTask = {
                        title: 'pdf_next_task',
                        callback: function () {
                            modal_1.dismiss().then(function () {
                                that_1.closeDetails(false);
                            });
                        }
                    };
                    if (this.route.isNarrativeEnabled()) {
                        title = this.route.getNarrativeString(title);
                        message = this.route.getNarrativeString(message);
                    }
                    if (this.route.isAnswerFeedbackEnabled()) {
                        data = {
                            title: title,
                            message: message,
                            solution: solution,
                            modalType: solved == 'solved_low' ? __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].solvedLow : __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].solved,
                            gamificationEnabled: !this.gamificationIsDisabled,
                            narrativeEnabled: this.route.isNarrativeEnabled(),
                            narrative: this.app.activeNarrative,
                            buttons: this.rootTask ? [subTaskOkay] : (this.route.isSampleSolutionEnabled() ? [bSampleSolution, bNextTask] : [bNextTask])
                        };
                        if (!this.rootTask) {
                            data['score'] = "+" + this.taskDetails.score;
                        }
                        modal_1 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], data, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                    }
                    else {
                        modal_1 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                            title: 'a_alert_saved_answer_title',
                            message: 'a_alert_saved_answer_message',
                            modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].saved,
                            gamificationEnabled: !this.gamificationIsDisabled,
                            narrativeEnabled: this.route.isNarrativeEnabled(),
                            narrative: this.app.activeNarrative,
                            buttons: this.rootTask ? [subTaskOkay] : [bNextTask],
                        }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                    }
                    modal_1.onDidDismiss(function (data) {
                        console.log(data);
                        if (data && data.showMap) {
                            /*                 let currentTaskIndex = this.route.tasks.indexOf(this.task); */
                            _this.navCtrl.pop();
                        }
                    });
                    modal_1.present();
                    if (this.sessionInfo != null) {
                        details = JSON.stringify({ score: this.taskDetails.score, solution: solution, quality: solved });
                        this.chatAndSessionService.addUserEvent("event_task_completed", details, this.task.id.toString());
                    }
                    this.taskDetails.timeSolved = new Date().getTime();
                }
                else {
                    message = "";
                    buttons = void 0;
                    tries_1 = this.taskDetails.tries;
                    if (this.taskDetails.skipped) {
                        tries_1 = this.taskDetails.newTries;
                    }
                    switch (tries_1) {
                        case 0:
                        case 1:
                            if (this.task.solutionType == "gps")
                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else
                                message = 'a_alert_false_answer_1';
                            buttons = [
                                {
                                    title: 'a_alert_close',
                                    callback: function () {
                                        modal_2.dismiss();
                                    }
                                }
                            ];
                            break;
                        case 2:
                        case 3:
                        case 4:
                            if (this.task.solutionType == "gps")
                                message = this.SetMessage(this.task.getSolutionGpsValue("task"));
                            else
                                message = 'a_alert_false_answer_2';
                            if (!this.route.isHintsEnabled())
                                message = 'a_alert_false_answer_1';
                            bShowHint = {
                                title: 'a_t_show_hint',
                                callback: function () {
                                    modal_2.dismiss().then(function () {
                                        var index = 1;
                                        //number of tries already increased
                                        if (tries_1 == 3) {
                                            var temp = that.getNextAvailableHint();
                                            if (temp < 2)
                                                index = temp;
                                            else
                                                index = 2;
                                        }
                                        else if (tries_1 == 4) {
                                            var temp = that.getNextAvailableHint();
                                            if (temp < 3)
                                                index = temp;
                                            else
                                                index = 3;
                                        }
                                        that.showHint(index);
                                    });
                                }
                            };
                            bClose = {
                                title: 'a_alert_close',
                                callback: function () {
                                    modal_2.dismiss();
                                }
                            };
                            if (this.route.isHintsEnabled()) {
                                buttons = [bShowHint, bClose];
                            }
                            else {
                                buttons = [bClose];
                            }
                            break;
                        default:
                            message = 'a_t_skip_msg';
                            bSampleSolution = {
                                title: 't_samplesolution',
                                callback: function () {
                                    modal_2.dismiss().then(function () {
                                        if (that.sessionInfo != null) {
                                            var details = JSON.stringify({});
                                            that.chatAndSessionService.addUserEvent("event_task_failed", details, that.task.id.toString());
                                        }
                                        that.showSolutionSample();
                                    });
                                }
                            };
                            bSkipTask = {
                                title: 'a_skipTask',
                                callback: function () {
                                    modal_2.dismiss().then(function () {
                                        if (that.sessionInfo != null) {
                                            var details = JSON.stringify({});
                                            that.chatAndSessionService.addUserEvent("event_task_skipped", details, that.task.id.toString());
                                        }
                                        that.closeDetails(true);
                                    });
                                }
                            };
                            bFailTask = {
                                title: 'okay',
                                callback: function () {
                                    modal_2.dismiss().then(function () {
                                        if (that.sessionInfo != null) {
                                            var details = JSON.stringify({});
                                            that.chatAndSessionService.addUserEvent("event_task_failed", details, that.task.id.toString());
                                        }
                                        that.taskDetails.failed = true;
                                        that.ormService.insertOrUpdateTaskState(that.score, that.taskDetails).then(function () {
                                            if (!that.rootTask) {
                                                that.closeDetails();
                                            }
                                            else {
                                                that.goToNextSubtask();
                                            }
                                        });
                                    });
                                }
                            };
                            if (this.rootTask && this.route.isSampleSolutionEnabled()) {
                                buttons = [bSampleSolution, bFailTask];
                            }
                            else if (this.rootTask) {
                                buttons = [bFailTask];
                            }
                            else if (this.route.isSampleSolutionEnabled()) {
                                buttons = [bSampleSolution, bSkipTask];
                            }
                            else {
                                buttons = [bSkipTask];
                            }
                            break;
                    }
                    this.taskDetails.tries++;
                    if (this.taskDetails.skipped) {
                        this.taskDetails.newTries++;
                    }
                    title = "a_alert_false_answer_title";
                    if (this.route.isNarrativeEnabled()) {
                        title = this.route.getNarrativeString(title);
                        message = this.route.getNarrativeString(message);
                    }
                    if (this.route.isAnswerFeedbackEnabled()) {
                        data = {
                            title: title,
                            message: message,
                            solution: solution,
                            modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].error,
                            gamificationEnabled: !this.gamificationIsDisabled,
                            narrativeEnabled: this.route.isNarrativeEnabled(),
                            narrative: this.app.activeNarrative,
                            buttons: buttons
                        };
                        if (!this.rootTask) {
                            data['score'] = this.taskDetails.tries > 1 ? '-10' : '0';
                        }
                        modal_2 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], data, {
                            showBackdrop: true,
                            enableBackdropDismiss: true,
                            cssClass: this.app.activeNarrative
                        });
                    }
                    else {
                        bNextTask = {
                            title: 'pdf_next_task',
                            callback: function () {
                                modal_2.dismiss().then(function () {
                                    that.closeDetails(false);
                                });
                            }
                        };
                        modal_2 = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_MCMIconModal_MCMIconModal__["a" /* MCMIconModal */], {
                            title: 'a_alert_saved_answer_title',
                            message: 'a_alert_saved_answer_message',
                            modalType: __WEBPACK_IMPORTED_MODULE_5__app_app_component__["a" /* MCMModalType */].saved,
                            gamificationEnabled: !this.gamificationIsDisabled,
                            narrativeEnabled: this.route.isNarrativeEnabled(),
                            narrative: this.app.activeNarrative,
                            buttons: [bNextTask],
                        }, { showBackdrop: true, enableBackdropDismiss: true, cssClass: this.app.activeNarrative });
                    }
                    modal_2.present();
                }
                this.ormService.insertOrUpdateTaskState(this.score, this.taskDetails);
                return [2 /*return*/];
            });
        });
    };
    TaskDetail.prototype.CalculateScore = function (solutionType, solved) {
        if (solutionType == "value") {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                this.score.score += this.taskDetails.score;
            }
            else {
                this.taskDetails.score = this.maxScore;
                this.score.score += this.taskDetails.score;
            }
        }
        if (solutionType == "multiple_choice") {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                this.score.score += this.taskDetails.score;
            }
            else {
                this.taskDetails.score = this.maxScore;
                this.score.score += this.taskDetails.score;
            }
        }
        if (solutionType == "range") {
            if (solved == "solved") {
                if (this.taskDetails.tries > 0) {
                    var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                    this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                    this.score.score += this.taskDetails.score;
                }
                else {
                    this.taskDetails.score = this.maxScore;
                    this.score.score += this.taskDetails.score;
                }
            }
            else if (solved == "solved_low") {
                var solutionList = this.task.getSolutionList();
                //if the orange interval is below the green
                var dotAnswer = parseFloat(this.taskDetails.answer.replace(",", ".")); // Fix ',' decimals by converting to '.' decimals
                if (dotAnswer < solutionList[0]) {
                    if (this.taskDetails.tries > 0) {
                        var tempScore = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer) - ((this.taskDetails.tries - 1) * this.penalty);
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        this.score.score += this.taskDetails.score;
                    }
                    else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[2], solutionList[0], dotAnswer);
                        this.score.score += this.taskDetails.score;
                    }
                }
                else {
                    if (this.taskDetails.tries > 0) {
                        var tempScore = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer) - ((this.taskDetails.tries - 1) * this.penalty);
                        this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                        this.score.score += this.taskDetails.score;
                    }
                    else {
                        this.taskDetails.score = this.CalculateOrangeScore(solutionList[3], solutionList[1], dotAnswer);
                        this.score.score += this.taskDetails.score;
                    }
                }
            }
        }
        if (solutionType == 'vector_values' || solutionType == 'vector_intervals') {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
                this.score.score += this.taskDetails.score;
            }
            else {
                this.taskDetails.score = this.maxScore;
                this.score.score += this.taskDetails.score;
            }
        }
        console.log("FinalScore: " + this.score.score);
    };
    TaskDetail.prototype.CalculateOrangeScore = function (borderLeft, borderRight, value) {
        var intervalLenght = Math.abs(borderRight - borderLeft);
        console.log("borderRight " + borderRight + "  BorderLeft " + borderLeft);
        var xVal = (Math.abs(value - borderLeft) / intervalLenght) * this.maxScore;
        var score = Math.round(xVal);
        if (score < this.minScore)
            return this.minScore;
        else
            return score;
    };
    TaskDetail.prototype.possibleScore = function () {
        if (this.taskDetails) {
            if (this.taskDetails.tries == 0) {
                return this.maxScore;
            }
            else {
                return this.maxScore - (this.taskDetails.tries - 1) * this.penalty > this.minScore ? this.maxScore - (this.taskDetails.tries - 1) * this.penalty : this.minScore;
            }
        }
        else {
            return this.maxScore;
        }
    };
    //TODO: Confirm if there are information that needs to be stored or displayed (like distance walked).
    //      Check if there is the need to put tries on these tasks
    TaskDetail.prototype.CalculateLine = function (pointA, pointB, distance) {
        var currDistance = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]);
        var solution = [Math.round(currDistance).toString()];
        var tempGreen = 10;
        var tempOrange = 20;
        if (currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution);
        }
        else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution);
        }
        else {
            this.taskSolved('', solution);
        }
    };
    TaskDetail.prototype.CalculateLineDirection = function (pointA, pointB, distance, angle) {
        var tempGreen = 10;
        var tempOrange = 20;
        var lenghtSolution = 0;
        var bearingSolution = 0;
        var currDistance = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]);
        var currBearing = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].bearing(pointA.getLatLng(), pointB.getLatLng());
        if (currBearing < 0)
            currBearing += 360;
        //Check Distance
        if (currDistance > (distance - tempGreen) && currDistance < (distance + tempGreen)) {
            lenghtSolution = 2;
        }
        else if (currDistance > (distance - tempOrange) && currDistance < (distance + tempOrange)) {
            lenghtSolution = 1;
        }
        else {
            lenghtSolution = 0;
        }
        //Check Direction
        //The threshold for the green and orange angles is given by the tempAngGreen
        //and tempAngOrange values for the right side, and for the left side its calculated like this:
        var reverse = false;
        var leftGreen = angle - tempGreen;
        var leftOrange = angle - tempOrange;
        if (leftGreen < 0) {
            leftGreen += 360;
            reverse = true;
        }
        if (leftOrange) {
            leftOrange += 360;
            reverse = true;
        }
        if (!reverse) {
            if (currBearing > leftGreen && currBearing < (angle + tempGreen))
                bearingSolution = 2;
            else if (currBearing > leftOrange && currBearing < (angle + tempOrange))
                bearingSolution = 1;
            else
                bearingSolution = 0;
        }
        else {
            if (currBearing > leftGreen || currBearing < (angle + tempGreen))
                bearingSolution = 2;
            else if (currBearing > leftOrange || currBearing < (angle + tempOrange))
                bearingSolution = 1;
            else
                bearingSolution = 0;
        }
        var solution = [Math.round(currDistance).toString(), Math.round(currBearing - angle).toString()];
        if (bearingSolution == 2 && lenghtSolution == 2) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution);
        }
        else if (bearingSolution > 0 && lenghtSolution > 0) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution);
        }
        else {
            this.taskSolved('', solution);
        }
    };
    TaskDetail.prototype.CalculateTriangle = function (pointA, pointB, pointC, distance) {
        var edgesLength = [__WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB.getLatLng(), pointC.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointC.getLatLng(), pointA.getLatLng()])];
        var tempGreen = 10;
        var tempOrange = 20;
        var allGreen = true;
        var allOrange = true;
        for (var i = 0; i < edgesLength.length; i++) {
            var lenght = edgesLength[i];
            if (lenght > distance - tempGreen && lenght < distance + tempGreen) {
            }
            else if (lenght > distance - tempOrange && lenght < +tempOrange)
                allGreen = false;
            else {
                allOrange = false;
                allGreen = false;
            }
        }
        var solution = [Math.round(edgesLength[0]).toString(), Math.round(edgesLength[1]).toString(), Math.round(edgesLength[2]).toString()];
        //check conditions
        if (allGreen) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution);
        }
        else if (allOrange) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateSquare = function (pointA, pointB, pointC, pointD, distance) {
        var edgesLength = [__WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointB.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB.getLatLng(), pointC.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointC.getLatLng(), pointD.getLatLng()]),
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointD.getLatLng(), pointA.getLatLng()])];
        var diag1 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA.getLatLng(), pointC.getLatLng()]);
        var diag2 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB.getLatLng(), pointD.getLatLng()]);
        var tempGreen = 10;
        var tempOrange = 20;
        var allGreen = true;
        var allOrange = true;
        var diagonalSolution = 0;
        //check square sides lenght
        for (var i = 0; i < edgesLength.length; i++) {
            var lenght = edgesLength[i];
            if (lenght > distance - tempGreen && lenght < distance + tempGreen) {
            }
            else if (lenght > distance - tempOrange && lenght < +tempOrange)
                allGreen = false;
            else {
                allOrange = false;
                allGreen = false;
            }
        }
        //check square diagonals
        if (Math.abs(diag1 - diag2) < tempGreen)
            diagonalSolution = 2;
        else if (Math.abs(diag1 - diag2) < tempOrange)
            diagonalSolution = 1;
        else
            diagonalSolution = 0;
        var solution = [Math.round(edgesLength[0]).toString(), Math.round(edgesLength[1]).toString(),
            Math.round(edgesLength[2]).toString(), Math.round(edgesLength[3]).toString()];
        //check conditions
        if (allGreen && diagonalSolution == 2) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution);
        }
        else if (allOrange && diagonalSolution > 0) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateCenterTwoP = function (pointA, pointB, currPosition) {
        pointA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointA[0], pointA[1]);
        pointB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointB[0], pointB[1]);
        console.log(currPosition.getLatLng());
        var distanceA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA, currPosition.getLatLng()]);
        var distanceB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB, currPosition.getLatLng()]);
        var delta = Math.abs(distanceA - distanceB);
        var tempGreen = 5;
        var tempOrange = 10;
        var solution = [Math.round(distanceA).toString(), Math.round(distanceB).toString()];
        if (delta < tempGreen) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution);
        }
        else if (delta < tempOrange) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateCenterThreeP = function (pointA, pointB, pointC, currPosition) {
        pointA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointA[0], pointA[1]);
        pointB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointB[0], pointB[1]);
        pointC = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](pointC[0], pointC[1]);
        var distanceA = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointA, currPosition.getLatLng()]);
        var distanceB = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointB, currPosition.getLatLng()]);
        var distanceC = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([pointC, currPosition.getLatLng()]);
        var deltaAB = Math.abs(distanceA - distanceB);
        var deltaBC = Math.abs(distanceB - distanceC);
        var tempGreen = 5;
        var tempOrange = 10;
        var solution = [Math.round(distanceA).toString(), Math.round(distanceB).toString(), Math.round(distanceC).toString()];
        if (deltaAB < tempGreen && deltaBC < tempGreen) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution);
        }
        else if (deltaAB < tempOrange && deltaBC < tempOrange) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solution);
    };
    TaskDetail.prototype.CalculateLinearFx = function (c0, c1, a, b, slope, yValue) {
        c0 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](c0[0], c0[1]);
        c1 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["latLng"](c1[0], c1[1]);
        var AxisLenght = 100;
        //TODO: Confirm
        if (__WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([c0, c1]) < AxisLenght)
            c1 = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].destination(c0, __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].bearing(c0, c1), AxisLenght);
        var yAngle = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].bearing(c0, c1) - 90;
        if (yAngle < 0)
            yAngle += 360;
        var y = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].destination(c0, yAngle, AxisLenght);
        var aX = this.getDistanceToLine(a, c0, y);
        var bX = this.getDistanceToLine(b, c0, y);
        if (aX > bX) {
            var helperPoint = a;
            a = b;
            b = helperPoint;
        }
        var aY = this.getDistanceToLine(a, c0, c1);
        var bY = this.getDistanceToLine(b, c0, c1);
        var deltaY = bY - aY;
        var deltaX = bX - aX;
        var m = deltaY / deltaX;
        var yInMeters = aY - m * aX;
        //Verification
        var tempMGreen = 5;
        var tempMOrange = 10;
        var tempYGreen = 5;
        var tempYOrange = 10;
        var solutionSlope = 0;
        var solutionY = 0;
        var solution = [Math.round(m).toString(), Math.round(yValue).toString()];
        var solutionFail = [m.toFixed(2).toString(), Math.round(yInMeters).toString()];
        if (m > slope - tempMGreen && m < slope + tempMGreen)
            solutionSlope = 2;
        else if (m > slope - tempMOrange && m < slope + tempMOrange)
            solutionSlope = 1;
        if (yInMeters > yValue - tempYGreen && yInMeters < yValue + tempYGreen)
            solutionY = 2;
        else if (yInMeters > yValue - tempYOrange && yInMeters < yValue + tempYOrange)
            solutionY = 1;
        if (solutionSlope == 2 && solutionY == 2) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.maxScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.maxScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved", solution);
        }
        else if (solutionSlope > 0 && solutionY > 0) {
            if (this.taskDetails.tries > 0) {
                var tempScore = this.orangeScore - ((this.taskDetails.tries - 1) * this.penalty);
                this.taskDetails.score = (tempScore > this.minScore ? tempScore : this.minScore);
            }
            else {
                this.taskDetails.score = this.orangeScore;
            }
            this.score.score += this.taskDetails.score;
            this.taskSolved("solved_low", solution);
        }
        else
            this.taskSolved('', solutionFail);
    };
    //Possibly add this to the MyMath class
    TaskDetail.prototype.getDistanceToLine = function (p, start, final) {
        var map = this.taskDetailMap.getMap();
        if (map != null) {
            var closestOnLine = __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].closestOnSegment(map, p, start, final);
            return __WEBPACK_IMPORTED_MODULE_8_leaflet__["GeometryUtil"].length([p, closestOnLine]);
        }
        else {
            return 0;
        }
    };
    TaskDetail.prototype.setFabColor = function (index) {
        return 'fab-color-' + (index + 1);
    };
    TaskDetail.prototype.SetMessage = function (type) {
        var result = "";
        switch (type) {
            case "lineNoDirection":
                result = "a_line_no_direction_distance";
                break;
            case "line":
                result = "a_line_direction_distance";
                break;
            case "triangle":
                result = "a_triangle_distances";
                break;
            case "square":
                result = "a_square_distances";
                break;
            case "centerTwo":
                result = "a_center_two_distances";
                break;
            case "centerThree":
                result = "a_center_three_distances";
                break;
            case "linearFx":
                result = "a_linearFx_info";
                break;
        }
        return result;
    };
    TaskDetail.prototype.openInPhotoviewer = function (useRoot) {
        var _this = this;
        if (useRoot === void 0) { useRoot = false; }
        if (__WEBPACK_IMPORTED_MODULE_15__classes_Helper__["b" /* Helper */].isPluginAvailable(__WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_viewer__["a" /* PhotoViewer */])) {
            this.spinnerDialog.show();
            setTimeout(function () {
                // use short timeout to let spinner dialog appear
                _this.photoViewer.show(useRoot ? _this.rootTask.getImageURL() : _this.task.getImageURL(true));
                setTimeout(function () {
                    // photoviewer doesn't have callback when user closes it => hide spinner in background
                    _this.spinnerDialog.hide();
                }, 1000);
            }, 100);
        }
    };
    TaskDetail.prototype.openSubtask = function (index) {
        var rootTask = this.rootTask ? this.rootTask : this.task;
        if ((this.rootTask && !index) || this.solvedSubtasks.length === rootTask.subtasks.length)
            return;
        if (!index) {
            index = this.solvedSubtasks.length;
        }
        return this.navCtrl.push(TaskDetail_1, { taskId: this.taskId, routeId: this.routeId, headerTitle: rootTask.subtasks[index].title, subTaskIndex: index });
    };
    TaskDetail.prototype.changeSubtaskAccordionState = function (subtask) {
        var activeAccordion = this.activeAccordions.find(function (entry) { return entry === subtask; });
        if (activeAccordion) {
            this.activeAccordions = this.activeAccordions.filter(function (entry) {
                return entry != subtask;
            });
        }
        else {
            this.activeAccordions.push(subtask);
        }
        console.log("New Accordion State", this.activeAccordions);
    };
    TaskDetail.prototype.goToNextSubtask = function () {
        var _this = this;
        var index = this.navCtrl.getActive().index;
        if (this.subTaskIndex + 1 !== this.rootTask.subtasks.length) {
            this.openSubtask(this.subTaskIndex + 1).then(function () {
                _this.navCtrl.remove(index);
            });
        }
        else {
            this.closeDetails();
        }
    };
    TaskDetail.prototype.isSpecialTypeAnswered = function () {
        var isAnswered = true;
        if (!this.isSpecialTaskType) {
            return isAnswered;
        }
        if (this.task.solutionType == 'vector_values') {
            for (var _i = 0, _a = this.taskDetails.answerMultipleChoice; _i < _a.length; _i++) {
                var answerObject = _a[_i];
                if (answerObject.answer === "") {
                    isAnswered = false;
                }
            }
        }
        return isAnswered;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], TaskDetail.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChildren"])('multipleChoiceAnswers'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], TaskDetail.prototype, "multipleChoiceView", void 0);
    TaskDetail = TaskDetail_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-task-detail',template:/*ion-inline-start:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/task-detail/task-detail.html"*/'<mcm-header></mcm-header>\n<ion-content no-bounce class="has-header padding bottom" [ngClass]="keyboardVisible() ? \'mcm-keyboard-open\' : \'\'">\n    <div class="task-header" [ngClass]="{\'gps\' : task && task.solutionType==\'gps\'}">\n        <div *ngIf="task && task.solutionType==\'gps\'" id="gpsTaskMap">\n            <ion-fab bottom right *ngIf="task && task.solutionType==\'gps\'">\n                <button ion-fab *ngFor="let item of gpsTaskButtonLabels; let i = index" ion-fab [color]="setFabColor(i)" (click)="taskDetailMap.setMarker(i)">\n                    <span>{{item}}</span>\n                </button>\n            </ion-fab>\n        </div>\n        <img class="image" *ngIf="task && task.solutionType!=\'gps\' && task.image" [src]="task.getImageURL()" (click)="openInPhotoviewer()" />\n        <img class="image" *ngIf="task && !task.image && rootTask && rootTask.image && task.solutionType !=\'gps\'" [src]="rootTask.getImageURL()" (click)="openInPhotoviewer(true)" />\n    </div>\n    <div class="task-content" [ngClass]="{\'subtask\': rootTask}">\n        <div class="transition"></div>\n        <div class="card task has-button-on-the-edge">\n\n            <div class="head">\n                <ion-label *ngIf="!rootTask">{{ "a_title_activity_task_view" | translate }}</ion-label>\n                <ion-label *ngIf="rootTask">{{ "a_title_activity_subtask_view" | translate : {current: subTaskIndex + 1, count: rootTask.subtasks.length} }}</ion-label>\n                <ion-label class="tag score" *ngIf="route && route.isAnswerFeedbackEnabled() && !rootTask && !gamificationIsDisabled">{{possibleScore()}}</ion-label>\n            </div>\n            <p *ngIf="task">{{task.description}}</p>\n            <div class="answer">\n                <ion-label *ngIf ="task && task.solutionType != \'gps\' && route.isAnswerValidationEnabled()">{{ "a_task_answer" | translate }}</ion-label>\n                <ion-item *ngIf="task && !isSpecialTaskType && route.isAnswerValidationEnabled()">\n                    <!-- pattern="-?(0(([.,])[0-9]+)?|[1-9]{1}[0-9]*(([.,])[0-9]+)?)" -->\n                    <ion-input (keyup.enter)="checkResult()"\n                               [disabled]="route && route.isAnswerFeedbackEnabled() && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)"\n                               *ngIf="task.solutionType != \'text\'"\n                               type="text"\n                               (focus)="setKeyboardOn(true)"\n                               [ngModelOptions]="{standalone: true}"\n                               readonly="true"\n                               [(ngModel)]="taskDetails.answer"\n                    >\n                    </ion-input>\n                    <ion-input [disabled]="route && route.isAnswerFeedbackEnabled() && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)" *ngIf="task.solutionType == \'text\'" type="text" [(ngModel)]="taskDetails.answer"></ion-input>\n                </ion-item>\n                <ion-list class="vector-input-list" *ngIf="task && (task.solutionType == \'vector_values\' || task.solutionType == \'vector_intervals\') && taskDetails && route.isAnswerValidationEnabled()">\n                    <ion-item *ngFor="let answerField of taskDetails.answerMultipleChoice; let i = index" [ngClass]="{\'is-focused\': answerIndex == i && keyboardVisible()}">\n                        <ion-label floating>{{answerField.name}}</ion-label>\n                        <ion-input (keyup.enter)="checkResult()"\n                                   [disabled]="answerField.solved"\n                                   type="text"\n                                   (focus)="setKeyboardOn(true, i)"\n                                   [ngModelOptions]="{standalone: true}"\n                                   readonly="true"\n                                   [(ngModel)]="answerField.answer"\n                        >\n                        </ion-input>\n                    </ion-item>\n                </ion-list>\n                <ion-list *ngIf="task && task.solutionType == \'multiple_choice\' && multipleChoiceList && route.isAnswerValidationEnabled()">\n                    <ion-item #multipleChoiceAnswers *ngFor="let item of multipleChoiceList; let i = index">\n                        <ion-checkbox [disabled]="route && route.isAnswerFeedbackEnabled() && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)" [(ngModel)]="item.userChecked"></ion-checkbox>\n                        <ion-label tappable>{{item.value}}</ion-label>\n                    </ion-item>\n                </ion-list>\n            </div>\n\n            <div class="on-the-edge-container" *ngIf="taskDetails">\n                <ion-grid no-padding>\n                    <ion-row>\n                        <ion-col *ngIf="route.isHintsEnabled()">\n                            <button ion-button icon-only round color="primary" class="hint" [disabled]="false" *ngIf="task && task.hasHintMessage(1)" (click)="showHint(1)">\n                                <img *ngIf="!taskDetails.hint1" class="round" src="./assets/icons/icon_hint-activated.svg"/>\n                                <img *ngIf="taskDetails.hint1" class="round used" src="./assets/icons/icon_hint-activated-used.svg"/>\n                            </button>\n                            <button ion-button icon-only round color="primary" class="hint" [disabled]="!taskDetails.hint1" *ngIf="task && task.hasHintMessage(2)" (click)="showHint(2)">\n                                <img *ngIf="taskDetails.hint1 && !taskDetails.hint2" class="round" src="./assets/icons/icon_hint-activated.svg"/>\n                                <img *ngIf="taskDetails.hint1 && taskDetails.hint2" class="round used" src="./assets/icons/icon_hint-activated-used.svg"/>\n                                <img *ngIf="!taskDetails.hint1" class="round" src="./assets/icons/icon_hint-deactivated.svg"/>\n                            </button>\n                            <button ion-button icon-only round color="primary" class="hint" [disabled]="!taskDetails.hint2" *ngIf="task && task.hasHintMessage(3)" (click)="showHint(3)">\n                                <img *ngIf="taskDetails.hint1 && taskDetails.hint2 && !taskDetails.hint3" class="round" src="./assets/icons/icon_hint-activated.svg"/>\n                                <img *ngIf="taskDetails.hint1 && taskDetails.hint2 && taskDetails.hint3" class="round used" src="./assets/icons/icon_hint-activated-used.svg"/>\n                                <img *ngIf="!taskDetails.hint2" class="round" src="./assets/icons/icon_hint-deactivated.svg"/>\n                            </button>\n                        </ion-col>\n\n                        <ion-col *ngIf="route && route.isAnswerFeedbackEnabled() && route.isAnswerValidationEnabled()">\n                            <button ion-button small round *ngIf="task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed)"\n                            [disabled]="!isDecimal(taskDetails.answer) && (task.solutionType == \'range\' || task.solutionType == \'value\')  || task.solutionType != \'multiple_choice\' && !isSpecialTypeAnswered() && !taskDetails.answer && (task.solutionType != \'gps\' || !taskDetailMap?.areAllPointsSet())" (click)="checkResult()">\n                                {{ "a_btn_check_answer" | translate }}\n                            </button>\n                        </ion-col>\n\n                        <ion-col *ngIf="route && route.isAnswerFeedbackEnabled() && !route.isAnswerValidationEnabled()">\n                            <button ion-button small round *ngIf="task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed)"\n                                    (click)="completeTask()">\n                                {{ "a_task_complete" | translate }}\n                            </button>\n                        </ion-col>\n\n                        <ion-col *ngIf="route && !route.isAnswerFeedbackEnabled()">\n                            <button ion-button small round *ngIf="task && taskDetails"\n                                    [disabled]="!isDecimal(taskDetails.answer) && (task.solutionType == \'range\' || task.solutionType == \'value\')  || task.solutionType != \'multiple_choice\' && !taskDetails.answer && (task.solutionType != \'gps\' || !taskDetailMap?.areAllPointsSet())" (click)="checkResult()">\n                                {{ "p_save" | translate }}\n                            </button>\n                        </ion-col>\n\n                        <ion-col>\n                            <button class="hint" ion-button icon-only round color="primary" (click)="showSolutionSample()"\n                            *ngIf="taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed) && route.isSampleSolutionEnabled() && route.isAnswerFeedbackEnabled()">\n                                <img class="round" src="./assets/icons/icon_show_sample_salution.svg"/>\n                            </button>\n                            <!-- open subtask -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="openSubtask()"\n                                    *ngIf="task.subtasks && task.subtasks.length !== solvedSubtasks.length && task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed)">\n                                <img class="round" src="./assets/icons/subtask_icon.svg"/>\n                            </button>\n                            <!-- close subtask -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="closeDetails()"\n                                    *ngIf="rootTask && task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed)">\n                                <img class="round" src="./assets/icons/task_icon.svg"/>\n                            </button>\n                            <!-- skip task -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="confirmSkippingTask()"\n                            *ngIf="!rootTask && task && taskDetails && (!taskDetails.solved && !taskDetails.solvedLow && !taskDetails.failed)">\n                                <img class="round" src="./assets/icons/icon_skip.svg"/>\n                            </button>\n                            <!-- show next task -->\n                            <button class="hint" ion-button icon-only round color="danger" (click)="closeDetails(false)"\n                            *ngIf="taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails.failed)">\n                                <img class="round" src="./assets/icons/icon_skip.svg"/>\n                            </button>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n\n            </div>\n        </div>\n\n        <div class="card subtasks" *ngIf="task && task.subtasks && task.subtasks.length > 0 && solvedSubtasks && solvedSubtasks.length > 0">\n            <ion-label>{{ "a_solved_subtasks" | translate }}</ion-label>\n            <div *ngFor="let subtask of solvedSubtasks; let i = index" class="accordion" [ngClass]="{\'open\': activeAccordions.indexOf(subtask.taskId) != -1}">\n                <div class="accordion_title" (click)="changeSubtaskAccordionState(subtask.taskId)">\n                    <p class="task_name">#{{i+1}} {{task.subtasks[i].title}}</p>\n                    <div class="rating_container">\n                        <!--                    <div class="rating" [ngClass]="{\'perfect\': subtask.solved && route.isAnswerFeedbackEnabled(), \'good\': subtask.solvedLow && route.isAnswerFeedbackEnabled(), \'failed\': subtask.failed && route.isAnswerFeedbackEnabled(), \'saved\': !route.isAnswerFeedbackEnabled()}"></div>-->\n                    </div>\n                    <img class="accordion_arrow" src="./assets/icons/subtask_arrow.svg">\n                </div>\n                <div class="accordion_content">\n                    <span class="description">{{task.subtasks[i].description}}</span>\n                    <ion-label class="answer_container">{{ "a_task_answer" | translate }}<span class="answer" [ngClass]="{\'perfect\': subtask.solved && route.isAnswerFeedbackEnabled(), \'good\': subtask.solvedLow && route.isAnswerFeedbackEnabled(), \'failed\': subtask.failed && route.isAnswerFeedbackEnabled(), \'saved\': !route.isAnswerFeedbackEnabled()}">{{subtask.answer}}</span></ion-label>\n\n                </div>\n            </div>\n        </div>\n\n       <!-- <pre>taskDetails {{ taskDetails | json }}</pre> -->\n        <div class="card evaluation" *ngIf="route && taskDetails && (taskDetails.solved || taskDetails.solvedLow || taskDetails?.failed || taskDetails?.saved)"\n        [ngClass]="{\'saved\' : taskDetails?.saved, \'perfect\' : taskDetails?.solved && route.isAnswerFeedbackEnabled(), \'good\': taskDetails?.solvedLow && route.isAnswerFeedbackEnabled(), \'failed\' : taskDetails?.failed && route.isAnswerFeedbackEnabled() }">\n            <div class="head">\n                <div *ngIf="(taskDetails?.solved || taskDetails?.solvedLow) && route.isAnswerFeedbackEnabled()">\n                    <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;a_alert_congrats&quot;); else elseBlock">\n                        <ion-label text-wrap>{{ route.getNarrativeString("a_alert_congrats") }}</ion-label>\n                    </div>\n                    <ng-template #elseBlock>\n                        <ion-label text-wrap>{{ "a_alert_congrats" | translate }}</ion-label>\n                    </ng-template>\n                </div>\n                <div *ngIf="taskDetails?.failed && route.isAnswerFeedbackEnabled()">\n                    <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;good_luck_next_time&quot;); else elseBlock">\n                        <ion-label text-wrap>{{ route.getNarrativeString("good_luck_next_time") }}</ion-label>\n                    </div>\n                    <ng-template #elseBlock>\n                        <ion-label text-wrap>{{ "good_luck_next_time" | translate }}</ion-label>\n                    </ng-template>\n                </div>\n                <div *ngIf="taskDetails.saved && !route.isAnswerFeedbackEnabled()">\n                    <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;a_alert_congrats&quot;); else elseBlock">\n                        <ion-label text-wrap>{{ route.getNarrativeString("a_alert_congrats") }}</ion-label>\n                    </div>\n                    <ng-template #elseBlock>\n                        <ion-label text-wrap>{{ "a_alert_congrats" | translate }}</ion-label>\n                    </ng-template>\n                </div>\n                <ion-label class="tag score" *ngIf="route.isAnswerFeedbackEnabled() && !gamificationIsDisabled && taskDetails && (taskDetails.score || taskDetails.score == 0)">+ {{taskDetails.score}}</ion-label>\n            </div>\n        </div>\n\n        <div *ngIf="!rootTask" id="keyboard-anchor"></div>\n        <div *ngIf="rootTask" id="snd-keyboard-anchor"></div>\n	    <div *ngIf="taskDetails && task.hasSideFacts()" class="card secondary">\n                <div *ngIf="route.isNarrativeEnabled() && route.hasNarrativeString(&quot;a_did_you_know&quot;); else elseBlock">\n                    <ion-label text-wrap>{{ route.getNarrativeString("a_did_you_know") }}</ion-label>\n                </div>\n                <ng-template #elseBlock>\n                    <ion-label text-wrap>{{ "a_did_you_know" | translate }}</ion-label>\n                </ng-template>\n		    <p *ngIf="task">\n			    {{task.getSideFactsText()}}\n		    </p>\n	    </div>\n        <div class="card secondary">\n            <ion-label>{{ "author" | translate }}</ion-label>\n            <p *ngIf="task">\n                {{task.author}}<br> {{task.mail}}\n            </p>\n        </div>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/damian.scheerer/Documents/web/O1-MCM-mobile-App/src/pages/task-detail/task-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_orm_service__["a" /* OrmService */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular_components_modal_modal_controller__["a" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* DeepLinker */],
            __WEBPACK_IMPORTED_MODULE_10__services_modals_service__["a" /* ModalsService */],
            __WEBPACK_IMPORTED_MODULE_11__services_gps_service__["a" /* GpsService */],
            __WEBPACK_IMPORTED_MODULE_13__services_chat_and_session_service__["a" /* ChatAndSessionService */],
            __WEBPACK_IMPORTED_MODULE_5__app_app_component__["b" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_spinner_dialog__["a" /* SpinnerDialog */],
            __WEBPACK_IMPORTED_MODULE_17__services_images_service__["a" /* ImagesService */]])
    ], TaskDetail);
    return TaskDetail;
    var TaskDetail_1;
}());

//# sourceMappingURL=task-detail.js.map

/***/ }),

/***/ 1150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskDetailMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_leaflet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet_markercluster__ = __webpack_require__(1133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_leaflet_markercluster___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_leaflet_markercluster__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_offline__ = __webpack_require__(1135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_leaflet_offline___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_leaflet_offline__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_geometryutil__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_leaflet_geometryutil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_leaflet_geometryutil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classes_Helper__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__ = __webpack_require__(623);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet_rotatedmarker__ = __webpack_require__(1138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet_rotatedmarker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_leaflet_rotatedmarker__);
/**
 * Created by Iwan Gurjanow on 19.02.2018.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
// import 'mapbox-gl-leaflet/leaflet-mapbox-gl.js';
var TaskDetailMap = /** @class */ (function () {
    function TaskDetailMap(task, route, gpsService, app, ormService, imagesService) {
        this.task = task;
        this.route = route;
        this.gpsService = gpsService;
        this.app = app;
        this.ormService = ormService;
        this.imagesService = imagesService;
        this.pointsIcons = [];
        // Markers (set by user) settings
        this.pointMarkers = [];
        this.ALLOWED_DISTANCE_TO_TASK = 300;
        // Axis setting
        this.AXIS_LENGTH = 110;
        this.ARROW_LENGTH = 6;
        this.ARROW_DEGREE = 25;
        this.MARK_DISTANCE = 10;
        this.MARK_LENGTH = 1.5;
        this.LINEAR_FX_EXTEND = 100;
        this.axisPoints = {
            origin: null,
            x: null,
            y: null
        };
        this.linearFxGraph = null;
        this.markerGroup = null;
        this.updateIcons();
        this.taskDetails = task;
        this.routeDetails = route;
        // Init Marker Array
        for (var i = 0; i < parseInt(this.task.getSolutionGpsValue("points")); i++) {
            this.pointMarkers[i] = null;
        }
    }
    TaskDetailMap.prototype.ngOnDestroy = function () {
        if (this.watchSubscription) {
            this.watchSubscription.unsubscribe();
            this.watchSubscription = null;
        }
    };
    TaskDetailMap.prototype.updateIcons = function () {
        switch (this.app.activeNarrative) {
            case 'pirates':
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/mapposition.png", iconSize: [100, 100], iconAnchor: [50, 50], className: 'marker userPosition' }); //, shadowUrl: './assets/icons/icon_mapposition-shadow.png', shadowSize: [38, 41]});
                this.preDefinedPointIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: 'assets/icons/pirates/marker-task-gps-0.png', iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[0] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-1.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[1] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-2.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[2] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-3.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                this.pointsIcons[3] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/pirates/marker-task-gps-4.png", iconSize: [50, 50], iconAnchor: [25, 25], className: 'marker' });
                break;
            default:
                this.userPositionIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/mapposition.png", iconSize: [100, 100], className: 'marker' });
                this.preDefinedPointIcon = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-0.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[0] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-1.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[1] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-2.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[2] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-3.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                this.pointsIcons[3] = __WEBPACK_IMPORTED_MODULE_1_leaflet__["icon"]({ iconUrl: "./assets/icons/marker-task-gps-4.png", iconSize: [50, 50], iconAnchor: [25, 50], className: 'marker' });
                break;
        }
    };
    /*
    Place or move marker on map depending on index (button click)
     */
    TaskDetailMap.prototype.setMarker = function (index) {
        var testing = false; // Note: Change this to true locally for testing GPS tasks!
        var location;
        if (testing) {
            location = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation;
        }
        else {
            location = this.gpsService.getLastPosition();
        }
        if (location != null) {
            var locationLatLng = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](location.coords.latitude, location.coords.longitude);
            if (!this.markerCanBeSet(locationLatLng)) {
                return;
            }
            if (this.pointMarkers[index] == null) {
                var label = String.fromCharCode("A".charCodeAt(0) + index);
                var newMarker = __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](locationLatLng, { icon: this.pointsIcons[index] });
                newMarker.addTo(this.map);
                this.pointMarkers[index] = newMarker;
            }
            else {
                this.pointMarkers[index].setLatLng(locationLatLng);
            }
            if (this.taskDetails.getSolutionGpsValue("task") == "linearFx") {
                this.insertLinearFxGraph();
            }
            console.log("Marker placed");
        }
    };
    TaskDetailMap.prototype.markerCanBeSet = function (clickLatLng) {
        // Markers need to be placed within a certain radius from the task
        /*
        Note: (L as any).GeometryUtil.distance seems to return the distance in pixels? the bigger the zoom the higher the distance
        For realistic distance in meters use (L as any).GeometryUtil.length(latlng1, latlng2)
         */
        var distanceToTask = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](this.taskDetails.lat, this.taskDetails.lon), clickLatLng]);
        if (distanceToTask > this.ALLOWED_DISTANCE_TO_TASK) {
            // TODO: Display note / message why marker cannot be set
            console.log("Marker cannot be placed: Out of range.");
            return false;
        }
        else {
            if (this.taskDetails.getSolutionGpsValue("task") == "linearFx") {
                // Markers can only be placed inside drawn axis
                // Inside = the distance of the placed marker to all four "sides" of the axis must be smaller than AXIS_LENGTH
                var xy = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(this.axisPoints.x, __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].bearing(this.axisPoints.origin, this.axisPoints.y), this.AXIS_LENGTH);
                var closestOnX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.origin, this.axisPoints.x);
                var closestOnY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.origin, this.axisPoints.y);
                var closestOnXY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.x, xy);
                var closestOnYX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].closestOnSegment(this.map, clickLatLng, this.axisPoints.y, xy);
                var distanceX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnX, clickLatLng]);
                var distanceY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnY, clickLatLng]);
                var distanceXY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnXY, clickLatLng]);
                var distanceYX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].length([closestOnYX, clickLatLng]);
                if (distanceX <= this.AXIS_LENGTH && // Distance to Segment origin - x
                    distanceY <= this.AXIS_LENGTH && // Distance to Segment origin - y
                    distanceXY <= this.AXIS_LENGTH && // Distance to Segment x - xy
                    distanceYX <= this.AXIS_LENGTH // Distance to Segment y - xy
                )
                    return true;
                else {
                    // TODO: Display note / message why marker cannot be set
                    console.log("Marker cannot be placed: Not in axis");
                    return false;
                }
            }
            else {
                return true;
            }
        }
    };
    /*
    Checks if user has placed all necessary points (needed for validating)
     */
    TaskDetailMap.prototype.areAllPointsSet = function () {
        var result = true;
        for (var i = 0; i < this.pointMarkers.length; i++) {
            if (this.pointMarkers[i] == null) {
                result = false;
                break;
            }
        }
        return result;
    };
    TaskDetailMap.prototype.getPoints = function () {
        if (this.areAllPointsSet()) {
            var result = [];
            for (var i = 0; i < this.pointMarkers.length; i++) {
                var marker = this.pointMarkers[i];
                result[i] = marker.getLatLng();
            }
            return result;
        }
        else {
            return null;
        }
    };
    /*
    Insert predefined points (by author) as related points for the task (centerTwo, centerThree)
     */
    TaskDetailMap.prototype.insertPreDefinedPoints = function (points) {
        for (var i = 0; i < points.length; i++) {
            var preDefinedPoint = __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](points[i][0], points[i][1]), { icon: this.preDefinedPointIcon });
            preDefinedPoint.addTo(this.map);
        }
    };
    /*
    Draws an axis (x-Axis and y-Axis) starting at origin.
    The direction for the x-Axis is defined by origin and dPoing
    The length of the axis is default to 100m, every 10m there is a short line indicating the 10 meters
     */
    TaskDetailMap.prototype.insertAxis = function (origin, dPoint) {
        // Draw axis with arrows at the end
        var aCoor = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](origin[0], origin[1]);
        var bCoor = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](dPoint[0], dPoint[1]);
        var bearingAB = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].bearing(aCoor, bCoor);
        //let disAB = (L as any).GeometryUtil.distance(this.map, aCoor, bCoor);
        bCoor = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB, this.AXIS_LENGTH); // Override bCoor with a point that is 100 meter in right direction
        /*
        if (disAB < this.AXIS_LENGTH) {
            bCoor = (L as any).GeometryUtil.destination(aCoor, bearingAB, this.AXIS_LENGTH);
        }
        */
        var yCoor = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB - 90, this.AXIS_LENGTH);
        var xArrowUp = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(bCoor, bearingAB - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        var xArrowDown = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(bCoor, bearingAB + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        var yArrowUp = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(yCoor, bearingAB - 90 - 180 + this.ARROW_DEGREE, this.ARROW_LENGTH);
        var yArrowDown = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(yCoor, bearingAB - 90 + 180 - this.ARROW_DEGREE, this.ARROW_LENGTH);
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([yArrowUp, yCoor, yArrowDown, yCoor, aCoor, bCoor, xArrowUp, bCoor, xArrowDown], { color: 'red', opacity: 0.7 }).addTo(this.map);
        this.axisPoints.origin = aCoor;
        this.axisPoints.x = bCoor;
        this.axisPoints.y = yCoor;
        // Insert "X" and "Y" at end of axis
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(bCoor, bearingAB, this.MARK_LENGTH * 3), { rotationAngle: (bearingAB - 90), icon: this.getLabeledIcon("X", "axis-label", "x")
        }).addTo(this.map);
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(yCoor, bearingAB - 90, this.MARK_LENGTH * 3), { rotationAngle: (bearingAB - 90), icon: this.getLabeledIcon("Y", "axis-label", "y")
        }).addTo(this.map);
        // Draw markers every MARKER_DISTANCE meters to indicate the dimensions
        // origin marker
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB + 135, this.MARK_LENGTH), __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB - 45, this.MARK_LENGTH * 1.5)], { color: 'red', weight: 2, opacity: 0.7 }).addTo(this.map);
        // 0 m label at origin
        __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](__WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB + 135, this.MARK_LENGTH * 2), {
            icon: this.getLabeledIcon('0 m', "axis-label", "y"),
            rotationAngle: (bearingAB - 90)
        }).addTo(this.map);
        // Add 50m and 100m to axis
        for (var i = 1; i < (this.AXIS_LENGTH) / this.MARK_DISTANCE; i++) {
            var markerWidth = 2;
            if (i == 5 || i == 10) {
                markerWidth = 4;
            }
            var coordOnXAxis = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB, this.MARK_DISTANCE * i);
            var coordOnYAxis = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(aCoor, bearingAB - 90, this.MARK_DISTANCE * i);
            var innerPointX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnXAxis, bearingAB - 90, this.MARK_LENGTH);
            var outerPointX = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnXAxis, bearingAB - 90, -this.MARK_LENGTH);
            var innerPointY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnYAxis, bearingAB, this.MARK_LENGTH);
            var outerPointY = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnYAxis, bearingAB, -this.MARK_LENGTH);
            __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([outerPointX, innerPointX], { color: 'red', weight: markerWidth, opacity: 0.7 }).addTo(this.map);
            __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([outerPointY, innerPointY], { color: 'red', weight: markerWidth, opacity: 0.7 }).addTo(this.map);
            if (i == 5 || i == 10) {
                var xLabelCoord = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnXAxis, bearingAB + 90, this.MARK_LENGTH * 3);
                var yLabelCoord = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(coordOnYAxis, -bearingAB, this.MARK_LENGTH * 3);
                __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](xLabelCoord, {
                    icon: this.getLabeledIcon(i * 10 + ' m', "axis-label", "x"),
                    rotationAngle: (bearingAB - 90)
                }).addTo(this.map);
                __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"](yLabelCoord, {
                    icon: this.getLabeledIcon(i * 10 + ' m', "axis-label", "y"),
                    rotationAngle: (bearingAB - 90)
                }).addTo(this.map);
            }
        }
    };
    TaskDetailMap.prototype.getLabeledIcon = function (labelText, labelClass, axis) {
        var iconSize /*, iconAnchor*/;
        if (axis == "x") {
            iconSize = [40, 20];
            //iconAnchor = [0, 10];
        }
        else {
            iconSize = [40, 20];
            //iconAnchor = [40, -30];
        }
        return __WEBPACK_IMPORTED_MODULE_1_leaflet__["divIcon"]({
            className: labelClass,
            html: labelText,
            iconSize: iconSize,
        });
    };
    TaskDetailMap.prototype.insertLinearFxGraph = function () {
        if (this.areAllPointsSet()) {
            var points = this.getPoints();
            if (this.linearFxGraph != null) {
                this.map.removeLayer(this.linearFxGraph);
            }
            var bearing = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].bearing(points[0], points[1]);
            var pointA = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(points[0], bearing, (-1) * this.LINEAR_FX_EXTEND);
            var pointB = __WEBPACK_IMPORTED_MODULE_1_leaflet__["GeometryUtil"].destination(points[1], bearing, this.LINEAR_FX_EXTEND);
            this.linearFxGraph = __WEBPACK_IMPORTED_MODULE_1_leaflet__["polyline"]([pointA, pointB], { color: 'blue' }).addTo(this.map);
        }
    };
    TaskDetailMap.prototype.loadMap = function () {
        var _this = this;
        this.center = [this.taskDetails.lat, this.taskDetails.lon]; // Center at task's position
        var mapquestUrl = this.route.getTilesMap(this.app.activeNarrative); //Helper.mapquestUrl;
        var subDomains = this.route.getTilesServerSubdomains(this.app.activeNarrative); //Helper.subDomains;
        if (this.map == null) {
            this.map = __WEBPACK_IMPORTED_MODULE_1_leaflet__["map"]('gpsTaskMap', {
                center: this.center,
                zoom: 18,
                zoomControl: true,
                tileSize: 256,
                maxBounds: this.routeDetails.getBoundingBoxLatLng(),
                trackResize: false // if map gets resized when not visible (when keyboard shows up) it can get into undefined state
            });
            // (<any>L).mapboxGL({
            //     accessToken: "pk.eyJ1IjoiaWd1cmphbm93IiwiYSI6ImNpdmIyNnk1eTAwNzgyenBwajhnc2tub3cifQ.dhXaJJHqLj0_thsU2qTxww",
            //     style: mapquestUrl,
            //     updateInterval: 0,
            // }).addTo(this.map);
            /* For testing - sets users position to click event, comment in for local testing*/
            this.map.on('click', function (e) {
                if (__WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation == null) {
                    __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation = { coords: { latitude: null, longitude: null } };
                }
                __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation.coords.latitude = e.latlng.lat;
                __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].testLocation.coords.longitude = e.latlng.lng;
            });
            var zoomLevels_1 = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].calculateZoom(this.route.getViewBoundingBoxLatLng());
            __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */].initialize().then(function () {
                console.log("Tiles DB Initialized");
                var offlineLayer = __WEBPACK_IMPORTED_MODULE_1_leaflet__["tileLayer"].offline(mapquestUrl, __WEBPACK_IMPORTED_MODULE_6__classes_tilesDb__["a" /* tilesDb */], {
                    attribution: '&copy; mapbox.com',
                    subdomains: subDomains,
                    minZoom: zoomLevels_1.min_zoom,
                    maxZoom: zoomLevels_1.max_zoom,
                    tileSize: 256,
                    crossOrigin: true,
                    detectRetina: true,
                    bounds: _this.route.getBoundingBoxLatLng()
                });
                var tiles = _this.ormService.getTileURLsAsObject(_this.route);
                var resolveOfflineURLsAsTiles = !_this.route.isNarrativeEnabled();
                var that = _this;
                offlineLayer.getTileUrl = function (coords) {
                    var url = __WEBPACK_IMPORTED_MODULE_1_leaflet__["TileLayer"].prototype.getTileUrl.call(this, coords);
                    var dbStorageKey = this._getStorageKey(url);
                    if (tiles[dbStorageKey]) {
                        return Promise.resolve(that.imagesService.getOfflineURL(dbStorageKey, false, resolveOfflineURLsAsTiles));
                    }
                    return Promise.resolve(url);
                };
                _this.map.fitBounds(_this.route.getViewBoundingBoxLatLng());
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
                offlineLayer.addTo(_this.map);
            });
            /* User's Location */
            this.gpsService.getCurrentPosition()
                .then(function (resp) {
                if (resp && resp.coords) {
                    console.warn('found you');
                    // let markerGroup = L.featureGroup();
                    _this.userMarker = __WEBPACK_IMPORTED_MODULE_1_leaflet__["marker"]([resp.coords.latitude, resp.coords.longitude], { icon: _this.userPositionIcon }).on('click', function () {
                        //alert('Marker clicked');
                    });
                    _this.userMarker.setRotationOrigin('center center');
                    _this.userMarker.addTo(_this.map);
                    if (_this.watchSubscription) {
                        _this.watchSubscription.unsubscribe();
                    }
                    _this.watchSubscription = _this.gpsService.watchPosition().subscribe(function (resp) {
                        if (resp && resp.coords) {
                            var lanlng = new __WEBPACK_IMPORTED_MODULE_1_leaflet__["LatLng"](resp.coords.latitude, resp.coords.longitude);
                            // this.map.panTo(lanlng);
                            _this.userMarker.setLatLng(lanlng);
                            //Check if it needs to move the map (in case the user is outside the threshold bounds)
                            /*let freeBounds = L.bounds(L.point(this.map.getSize().x * 0.2, this.map.getSize().y * 0.2),
                             L.point(this.map.getSize().x * 0.8, this.map.getSize().y * 0.8));
                             let newPos = Helper.followUser(freeBounds, this.map.latLngToContainerPoint(lanlng), this.map.getZoom());
                             if(newPos!= null) {
                             //this.map.panTo(this.map.containerPointToLatLng(newPos));
                             }*/
                            //Rotate the user marker
                            if (_this.prevPos != null) {
                                var angle = __WEBPACK_IMPORTED_MODULE_5__classes_Helper__["b" /* Helper */].getAngle(_this.prevPos, resp.coords);
                                _this.userMarker.setRotationAngle(angle);
                            }
                            _this.prevPos = resp.coords;
                        }
                    });
                }
            })
                .catch(function (error) {
                console.error("Location error: " + JSON.stringify(error));
            });
        }
    };
    TaskDetailMap.prototype.getMap = function () {
        return this.map;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('gpsTaskMap'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], TaskDetailMap.prototype, "mapContainer", void 0);
    return TaskDetailMap;
}());

//# sourceMappingURL=task-detail-map.js.map

/***/ })

});
//# sourceMappingURL=0.js.map