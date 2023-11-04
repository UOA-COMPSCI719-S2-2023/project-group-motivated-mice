const express = require("express");
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json({}));

// router.get("/sendEdit",  upload.array("imageFile"), async function (req, res) {
//     //userId
//     const userId = 2;
//     const images = req.files;
//     const firstImage = images[0];
  
//     uploadImage.linkImageToArticle(images, userId, firstImage);
//     const title = req.body.title;
    
//     // await uploadImage.linkImageToArticle(imageData, userId);
//     const content = req.body.article;
//     await postArticle.createPost(userId, content, title);
//     res.locals.title = title;
//     res.locals.articleEntry = true;
//     res.locals.content = content;
  
//     const message = `Content Uploaded!`;
  
//     res.setToastMessage(message);
//     res.render("article");
//   });
  module.exports = router;