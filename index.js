document.addEventListener("DOMContentLoaded", function (){
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    const btn = document.getElementById('add');

    function addTodo () {
        if (title.value === "" || description.value === "") {
            // alert.classList.remove("d-none");
            // alert.innerText = "Title and desc required";
            showPopup("Warning", "Title and desc required");
            return;
        }
        
        alert.classList.add("d-none");
    const row = table.insertRow();
    row.innerHTML = `
    <td>${title.value}</td> 
    <td>${description.value}</td>
    <td class="text-center">
        <input type="checkbox">
    </td>
    <td class="text-right">
        <button class="btn btn-primary mb-1">
            <i class="fa fa-pencil"></i>
        </button>
        <button class="btn btn-danger mb-1 ml-1">
            <i class="fa fa-trash"></i>
        </button>
    </td>
    `;
    
    }

    btn.onclick = addTodo;
});


let currentPopup = null;

// Callable function for different situations, such as warnings
function showPopup(title, message) {
    if (currentPopup) {
        currentPopup.remove(); 
    }

    // fetch the component
    fetch('./components/popup.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            
            currentPopup = document.querySelector('.popup-overlay');

            const popupTitle = currentPopup.querySelector('#popup-title');
            const popupMessage = currentPopup.querySelector('#popup-message');
            
            // Set the title n message
            if (popupTitle) popupTitle.textContent = title;
            if (popupMessage) popupMessage.textContent = message;

            const closeBtn = currentPopup.querySelector('.close-btn');
            closeBtn.addEventListener('click', closePopup);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Popup function to close it
function closePopup() {
    if (currentPopup) {
        currentPopup.remove();
        currentPopup = null;
    }
}

