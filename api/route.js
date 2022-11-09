const route = require("express").Router();
const minionController = require("../controller/controller");
route.get("/",minionController.getMinion);
route.post("/", minionController.createMinion);
route.patch("/:id", minionController.updateMinion);
route.delete("/:id", minionController.deleteMinion);

module.exports = route;