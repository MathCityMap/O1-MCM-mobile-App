export interface s3MediaResponse {
    image: s3MediaResponseImage
    mapFilename: s3MediaResponseMapFile
}

interface s3MediaResponseImage {
    mimeType: string;
    details: s3MediaResponseImageDetails;
    type: string;
}

interface s3MediaResponseMapFile {
    mimeType: string;
    details: s3MediaResponseMapFileDetails;
    type: string;
}

interface s3MediaResponseImageDetails {
    thumbUrl: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;
}

interface s3MediaResponseMapFileDetails {
    url: string
}
