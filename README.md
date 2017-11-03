## Project run instructions

Run yran to install project dependencies:

```bash
yarn
```

To run project on ios emulator run the following command:
```bash
ionic cordova emulate ios --target="iPhone-7-Plus, 10.3" -lc
```

"iPhone-7-Plus" can be substituted by any available phone emulators, but I would strongly recommend do not use version later than 10.3 of iOS as it has bugs with maps displaying on emulators ([app-dev](https://forums.developer.apple.com/thread/83570?tstart=0) got reports on beta release and it still plagues final releases as well)

First time run will take some time as it'll download/install platform dependent native libraries. Following runs will be much quicker. As well this command line will run live-reload mode which will output everything that happens to terminal and any changes to the code will be refreshed to emulators (not without limitations)

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

Note: Project doesn't run on browser as it utilizes SQLite DB