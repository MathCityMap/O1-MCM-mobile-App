import { Injectable } from "@angular/core";
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform } from 'ionic-angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { checkAvailability } from "@ionic-native/core";


import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Scheduler } from 'rxjs/Scheduler';
import { Subscription, TeardownLogic } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';

@Injectable()
export class GpsService {
    public static INSTANCE: GpsService;

    constructor(private diagnostic: Diagnostic,
                private alertCtrl: AlertController,
                public platform: Platform,
                private locationAcc: LocationAccuracy,
                private geolocation: Geolocation) {
        GpsService.INSTANCE = this;
        this.subject.emptyCallback = () => {
            if (this.geolocationSubscription) {
                // no more observers left -> unsubscribe
                this.geolocationSubscription.unsubscribe();
                this.geolocationSubscription = null;
                console.log("unsubscribing from geolocation.watchPosition()");
            }
        }
    }

    private subject = new CustomReplaySubject<Geoposition>(1);
    private geolocationSubscription: Subscription;
    private lastPosition: Geoposition;


    public async isLocationOn() {
        await this.platform.ready();
        console.log("platform: " + this.platform.platforms());

        //if the platform is not browser
        if (this.platform.is("android") &&
            checkAvailability(LocationAccuracy.getPluginRef(), null, LocationAccuracy.getPluginName()) === true)
            this.diagnostic.isLocationEnabled().then((enabled) => {
                //if the location is off
                if (!enabled) this.turnLocationOn();
            })
    }


    async locationAlert() {
        let confirm = this.alertCtrl.create({
            title: 'Location Off',
            message: 'Do you want to turn on your device location?',
            buttons: [
                {
                    text: 'NO',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'YES',
                    handler: () => {
                        this.turnLocationOn();
                    }
                }
            ]
        });
        confirm.present();
    }


    async turnLocationOn() {
        this.locationAcc.canRequest().then((can) => {
            if (can) this.locationAcc.request(this.locationAcc.REQUEST_PRIORITY_HIGH_ACCURACY).then(function (suc) {
                console.log("Device Location is now turned ON");
            }, function (rip) {
                console.log("Device Location is still OFF ");
            })

        })

    }

    /**
     * Watch the current device's position.  Clear the watch by unsubscribing from
     * Observable changes.
     *
     * ```typescript
     * const subscription = this.geolocation.watchPosition()
     *                               .filter((p) => p.coords !== undefined) //Filter Out Errors
     *                               .subscribe(position => {
     *   console.log(position.coords.longitude + ' ' + position.coords.latitude);
     * });
     *
     * // To stop notifications
     * subscription.unsubscribe();
     * ```
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Observable<Geoposition>} Returns an Observable that notifies with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or errors.
     */
    watchPosition(options?: GeolocationOptions): Observable<Geoposition> {
        if (!this.geolocationSubscription) {
            console.log("subscribing to geolocation.watchPosition()");
            if (!options) {
                options = {
                    enableHighAccuracy: true
                }
            }
            this.geolocationSubscription = this.geolocation.watchPosition(options).subscribe(next => {
                this.subject.next(next);
                if (next && next.coords) {
                    console.debug(`watchPosition: ${next.coords.latitude}, ${next.coords.longitude}`);
                    this.lastPosition = next;
                }
            });
        }
        return this.subject;
    }

    /**
     * Get the device's current position.
     *
     * @param {GeolocationOptions} options  The [geolocation options](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).
     * @returns {Promise<Geoposition>} Returns a Promise that resolves with the [position](https://developer.mozilla.org/en-US/docs/Web/API/Position) of the device, or rejects with an error.
     */
    async getCurrentPosition(options?: GeolocationOptions): Promise<Geoposition> {
        if (!options) {
            options = {
                enableHighAccuracy: true
            }
        }
        let position = await this.geolocation.getCurrentPosition(options);
        this.subject.next(position);
        if (position && position.coords) {
            console.debug(`getCurrentPosition: ${position.coords.latitude}, ${position.coords.longitude}`);
            this.lastPosition = position;
        }
        return position;
    }

    getLastPosition(): Geoposition {
        return this.lastPosition;
    }
}

class CustomReplaySubject<T> extends ReplaySubject<T> {
    public emptyCallback: Function;

    protected _subscribe(subscriber: Subscriber<T>): Subscription {
        let result = super._subscribe(subscriber);
        let originalUnsubscribe = result.unsubscribe;
        result.unsubscribe = () => {
            originalUnsubscribe.apply(result);
            if (!this.hasObservers() && this.emptyCallback) {
                this.emptyCallback();
            }
        };
        return result;
    }

    hasObservers(): boolean {
        return this.observers.length > 0;
    }
}