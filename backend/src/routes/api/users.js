const express = require("express");
const router = express.Router();
const apiUsersController = require("../../controllers/api/user-controller");

router.get("/api/users", apiUsersController.list);
router.get("/api/user/:id", apiUsersController.detail)

module.exports = router;
