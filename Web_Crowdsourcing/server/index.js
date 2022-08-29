//Import classes
var ActivityArray = require("./Classes/ActivityArray");
var Location = require("./Classes/Location");

const express= require("express");
const upload= require('express-fileupload');

/**Modeling db */
const Sequelize = require('sequelize');

/**DB connection string */
const sequelize = new Sequelize('postgres://postgres:V@g1@2641045152@localhost:5432/webproject_2020');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


//Starting the express app.
const app=express();
const cors=require("cors");

//Configure your server port
app.listen(5000,()=>{
    console.log("server has started on port 5000")
})

//Connecting to the database.
const pool=require("./db");

//middleware
app.use(cors());
app.use(express.json());//req.body getting data from that

//uploading middleware
app.use(upload());

/*---------------------------------------------------ROUTING------------------------------------------------------------*/
app.get("/", function(req, res){
    res.send("SERVER")
});

//Get Locations table
app.get("/locations",async(req,res)=>{
    try {
        const allLocations = await pool.query("SELECT * FROM location");
        res.json(allLocations.rows);
      } catch (err) {
        console.error(err.message);
      }

});

//Create an upload
app.post("/upload",async(req,res)=>{
try {
    if(req.files){
        //Taking all the information for the file from the Post request that send from the file.
        var file= req.files.file;
        var filename=file.name;
       console.log(filename);

        //A function to move the file elsewhere on your server.
        //So if you check the file uploads after an upload you should see the uploaded file there.
        file.mv('./uploads/'+filename);
    }
} catch (err) {
    console.log(err.message);
}
})


//Reading the file from the server local storage.
let jsonData = require('./uploads/LocationHistory.json');

//Filter out all the location that have >10km away from Patras.
const filteredData= jsonData.locations.filter(location => calculateDistance(location.latitudeE7 / 10000000,location.longitudeE7 / 10000000,38.230462,21.753150)<10000)
.slice(0,1); //We are keeping only first 6 elements just for testing.


//Converting our data into GEOJSON FORMAT 
const final_GeoJSONDataFormat= [];
var locations = [Location];
var activitiesArray = [ActivityArray];

for (var item in filteredData) {
    
     filteredData[item].activity.forEach(activity => {
              /**
              * Insert Into Activities
              */    
              try {
                const newActivity = pool.query("INSERT INTO Activity(timpestampMs) VALUES ($1) RETURNING activity_id",[new Date(parseInt(activity.timestampMs))]).then(data => { return data.rows[0].activity_id});
              //   pool.query("select (activity_id) from activity WHERE timpestampMs = $1", [new Date(parseInt(activity.timestampMs))]).then(data =>console.log("activity_id",data))
                //const newLocation_Activity= pool.query("")
               let id =newActivity.then(data => {return data})
              } catch (err) {
                console.log(err.message);
             }

              activity.activity.forEach(
                  nestedItem => //console.log("nestedItem",nestedItem)
                  {
                     activitiesArray.push(new ActivityArray(new Date(parseInt(activity.timestampMs)),nestedItem.type,nestedItem.confidence));

                  }
              )
 
       // activitiesArray.push(new ActivityArray(new Date(parseInt(filteredData[item].activity[0].timestampMs)),filteredData[item].activity.[0]));

        
     })

        locations.push(new Location(new Date(parseInt(filteredData[item].timestampMs)),filteredData[item].latitudeE7 / 10000000,filteredData[item].longitudeE7 / 10000000,filteredData[item].accuracy,filteredData[item].velocity,filteredData[item].heading));
        //activitiesArray.push(new ActivityArray(new Date(parseInt(filteredData[item].activity[0].timestampMs)),filteredData[item].activity));

      //  console.log("[activity-before]", filteredData[item].activity)
      //console.log("[activity0]",filteredData[item].activity[0].activity)


         console.log(locations);
         console.log("<------------------------------->");
         console.log(activitiesArray)
        /* activitiesArray.forEach(nestedActivity => 
            {
                /**
                 * Insert Into nested Activities
                
                try {
                    const newNestedActivity = pool.query("INSERT INTO Nested_Activities(confidence,type) VALUES ($1,$2)",[nestedActivity.confidence,nestedActivity.type]);
                    }  catch (err) {
                        console.log(err.message);
                    }                                             
            } );     */

        locations.forEach(location => 
         {        
                //Insert into location_activity table
                try {
                    const newLocation = pool.query("INSERT INTO location(heading,velocity,accuracy,longitude,latitude,timestampMs) VALUES ($1,$2,$3,$4,$5,$6)",[location.heading,location.velocity,location.accuracy,location.longitude,location.latitude,location.timestampMs])
                } catch (err) {
                    console.log(err.message);
                }
            }
        )

       /*activities.forEach(activity=>
            {
                try {
            //Insert into Activity Table
              const newActivity = pool.query("INSERT INTO activity(activity_id,type,confidence,timpestampMs) VALUES ($1,$2,$3,$4,$5,$6)",[activity.c,activity.velocity,activity.accuracy,activity.longitude,activity.latitude,activity.timestampMs])
            } catch (err) {
                    console.log(err.message);
                }

            })*/            
        
}


//-------------------------------------------------Users Identification---------------------------------------------->
/*pool.query("SELECT * from users",(err,res)=>{
 //   console.log("[err]",err);
   // console.log("[res]",res.rows); //return values in JSON Format
})*/



//-------------------------------------------------[Functions]------------------------------------------------------->
function  calculateDistance(lat1,lon1,lat2,lon2)
{
        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c; // in metres
        return d;
}




