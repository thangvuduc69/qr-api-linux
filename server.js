const express = require("express");
const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common.js");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const sharp = require("sharp");

const app = express();
const port = 3003;

app.use(express.json());

app.get("/generate", async (req, res) => {
  const { text } = req.query;

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: text || "https://example.com",
    image: "https://raw.githubusercontent.com/thangvuduc69/QR-Code/refs/heads/main/LOGO%20MEDIPHAR%20USA.png", 
    jsdom: JSDOM,
    nodeCanvas,
    qrOptions: {
    errorCorrectionLevel: "H" // <-- đây là thiết lập mức chống lỗi
    },
    dotsOptions: {
        color: "#000",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#ffffff"
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 0,
        imageSize: 0.6,
        saveAsBlob: true
},
  });


qrCode.getRawData("svg").then(async (svgBuffer) => {
  // const pngBuffer = await sharp(svgBuffer).png().toBuffer();
  // res.type('png');
  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=31536000"); // optional
  res.send(pngBuffer);

}).catch((err) => {
  console.error("Lỗi tạo QR SVG:", err);
  res.status(500).send("Lỗi khi tạo QR code");
});
});

app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server is running at http://0.0.0.0:${port}`);
});
