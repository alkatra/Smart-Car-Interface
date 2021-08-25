

const API_URL = 'http://localhost:5000/api';
var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

var user_id = 0;
var car_id = 0;
const SEAT_LIMIT = 60;
const TEMP_L_LIMIT = 15;
const TEMP_U_LIMIT = 32;

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
    document.getElementById('spacer').innerHTML = `<br/><br/><h1><center>${currentUser.username}'s ${currentUser.cars[car_id].carName}</h1></center>`;
}

$.get(`${API_URL}/users`).then(response => {
    response.forEach(users => {
        if(users.username == curUser) {
            currentUser = new currentUserClass(users.username, users.rooms, users.cars);
            addTemp();
            addCarName();
            adjustSeat();
            loadDirections();
            changebgcolor();
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
    if(currentUser.cars[car_id].seatSetting > -1 * SEAT_LIMIT) {
        handleSeat(false);
        adjustSeat();
    }
    else {
        addError();
    }
    if(currentUser.cars[car_id].seatSetting == SEAT_LIMIT - 10) {
        removeError();
    }
})

$('#seat-increase').on('click', () => {
    if(currentUser.cars[car_id].seatSetting < SEAT_LIMIT) {
        handleSeat(true);
        adjustSeat();
    }
    else {
        addError();
    }
    if(currentUser.cars[car_id].seatSetting == -1 * SEAT_LIMIT + 10) {
        removeError();
    }
})

$('#temp-increase').on('click', () => {
    if(currentUser.cars[car_id].climSetting < TEMP_U_LIMIT) {
        handleTemp(true);
        addTemp();
    }
    else {
        addError();
    }
    if(currentUser.cars[car_id].climSetting == TEMP_L_LIMIT + 1) {
        removeError();
    }
})

$('#temp-decrease').on('click', () => {
    if(currentUser.cars[car_id].climSetting > TEMP_L_LIMIT) {
        handleTemp(false);
        addTemp();
    }
    else {
        addError();
    }
    if(currentUser.cars[car_id].climSetting == TEMP_U_LIMIT - 1) {
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

    // FOLLOWING CODE IS TO PREVENT MONGO FROM SOMETIMES ADDING UNIT TO THE END INSTEAD OF ADDING NUMBER 
    // EXAMPLE 4 + 1 SOMETIMES GIVES 41
    if(currentUser.cars[car_id].climSetting > TEMP_U_LIMIT) {
        currentUser.cars[car_id].climSetting = TEMP_U_LIMIT;
        addTemp();
    }
    else if(currentUser.cars[car_id].climSetting < TEMP_L_LIMIT) {
        currentUser.cars[car_id].climSetting = -TEMP_U_LIMIT;
        addTemp();
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
        if(currentUser.cars[car_id].seatSetting + 10 > SEAT_LIMIT) {
            console.log("y");
        }
        currentUser.cars[car_id].seatSetting += 10;
    }
    else {
        currentUser.cars[car_id].seatSetting -= 10;
    }

    // FOLLOWING CODE IS TO PREVENT MONGO FROM SOMETIMES ADDING UNIT TO THE END INSTEAD OF ADDING NUMBER 
    // EXAMPLE 4 + 1 SOMETIMES GIVES 41
    if(currentUser.cars[car_id].seatSetting > SEAT_LIMIT) {
        currentUser.cars[car_id].seatSetting = SEAT_LIMIT;
        adjustSeat();
    }
    else if(currentUser.cars[car_id].seatSetting < -1 * SEAT_LIMIT) {
        currentUser.cars[car_id].seatSetting = SEAT_LIMIT * -1;
        adjustSeat();
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

let map;

function loadDirections() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById("map"));
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
}

function initMap() {
    // will be done inside promise instead
}
  
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
      .route({
        origin: {
          query: currentUser.cars[car_id].buildingAddress,
        },
        destination: {
          query: currentUser.cars[car_id].workAddress,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
}

function changebgcolor() {
    document.getElementById("bg").style.backgroundColor = currentUser.cars[car_id].lightColor;
}

function colorchanger(colorname) {
    console.log("h");
    currentUser.cars[car_id].lightColor = colorname;
    const carName_ = currentUser.cars[car_id].carName;
    const username_ = currentUser.username;
    const newcolor = currentUser.cars[car_id].lightColor;
    const body = {carName_, username_,newcolor};
    console.log(body);
  
    $.post(`${API_URL}/users/update/car/color`, body).then(response => {
      // location.href = '/success';
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });

    changebgcolor();
}