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

function addRoomsAndCars() {
    for(let i = 0; i < currentUser.rooms.length; i++) {
        $('#rooms-edit').append(`
        <div class="card text-white bg-info mb-3" style="width: 10rem;"> 
            <div class="card-body" style="padding: 4%;user-select: none;" onclick='chooseroom(${i})'>
                ${currentUser.rooms[i].roomName}
            </div>
        </div>
        `)
    }
    for(let i = 0; i < currentUser.cars.length; i++) {
        $('#cars-edit').append(`
        <div class="card text-white bg-info mb-3" style="width: 10rem;"> 
            <div class="card-body" style="padding: 4%;user-select: none;" onclick='choosecar(${i})'>
                ${currentUser.cars[i].carName}
            </div>
        </div>
        `)
    }
}

function choosecar(idx) {
    location.href=`/carpage?id=${idx}`;
}

function chooseroom(idx) {
    location.href=`/roompage?id=${idx}`;
}