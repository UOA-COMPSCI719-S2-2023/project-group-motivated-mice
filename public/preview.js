window.addEventListener("load", function () {


  function previewFiles() {
    const files = document.querySelector("input[type=file]").files;
    if (files) {
      Array.prototype.forEach.call(files, readAndPreview);
    }
    const result =  sessionStorage.getItem("gallery");
    
  }

  function saveInLocalstorage(reader){
    sessionStorage.setItem("gallery", reader.result);
    console.log("result is " + reader.result);
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
    }else if(extension === "bmp"){
      loadAfterEvent(file, reader);
      reader.readAsDataURL(file);

    }else {
      console.log("Extension not valid");
      return;
    }

  }

  function loadAfterEvent(file, reader) {
    const preview = document.querySelector("#preview");
    reader.addEventListener(
      "load",
      () => {
        const image = new Image();
        image.height = 300;
        image.title = file.name;
        console.log(image.title);
        image.src = reader.result;
        preview.appendChild(image);
        saveInLocalstorage(reader);
      },
      false,
    );
    
  }
  const uploadForm = document.querySelector("#uploadImage");
  uploadForm.addEventListener("change", previewFiles);
});