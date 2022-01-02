let login = document.getElementById('login');



login.addEventListener("click", displayDetails);

let row = 1;

function displayDetails() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let table = document.getElementById('table');
    let newRow = table.insertRow(row);
    let Cell1 = newRow.insertCell(0);
    let Cell2 = newRow.insertCell(1);
    let Cell3 = newRow.insertCell(2);


    Cell1.innerHTML = username;
    Cell2.innerHTML = password;

    
    
    row++;

}

