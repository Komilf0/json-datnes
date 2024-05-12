document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-button').addEventListener('click', function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                const user = data.users.find(u => u.vards === username && u.parole === password);
                if (user) {
                    alert('Pieteikšanās veiksmīga!');
                    window.location.href = 'dati.html';
                } else {
                    alert('Nederīgi dati.');
                }
            })
            .catch(error => console.error('Kļūda, ielādējot lietotāja datus:', error));
    });
});