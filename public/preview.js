window.addEventListener("load", function () {
  const form = document.querySelector("#form");
  const uploadForm = document.querySelector("#uploadImage");

  form.addEventListener("submit", uploadImages);
  uploadForm.addEventListener("change", previewFiles);

  function uploadImages() {
    
  }

  function previewFiles() {
    const files = document.querySelector("input[type=file]").files;
    if (files) {
      Array.prototype.forEach.call(files, readAndPreview);
    }
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
        const image = new Image();
        image.height = 300;
        image.title = file.name;
        image.src = reader.result;
        sessionStorage.setItem(image.title, reader.result);
        listTheImages(file, image);
        
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