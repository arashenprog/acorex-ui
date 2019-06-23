export  interface   AXSchedulerEvent
{
    startTime:Date,
    finishTime:Date,
    title:string,
    description?:string;
}

export  interface   AXSchedulerOccasion
{
    startTime:Date,
    finishTime:Date,
    title:string,
    description?:string;
    blocked?:boolean;
}




