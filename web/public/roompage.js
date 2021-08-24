const API_URL = 'http://localhost:5000/api';
const MQTT_URL = 'http://localhost:5001';


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