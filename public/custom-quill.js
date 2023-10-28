window.addEventListener("load", function () {
    console.log("the page is loaded;")
    var container = document.querySelector("#editor");
    var container = document.querySelector("#toolbar");

    var toolbarOptions = [
        { size: [ 'small', false, 'large', 'huge' ]}
      ];
    var options = {
        placeholder: 'Compose an epic...',
       
        theme: 'snow'
    };
    var editor = new Quill(container, options);
});
