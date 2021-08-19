const API_URL = 'http://localhost:5000/api';
var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

class currentUserClass {
    constructor(username, rooms) {
        this.username = username;
        this.rooms = rooms;
    } 
}


$.get(`${API_URL}/users`).then(response => {
    response.forEach(users => {
        if(users.username == curUser) {
            currentUser = new currentUserClass(users.username, users.rooms);
            document.getElementById('adduser').textContent += currentUser.username;
            $('#adddetails').append(`
                You have ${currentUser.rooms.length} rooms.
            `)
            $('#adddetails2').append(`
                You have ${currentUser.rooms.length} rooms.
            `)
        }
    });
})
 




