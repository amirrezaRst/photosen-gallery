const { Router } = require('express');

const { singlePicture, pictureList, createPicture, editPicture, deletePicture, like, dislike, download } = require('../controller/pictureController');
const router = Router();


router.get("/pictureList", pictureList)
router.get("/singlePicture/:id", singlePicture)
router.get("/pictureLike/:id", like)
router.get("/pictureDislike/:id", dislike)
router.get("/download/:id",download)

router.post("/newPicture", createPicture)

router.put("/editPicture/:id", editPicture);

router.delete("/deletePicture/:id", deletePicture)

module.exports = router;