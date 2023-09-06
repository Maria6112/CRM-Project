const spinner = document.getElementById('loader');
const usersTbl = document.getElementById('user-table');
const usersList = document.getElementById('user-data');
const apiURL = 'https://fakerapi.it/api/v1/persons?_quantity=20&_gender=male&_birthday_start=2005-01-01';

function showSpinner() {
    spinner.style.display = 'block';
}
function hideSpinner() {
    spinner.style.display = 'none';
}

function getList () {
    showSpinner();
    fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
            hideSpinner();
            addList(data.data);
        })
        .catch((error) => console.log('Error fetching data:', error));
}

function addList(users) {
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${users.image}" alt="avatar"></td>
        <td>${user.firstname + ' ' + user.lastname}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address.streetName + ' st`, ' + user.address.city}</td>
        <td>${user.gender}</td>
        <td>${user.birthday}</td>
        `;
        usersList.appendChild(row);
    });
}

getList();
document.addEventListener('DOMContentLoaded', addList);
