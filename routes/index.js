const weatherRoutes = require("./weather");

const constructorMethod = app => {
  app.use("/",  weatherRoutes );
  
  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;