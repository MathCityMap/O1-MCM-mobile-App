<?php

function GET_FLOAT($par)
{
    if (isset($_GET[$par])) {
        return filter_input(INPUT_GET, $par, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    }

    return null;
}

$lon = GET_FLOAT('lon'); //'13.2960865';
$lat = GET_FLOAT('lat');  //'52.5165691';
$x = GET_FLOAT('x');
$y = GET_FLOAT('y');
$z = GET_FLOAT('z');
$text = $_GET['text'] ?? null;
$scene = $_GET['scene'] ?? null;
$sceneContent = '{}';

if ($scene) {
    $scene = str_replace("../", "", $scene);
    $currentFolder = getcwd();
    $sceneFile = "{$currentFolder}/scenes/{$scene}.json";

//if (!file_exists($sceneFile)) {
//    http_response_code(404);
//    include('404.php'); // provide your own HTML for the error page
//    die();
//}

    $sceneContent = file_get_contents($sceneFile);
}

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
  <script src="scripts/scene.js?1"></script>
  <script src="scripts/entity-collection.js?1"></script>
  <script src="scripts/entity.js?1"></script>

  <script>
  let x, y, z, lon, lat, position, gpsPosition
  <?php echo $x !== null ? "x = $x;" : ''; ?>
  <?php echo $y !== null ? "y = $y;" : ''; ?>
  <?php echo $z !== null ? "z = $z;" : ''; ?>
  <?php echo $lon !== null ? "lon = $lon;" : ''; ?>
  <?php echo $lat !== null ? "lat = $lat;" : ''; ?>
  if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
    position = true
  } else {
    console.log('x, y, z undefined')
  }

  if (typeof lon === 'number' && typeof lat === 'number') {
    gpsPosition = true
  } else {
    console.log('lat, lon undefined')
  }

  var sceneJson = JSON.parse(`<?php echo $sceneContent; ?>`)
  var textJson = null
  try {
    var text
    text = `<?php echo $text; ?>`
    // var text = '{"lat":52.478926,"lon":13.364861,"value":"random%20text%20haha"}'
    console.log('[text]', text)
    textJson = JSON.parse(text)
    console.log('[text] parameter translated to', textJson)
  } catch (e) {
    console.log('No valid [text] parameter given', e)
  }

  if (sceneJson.name) {
    console.log(`I have a json scene [${sceneJson.name}]`, sceneJson)
  } else {
    console.log('Scene without name', sceneJson)
  }

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
        if (position) {
          console.log('new position', x, y, z)
          scene.setPosition(x, y, z)
        }
        if (gpsPosition) {
          console.log('new gps position', lat, lon)
          scene.setGPSPosition(lat, lon)
        }
        scene.fill(sceneEl)
      } catch (e) {
        console.log('scene-is-ready error', e)
      }
      try {
        if (textJson) {
          const sceneObject = {
            name: 'custom-text',
            entities: [{
              'a-entity': 'a-text',
              'value': textJson.value,
              'gps-entity-place': `latitude: ${textJson.lat}; longitude: ${textJson.lon};`,
            }],
          }
          console.log('creating scene object from [text] parameter', sceneObject)
          const scene = new Scene(document, sceneObject)
          scene.fill(sceneEl)
        }
      } catch (e) {
        console.log('scene-is-ready error processing [text] parameter', e)
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

