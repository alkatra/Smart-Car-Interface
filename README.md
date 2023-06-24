# Smart Car Interface

The "Smart Car Interface" project is an interactive simulation of a smart car, built using a combination of front-end technologies, back-end servers, real-time data processing, and third-party APIs. The project provides a fully functional, responsive UI built with Bootstrap and extensive use of flexboxes, cards, and styling to ensure compatibility across devices, including mobile.

Key aspects of the project include:

**Frontend**: A responsive user interface designed using Bootstrap, flexboxes, and cards to ensure a smooth user experience across a variety of device types, including mobile.

**IoT Data**: Real-time data from a simulated external temperature sensor stored in MongoDB and handled by an API hosted on AWS. Data transfer facilitated via MQTT protocol through a service hosted on Heroku.

**Web Server**: The primary web server is hosted on Heroku and managed through a private Git repository. The server communicates extensively with a REST API to fetch and update data as needed.

**Service API**: A RESTful API service hosted on AWS, providing JSON data. Full documentation for each API endpoint is available at the API URL/docs, and the complete MongoDB document can be viewed in JSON format at API URL/api/users.

**Testing**: A robust suite of tests is implemented for each API endpoint. A local test server communicates with the AWS-hosted API to validate the tests, employing dummy data designed to verify multiple data change scenarios.

**M2M**: A MQTT server emulates an external temperature sensor, with data transferred over MQTT protocol. In the absence of physical Arduino board, this emulator substitutes the sensor data.

**Authentication & Security**: Passport.js is used for user authentication. HTTPS is enabled for local development but could not be implemented for deployed versions due to resource constraints.

Please note: This project simulates smart car behavior and does not interact with a real vehicle. Always follow safe programming practices when working with actual vehicle data and controls.
