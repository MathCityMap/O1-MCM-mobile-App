export interface s3Media {
    image: s3MediaImage
    mapFilename?: s3MediaMapFile
    hint1?: s3MediaImage
    hint2?: s3MediaImage
    hint3?: s3MediaImage
    solutionsample?: s3MediaImage
}

interface s3MediaImage {
    mimeType: string;
    details: s3MediaImageDetails;
    type: s3MediaType;
}

interface s3MediaMapFile {
    mimeType: string;
    details: s3MediaResponseMapFileDetails;
    type: s3MediaType;
}

interface s3MediaImageDetails {
    thumbUrl: string;
    smallUrl: string;
    mediumUrl: string;
    largeUrl: string;
}

interface s3MediaResponseMapFileDetails {
    url: string
}

export enum s3MediaType {
    IMAGE = "image",
    AUDIO = "audio",
    VIDEO = "video",
    ZIP = "zip",
    OTHER = "other",
}
