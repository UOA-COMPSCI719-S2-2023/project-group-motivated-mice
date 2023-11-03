window.addEventListener("load", function () {
  const form = document.querySelector("#form");
  const uploadForm = document.querySelector("#uploadImage");

  form.addEventListener("submit", uploadImages);
  uploadForm.addEventListener("change", previewFiles);

  function uploadImages() {
    let imageNameForm = document.querySelector('#imageNames');
    let imageDataForm = document.querySelector('#imageData');

    const imageNameArray = Object.keys(sessionStorage);
    const imageDataArray = Object.values(sessionStorage);

    imageNameForm.value = imageNameArray;
    imageDataForm.value = imageDataArray;
  }

  function previewFiles() {
    const files = document.querySelector("input[type=file]").files;
    if (files) {
      Array.prototype.forEach.call(files, readAndPreview);
    }
    uploadImages();
  }

  function readAndPreview(file) {
    // Make sure `file.name` matches our extensions criteria
    const reader = new FileReader();
    const fileName = file.name;
    const extension = fileName.split('.').pop();

    if (extension === "jpg") {
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);

      return;
    } else if (extension === "png") {
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);

      return;
    } else if (extension === "jpeg") {
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);

      return;
    } else if (extension === "bmp") {
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);

    } else {
      console.log("Extension not valid");
      return;
    }
  }

  function loadAfterEvent(file, reader) {
    reader.addEventListener(
      "load",
      () => {
        let currentimages = sessionStorage.getItem("images")

        const image = new Image();
        image.height = 300;
        image.title = file.name;
        image.src = reader.result;
        let imageDetail = {
          "imageName": image.title,
          "imageData": reader.result
        };
        if (currentimages == null) {
          currentimages = [];
          currentimages.push(imageDetail);
          let currentarray = JSON.stringify(currentimages);
          sessionStorage.setItem("images", currentarray);
          listTheImages(file, image);
        } else {
          let currentParse = JSON.parse(currentimages);
          currentParse.push(imageDetail);
          let currentarray = JSON.stringify(currentParse);
          sessionStorage.setItem("images", currentarray);
          listTheImages(file, image);
        }

      },
      false,
    );
  }

  function listTheImages(file, image) {
    const preview = document.querySelector("#preview");
    const selection = document.createElement("input");
    const label = document.createElement("label")

    selection.setAttribute("type", "radio");
    selection.id = file.name;
    selection.setAttribute("name", "thumbnail");
    selection.setAttribute("value", file.name);

    label.setAttribute("for", selection.id);

    label.appendChild(image);
    preview.appendChild(selection);
    preview.appendChild(label);
    const br = document.querySelector("br");
    preview.appendChild(br);
  }


});