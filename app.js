// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const sendGrid = require('@sendgrid/mail');


// const app = express();


// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "client/build")));

// app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Change later to only allow our server
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });


// app.get('/api', (req, res, next) => {
//     res.send('API Status: I\'m awesome')
// });
// app.post('/api/email', (req, res, next) => {

//     //console.log(req.body);

//     sendGrid.setApiKey('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');
//     const msg = {
//         to: 'dhwaniljames@gmail.com',
//         from: req.body.email,
//         subject: 'Website Contact',
//         text: req.body.message
//     }

//     sendGrid.send(msg)
//         .then(result => {

//             res.status(200).json({
//                 success: true
//             });

//         })
//         .catch(err => {

//             console.log('error: ', err);
//             res.status(401).json({
//                 success: false
//             });

//         });
// });


// app.listen(3030, '0.0.0.0');

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// })
const path = require('path');
const express = require("express");
const app = express();
const port = 3030;
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/build')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change later to only allow our server
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.get("/api", (req, res) => res.send("Hello World!"));
// POST route from contact form
app.post("/api/email", (req, res) => {
  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "dhwaniljames@gmail.com",
      pass: "Barkha12!@",
    },
  });

  // Specify what the email will look like
  const mailOpts = {
    from: "Your sender info here", // This is ignored by Gmail
    to: "dhwaniljames@gmail.com",
    subject: "New message from portfolio site",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
  };

  // Attempt to send the email
  smtpTrans
    .sendMail(mailOpts)
    .then((result) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log("error: ", err);
      res.status(401).json({
        success: false,
      });
    });
});
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
