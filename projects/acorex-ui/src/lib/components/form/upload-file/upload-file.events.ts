

export interface AXUploadFileProgressEvent
{
    readonly file:File;
    readonly uploaded:number;
    readonly total:number;
    readonly value:number;
}

export interface AXUploadFileLoadEvent
{
    readonly file:File;
    readonly data:ArrayBuffer;
}