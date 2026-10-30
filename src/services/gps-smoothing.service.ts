import { Injectable } from '@angular/core';

export interface SmoothedPosition {
    latitude: number;
    longitude: number;
    accuracy: number;
}

@Injectable()
export class GpsSmoothingService {
    private last: SmoothedPosition | null = null;
    private lastTimestamp = 0;

    // Tune these values for your app
    private readonly MAX_ACCURACY = 50; // meters
    private readonly MIN_ALPHA = 0.2;
    private readonly MAX_ALPHA = 0.8;

    private readonly MAX_SPEED = 16.67; // 60 km/h in meters/second
    private readonly GPS_MARGIN = 15;

    smooth(position: {
        latitude: number;
        longitude: number;
        accuracy: number;
        timestamp?: number;
    }): SmoothedPosition | null {

        const { latitude, longitude, accuracy } = position;

        // Reject invalid or poor-quality measurements
        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            !Number.isFinite(accuracy) ||
            accuracy <= 0 ||
            accuracy > this.MAX_ACCURACY
        ) {
            return this.last;
        }

        const timestamp = position.timestamp ?? Date.now();

        // First valid position initializes the filter
        if (!this.last) {
            this.last = { latitude, longitude, accuracy };
            this.lastTimestamp = timestamp;
            return this.last;
        }

        // Ignore duplicate or older measurements
        if (timestamp <= this.lastTimestamp) {
            return this.last;
        }

        // Distance between previous filtered position and new GPS fix
        const distance = this.distanceMeters(
            this.last.latitude,
            this.last.longitude,
            latitude,
            longitude
        );

        const elapsedSeconds =
            (timestamp - this.lastTimestamp) / 1000;

        // Allow movement plus a margin for GPS uncertainty.
        // This helps reject sudden, implausible jumps.
        const allowedDistance =
            (this.MAX_SPEED * elapsedSeconds) +
            this.GPS_MARGIN +
            (2 * accuracy);

        if (distance > allowedDistance) {
            return this.last;
        }

        // Higher-accuracy fixes receive more weight.
        const alpha = Math.max(
            this.MIN_ALPHA,
            Math.min(
                this.MAX_ALPHA,
                10 / (10 + accuracy)
            )
        );

        // Smooth latitude and longitude
        const result: SmoothedPosition = {
            latitude:
                this.last.latitude +
                alpha * (latitude - this.last.latitude),

            longitude:
                this.last.longitude +
                alpha * (longitude - this.last.longitude),

            accuracy
        };

        this.last = result;
        this.lastTimestamp = timestamp;

        return result;
    }

    private distanceMeters(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ): number {
        const R = 6371000;
        const toRad = (degrees: number) =>
            degrees * Math.PI / 180;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

        return 2 * R * Math.asin(
            Math.sqrt(Math.min(1, a))
        );
    }

    reset(): void {
        this.last = null;
        this.lastTimestamp = 0;
    }
}
