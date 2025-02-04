async function adduser(event) {
    event.preventDefault(); // Prevent default form submission
    console.log("Reached.....");

    let username = document.getElementById('username').value;
    console.log("name :", username);

    let email = document.getElementById('email').value;
    console.log("email :", email);
    
    let isValid = true;
    let nameRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z]+)*$/;
    
    let nameerror = document.getElementById('nameerr');
    if (!username) {
        isValid = false;
        nameerror.innerHTML = 'Name is required';
    } else if (!nameRegex.test(username)) {
        nameerror.innerHTML = 'Invalid name';
        isValid = false;
    } else {
        nameerror.innerHTML = ''; // Clear error message if valid
    }

    let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]{3,}$/;
    let emailerror = document.getElementById('emailerr');
    if (!email) {
        isValid = false;
        emailerror.innerHTML = 'Email is required';
    } else if (!emailRegex.test(email)) {
        emailerror.innerHTML = 'Invalid email';
        isValid = false;
    } else {
        emailerror.innerHTML = ''; // Clear error message if valid
    }

    if (!isValid) {
        alert('Please correct the errors in the form.');
        return; // Exit the function to prevent form submission
    }

    // Proceed with form submission if validation is successful
    let datas = {
        username,
        email,
    };
    console.log(datas);

    let json_data = JSON.stringify(datas);
    console.log("json_data", json_data);

    try {
        let response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: json_data,
        });

        console.log("response", response);

        let parsed_response = await response.text();
        console.log("parsed_response", parsed_response);
        
        if (parsed_response) {
            alert(parsed_response);
        } else {
            alert("Something went wrong");
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        alert("An error occurred while submitting the form.");
    }
}



async function fetchData() {
    try {
        const response = await fetch('/submit', {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const tableBody = document.querySelector('#userTable tbody');
        tableBody.innerHTML = ''; // Clear existing content

        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="hov"><i class='fas fa-user-alt' style='font-size:36px'></i></td>
                <td class="hov">${user._id}</td>
                <td class="hov">${user.name}</td>
                <td class="hov">${user.email}</td>
                <td><button class="custom-btn btn-16" data-id="${user._id}">view</button></td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners for the buttons
        document.querySelectorAll('#userTable button').forEach(button => {
            button.addEventListener('click', (event) => {
                const id = event.target.getAttribute('data-id');
                handleClick(id);
            });
        });

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function handleClick(id) {
    console.log("Handling click for ID:", id);
    window.location.href = `view.html?id=${id}`;
}

async function loadUserDatas() {
    console.log("Loading...");

    let querystring = window.location.search;
    let urlParams = new URLSearchParams(querystring);
    let id = urlParams.get("id");

    try {
        const response = await fetch(`/submits?id=${id}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let userData = await response.json();
        console.log(userData);

        document.getElementById('username').value = userData.name;
        document.getElementById('email').value = userData.email;

    } catch (error) {
        console.error('Fetch error:', error);
        alert("Failed to load user data");
    }
}

fetchData();
if (window.location.pathname.includes('view.html')) {
    loadUserDatas();
}
