define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/generated-docs/main.js",
    "group": "C:\\individual-project\\api\\public\\generated-docs\\main.js",
    "groupTitle": "C:\\individual-project\\api\\public\\generated-docs\\main.js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/api/users/update/car/color",
    "title": "Change color of car",
    "group": "Cars_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>username_, carName_, newcolor</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cars_Modification",
    "name": "PostApiUsersUpdateCarColor"
  },
  {
    "type": "post",
    "url": "/api/users/update/cars",
    "title": "Add a new car",
    "group": "Cars_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>username_, carName, climSetting, seatSetting, lightColor, workAddress</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cars_Modification",
    "name": "PostApiUsersUpdateCars"
  },
  {
    "type": "post",
    "url": "/api/users/update/seat",
    "title": "Adjust seat-setting of Car",
    "group": "Cars_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>carName_, username_, newsetting</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cars_Modification",
    "name": "PostApiUsersUpdateSeat"
  },
  {
    "type": "post",
    "url": "/api/users/update/temp",
    "title": "Adjust climate setting of Car",
    "group": "Cars_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>carName_, username_, newtemp</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Cars_Modification",
    "name": "PostApiUsersUpdateTemp"
  },
  {
    "type": "post",
    "url": "/api/users/add/light",
    "title": "Add a light inside the room",
    "group": "Rooms_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>username_, lightName, roomname_</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Rooms_Modification",
    "name": "PostApiUsersAddLight"
  },
  {
    "type": "post",
    "url": "/api/users/add/rooms",
    "title": "Add a new room to list of rooms",
    "group": "Rooms_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>username_, roomname</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Rooms_Modification",
    "name": "PostApiUsersAddRooms"
  },
  {
    "type": "post",
    "url": "/api/users/update/room/color",
    "title": "Adjust color of light in room",
    "group": "Rooms_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>username_, lightName, roomname_, newcolor</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Rooms_Modification",
    "name": "PostApiUsersUpdateRoomColor"
  },
  {
    "type": "post",
    "url": "/api/users/update/roomtemp",
    "title": "Adjust climate setting in room",
    "group": "Rooms_Modification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>roomname_, username_, newtemp</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"done\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Rooms_Modification",
    "name": "PostApiUsersUpdateRoomtemp"
  },
  {
    "type": "get",
    "url": "/api/test",
    "title": "Test the API",
    "group": "Test",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "The API is working!",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Test",
    "name": "GetApiTest"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "Get all Users",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " [\n    {\n        \"rooms\": [\n            {\n                \"roomName\": \"Living Room\",\n                \"climSetting\": 24,\n                \"lights\": [\n                    {\n                        \"Name\": \"Table Tamp\",\n                        \"Color\": \"seagreen\"\n                    }\n                ]\n            },\n            {\n                \"roomName\": \"Dining Room\",\n                \"climSetting\": 24,\n                \"lights\": []\n            }\n        ],\n        \"cars\": [\n            {\n                \"carName\": \"Tesla Model S\",\n                \"climSetting\": \"24\",\n                \"seatSetting\": \"0\",\n                \"lightColor\": \"lightblue\",\n                \"workAddress\": \"16 Poplar St, Box Hill\"\n            }\n        ],\n        \"_id\": \"6129b6b66396c84071717c1a\",\n        \"username\": \"Sagar\",\n        \"__v\": 0\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users",
    "name": "GetApiUsers"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Post a new User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>username, password, climSetting, rooms</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "\"successfully added new user\"",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users",
    "name": "PostApiUsers"
  }
] });
