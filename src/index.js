import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from "@aws-sdk/client-s3";

import express from 'express';
import multer from 'multer';
import sharp from "sharp";

const port = 3000;
const app = express()
const client = new S3Client({})
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else{
    cb(new Error('Error Occurred'),false)
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

app.get('/', async (req, res) => {
  res.send("Hello World")
})

app.post('/uploadPhoto', upload.single('photo'), async (req, res, next) => {
  // Resizing Image
  const imageFileBuffer = await sharp(req.file.buffer)
  .resize(300, 300)
  .toFormat('jpeg')
  .jpeg({ quality: 90 })
  .toBuffer();

  console.log(req.body.name)
  const s3BucketName = 'vcb-static-files';
  const fileExtension = '.jpeg';
  const imageName = `user-${Date.now()}${fileExtension}`
  const s3BucketKey = `uploads/profile/${imageName}`;
  const region = 'us-east-1';
  
  const input = {
    Bucket: s3BucketName,
    Key: s3BucketKey,
    Body: imageFileBuffer,
    ContentType: req.file.mimetype,
  }

  const command = new PutObjectCommand(input);
  try {
    const response = await client.send(command);
    const s3ObjectURL = `https://${s3BucketName}.s3.${region}.amazonaws.com/${s3BucketKey}`;
    console.log(s3ObjectURL);
    console.log(response);
  } catch (err) {
    console.log(err);

  }
  res.send('Done')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

