# Augmented Reality (AR) in local WEB browser

## Usage instructions
### URL explained
AR page is accessible through [https://mcm.autentek.de/v2.php](https://mcm.autentek.de/v2.php)

* http://mcm.autentek.de/v2.php?scene=weights

    * creates scene with _weights_ images

    * scene is placed at GPS latitude: 52.478926; longitude: 13.364861; which is set inside scene JSON file

* http://mcm.autentek.de/v2.php?scene=numbers&lat=52.478926&lon=13.364861

    * creates scene with _numbers_ images

    * places scene at GPS lat=52.478926&lon=13.364861 which is set in URL

* http://mcm.autentek.de/v2.php?scene=weights&x=0&y=1.6&z=-5

    * this is mostly used for PC/Mac browsers for debugging, places scene at x, y, z in relative to you in meters:

        * x - left/right relative from you

        * y - up/down relative from you (1.6 is approx height of eyes)

        * z - it's how far object from you. - means objects is in front of you further away (z axis increases into your perspective)

* https://ar-server.local.autentek.de/v2.php?text={"lat":52.478926,"lon":13.364861,"value":"random text haha"}]

    * creates text entity in a scene with given gps position

**Note:** *scene* and *text* parameters are friendly to each other so you can use both if needed. But main reason for
*text* parameter is to have quick way of adding object in a scene for debugging.

### Scenes

Scenes are located under *scenes* folder. Scene is accessed through *scene* parameter in url matching name of json file
without extention (e.g. scene=numbers would load json from _scenes/numbers.json_). Example of scene structure:
```json
{
  "name": "default",
  "gps-entity-place": "latitude: 52.478926; longitude: 13.364861;",
  "entities": [
    {
      "a-entity": "a-box",
      "position": "0 0.5 -3",
      "rotation": "0 45 0",
      "color": "#FF00FF",
      "entities": [
        {
          "a-entity": "a-box",
          "position": "-0.25 0 0.25",
          "rotation": "0 45 0",
          "color": "#00FF00",
          "scale": "0.5 0.5 1",
          "entities": [
            {
              "a-entity": "a-box",
              "position": "-0.25 0 0.25",
              "rotation": "0 45 0",
              "color": "#FFAAAA",
              "scale": "0.5 0.5 1",
              "cursor-listener": ""
            }
          ]
        }
      ]
    },
    {
      "a-entity": "a-entity",
      "geometry": "primitive: box",
      "material": "color: blue",
      "id": "box",
      "position": "-1 0.5 -3",
      "rotation": "0 45 0",
      "cursor-listener": ""
    },
    {
      "a-entity": "a-sphere",
      "position": "0 1.25 -5",
      "gps-entity-place": "latitude: 50.5165691; longitude: 10.2960865;",
      "radius": "1.25",
      "color": "#EF2D5E",
      "cursor-listener": ""
    }
  ]
}
```
All documentation regarding A-Frame entities should be known to the reader as it's not the scope of this file to
explain it. But all entities properties directly are transfered to json. So if you would like to transfer entity
```html
<a-text
        value="This content will always face you."
        look-at="[gps-camera]"
        scale="50 50 50"
        gps-entity-place="latitude: <add-your-latitude>; longitude: <add-your-longitude>;"
      ></a-text>
```
to json format it would be written like that:
```json
{
  "a-entity": "a-text",
  "value": "This content will always face you.",
  "look-at": "[gps-camera]",
  "scale": "50 50 50",
  "gps-entity-place": "latitude: <add-your-latitude>; longitude: <add-your-longitude>;"
}
```
The exception is special property *entities* which is array of subentities and a way to place sub-children if entity
 (nesting). Nesting deepness is not limited nor by quantity nor by deepness. This gives a tool to group object under one
 entity at specific place and children just needs to position themselves in relation to parent. So parent can be placed
 at GPS position but children can then use *position* parameter to be placed at a distance (in meters) in relation to 
 parent GPS position.
 
 Root object can have combination of four properies:
 * name - the name of scene. _Not used_.
 * position - position of whole scene in relation to camera in meters given x, y, z coordinats and explained above.
 * gps-entity-place - position given latitude and longitude. Please do not mix *gps-entity-place* and *position* on 
 same entity as it might produce unexpected results (tested on own skin).
 * entities - array of sub entities. Structure of them explained in example above. Exception are a-assets type of
  entities as they automatically placed directly under *\<scene\>* for preloading.


## DEV notes
If you can run [https://localhost](https://localhost) or [https://*.local.autentek.de](https://local.autentek.de) you are good
to go and do not need any configuration.

## Enabling SSL in Apache (OSX)

### Apache SSL Configuration

Navigate to your local apache configuration folder:
```
cd /usr/local/etc/httpd
```

Run following commands (check if those files does not exist before):
```
sudo openssl genrsa -out server.key 2048
sudo openssl genrsa -out localhost.key 2048
sudo openssl rsa -in localhost.key -out localhost.key.rsa
```

Create configuration file using `sudo touch localhost.conf` command.
Then copy paste the following configuration into it:
```
[req]
default_bits = 1024
distinguished_name = req_distinguished_name
req_extensions = v3_req

[req_distinguished_name]

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = *.localhost
DNS.3 = *.local.autentek.de
```

Generate the required Certificate Requests:
```
sudo openssl req -new -key server.key -subj "/C=/ST=/L=/O=/CN=/emailAddress=/" -out server.csr
sudo openssl req -new -key localhost.key.rsa -subj "/C=/ST=/L=/O=/CN=localhost/" -out localhost.csr -config localhost.conf
```

**Note(Optional)**: Complete the values C= ST= L= O= CN= to reflect your own organizational structure, where:
* C= eq. Country: The two-letter ISO abbreviation for your country.
* ST= eq. State or Province: The state or province where your organization is legally located.
* L= eq. City or Locality: The city where your organization is legally located.
* O= eq. Organization: he exact legal name of your organization.
* CN= eq. Common Name: The fully qualified domain name for your web server

Use the Certificate Requests to sign the SSL Certificates:
```
sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
sudo openssl x509 -req -extensions v3_req -days 365 -in localhost.csr -signkey localhost.key.rsa -out localhost.crt -extfile localhost.conf
```

Add the SSL Certificate to **Keychain Access**.
```
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localhost.crt
```

### Apache Configuration

Edit apache configuration file `/usr/local/bin/am-apache-conf/am-httpd.conf` by adding or uncommenting following commands:
```
LoadModule socache_shmcb_module lib/httpd/modules/mod_socache_shmcb.so
LoadModule ssl_module lib/httpd/modules/mod_ssl.so
```
And add at the end:
```
Include "/usr/local/etc/httpd/extra/httpd-ssl.conf"
```

### Apache Virtual Host Configuration

Edit file `/usr/local/etc/httpd/extra/httpd-ssl.conf` and replace port `8443` references to `443` (should be two accuracies: **Listen** and **VirtualHost _default_**)

Edit file `/usr/local/bin/am-apache-conf/vhosts/dev.conf` by duplicating whole `<VirtualHost *:80>` section. In the second part change `*:80` to `*.443` and add those lines to enable SSL:
```
<VirtualHost *:443>
...
ServerAlias *.local.autentek.de

# Enable SSL Engine
SSLEngine on
SSLCipherSuite ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP:+eNULL
SSLCertificateFile "/usr/local/etc/httpd/localhost.crt"
SSLCertificateKeyFile "/usr/local/etc/httpd/localhost.key"
# END: Enable SSL Engine

<Directory "/usr/local/bin/am-apache-conf/docroot">
...
```

Test **apache** configuration by running:
```
sudo apachectl configtest
```

If you see no errors in configuration, restart **apache**:
```
sudo apachectl -k restart
```

[https://localhost](https://localhost/blat) and [https://*.local.autentek.de](https://local.autentek.de) should be working now

### External sources
This README is based on:
* [https://getgrav.org/blog/macos-catalina-apache-ssl](https://getgrav.org/blog/macos-catalina-apache-ssl)
* [https://gist.github.com/nrollr/4daba07c67adcb30693e](https://gist.github.com/nrollr/4daba07c67adcb30693e)

## (Development) Auto reload page

There's a ruby script `watch.rb` which utilises OSX **AppleScript**. To use it run in main project folder:
```
./watch.rb ./AR-server ar-server.local
```
**Note**: first parameter is folder (`./` refers to current one), second parameter the unique URL part that script will
look in **Google Chrome** and reloads it (`ar-server.local` is part of url `https://ar-server.local.autentek.de/v2.php`
which is unique and only that page will be reloaded).


**Note**: this script can invoke `rsync-ar.sh` script if parameter `-r` is provided which in turn synchronizes server files to be accessible:
`https://mcm.autentek.de/v2.php`. If you want to just synchronize to server:
```
./rsync-ar.sh -F ./AR-server
```
and it will sync files with the server.

If you cannot run `watch.rb` then you need to add execution flag to it:
```
chmod a+x watch.rb
```

### External sources
* [AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html#//apple_ref/doc/uid/TP40000983)
