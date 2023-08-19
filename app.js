const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const routes = require(path.join(__dirname,"./js/route.js"));

app.use(express.static(path.join(__dirname,"./public")))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(port,()=>{
    console.log(`Sunucu http://localhost:${port} üzerinde dinleniyor`);
});