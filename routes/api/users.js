const express = require('express');
const router = express.Router();

router.get('/test', (req,res) => res.json({
    "test" : "users tested"
}))

module.exports = router;