# Augmented Reality (AR) in local WEB browser

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
**Note**: this script will invoke `rsync-ar.sh` script which in turn synchronizes server files to be accessible:
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
