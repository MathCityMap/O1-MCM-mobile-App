## Update 18.05.2022
Do not use yarn anymore. Consider using Node Version Manager (NVM)
for different node versions. This project was built with node v14.17.3.

## System requirements
Install Nodejs 14.17 and npm
```bash
npm install -g ionic
npm install -g cordova
```

Install MSBuild tools

```bash
npm install --global --production windows-build-tools@4.0.0
yarn config set msvs_version 2015 --global
```
Set Path Env to msbuildtools

## Project run instructions

Run npm install to install project dependencies:

```bash
npm install
```

Build project:

```bash
ionic cordova build android
```

When your build fails remove platform files an readd them

```bash
ionic cordova platform rm android
ionic cordova platform add android@12
```

To run project on android emulator run the following commands:

This command makes sure gradle is executable
```bash
chmod +x /Applications/Android\ Studio.app/Contents/gradle/gradle-4.1/bin/gradle
```
```bash
ionic cordova emulate android -lc
```
If you get error
```bash
[ERROR] An error occurred while running cordova emulate android (exit code 1).
```
open android emulator from withing studio.


To run project on ios emulator run the following command:
```bash
ionic cordova emulate ios --target="iPhone-7-Plus, 10.3" -lc
```

"iPhone-7-Plus" can be substituted by any available phone emulators, but I would strongly recommend do not use version later than 10.3 of iOS as it has bugs with maps displaying on emulators ([app-dev](https://forums.developer.apple.com/thread/83570?tstart=0) got reports on beta release and it still plagues final releases as well)

First time run will take some time as it'll download/install platform dependent native libraries. Following runs will be much quicker. As well this command line will run live-reload mode which will output everything that happens to terminal and any changes to the code will be refreshed to emulators (not without limitations)

Note: Project doesn't run on browser as it utilizes SQLite DB
