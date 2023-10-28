window.addEventListener("load", function () {
    console.log("the page is loaded;")
    var container = document.querySelector("#editor");
    var container = document.querySelector("#toolbar");

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent      
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['image'],

        ['clean']                                         // remove formatting button
      ];
      
    var options = {
        placeholder: 'Compose an epic...',
        formats: 'Image', 
        modules: {
            toolbar: toolbarOptions
          },
        theme: 'snow'
    };
    var editor = new Quill(container, options);
});
