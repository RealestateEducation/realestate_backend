const express = require('express');
const router = express.Router();
const { setController } = require('../../controllers');


router
    .route('/')
    .post(setController.createSet)
    .get(
        setController.getSets
    );

router
.route('/:id')
.get(setController.getSetById)
.patch(setController.updateSet)
.delete(setController.deleteSet)    



module.exports = router;