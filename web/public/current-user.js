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
            document.getElementById('adduser').textContent += currentUser.username;
            addRoomsAndCars();
        }
    });
})
 




