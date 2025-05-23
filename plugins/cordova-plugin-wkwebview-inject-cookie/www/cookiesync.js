/*
 * Copyright 2017-2020 Christian-W. Budde
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var exec = require("cordova/exec");

module.exports = {
  setCookie: function (url, name, value, successCallback, errorCallback) {

    if ((url.substr(0,4)==="http")&&(url.indexOf("\/\/")>=0)) {
      url = url.slice(url.indexOf("\/\/")+2);
    }
    var sPos = url.indexOf("\/");
    var domain = url.substr(0,sPos);
    var path = url.substr(sPos,(url.length-sPos));

    exec(successCallback, errorCallback, "WKWebViewInjectCookie",
      "setCookie", [domain, path, name ? name : "foo", value ? value : "bar"]);
  },
  injectCookie: function (url, successCallback, errorCallback) {
    this.setCookie(url, "foo", "bar", successCallback, errorCallback);
  }
};