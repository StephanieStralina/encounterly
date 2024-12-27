let index = 0;

function addAbility() { 
    index++; 
    const container = document.getElementById('abilities-container'); 

    const nameLabel = document.createElement('label'); 
    nameLabel.setAttribute('for', `abilities-name-${index}`); 
    nameLabel.textContent = 'Name:'; 

    const nameInput = document.createElement('input'); 
    nameInput.setAttribute('type', 'text'); 
    nameInput.setAttribute('name', `details.abilities[${index}].name`); 
    nameInput.setAttribute('id', `abilities-name-${index}`); 
    
    const descriptionLabel = document.createElement('label'); 
    descriptionLabel.setAttribute('for', `abilities-description-${index}`); 
    descriptionLabel.textContent = 'Description:'; 
    
    const descriptionInput = document.createElement('input'); 
    descriptionInput.setAttribute('type', 'text'); 
    descriptionInput.setAttribute('name', `details.abilities[${index}].description`); 
    descriptionInput.setAttribute('id', `abilities-description-${index}`); 
    
    container.appendChild(nameLabel); 
    container.appendChild(nameInput); 
    container.appendChild(descriptionLabel); 
    container.appendChild(descriptionInput);
}