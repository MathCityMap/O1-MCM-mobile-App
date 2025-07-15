import {s3MediaResponse} from "./s3MediaResponse";

export interface RouteApiResponse {
    _id: number;
    user_id: number;
    public: string; // "1" as string
    title: string;
    country_code: string;
    city: string;
    image: string;
    code: string;
    grade: string;
    tags: string;
    duration: string;
    length: string;
    bounding_box: string;
    center: string;
    lat: number;
    lon: number;
    timestamp: string;
    description: string;
    create_date: string;
    attr: string; // JSON string, or parse it into a separate type if needed
    lang_code: string;
    map_version: number;
    map_filename: string;
    map_date: number;
    s3_media: s3MediaResponse
    is_offline: number;
    distance: number;
}
