window.addEventListener("load", function () {
checkUserLoggedIn()
async function checkUserLoggedIn(req,res) {
const response = document.cookie;
console.log(response);
if (response){
    const loggedIn = "yes"
}

}

});