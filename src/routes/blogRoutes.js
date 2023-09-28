const express = require('express');
const blogController = require('../controllers/blogController');
const chechAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post("/",chechAuthMiddleware.checkAuth,blogController.insert);
router.get("/:id",blogController.readAnyOne);
router.get("/",blogController.readAll);
router.patch("/:id",chechAuthMiddleware.checkAuth ,blogController.updateBlog);
router.delete("/:id",chechAuthMiddleware.checkAuth,blogController.deleteBlog);



module.exports = router;

