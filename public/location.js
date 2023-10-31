window.addEventListener("load", function () {
   
   addeventlisteners()
   
    function addeventlisteners(){
      document.querySelectorAll('.locationlistitems').forEach(item => {
          item.addEventListener('click', event => {
            console.log("event listener added")

          })
        })
  }

});