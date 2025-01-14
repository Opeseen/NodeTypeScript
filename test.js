// import express, {Express, request, Request, Response} from 'express';
import {
    PutObjectCommand,
    S3Client,
    S3ServiceException,
  } from "@aws-sdk/client-s3";
  
  const client = new S3Client({})
  
  // const express = require('express')
  import express from 'express';
  // import path from 'path';
  // const path = require('path')
  import path from 'path';
  // const multer = require('multer');
  import multer from 'multer';
  
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/upload')
    },
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split('/')[1];
      cb(null, `user-${Date.now()}.${fileExtension}`);
    }
  });
  
  const storage = multer.memoryStorage()
  
  const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
      cb(null, true)
    }else{
      cb(null, false)
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  })
  
  const port = 3000;
  // const app: Express = express();
  const app = express()
  
  app.get('/', (req, res) => {
    res.send('Hello World');
  });
  
  app.post('/uploadPhoto', upload.single('photo'), async (req, res, next) => {
    const fileExt = path.extname(req.file.originalname);
    const input = {
      Bucket: 'vcb-static-files',
      Key: `vcb-upload/user-${Date.now()}${fileExt}`,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }
  
    const command = new PutObjectCommand(input);
    try {
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.log(err);
  
    }
      // console.log(req.file)
    // console.log(req.body)
    res.send('Done')
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  