const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// POST route pdf generation and fettching of data

app.post('/create-pdf', (req,res)=>{
    pdf.create(pdfTemplate(req.body),{}).toFile('Result.pdf',(err)=>{
        if (err){
            res.send(Promise.reject()) ;
        }

         res.send(Promise.resolve());
    })
})

// GET - Send generated pdf to client

app.get('/fetch-pdf', (req,res)=>{
    res.sendFile(`${__dirname}/Result.pdf`)
})

app.listen(port, ()=> console.log('Listeing on port ${port}'));