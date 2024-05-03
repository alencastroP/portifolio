function POSTContacts() {
    event.preventDefault();
    var novoCliente = {
        "Name": document.getElementById("name").value,
        "Email": document.getElementById("email").value,
    };

    fetch('https://api2.ploomes.com/Contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Key': '2F970D8DFC6285B92FEAEE5B3910FD246DC4D0AA1CC23B9C5A5EA4E113F43C1B142691868C7401AE9C7507241CF4CEE9A3D72EA9AE11584DD72FC4C910926A87'
        },
        body: JSON.stringify(novoCliente)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao criar o cliente no Ploomes.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Cliente criado com sucesso:', data);
        const clienteName = novoCliente.Name;
        getContactAndCreateDeal(clienteName);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

async function getContactAndCreateDeal(clienteName) {
    try {
        const response = await fetch(`https://api2.ploomes.com/Contacts?$select=Id&$filter=Name+eq+'${clienteName}'`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Key': '2F970D8DFC6285B92FEAEE5B3910FD246DC4D0AA1CC23B9C5A5EA4E113F43C1B142691868C7401AE9C7507241CF4CEE9A3D72EA9AE11584DD72FC4C910926A87'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter o ID do cliente.');
        }

        const responseData = await response.json();
        console.log('Dados do cliente:', responseData);
        if (responseData.length === 0) {
            throw new Error('Cliente não encontrado.');
        }
        
        const clienteId = responseData.value[0].Id;

        await POSTDeals(clienteId);
    } catch (error) {
        console.error('Erro:', error);
    }
}

function POSTDeals(contactId) {
    let newDeal = {
        "Title": document.getElementById("title").value,
        "ContactId": contactId,
        "StageId": "60003783",

        "OtherProperties": [
            {
                "FieldKey": "deal_01810D38-D73B-4CAC-9748-747B1166B707",
                "BigStringValue": document.getElementById("description").value,
            },
        ]
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
        alert('Formulário enviado com sucesso :)', data);
    })
    .catch(error => {
        alert('Erro:', error);
    });
    document.getElementById("form").reset();
}