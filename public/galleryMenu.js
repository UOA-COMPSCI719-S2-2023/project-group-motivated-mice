window.addEventListener("load", function () {

    const buttons = document.querySelectorAll("button");

for (let index = 0; index < buttons.length; index++) {
    const element = buttons[index];
    element.addEventListener("click", handleButtonClick)
}

async function handleButtonClick(event){
    let elementName = event.target.nodeName;
    if (elementName == "BUTTON") {
      await updateDetails(dexNumber);
    } else {
      let elementName = event.target.parentElement;
      await updateDetails(dexNumber);
    }
}

async function updateDetails(numberSelected) {
    let pokemonData = await getDataFromButton(numberSelected);
    updateImage(pokemonData.imageUrl);
    updateName(pokemonData.name);
    updateDexNumber(pokemonData.dexNumber);
    updateType(pokemonData.types);
    updateEntry(pokemonData.dexEntry);
  }

});