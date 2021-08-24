// const API_URL = 'http://localhost:5000/api';
const MQTT_URL = 'http://localhost:5001';
var outsideTemp = 0;
var insideTemp = 0;

var url_string = window.location.href; 
var url = new URL(url_string);
var roomID = url.searchParams.get("id");

const API_URL = 'http://localhost:5000/api';
var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

class currentUserClass {
    constructor(username, rooms, cars) {
        this.username = username;
        this.rooms = rooms;
        this.cars = cars;
    } 
}

$.get(`${API_URL}/users`).then(response => {
    response.forEach(users => {
        if(users.username == curUser) {
            currentUser = new currentUserClass(users.username, users.rooms, users.cars);
            updateExternalTemp();
            
        }
    });
})

$('#newtempinfo').on('click', () => {
    const newtemp = $('#newTemp').val();
    const body = {
        newtemp
    }
    $.post(`${MQTT_URL}/send-command`, body).then(response => {})
    .catch(error => {
      console.error(`Error: ${error}`);
    });
})

function addOutsideTemp() {
    pushInsideTemp(returnIdealTemperature());
    const newtemp = returnIdealTemperature();
    document.getElementById(`add-outside-temp`).innerHTML = `
                    The outside temperature is: ${outsideTemp}
                    <br/>I have adjusted the temperature here at: ${newtemp}
                `; 
}

function updateExternalTemp() {
    makeManual();
    $.get(`${API_URL}/users`).then(response => {
        response.forEach(user => {
            if(user.username == "admin") {
                outsideTemp = user.externalTemp;
                addOutsideTemp();
            }
        });
    })
}

function pushInsideTemp(newtemp) {
    const roomname_ = currentUser.rooms[roomID].roomName;
    const username_ = currentUser.username;
    const body = {
        roomname_,
        username_,
        newtemp
    }
    $.post(`${API_URL}/users/update/roomtemp`, body).then(response => {}).catch(error => {
        console.error(`Error: ${error}`);
    });
}

function returnIdealTemperature() {
    if(outsideTemp < 21) {
        if(outsideTemp < 16) {
            insideTemp = 24;
            return insideTemp;
        }
        insideTemp = 22;
        return insideTemp;
    }
    if(outsideTemp > 24) {
        if(outsideTemp > 32) {
            insideTemp = 16;
            return insideTemp;
        }
        insideTemp = 20;
        return insideTemp;
    }
    insideTemp = 21;
    return insideTemp;
}



$('#sync-temp').on('click', () => {
    updateExternalTemp();
    // document.getElementById("auto-clim-control").style.display = "none";
})

function updateManualTemp() {
    document.getElementById('add-temp').innerHTML = `<h2>${currentUser.rooms[roomID].climSetting}</h2>`;
}

function makeManual() {
    document.getElementById("auto-clim-control").style.display = "none";
    document.getElementById("manual-clim-control").style.display = "block";
    updateManualTemp();
}

function makeAuto() {
    document.getElementById("auto-clim-control").style.display = "block";
    document.getElementById("manual-clim-control").style.display = "none";
    addOutsideTemp();
}

$('#make-manual').on('click', () => {
    makeManual();
})

$('#make-auto').on('click', () => {
    makeAuto();
})

$('#temp-increase').on('click', () => {
    tempChange(true);
})

$('#temp-decrease').on('click', () => {
    tempChange(false);
})

function tempChange(boolValue) {
    if(boolValue) {
        pushInsideTemp(++currentUser.rooms[roomID].climSetting);
    }
    else {
        pushInsideTemp(--currentUser.rooms[roomID].climSetting);
    }
    updateManualTemp();
}