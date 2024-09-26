const form = document.getElementById('updateForm');

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const documentId = '123'; 
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const updatedData = {
        title: title,
        content: content
    };

    try {
        const response = await fetch(`https://ditt-backend-api.azurewebsites.net/api/data/${documentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData) 
        });

        const result = await response.json();
        if (response.ok) {
            alert('Dokumentet har uppdaterats!');
        } else {
            alert('Fel vid uppdatering: ' + result.message);
        }
    } catch (error) {
        console.error('Error updating document:', error);
    }
});
function App(){

    return (
        <form id="updateForm">
            <label for="title">Titel</label>
            <input type="text" id="title" name="title" value="Dokumentets nuvarande titel" />

            <label for="content">Innehåll</label>
            <textarea id="content" name="content">Dokumentets nuvarande innehåll</textarea>

            <button type="submit">Spara ändringar</button>
        </form>
    )
}