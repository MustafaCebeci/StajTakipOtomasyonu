const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("<h1>Zamarin</h1>");
});

router.get("/*",(req,res)=>{
    res.send("hata!")
})

module.exports = router;

/*
router.get("/",(req,res)=>{
    
})
*/