const { Router } = require('express');

const { contactList, answered, newContact, deleteContact } = require('../controller/contactController');
const router = Router();



router.get("/contactList", contactList);
router.get("/answered/:id", answered);

router.post("/newContact", newContact);

router.delete("/deleteContact/:id", deleteContact);


module.exports = router;