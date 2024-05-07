// const express = require("express");
// const qrcode = require("qrcode");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5001;

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.post("/scan", (req, res) => {
//   let text = req.body.text;
//   console.log("Image src", text);

//   qrcode.toDataURL(text, (err, src) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       // console.log("src", src);
//       // res.send({ data: `Image data ${src}`, message: "Image created" });
//         res.render("scan", {
//           qr_code: src,
//         });
//     }
//   });
//   qrcode.toFile(
//     "C:/Users/shiv/Desktop/WEB DEV BACKEND PROJECTS/qr code generator/frontend/src/sample1.png",
//     text,
//     (err) => {
//       if (err) {
//         console.log(err.message);
//       }
//     }
//   );
// });

// app.post("/download", (req, res) => {

//   res.download("qr.png");
// });

// app.listen(PORT, console.log(`Server running on port ${PORT}`));

const express = require("express");
const qrcode = require("qrcode");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cors = require("cors");
const fs = require("fs"); // Import the 'fs' module for file operations
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  let text = req.body.text;

  qrcode.toDataURL(text, (err, src) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("scan", {
        qr_code: src,
      });
      // Save the QR code image to the file system
      qrcode.toFile(
        "./sample1.png", // Change the file path to the correct location
        text,
        (err) => {
          if (err) {
            console.log(err.message);
          }
        }
      );
    }
  });
});

app.post("/download", (req, res) => {
  // Send the file for download
  res.download("./sample1.png", "qr.png", (err) => {
    if (err) {
      console.log(err.message);
      res.status(404).send("File not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
