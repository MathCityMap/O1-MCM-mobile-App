import {EventEmitter} from "@angular/core";
import {Task} from "../../../../../entity/Task";
import {TaskMapState} from "../TasksMap";
import {Score} from "../../../../../entity/Score";
import {Coordinates} from "@ionic-native/geolocation";

export interface MapHandlerInterface {
    mapClickedEvent: EventEmitter<void>;
    taskClickedEvent: EventEmitter<any>;
    readonly mapLoaded: boolean;
    loadMap(initialPosition?: Coordinates): Promise<void>
    redrawMarkers(tasks: Array<Task>, mapState: TaskMapState, score: Score): Promise<void>
    updateUserPosition(lat: number, lng: number): void
    moveTo(lat: number, lon: number): void;
}
