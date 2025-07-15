import {RouteApiResponse} from "./RouteApiResponse";

export interface RouteListApiResponse {
    items: RouteApiResponse[];
    limit: number;
    offset: number;
    total: number;
}
