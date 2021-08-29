const axios = require('axios')

const API_URL = 'http://localhost:5000/api';

// Simple test to check everything is working properly
test('Test 2+2 = 4', () => {
    expect(2+2).toEqual(4);
});

// Test the in built tester to see API is working.
test('Test API tester', async() => {
    axios.get(`${API_URL}/test`).then(resp => {
        expect(resp.data).toEqual('The API is working!');
    }); 
});

// Test the TestAccount for preset Variables
test('Test TestAccount', async() => {
    axios.get(`${API_URL}/users`).then(resp => {
        expect(resp.data[2].username).toEqual('TestAccount');
        expect(resp.data[2].rooms[0].roomName).toEqual('TestRoom1');
        expect(resp.data[2].rooms[2].roomName).toEqual('TestRoom3');
        expect(resp.data[2].cars[0].carName).toEqual('TestCar');
    }); 
});

// Test changing car color of test car
test('Test Controller.changeCarColor', async() => {
    const username_ = "TestAccount";
    const carName_ = "TestCar";
    var newcolor = "pink";
    var body = {carName_, username_,newcolor};
    axios.post(`${API_URL}/users/update/car/color`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].cars[0].lightColor).toEqual('pink');
            // RESET TO LIGHTBLUE FOR FURTHER TESTS
            newcolor = "lightblue";
            body = {carName_, username_,newcolor};
            axios.post(`${API_URL}/users/update/car/color`, body).then(response => {});
        });
    });
});

// test changing room color of test room
test('Test Controller.changeRoomColor', async() => {
    const username_ = "TestAccount";
    const lightName = "TestLight1";
    const roomname_ = "TestRoom1";
    var newcolor = "lightblue";
    var body = {username_, lightName, roomname_, newcolor};
    axios.post(`${API_URL}/users/update/room/color`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].rooms[0].lights[0].Color).toEqual('lightblue');
            // RESET TO PINK FOR FURTHER TESTS
            newcolor = "pink";
            body = {username_, lightName, roomname_, newcolor};
            axios.post(`${API_URL}/users/update/room/color`, body).then(response => {});
        });
    });
});

// test adding room to list of rooms in test account
test('Test Controller.addRoom', async() => {
    const username_ = "TestAccount";
    const roomname = "TestRoomNEW";
    var body = {username_, roomname};
    // Adds TestRoomNEW to the list of rooms.
    axios.post(`${API_URL}/users/add/rooms`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].rooms[resp.data[2].rooms.length - 1].roomName).toEqual('TestRoomNEW');
        });
    });
});

// test adding cars to list of cars in test account
test('Test Controller.addCar', async() => {
    const username_ = "TestAccount";
    const carName = "TestCarNEW";
    const climSetting = 21;
    const seatSetting = 0;
    const lightColor = "lightblue";
    const workAddress = "Test Address X";
    const body = {
        username_,
        carName,
        climSetting,
        seatSetting,
        lightColor,
        workAddress
    }
    axios.post(`${API_URL}/users/update/cars`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].cars[resp.data[2].cars.length - 1].carName).toEqual('TestCarNEW');
        });
    });
});

// test changing temperature of test car in test account
test('Test Controller.updateTemp', async() => {
    const carName_ = "TestCar";
    const username_ = "TestAccount";
    var newtemp = 24;
    var body = {
        username_, 
        carName_,
        newtemp
    };
    axios.post(`${API_URL}/users/update/temp`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].cars[0].climSetting).toEqual(24);
            //RESET TO ORIGINAL VALUE
            newtemp = 22;
            body = {
                username_, 
                carName_,
                newtemp
            };
            axios.post(`${API_URL}/users/update/temp`, body).then(response => {});
        });
    });
});

// test changing seat setting in test car in test account.
test('Test Controller.updateSeat', async() => {
    const carName_ = "TestCar";
    const username_ = "TestAccount";
    var newsetting = 10;
    var body = {
        username_, 
        carName_,
        newsetting
    };
    axios.post(`${API_URL}/users/update/seat`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].cars[0].seatSetting).toEqual(10);
            //RESET TO ORIGINAL VALUE
            newsetting = 20;
            body = {
                username_, 
                carName_,
                newsetting
            };
            axios.post(`${API_URL}/users/update/seat`, body).then(response => {});
        });
    });
});

// test changing room temperature of test room.
test('Test Controller.changeRoomTemp', async() => {
    const roomname_ = "TestRoom1";
    const username_ = "TestAccount";
    var newtemp = 10;
    var body = {
        username_, 
        roomname_,
        newtemp
    };
    axios.post(`${API_URL}/users/update/roomtemp`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].rooms[0].climSetting).toEqual(10);
            //RESET TO ORIGINAL VALUE
            newtemp = 20;
            body = {
                username_, 
                roomname_,
                newtemp
            };
            axios.post(`${API_URL}/users/update/roomtemp`, body).then(response => {});
        });
    });
});

// test adding lights to list of lights in TestRoom1
test('Test Controller.addLight', async() => {
    const roomname_ = "TestRoom1";
    const lightName = "TestLightNEW"
    const username_ = "TestAccount";
    var body = {
        username_, 
        roomname_,
        lightName
    };
    axios.post(`${API_URL}/users/add/light`, body).then(response => {
        axios.get(`${API_URL}/users`).then(resp => {
            expect(resp.data[2].rooms[0].lights[resp.data[2].rooms[0].lights.length - 1].Name).toEqual("TestLightNEW");
        });
    });
});