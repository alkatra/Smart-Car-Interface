// make sure username is not repeatable

var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

const API_URL = 'http://localhost:5000/api';

var rooms = [];
class cardetails {
  constructor(carName, climSetting, workAddress) {
    this.carName = carName;
    this.climSetting = climSetting;
    this.workAddress = workAddress;
    this.seatSetting = 0;
    this.lightColor = 'lightblue';
  }
}
var cars = [];

$('#signup-redirect').on('click', () => {
    location.href = "/signup";
})

function removeError() {
  document.getElementById('user-not-found').innerHTML = ``
}

function invalidDetails() {
    document.getElementById('user-not-found').innerHTML = `<div class='alert alert-danger' role='alert'><button class="btn btn-danger" onclick="removeError()"> X </button>    User details incorrect/nonexistent.</div>`;
}

$('#login-details').on('click', () => {
    const username = $('#username').val();
    const password = $('#password').val();
    $.get(`${API_URL}/users`).then(
    response => {
        var success = false;
        response.forEach(users => {
            if(users.username == username && users.password == password && users.username != "admin") {
                localStorage.setItem('curUser', JSON.stringify(users.username));
                location.href = "/success";
                success = true;
            }
            else if(users.username == username && users.password == password) {
                localStorage.setItem('curUser', JSON.stringify(users.username));
                location.href = "/signup";
                success = true;
            }
        }) 
        if(!success) {
            invalidDetails();
        }
    });
})

$('#signup-details').on('click', () => {
  const username = $('#username').val();
  const password = $('#password').val();
  var body = {
    username,
    password
  };

  if(!$('#roomname').val()) {
    $('#no-rooms').append(`
      <br/><div class='alert alert-danger' role='alert' style="max-width:30%;display:flex;margin: auto;">Please enter atleast one room.</div>`
    );
  }
  else {
    $.post(`${API_URL}/users`, body)
      .then(response => {})
      .catch(error => {
        console.error(`Error: ${error}`);
      });
      for(let i = 0; i < rooms.length; i++) {
        pushroom(i);
      }
      for(let j = 0; j < cars.length; j++) {
        pushcar(j);
      }
  }
  
})

$('#roomname-details').on('click', () => {
  const roomname = $('#roomname').val();
  rooms.push(roomname);
  
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
  console.log(newcar);

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

  console.log(body);
  $.post(`${API_URL}/users/update/cars`, body).then(response => {
  
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}

function pushroom(idx) {
  var username_ = $('#username').val();
  const newroom = rooms[idx];
  const body = {
    username_,
    newroom
  };
  
  $.post(`${API_URL}/users/update/rooms`, body).then(response => {

  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}

function removeroom(id) {
  rooms.splice(id,1);
  console.log(rooms);
}