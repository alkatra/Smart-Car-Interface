const API_URL = 'http://18.118.165.72:3000/api';

var rooms = []; // Stores rooms added by user in register.html
var cars = []; // Stores cars added by user in register.html

class cardetails {
  constructor(carName, climSetting, workAddress) {
    this.carName = carName;
    this.climSetting = climSetting;
    this.workAddress = workAddress;
    this.seatSetting = 0;           // Default Setting
    this.lightColor = 'lightblue';  // Default Setting
  }
}

function removeError() {
  document.getElementById('user-not-found').innerHTML = `` 
}

function invalidDetails() {
    document.getElementById('user-not-found').innerHTML = `<div class='alert alert-danger' role='alert'><button class="btn btn-danger" onclick="removeError()"> X </button>    User details incorrect/nonexistent.</div>`;
}

// THIS IS NOW DONE BY PASSPORT.JS
// $('#login-details').on('click', () => {
//     const username = $('#username').val();
//     const password = $('#password').val();
//     $.get(`${API_URL}/users`).then(
//     response => {
//         var success = false;
//         response.forEach(users => {
//             if(users.username == username && users.password == password && users.username != "admin") {
//                 location.href = "/success";
//                 success = true;
//             }
//             else if(users.username == username && users.password == password) {
//                 location.href = "/signup";
//                 success = true;
//             }
//         }) 
//         if(!success) {
//             invalidDetails();
//         }
//     });
// })


// Posts to /signup/user which uses Passport.JS for user.register
$('#signup-details').on('click', () => {
  const username_ = $('#username').val();
  const password_ = $('#password').val();
  var body = {
    username_,
    password_
  };

  if(!rooms) {
    $('#no-rooms').append(`
      <br/><div class='alert alert-danger' role='alert' style="max-width:30%;display:flex;margin: auto;">Please enter atleast one room.</div>`
    );
  }
  else {
    $.post(`/signup/user`, body)
      .then(addRoomsandCars())
      .catch(error => {
        console.error(`Error: ${error}`);
      });
  }
})

function resolveLater() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 1000);
  });
}

async function addRoomsandCars() {
  await resolveLater(); // Add 1000 ms delay to ensure Passport has generated Hashes and salts first.
  for(let i = 0; i < rooms.length; i++) {
    pushroom(i);
  }
  for(let j = 0; j < cars.length; j++) {
    pushcar(j);
  }
  location.href='/';
}

$('#roomname-details').on('click', () => {
  const roomname = $('#roomname').val();
  rooms.push(roomname);
  
  // Add new room to div.
  $('#append-rooms').append(`
  <div class="card text-white bg-info mb-3"> 
    <div class="card-body"  style="padding: 4%;">
         ${rooms[rooms.length - 1]}
    </div>
  </div>
  `);
  
})

$('#carname-details').on('click', () => {
  const carName_ = $('#car-name').val();
  const workAddress_ = $('#work-address').val();
  const climSetting_ = 24;

  newcar = new cardetails(carName_, climSetting_, workAddress_);

  cars.push(newcar);
  
  $('#append-cars').append(`
  <div class="card text-white bg-info mb-3"> 
    <div class="card-body"  style="padding: 4%;">
         ${cars[cars.length - 1].carName}
    </div>
  </div>
  `);
})

function pushcar(idx) {
  const username_ = $('#username').val();
  const carName = cars[idx].carName;
  const climSetting = cars[idx].climSetting;
  const seatSetting = cars[idx].seatSetting;
  const lightColor = cars[idx].lightColor;
  const workAddress = cars[idx].workAddress;

  const body = {
    username_,
    carName,
    climSetting,
    seatSetting,
    lightColor,
    workAddress
  };

  // Check API Documentation
  $.post(`${API_URL}/users/update/cars`, body).then(response => {
  
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}

function pushroom(idx) {
  var username_ = $('#username').val();
  const roomname = rooms[idx];
  const body = {
    username_,
    roomname
  };

  // Check API Documentation
  $.post(`${API_URL}/users/add/rooms`, body).then(response => {

  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}