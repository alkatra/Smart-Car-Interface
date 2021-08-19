function addRoomsAndCars() {
    for(let i = 0; i < currentUser.rooms.length; i++) {
        $('#rooms-edit').append(`
        <div class="card text-white bg-info mb-3" style="width: 10rem;"> 
            <div class="card-body" style="padding: 4%;">
                ${currentUser.rooms[i]}
            </div>
        </div>
        `)
    }
    for(let i = 0; i < currentUser.cars.length; i++) {
        $('#cars-edit').append(`
        <div class="card text-white bg-info mb-3" style="width: 10rem;"> 
            <div class="card-body" style="padding: 4%;">
                ${currentUser.cars[i]}
            </div>
        </div>
        `)
    }
}