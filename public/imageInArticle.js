window.addEventListener("load", function () {
    let articleIdDiv = document.querySelector("#images");
    const articleId = articleIdDiv.dataset.article;
    console.log("🚀 ~ file: imageInArticle.js:4 ~ articleId:", articleId);
    let images = document.querySelectorAll(".images");
    images.forEach(function(image){
        let imageURL = image.dataset.article;
        image.src = `/images/${articleId}/${imageURL}`
    });

})