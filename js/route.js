const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const sql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const mailer = require('./mailer.js');

require("dotenv").config();
const secretKey = process.env.mailerkey;

const dbConfig = {
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.pw,
    database : process.env.db
}

const pool = sql.createPool(dbConfig);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/index.html"))
});

router.post("/anasayfa/:type",async(req,res)=>{
    let typ = req.params.type;
    switch(typ){
        case "firma":{
            const string = `select * from firma_yetkilisi where tc=${req.body.tc}`;
            const data = await dataKontrol(string);
            if(data.message){
                res.json({message:"Maalesef işlem başarısız oldu"});
            }
            else{
                console.log(data[0],"/n",req.body)
                if(data[0].tc==req.body.tc &&
                    data[0].ad==req.body.name &&
                    data[0].soyad==req.body.surname &&
                    data[0].sifre==req.body.password &&
                    data[0].e_mail==req.body.mail){
                        const token = jwt.sign({ userId: data[0].tc }, secretKey, { expiresIn: '1h' });
                        if(data[0].guvenlik==1){
                            mailauth(data[0].e_mail, token,"firma");
                        }else{
                            res.json({
                                oturumTipi:"firma",
                                token: token
                            });
                        }
                    }
                else{
                    res.json({message:"Hatalı bir giriş oldu, lütfen tüm bilgilerin doğrulundan emin olun!"});
                }
            }
            break;
        }case "okul":{
            const string = `select * from ogretmen where tc=${req.body.tc}`;
            const data = await dataKontrol(string);
            if(data.message){
                res.json({message:"Maalesef işlem başarısız oldu"});
            }
            else{
                if(data[0].tc==req.body.tc &&
                    data[0].ad==req.body.name &&
                    data[0].soyad==req.body.surname &&
                    data[0].sifre==req.body.password){
                        const token = jwt.sign({ userId: data[0].tc }, secretKey, { expiresIn: '1h' });
                        if(data[0].guvenlik==1){
                            mailauth(data[0].e_mail, token, "ogretmen");
                        }else{
                            res.json({
                                oturumTipi:"okul",
                                token: token
                            });
                        }
                    }else{
                    res.json({message:"Hatalı bir giriş oldu, lütfen tüm bilgilerin doğrulundan emin olun!"});
                }
            }
            break;
        }case "ogrenci":{
            const string = `select * from ogrenci where tc=${req.body.tc}`;
            const data = await dataKontrol(string);
            if(data.message){
                res.json({message:"Maalesef işlem başarısız oldu"});
            }
            else{
                if(data[0].tc==req.body.tc &&
                    data[0].ad==req.body.name &&
                    data[0].soyad==req.body.surname &&
                    data[0].dogum_tarihi==req.body.borndate){
                    const token = jwt.sign({ userId: data[0].tc }, secretKey, { expiresIn: '1h' });
                    if(data[0].guvenlik==1){
                        mailauth(data[0].e_mail, token, "ogrenci");
                    }else{
                        res.json({
                            oturumTipi:"ogrenci",
                            token: token
                        });
                    }
            }else{
                    res.json({message:"Hatalı bir giriş oldu, lütfen tüm bilgilerin doğrulundan emin olun!"});
                }
            break;
        }
        }
    }
});

router.get("/anasayfa",(req,res)=>{
    
})

router.get("/auth/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/html/auth_control.html"))
})
router.post("/authcontrol/:q",(req,res)=>{
    const token = req.params.q;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.json({error:"Başarısız"})
        }else {
            res.json({message:"Başarılı"})
        }
      });
})

router.get("/*",(req,res)=>{
    res.send("hata!")
})

module.exports = router;

/*
router.get("/",(req,res)=>{
    
})
*/
async function dataKontrol(querySting){
    try{
        const data = await pool.query(querySting);
        let anahtarlar=Object.keys(data[0]);
        let degers=Object.values(data[0]);
        let obj = Object.fromEntries(degers.map((deger, index) => [anahtarlar[index], deger]));
        return obj;
    }catch{
        return { message : "Bir hata ile karşılaşıldı"}
    }
}
function mailauth(e_mail, token, tip){
    let mailOptions = {
        from: 'stajtakipotomasyon@gmail.com',
        to: e_mail,
        subject: 'Staj Takip Otomasyonu Giriş Talebi',
        html: `<h1 style="margin: 15px;">Tekrar Hoş Geldiniz!</h1>
                <span style="margin: 15px;">Bir giriş talebi aldık. Eğer siz değilseniz şifrenizi güncelleyin.</span>
                <a href="http://www.localhost:3000/auth/?q=${token}&t=${tip}" target="_blank"><button>Giriş Yap</button></a>`};
    mailer.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
    });
}