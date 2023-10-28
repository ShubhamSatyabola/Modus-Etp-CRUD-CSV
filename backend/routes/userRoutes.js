const express = require('express')

const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users", userController.getUser);

router.get('/getUser/:id', userController.getOneUser)

router.post("/post-user", userController.postUser);

router.put('/edit/:id', userController.editUser)

router.delete('/delete/:id',userController.deleteUser)



module.exports = router;
