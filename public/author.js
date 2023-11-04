window.addEventListener("load", function () {
    addeventlisteners();
       
        function addeventlisteners(){
          document.querySelectorAll('.authorlistitems').forEach(item => {
              item.addEventListener('click', event => {
                fetchAndDisplaySelectedAuthor(item.id)
    
              })
            })
      }
    
      async function fetchAndDisplaySelectedAuthor(AuthorID,res) {
        const response = await fetch(`./api/author/${AuthorID}`); 
        const AuthorSelected = await response.json();
        displaySelectedAuthor(AuthorSelected);
      }
      
      async function displaySelectedAuthor(AuthorSelected,res){
        const response =  await fetch(`./api/author/articles/${AuthorSelected.AccountID}`);
        const articles = await response.json();
        const selectedName = document.getElementById("selectedName");
        const selectedDescription = document.getElementById("selectedDescription");
        const likes = document.getElementById("likes")
    
        const articlesbyauthorlist = document.getElementById("articlesbyauthorlist")
        const articlesforauthortitle = document.getElementById("articlesforauthortitle")
    
        selectedName.innerHTML = "About "+AuthorSelected.FirstName;
        selectedDescription.innerHTML = AuthorSelected.About;
        likes.innerHTML = "Likes count: "+AuthorSelected.Likes;
       
        
        articlesbyauthortitle.innerHTML = "Articles by "+ AuthorSelected.FirstName;
        articlesbyauthorlist.innerHTML = null;
        articles.forEach(function(arrayItem){
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(arrayItem.Title));
        li.setAttribute("id", arrayItem.ArticleID);
        articlesbyauthorlist.appendChild(li);
        });
    
      }
    
    
    });