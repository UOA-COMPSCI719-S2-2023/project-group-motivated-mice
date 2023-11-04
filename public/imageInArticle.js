window.addEventListener("load", function () {
    let articleIdDiv = document.querySelector("#images");
    const articleId = articleIdDiv.dataset.author;
    let images = document.querySelectorAll(".images");
    images.forEach(function(image){
        let imageURL = image.dataset.imageurl;
        image.src = `/images/${articleId}/${imageURL}`
    });

})