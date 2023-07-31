const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/index.html"))
});

router.post("/anasayfa/:type",(req,res)=>{
    let typ = req.params.type;
    console.log(req.body);
    switch(typ){
        case "firma":{
            res.json({message:"Zamazingo 1"});
            break;
        }case "okul":{
            res.json({message:"Zamazingo 2"});
            break;
        }case "ogrenci":{
            res.send({message:"Zamazingo 3"});
            break;
        }
    }
});
router.get("/*",(req,res)=>{
    res.send("hata!")
})

module.exports = router;

/*
router.get("/",(req,res)=>{
    
})
*/

function firmaKontrol(body){
    
}