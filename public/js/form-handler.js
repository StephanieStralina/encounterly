let index = 0;

function addAbility() { 
    index++;
    const container = document.getElementById('abilities-container'); 
    const nameField = `<label for="abilities-name">Name:</label> <input type="text" name="details.abilities[${index}].name" id="abilities-name" />`; 
    const descriptionField = `<label for="abilities-description">Description:</label> <input type="text" name="details.abilities[${index}].description" id="abilities-description" />`; 
    container.innerHTML += nameField + descriptionField; 
}