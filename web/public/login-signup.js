// make sure username is not repeatable

var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

const API_URL = 'http://localhost:5000/api';

var rooms = [];

$('#signup-redirect').on('click', () => {
    location.href = "/signup";
})

function invalidDetails() {
    $('#user-not-found').append(`
      <div class='alert alert-danger' role='alert'>User details incorrect/nonexistent, try again.</div>`
    );
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
  const climSetting = 24;
  var body = {
    username,
    password,
    climSetting
  };

  $.post(`${API_URL}/users`, body)
  .then(response => {
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
  for(let i = 0; i < rooms.length; i++) {
    pushroom(i);
  }
  location.href = '/login';
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
  console.log(rooms);
  
})

function pushroom(idx) {
  var username_ = $('#username').val();
  const newroom = rooms[idx];
  const body = {
    username_,
    newroom
  };
  
  $.post(`${API_URL}/users/update/rooms`, body).then(response => {
    // location.href='/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
}

function removeroom(id) {
  rooms.splice(id,1);
  console.log(rooms);
}