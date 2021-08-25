const API_URL = 'http://localhost:5000/api';
const MQTT_URL = 'http://localhost:5001';

var outsideTemp = 0;
var insideTemp = 0;

var url_string = window.location.href; 
var url = new URL(url_string);
var roomID = url.searchParams.get("id");

var selectedLightID = 0;

var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

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
    document.getElementById('add-error').innerHTML = `<br/><div class='alert alert-danger' role='alert'><button class="btn btn-danger" onclick="removeError()"> X </button> Limit reached.</div>`
}

$.get(`${API_URL}/users`).then(response => {
    response.forEach(users => {
        if(users.username == curUser) {
            currentUser = new currentUserClass(users.username, users.rooms, users.cars);
            makeManual();
            for(let i = 0; i < currentUser.rooms[roomID].lights.length; i++) {
                addLightsToTable(i);
            }
            addCurrentLightColorDiv();
            changeCurrentColorDiv(currentUser.rooms[roomID].lights[0].Color);
        }
    });
})

function addOutsideTemp() {
    pushInsideTemp(returnIdealTemperature());
    const newtemp = returnIdealTemperature();
    currentUser.rooms[roomID].climSetting = newtemp;
    document.getElementById(`add-outside-temp`).innerHTML = `
                    The outside temperature is: ${outsideTemp}
                    <br/>I have adjusted the temperature here at: ${newtemp}
                `; 
}

function updateExternalTemp() {
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
    // addOutsideTemp();
    updateExternalTemp();
}

function tempChange(boolValue) {
    if(boolValue) {
        const newtemp = currentUser.rooms[roomID].climSetting + 1;
        if(newtemp < 33) {
            pushInsideTemp(newtemp);    
            currentUser.rooms[roomID].climSetting++;
        }
        else {
            addError();
        }
        if(newtemp == 16) {
            removeError();
        }
    }
    else {
        const newtemp = currentUser.rooms[roomID].climSetting - 1;
        if(newtemp > 14) {
            pushInsideTemp(newtemp);
            currentUser.rooms[roomID].climSetting--;
        }
        else {
            addError();
        }
        if(newtemp == 31) {
            removeError();
        }
    }
    updateManualTemp();
}

function addLightsToTable(i) {
    $('#lightListTable tbody').append(`
        <tr>
        <td>
            <input class="form-check-input" type="radio" name="flexRadioDefault" onclick="lightChosen(${i})">
            ${currentUser.rooms[roomID].lights[i].Name}
        </td>
        <td><div id="changecolorintable_${i}">
            ${currentUser.rooms[roomID].lights[i].Color}
        </div>
        </td>
        </tr>`
    );
}

function colorchanger(newcolor) {
    currentUser.rooms[roomID].lights[selectedLightID].Color = newcolor;
    const roomname_ = currentUser.rooms[roomID].roomName;
    const username_ = currentUser.username;
    const lightName = currentUser.rooms[roomID].lights[selectedLightID].Name;

    const body = {
        username_,
        lightName,
        roomname_,
        newcolor
    }
  
    $.post(`${API_URL}/users/update/room/color`, body).then(response => {
      console.log(body);
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });

    document.getElementById(`changecolorintable_${selectedLightID}`).innerHTML = `${newcolor}`;
    changeCurrentColorDiv(newcolor);
}

function changeCurrentColorDiv(newcolor) {
    document.getElementById('currentcolor').style.backgroundColor = newcolor;
}

function addCurrentLightColorDiv() {
    document.getElementById('currentcolor').innerHTML = `
    <br/>
        <h2><center>
            ${currentUser.rooms[roomID].lights[selectedLightID].Name} Color
        </center></h2>
    <br/>
    `
    changeCurrentColorDiv(currentUser.rooms[roomID].lights[selectedLightID].Color);
}

function lightChosen(idx) {
    selectedLightID = idx;
    addCurrentLightColorDiv();
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

$('#sync-temp').on('click', () => {
    updateExternalTemp();
    // document.getElementById("auto-clim-control").style.display = "none";
})

$('#light-adder').on('click', () => {
    const lightName = $('#light-name').val();
    const username_ = currentUser.username;
    const roomname_ = currentUser.rooms[roomID].roomName;
    const body = {
        lightName,
        roomname_,
        username_
    }

    $.post(`${API_URL}/users/add/light`, body).then(response => {})
    .catch(error=> {
        console.error(`Error: ${error}`);
    });
    
    currentUser.rooms[roomID].lights.push({
        "Name": lightName,
        "Color": "lightblue"
    });

    addLightsToTable(currentUser.rooms[roomID].lights.length - 1);
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