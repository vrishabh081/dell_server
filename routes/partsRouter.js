const { addPart, getAllPart, getSinglePart, updatePart, deletePart } = require("../controllers/partsController");
const authorizationRole = require("../middlewares/authorization");

const partRouter = require("express").Router();

// Auth Routes-
partRouter.route("/part")
    .get(getAllPart)
    .post(authorizationRole, addPart);
partRouter.route("/part/:_id")
    .get(getSinglePart)
    .patch(authorizationRole, updatePart)
    .delete(authorizationRole, deletePart);

// Export-
module.exports = partRouter;