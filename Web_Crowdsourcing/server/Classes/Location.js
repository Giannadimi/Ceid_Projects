class Location{
    constructor(timestampMs,lattitude,longtitude,accuracy,heading,velocity)
    {
        this.timestampMs=timestampMs;
        this.lattitude=lattitude;
        this.longtitude=longtitude;
        this.accuracy=accuracy;
        this.heading=heading;
        this.velocity=velocity;
        this.sayHi()
    }

    sayHi(){
       
         var locationObject= {
                    timestampMs: this.timestampMs,
                    lattitude : this.lattitude,
                    longtitude: this.longtitude,
                    accuracy: this.accuracy,
                    velocity: this.velocity,
                    heading:this.heading
                };
                
                /*if(locationObject['heading']==undefined)
                {
                    delete locationObject['heading']

                }*/
              
                return locationObject

              //  return Object.keys(locationObject).forEach(key => locationObject[key] === undefined ? delete locationObject[key] : {});
            }   
}

module.exports = Location;

//todo
/**
 * 1.Need to remove undefined values
 */