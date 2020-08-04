<?php

$i_lon = $_GET['longitude'] ?? '13.2960865';
$i_lat = $_GET['latitude'] ?? '52.5165691';
$lon = floatval($i_lon);
$lat = floatval($i_lat);

$scene = $_GET['scene'] ?? 'default';
$scene = str_replace("../", "", $scene);
$currentFolder = getcwd();
$sceneFile = "{$currentFolder}/scenes/{$scene}.json";

if (!file_exists($sceneFile)) {
    http_response_code(404);
    include('404.php'); // provide your own HTML for the error page
    die();
}

$sceneContent = file_get_contents($sceneFile);

?>
<html>
<head>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <script src="scripts/log.js"></script>
  <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
  <script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
  <script src="https://unpkg.com/aframe-look-at-component@0.8.0/dist/aframe-look-at-component.min.js"></script>
  <script src="components/log.js"></script>
  <script src="components/rotation-reader.js"></script>
  <script src="scripts/entity.js"></script>
  <script src="scripts/entity-collection.js"></script>
  <script src="scripts/scene.js"></script>

  <script>
  var lon = <?php echo $lon; ?>;
  var lat = <?php echo $lat; ?>;
  var sceneJson = JSON.parse(`<?php echo $sceneContent; ?>`)

  console.log(`I have a json scene [${sceneJson.name}]`, sceneJson)
  console.log(sceneJson)

  AFRAME.registerComponent('cursor-listener', {
    init: function () {
      console.log('cursor listener is ready')
      var lastIndex = -1
      var COLORS = ['red', 'green', 'blue']
      this.el.addEventListener('click', function (evt) {
        lastIndex = (lastIndex + 1) % COLORS.length
        this.setAttribute('material', 'color', COLORS[lastIndex])
        console.log('I was clicked at:', evt.detail.intersection.point)
      })
    }
  })

  AFRAME.registerComponent('cursor-listener-text', {
    init: function () {
      console.log('cursor listener is ready')
      var lastIndex = -1
      var COLORS = ['red', 'green', 'blue']
      this.el.addEventListener('click', function (evt) {
        lastIndex = (lastIndex + 1) % COLORS.length
        this.setAttribute('color', COLORS[lastIndex])
        console.log('I was clicked at:', evt.detail.intersection.point)
      })
    }
  })

  AFRAME.registerComponent('cursor-listener-video', {
    init: function () {
      console.log('video-cursor listener is ready')
      this.el.addEventListener('click', function () {
        console.log('video-cursor: click!')
        this.play()
      })
    }
  })

  AFRAME.registerComponent('scene-is-ready', {
    init: function () {
      var sceneEl = this.el
      console.log('ready to create components', sceneEl)
      try {
        const scene = new Scene(document, sceneJson)
        scene.fill(sceneEl)
      } catch (e) {
        console.log('scene-is-ready error', e)
      }
    },
  })

  </script>
</head>
<body style='margin: 0; overflow: hidden;'>

<a-scene scene-is-ready
         vr-mode-ui="enabled: false;"
         embedded
         loading-screen="dotsColor: grey"
         arjs='trackingMethod: best; sourceType: webcam; debugUIEnabled: false;'>
  <a-camera gps-camera rotation-reader>
    <a-cursor fuse="true" fuseTimeout="500"
              id="cursor"
              scale="0.2 0.2 0.2"
              animation__click="property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click"
              animation__clickreset="property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click"
              animation__fusing="property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing"></a-cursor>
  </a-camera>
</a-scene>
</body>
</html>

