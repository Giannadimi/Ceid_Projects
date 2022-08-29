class ActivityArray{
    constructor(timestampMs,type,confidence)
    {
        this.timestampMs=timestampMs;
        this.type=type;
        this.confidence=confidence;
      //  this.nestedActivities=nestedActivities;
     
     
     /* if(this.nestedActivities!==undefined) 
            nestedActivities.forEach(nested => {
                console.log("[sayHi][nested]",nested)

            });
        console.log("[sayHi][timestamp]",this.timestampMs)

        console.log("[sayHi]",this.nestedActivities[0])*/

    }

    sayHi(){
        var activityObject= {
            timestampMs: this.timestampMs,
            type : this.type,
            confidence: this.confidence
        };

        //Clear undefined values
      /*  if(this.nestedActivities==undefined) 
            delete activityObject.nestedActivities;*/

        return activityObject;
    }  
    
}

module.exports = ActivityArray;
