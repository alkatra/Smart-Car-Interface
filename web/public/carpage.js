const API_URL = 'http://localhost:5000/api';
var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

var user_id = 0;
var car_id = 0;

class currentUserClass {
    constructor(username, rooms, cars) {
        this.username = username;
        this.rooms = rooms;
        this.cars = cars;
    } 
}

function removeError() {
    document.getElementById('add-error').innerHTML = ``
}

function addError() {
    document.getElementById('add-error').innerHTML = `<div class='alert alert-danger' role='alert'><button class="btn btn-danger" onclick="removeError()"> X </button> Limit reached.</div>`
}

function addCarName() {
    document.getElementById('spacer').innerHTML = `<br/><br/><h1><center>${currentUser.cars[car_id].carName}</h1></center>`;
}

$.get(`${API_URL}/users`).then(response => {
    response.forEach(users => {
        if(users.username == curUser) {
            currentUser = new currentUserClass(users.username, users.rooms, users.cars);
            addTemp();
            addCarName();
            adjustSeat();
        }
    });
})
 
function addTemp() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    car_id = url.searchParams.get("id");
    document.getElementById('add-temp').innerHTML = `${currentUser.cars[car_id].climSetting}`;
}

function adjustSeat() {
    document.getElementById("seat-div").style.transform = `translate(${currentUser.cars[car_id].seatSetting}px)`;
}

$('#seat-decrease').on('click', () => {
    if(currentUser.cars[car_id].seatSetting > -100) {
        handleSeat(false);
        adjustSeat();
    }
    else {
        addError();
    }
    if(urrentUser.cars[car_id].seatSetting == 100) {
        removeError();
    }
})

$('#seat-increase').on('click', () => {
    if(currentUser.cars[car_id].seatSetting < 100) {
        handleSeat(true);
        adjustSeat();
    }
    else {
        addError();
    }
    if(urrentUser.cars[car_id].seatSetting == -100) {
        removeError();
    }
})

$('#temp-increase').on('click', () => {
    if(currentUser.cars[car_id].climSetting < 32) {
        handleTemp(true);
        addTemp();
    }
    else {
        addError();
    }
    if(currentUser.cars[car_id].climSetting == 16) {
        removeError();
    }
})

$('#temp-decrease').on('click', () => {
    if(currentUser.cars[car_id].climSetting > 15) {
        handleTemp(false);
        addTemp();
    }
    else {
        addError();
    }
    if(currentUser.cars[car_id].climSetting == 31) {
        removeError();
    }
    
})

function handleTemp(boolValue) {
    if(boolValue) {
        currentUser.cars[car_id].climSetting++;
    }
    else {
        currentUser.cars[car_id].climSetting--;
    }
    const carName_ = currentUser.cars[car_id].carName;
    const username_ = currentUser.username;
    const newtemp = currentUser.cars[car_id].climSetting;
    const body = {carName_, username_, newtemp};
    
    $.post(`${API_URL}/users/update/temp`, body).then(response => {
      })
      .catch(error => {
        console.error(`Error: ${error}`);
    });
}

function handleSeat(boolValue) {
    if(boolValue) {
        currentUser.cars[car_id].seatSetting += 10;
    }
    else {
        currentUser.cars[car_id].seatSetting -= 10;
    }
    const carName_ = currentUser.cars[car_id].carName;
    const username_ = currentUser.username;
    const newsetting = currentUser.cars[car_id].seatSetting;
    const body = {carName_, username_, newsetting};
    $.post(`${API_URL}/users/update/seat`, body).then(response => {
    })
    .catch(error => {
      console.error(`Error: ${error}`);
  });
}