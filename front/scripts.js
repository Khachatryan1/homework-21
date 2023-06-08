const url = `http://localhost:3000/users`;
const data = getUsers();

const name = document.getElementById('name');
const surname = document.getElementById('surname');
const age = document.getElementById('age');
const email = document.getElementById('email');

data.then(users => {
    displayUsers(users);
})


function main () {
    addUserDB();
    data.then(users => {
        displayUsers(users);
    })
}

function displayUsers (userArr) {
    const userList = document.getElementById('right-main');
    userList.innerHTML = '';

    userArr.map((user, index) => {
        return (userList.innerHTML += `<div class="right-main-items">
                <p class="for-position-id">${index + 1}</p>
                <p>${user.name}</p>
                <p>${user.surname}</p>
                <p>${user.age}</p>
                <p>${user.email[0].toUpperCase()}..@gmail</p>
                <button class="delete" onclick="deleteUser('${user.id}')">Delete</button>
                <button class="edit" onclick="editUser('${user.id}')">Edit</button>
            </div>`);
    })
}
 
function addUserDB() {
    const user = createUser();
    createUserRequest(user);
}

function createUser() {
    const user = {
        name: name.value.replace(name.value[0], 
              name.value[0].toUpperCase()),
        surname: surname.value.replace(surname.value[0], 
                 surname.value[0].toUpperCase()),
        age: age.value,
        email: email.value
    };
    return user;
}

async function createUserRequest(user) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
}

async function getUsers() {
    const req = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await req.json();
}


async function deleteUser(id) {
    await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    data.then(users => {
        displayUsers(users);
    })
}




  
function checkEmptyField(inputElement, selector) {
    const errorMessage = inputElement.parentNode.querySelector(selector);
    let isValid = false;

    if (inputElement.value.trim() === '') {
        errorMessage.textContent = "Must be filled.";
        isValid = false;
    } else {
        isValid = true;
        errorMessage.textContent = '';
    }
    return isValid;
}

 









