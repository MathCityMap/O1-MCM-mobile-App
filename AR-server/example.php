<?php
$i_lon = $_GET['longitude'] ?? '13.2960865';
$i_lat = $_GET['latitude'] ?? '52.5165691';
$lon = floatval($i_lon);
$lat = floatval($i_lat);
?>
<html>
<head>
  <script>
    var lon = <?php echo $lon; ?>;
    var lat = <?php echo $lat; ?>;
  </script>
  <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
  <script src="https://raw.githack.com/AR-js-org/AR.js/3.1.0/aframe/build/aframe-ar.js"></script>
  <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
</head>
<!--<body style='margin : 0px; overflow: hidden;'>-->
<!--<a-scene embedded arjs>-->
<!--  <a-marker>-->
<!--    <a-box position="-1 0.5 0" rotation="0 45 0" color="#4CC3D9"></a-box>-->
<!--    <a-plane position="0 0 0" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>-->
<!--  </a-marker>-->
<!--  <a-entity camera></a-entity>-->
<!--</a-scene>-->
<!--</body>-->
<body style='margin: 0; overflow: hidden;'>
<a-scene
    vr-mode-ui="enabled: false"
    embedded
    arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
  <a-assets>
    <audio id="click-sound" src="https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg"></audio>

    <!-- Images. -->
    <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg">
    <img id="city-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg">
    <img id="cubes" src="browse.svg">
    <img id="cubes-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg">
    <img id="sechelt" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg">
    <img id="sechelt-thumb" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg">
  </a-assets>

    <!-- "button" -->
    <a-entity id="refresh-button" scale="0.25 0.25 0.25" geometry="primitive: box" material="color: red" position="0 0 -2"></a-entity>








   <!-- <a-box material="color: yellow" gps-entity-place="latitude: 52.5165691; longitude: 13.2959865;"/> -->
  <a-entity id='icon-text'
            look-at="[gps-camera]"
            rotation="0 90 0"
            gps-entity-place="latitude: 52.5165691; longitude: 13.2959865;"
            geometry="primitive: plane; width: auto; height: auto"
            scale="15 15 0"
            material="color: blue"
            text="color: yellow; value: This content\nwill always\nface you."
  >
  <!--<a-text id='icon-text'
      value="This content will always face you."
      look-at="[gps-camera]"
      scale="5 5 5"
  ></a-text>-->
  </a-entity>
<!--<a-entity class="link"
            geometry="primitive: plane; height: 1; width: 1"
            material="shader: flat; src: #cubes-thumb"
            sound="on: click; src: #click-sound"></a-entity>-->
  <a-entity id='icon-cubes' rotation="0 90 0"
            gps-entity-place="latitude: 50.5165691; longitude: 10.2960865;">
    <a-image src="#cubes" width="1.5" height="3"></a-image>
  </a-entity>
  <a-camera gps-camera rotation-reader>
    <a-cursor
        id="cursor"
        animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click"
        animation__clickreset="property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click"
        animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing"></a-cursor>
  </a-camera>
</a-scene>
<script>
var latlon = `latitude: ${lat}; longitude: ${lon};`;
console.log('lat and lon', latlon);
console.log(document.querySelector('#icon-cubes').getAttribute('gps-entity-place'));
// place marker behind text a bit
document.querySelector('#icon-cubes').setAttribute('gps-entity-place', {latitude: lat, longitude: lon+0.0003});
// place text slightly left
document.querySelector('#icon-text').setAttribute('gps-entity-place', {latitude: lat+0.0001, longitude: lon});

document.querySelector('#refresh-button').addEventListener('click', function() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        alert('requesting permission');
        DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            // window.addEventListener('deviceorientation', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
      alert('permissions are set in settings');
    }
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            // window.addEventListener('devicemotion', () => {});
          }
        })
        .catch(console.error);
    } else {
      // handle regular non iOS 13+ devices
    }
});


</script>
</body>
</html>

