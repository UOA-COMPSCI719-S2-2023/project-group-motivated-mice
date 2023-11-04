window.addEventListener("load", function () {
  const buttons = document.querySelectorAll("button");

  buttons.forEach(async function (button) {
    button.addEventListener("click", await fetchArticlePage)
  })

  async function fetchArticlePage(event) {
    let elementName = event.target.nodeName;
    if (elementName == "BUTTON") {
      let articleID = event.target.dataset.article;
      console.log("🚀 ~ file: galleryMenu.js:12 ~ fetchArticlePage ~ articleID:", articleID)
      await fetch(`./entry/${articleID}`);
    } else {
      elementName = event.target.parentElement;
      let articleID = event.target.dataset.article;
      console.log("🚀 ~ file: galleryMenu.js:16 ~ fetchArticlePage ~ articleID:", articleID)
      await fetch(`./entry/${articleID}`);
    }
  }


});