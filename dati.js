document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.button'); // Select all filter buttons
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to the clicked button
            this.classList.add('active');
            
            // Load data based on button's data-type attribute
            const dataType = this.getAttribute('data-type');
            loadData(dataType);
        });
    });

    loadData('both'); // Load both vielas.json and inventars.json by default
});

function loadData(type) {
    let promises = [];
    switch (type) {
        case 'both':
            promises = [fetch('vielas.json'), fetch('inventars.json')];
            break;
        case 'vielas':
            promises = [fetch('vielas.json')];
            break;
        case 'inventars':
            promises = [fetch('inventars.json')];
            break;
    }

    Promise.all(promises)
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(results => {
            const allData = results.flat(); // Combine data from all fetched files
            updateTable(allData);
        })
        .catch(error => console.error('Error loading data:', error));
}

function updateTable(data) {
    const table = document.querySelector('.table');
    table.innerHTML = `<tr>
        <th>ID</th>
        <th>Nosaukums</th>
        <th>Tips</th>
        <th>Apakštips</th>
        <th>Skaits</th>
        <th>Daudzums</th>
        <th>Mērvienības</th>
        <th>Komentāri</th>
    </tr>`; // Reset the table header

    data.forEach(item => {
        const row = `<tr>
            <td>${item.id}</td>
            <td>${item.nosaukums}</td>
            <td>${item.tips}</td>
            <td>${item.apakstips}</td>
            <td>${item.skaits}</td>
            <td>${item.daudzums || ' '}</td>
            <td>${item.mervienibas || ' '}</td>
            <td>${item.komentari}</td>
        </tr>`;
        table.innerHTML += row; // Append each row to the table
    });
}