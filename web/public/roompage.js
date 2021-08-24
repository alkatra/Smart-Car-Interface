const API_URL = 'http://localhost:5000/api';
const MQTT_URL = 'http://localhost:5001';
var outsideTemp = 0;
var insideTemp = 0;

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
    document.getElementById(`add-outside-temp`).innerHTML = `
                    The outside temperature is: ${outsideTemp}
                    <br/>I have adjusted the temperature here at: ${returnIdealTemperature()}
                `
}

function updateExternalTemp() {
    makeAuto();
    $.get(`${API_URL}/users`).then(response => {
        response.forEach(user => {
            if(user.username == "admin") {
                outsideTemp = user.externalTemp;
                addOutsideTemp();
            }
        });
    })
}

function pushInsideTemp() {
    
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

updateExternalTemp();

$('#sync-temp').on('click', () => {
    updateExternalTemp();
    // document.getElementById("auto-clim-control").style.display = "none";
})

function makeManual() {
    document.getElementById("auto-clim-control").style.display = "none";
    document.getElementById("manual-clim-control").style.display = "block";
    addOutsideTemp();
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


