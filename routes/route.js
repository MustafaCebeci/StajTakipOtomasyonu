const express = require('express');
const router = express.Router();
const path = require('path');

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/index.html"))
});

router.get("/*",(req,res)=>{
    res.send("hata!")
})

module.exports = router;

/*
router.get("/",(req,res)=>{
    
})
*/