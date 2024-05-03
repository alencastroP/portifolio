function sendPOST() {
    event.preventDefault()
    var newDeal = {
        "Title": document.getElementById("title").value,
        "ContactName": document.getElementById("name").value,
        //"ContactEmail": document.getElementById("email").value,
        "StageId": "60003783",
    };

    fetch('https://public-api2.ploomes.com/Deals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Key': '2F970D8DFC6285B92FEAEE5B3910FD246DC4D0AA1CC23B9C5A5EA4E113F43C1B142691868C7401AE9C7507241CF4CEE9A3D72EA9AE11584DD72FC4C910926A87'
        },
        body: JSON.stringify(newDeal)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao criar o negócio no Ploomes.');
        }
        return response.json();
    })
    .then(data => {
        alert('Negócio criado com sucesso:', data);
    })
    .catch(error => {
        alert('Erro:', error);
    });
    document.getElementById("meuFormulario").reset();
}