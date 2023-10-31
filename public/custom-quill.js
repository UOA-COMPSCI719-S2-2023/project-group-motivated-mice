window.addEventListener("load", function () {
  const container = document.querySelector("#editor");
  const form = document.querySelector("#form")



  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent      
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['image'],

    ['clean']                                         // remove formatting button
  ];

  const options = {
    placeholder: 'Compose an epic...',
    formats: 'Image',
    modules: {
      toolbar: toolbarOptions
    },
    theme: 'snow'
  };
  const editor = new Quill(container, options);

  function getContent() {
    let article = document.querySelector('[data-article_id]');
    let justHTML = editor.root.innerHTML;
    article.value = justHTML;

  }

  form.addEventListener("submit", getContent);




});
