const API_URL = 'http://18.118.165.72:3000/api';

class currentUserClass {
    constructor(username, rooms, cars) {
        this.username = username;
        this.rooms = rooms;
        this.cars = cars;
    } 
}

$.get(`${API_URL}/users`).then(response => {
    response.forEach(users => {
        
        var url_string = window.location.href
        var url = new URL(url_string);
        var curUser = url.searchParams.get("user");
        if(users.username == curUser) {
            currentUser = new currentUserClass(users.username, users.rooms, users.cars);
            console.log(currentUser);
            document.getElementById('adduser').textContent += currentUser.username;      
            addRoomsAndCars();
        }
    });
})

// Adds rooms and cars from list in database.
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
    location.href=`/carpage?user=${currentUser.username}&id=${idx}`;
}

function chooseroom(idx) {
    location.href=`/roompage?user=${currentUser.username}&id=${idx}`;
}