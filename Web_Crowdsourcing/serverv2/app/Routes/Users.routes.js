module.exports = (app) => {
  const users = require("../Controllers/User.controller");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all User
  router.get("/", users.findAll);

  // Retrieve a single User with id
  //router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // Delete a User with id
  router.delete("/:id", users.delete);

  // Delete all Users
  router.delete("/", users.deleteAll);

  //User Authentication
  router.post("/userauthentication", users.userauthentication);

  //User File Uploading
  router.post("/upload", users.upload);

  //User last upload
  router.post("/stats/last_upload", users.last_upload);

  //User Ecological Score
  router.post("/stats/ecological_score", users.ecological_score);

  //Period for users registrations
  router.post("/stats/registration_period", users.registration_period);

  //Leaderboard
  router.post("/stats/leaderboard", users.leaderboard);

  //Retrieve all analytics of the users
  router.post("/admin/stats", users.admin_stats);

  router.post(
    "/admin/stats/map_visualazation",
    users.admin_stats_map_visualazation
  );

  router.delete("/admin/stats/", users.deleteAllFromDB);
  router.post(
    "/analytics/registration_percentage_per_category",
    users.registration_percentage_per_category
  );

  app.use("/api/users", router);
};
