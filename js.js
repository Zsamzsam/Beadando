const endURL = "https://retoolapi.dev/zHB073/data";

async function getData() {
    const response = await fetch(endURL); // Teljes HTTP válasz
    const data = await response.json(); // csak a válasz JSON -re
    console.log(data);
    return data;
}

function displayData(data) {
    const userList = document.getElementById('user_list');

    data.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('col-md-4');

        const userCard = document.createElement('div');
        userCard.classList.add('card');
        userDiv.appendChild(userCard);

        const userHeader = document.createElement('div');
        userHeader.classList.add('card-header');
        userCard.appendChild(userHeader);

        const userName = document.createElement('h2');
        userName.textContent = user.Name;
        userHeader.appendChild(userName);

        const userBody = document.createElement('div');
        userBody.classList.add('card-body');
        userCard.appendChild(userBody);

        const userBirthdate = document.createElement('p');
        userBirthdate.textContent = user.Birthdate;
        userBody.appendChild(userBirthdate);

        const userEmail = document.createElement('p');
        userEmail.textContent = user.Email;
        userBody.appendChild(userEmail);

        const userPhone = document.createElement('p');
        userPhone.textContent = user['Phone Number'];
        userBody.appendChild(userPhone);

        const userFooter = document.createElement('div');
        userFooter.classList.add('card-footer');
        userCard.appendChild(userFooter);

        const userModify = document.createElement('button');
        userModify.textContent = 'Modify';
        userModify.classList.add('btn', 'btn-warning');
        userModify.addEventListener('click', function () {
            
        });
        userFooter.appendChild(userModify);

        const userDelete = document.createElement('button');
        userDelete.textContent = 'Delete';
        userDelete.classList.add('btn', 'btn-danger');
        userDelete.style.marginLeft = '10px';
        userDelete.addEventListener('click', function () {
            userDiv.remove();
        });
        userFooter.appendChild(userDelete);

        userList.appendChild(userDiv);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function () {
        const inputData = {
            Name: document.getElementById('name').value,
            Email: document.getElementById('email').value,
            'Phone Number': document.getElementById('phone').value,
            Birthdate: document.getElementById('birth_date').value
        };



        fetch(endURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: inputData })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data successfully pushed:', data);
                // Optionally, you can update the displayed data by calling getData() and displayData() again
            })
            .catch(error => {
                console.error('Error pushing data:', error);
            });
    });

    getData().then(data => displayData(data));
});