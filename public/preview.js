window.addEventListener("load", function () {


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

    if(extension ==="jpg"){
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);
      return;
    }else if(extension === "png"){
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);
      return;
    }else if(extension === "jpeg") {
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);
      return;
    }else {
      console.log("Extension not valid");
      return;
    }

  }

  function loadAfterEvent(file, reader) {
    const preview = document.querySelector("#preview");
    console.log("🚀 ~ file: preview.js:45 ~ loadAfterEvent ~ preview:", preview)
    reader.addEventListener(
      "load",
      () => {
        const image = new Image();
        image.height = 300;
        image.title = file.name;
        console.log(image.title);
        image.src = reader.result;
        preview.appendChild(image);
      },
      false,
    );
    
  }
  const uploadForm = document.querySelector("#uploadImage");
  uploadForm.addEventListener("change", previewFiles);
});