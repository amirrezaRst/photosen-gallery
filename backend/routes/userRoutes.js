const { Router } = require('express');
const router = Router();
const multer = require('multer');
const shortid = require('shortid');

const Auth = require('../middleware/Auth');
const AdminAuth = require('../middleware/AdminAuth');

const { userList, singleUser, userProfile, login, register, deleteUser, changePassword, addFollow, removeFollow, newUser, forgotPassword } = require('../controller/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // const dirLocation = `../${__dirname}/public/images`
        cb(null, "public/profiles")
    },
    filename: function (req, file, cb) {
        cb(null, `${shortid.generate()}_${file.originalname}`);
    }
})
const upload = multer({ storage: storage })


router.get("/userList", userList);
router.get("/singleUser/:id", singleUser);
router.get("/userProfile/:id", userProfile);

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/addFollow/:id", addFollow)
router.post("/removeFollow/:id", removeFollow);
router.post("/newUser", [ upload.single("avatar")], newUser)
router.post("/forgotPassword",forgotPassword)

router.put("/changePassword/:id", Auth, changePassword);

router.delete("/deleteUser", [Auth, AdminAuth], deleteUser);

module.exports = router;