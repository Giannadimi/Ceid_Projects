module.exports = app => {
    const activities = require("../Controllers/Activity.controller.js");

    var router = require("express").Router();
  
    // Retrieve all activities
    router.get("/", activities.findAll);

    //Delete all activities
    router.delete("/", activities.deleteAll);

    router.post("/",activities.create);
  
    app.use('/api/activities', router);
  };
