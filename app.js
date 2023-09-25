const multer = require("multer");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

function parseBase64Image(imageString) {
  const matches = imageString.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
  if (matches.length !== 3) {
    throw new Error("Invalid base64 image format");
  }

  return {
    type: matches[1],
    data: Buffer.from(matches[2], "base64"),
  };
}
app.post("/upload", (req, res) => {
  console.log(req.body);
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: "No image file provided" });
  }

  try {
    // Parse the base64 image string
    const parsedImage = parseBase64Image(image);

    // Save the image data to a file using Multer
    const filename = Date.now() + "-image.png" ;
    const filepath = "public/images/" + filename;
    require("fs").writeFileSync(filepath, parsedImage.data);

    res.json({ message: "Image uploaded successfully", filename: filename });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.use("/images", express.static("public/images"));
app.get('/images/:id', (req, res) => {
  const imageId = req.params.id;

  // Assuming you have a way to map the image ID to its corresponding filename
  const filename = imageId
  if (!filename) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const imagePath = 'public/images/' + filename;
  res.sendFile(imagePath);
});
// Additional routes and server logic can be added here

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
