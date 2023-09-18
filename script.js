const textFilter = document.getElementById('filter-input');
const genderFilter = document.getElementById('gender-filter');
const birthdayFilter = document.getElementById('birthday-filter');
const filterBtn = document.getElementById('filter-btn');
const spinner = document.getElementById('loader');
const usersTable = document.getElementById('user-table');
const usersData = document.getElementById('user-data');
const apiUrl = 'https://fakerapi.it/api/v1/persons?_quantity=100&_gender=female&_birthday_start=2005-01-01';
let customers = [];

function showSpinner() {
    spinner.style.display = 'block';
}

function hideSpinner() {
    spinner.style.display = 'none';
}

function getList() {
    showSpinner();
    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            customers = data.data;
            addList(customers);
        })
        .catch((error) => alert('Error fetching data: ' + error))
        .finally(() => hideSpinner());
}

function addList(users) {
    users.forEach((user) => {
        const row = document.createElement('tr');
        const customerBirthday = formatBirthday(user.birthday);
        row.innerHTML = `
        <td><img src="${user.image}" alt="avatar"></td>
        <td>${user.firstname + ' ' + user.lastname} </td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address.streetName + ' st, ' + user.address.city}</td>
        <td>${user.gender}</td>
        <td>${customerBirthday}</td>
        `;
        usersData.appendChild(row);
    });
}

function formatBirthday(birthday) {
    const parts = birthday.split('-');
    if (parts.length === 3) {
        const [year, month, day] = parts;
        return `${day}-${month}-${year}`;
    }
    return birthday;
}

function filterCustomers() {
    const textFilterValue = textFilter.value.toLowerCase();
    const genderFilterValue = genderFilter.value;
    const birthdayValue = new Date(birthdayFilter.value);

    const filteredUsers = customers.filter((customer) => {
        const fullName = `${customer.firstname} ${customer.lastname}`.toLowerCase();
        const email = customer.email.toLowerCase();
        const phone = customer.phone.toLowerCase();
        const customerBirthday = new Date(customer.birthday);

        const textMatch =
            fullName.includes(textFilterValue) ||
            email.includes(textFilterValue) ||
            phone.includes(textFilterValue);
        
        const genderMatch =
            !genderFilterValue ||
            customer.gender.toLowerCase() === genderFilterValue;
            

        const birthdayMatch =
            !birthdayFilter.value ||
            customerBirthday.getDate() === birthdayValue.getDate() &&
            customerBirthday.getMonth() === birthdayValue.getMonth() &&
            customerBirthday.getFullYear() === birthdayValue.getFullYear();
        
        return textMatch && genderMatch && birthdayMatch;
       
    });

    usersData.innerHTML = '';
    if (filteredUsers.length === 0) {
        const alertDiv = document.getElementById('alert');
        alertDiv.textContent = 'No Matches';
    }
    addList(filteredUsers);
    
}

document.addEventListener('DOMContentLoaded', getList);
filterBtn.addEventListener('click', filterCustomers);
textFilter.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        filterCustomers();
    }
});
